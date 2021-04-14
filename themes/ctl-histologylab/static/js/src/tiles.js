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
    var slide_url_format = 'https://ctl-webslides-static-prod.s3.amazonaws.com/slide' + slideId + '/{z}/{y}/{x}.jpg';

    var attribution = '&copy; Columbia University Department of Pathology and Cell Biology'

    L.tileLayer(slide_url_format, {
        minZoom: 2,
        maxZoom:zoomMax,
        attribution: attribution
    }).addTo(map);

    L.Control.textbox = L.Control.extend({
		onAdd: function(map) {

		var text = L.DomUtil.create('div');
		text.id = "info_text";
		text.innerHTML = "Magnification: 1x"
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

    map.on('zoomend', function () {
        var zoomLevel = map.getZoom();
        var mag = $("#info_text")[0];
        if (slideId === 12 || slideId === 82) {
            if (zoomMax === 8) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 25x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 40x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 50x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 60x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 75x'
                        break;
                    case 7:
                        mag.innerHTML = 'Magnification: 85x'
                        break;
                    case 8:
                        mag.innerHTML = 'Magnification: 100x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 25x'
                }
            }
            else if (zoomMax === 9) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 10x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 20x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 35x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 45x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 60x'
                        break;
                    case 7:
                        mag.innerHTML = 'Magnification: 75x'
                        break;
                    case 8:
                        mag.innerHTML = 'Magnification: 90x'
                        break;
                    case 9:
                        mag.innerHTML = 'Magnification: 100x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 10x'
                }
            }
        } else {
            if (zoomMax === 6) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 1x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 8x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 10x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 20x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 40x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 1x'
                }
            }
            else if (zoomMax === 7) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 1x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 4x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 8x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 10x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 20x'
                        break;
                    case 7:
                        mag.innerHTML = 'Magnification: 40x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 1x'
                }
            }
            else if (zoomMax === 8) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 10x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 15x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 20x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 25x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 30x'
                        break;
                    case 7:
                        mag.innerHTML = 'Magnification: 35x'
                        break;
                    case 8:
                        mag.innerHTML = 'Magnification: 40x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 1x'
                }
            }
            else if (zoomMax === 9) {
                switch (zoomLevel) {
                    case 2:
                        mag.innerHTML = 'Magnification: 9x'
                        break;
                    case 3:
                        mag.innerHTML = 'Magnification: 14x'
                        break;
                    case 4:
                        mag.innerHTML = 'Magnification: 18x'
                        break;
                    case 5:
                        mag.innerHTML = 'Magnification: 23x'
                        break;
                    case 6:
                        mag.innerHTML = 'Magnification: 27x'
                        break;
                    case 7:
                        mag.innerHTML = 'Magnification: 32x'
                        break;
                    case 8:
                        mag.innerHTML = 'Magnification: 36x'
                        break;
                    case 9:
                        mag.innerHTML = 'Magnification: 40x'
                        break;
                    default:
                        mag.innerHTML = 'Magnification: 1x'
                }
            }
        }
    })
});
