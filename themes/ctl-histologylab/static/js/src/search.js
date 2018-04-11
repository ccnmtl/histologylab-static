/* eslint-env jquery */
/* eslint-env node */

var ITEMS_ON_PAGE = 10;

if (typeof require === 'function') {
    var jsdom = require('jsdom');
    var JSDOM = jsdom.JSDOM;
    var window = new JSDOM('<!DOCTYPE html>').window;
    var $ = require('jquery')(window);
    var lunr = require('lunr');
}

(function() {
    var truncate = function(body) {
        var length = 320;
        if (body.length > length) {
            return body.substring(0, length) + '&hellip;';
        } else {
            return body;
        }
    };

    var Search = function(items) {
        this.results = [];
        this.data = {};
        this.index = initializeLunrIndex(items);

        var me = this;
        items.forEach(function(d) {
            me.data[d.title] = d;
        });
    };

    Search.prototype.doSearch = function(searchTerms) {
        var mainTerm = '';
        // No search params? Then just show everything by
        // setting '*' if params is empty
        if (searchTerms === '') {
            mainTerm = ['*'];
        } else {
            mainTerm = searchTerms.split(' ');
        }

        var $el = $('#search-results');
        $el.show();
        $('#all-objects').hide();

        this.results = this.index.query(function(q) {
            mainTerm.forEach(function(param) {
                if (param) {
                    q.term(param.toLowerCase());
                }
            });
        });

        var me = this;

        this.results.forEach(function(r) {
            var d = me.data[r.ref];
            var result = '<div class="search-result">' +
                    '<a href="' + d.url + '">' +
                    d.title +
                    '</a>' +
                    '<p>' + truncate(d.body) + '</p>' +
                    '</div>';

            r.renderedString = result;
        });

        return false;
    };

    var initializeLunrIndex = function(items) {
        var idx = lunr(function() {
            this.ref('title');
            this.field('title');
            this.field('body');
            this.field('url');

            items.forEach(function(d) {
                this.add(d);
            }, this);
        });

        return idx;
    };

    var clearSearch = function() {
        $('#search-results').empty();
    };

    /**
     * Generate an element containing all the events that belong on
     * the given page number.
     */
    var renderEvents = function(items, pageNum) {
        var $container = jQuery('<div class="mv-topics" />');
        var start = (pageNum - 1) * ITEMS_ON_PAGE;
        var end = start + ITEMS_ON_PAGE;
        for (var i = start; i < end && i < items.length; i++) {
            $container.append(jQuery(
                items[i].renderedString
            ));
        }
        return $container;
    };

    /**
     * Clear the events from the DOM and re-render them.
     */
    var refreshEvents = function(items, pageNum) {
        $('.pagination-holder').pagination('updateItems', items.length);
        clearSearch();
        //jQuery('#search-results').append(renderEvents(items, pageNum));
        $('#search-results').append(renderEvents(items, pageNum));
    };

    if (typeof document === 'object') {
        $(document).ready(function() {
            var loaderAnimation =
                '<div id="loader-animation-container" class="col-12">' +
                '<div class="loader-inner ball-pulse"><div></div><div>' +
                '</div><div></div></div></div>';

            $('#search-results').append(loaderAnimation);
            var path = window.location.pathname.replace(/search\/$/, '');
            $.getJSON(path + 'index.json', function(items) {
                $('#loader-animation-container').fadeOut('slow');


                // First initialize the search
                var search = new Search(items.pages);
                // Initialize pagination
                $('.pagination-holder').pagination({
                    items: items.length,
                    itemsOnPage: ITEMS_ON_PAGE,
                    useAnchors: false,
                    cssStyle: 'light-theme',
                    onPageClick: function(pageNumber) {
                        if (search.results.length > 0 ||
                                $('#q').val().length > 0) {
                            refreshEvents(search.results, pageNumber);
                        } else {
                            refreshEvents(search.results, pageNumber);
                        }
                    }
                });

                search.doSearch('');
                refreshEvents(search.results, 1);

                $('#clear-search').click(clearSearch);
                $('#q').keyup(function() {
                    clearSearch();
                    search.doSearch($.trim($('#q').val()) );
                    refreshEvents(search.results, 1);
                });

            }).fail(function(jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );});
        });
    }

    if (typeof module !== 'undefined') {
        module.exports = { Search: Search };
    }
})();
