/* eslint-env jquery */
/* eslint-env node */

$(document).ready(function() {
    console.log('leaflet', L);
    var map = L.map('map', {
        center: [0,0],
        zoom: 2
    });

    var slideId = $('#map').data('slide-id');
    //var slide_url_format = 'http://localhost:8000/{z}/{y}/{x}.jpg';
    // var slide_url_format = 'https://cuimc-it-path-test.s3.amazonaws.com/slide' + slideId + '/{z}/{y}/{x}.jpg';
    var slide_url_format = 'https://ctl-locustempus-local.s3.amazonaws.com/slide' + slideId + '/{z}/{y}/{x}.jpg';

    L.tileLayer(slide_url_format, {
        minZoom: 2,
        maxZoom: 9,
        noWrap: true
    }).addTo(map);

});
