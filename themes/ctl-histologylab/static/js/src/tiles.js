/* eslint-disable */

$(document).ready(function() {
    var map = L.map('map', {
        center: [0,0],
        zoom: 2,
        zoomControl: false,
        panControl: false,
        maxBounds: [[-90, -200], [90, 200]]
    });

    L.control.pan().addTo(map);
    L.control.zoomslider().addTo(map);

    var slideId = $('#map').data('slide-id');
    var zoomMax = $('#map').data('zoom');
    var slide_url_format = 'http://localhost:8000/' + '/{z}/{y}/{x}.jpg';

    var attribution = '&copy; Example attribution'

    L.tileLayer(slide_url_format, {
        minZoom: 2,
        maxZoom:zoomMax,
        attribution: attribution
    }).addTo(map);

    L.Control.textbox = L.Control.extend({
		onAdd: function(map) {

		var text = L.DomUtil.create('div');
		text.id = "info_text";
		text.innerHTML = "Magnification: 40x"
		return text;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'topleft' }).addTo(map);

    var smallLayer = L.tileLayer(slide_url_format, {
        minZoom: 1,
        maxZoom: zoomMax
    })
    new L.Control.MiniMap(smallLayer, {
        toggleDisplay: true,
        height: 200,
        width: 200,
        mapOptions: {
            panControl: false,
            maxBounds: [[-90, -200], [90, 200]]
        }}).addTo(map)
});

    //$("#info_text")[0].innerHTML = 'new text'
