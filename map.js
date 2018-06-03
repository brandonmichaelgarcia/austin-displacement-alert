
    //Create basemap from Mapbox
	var baseMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
    });     

    //Set center and zoom of map and add Mapbox basemap
	var map = L.map('map', {
        center: [30.28, -97.59],
        zoom: 10,
		layers:[baseMap]
    });

    var geojsonTravis;
    var geojsonZipcodes;

    /*
    //Create color scale for heatmap
    function getColor(d) {
        return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                        '#FFEDA0';
    }
    */

    //Set style for Travis County blocks
    function style(feature) {
        return {
            //fillColor: getColor(feature.properties.risk)
            fillColor: 'lightblue',
            fillOpacity: .5,
            weight: .5,
            color: 'darkblue'
        };
    }
    
    //Add Zip code label to polygon
    function onEachFeature(feature, layer){
        layer.bindTooltip("Zip Code: " + feature.properties["zipcode"]);
    };

    //Create layer for Travis county blocks and call style function
    geojsonTravis = L.geoJson(travis, {
        style: style
    });

    //Create layer of Zip Codes and set style
    geojsonZipcodes = L.geoJson(zipcodes, {
        color: 'black',
        weight: 1,
        fillOpacity: 0,
        onEachFeature: onEachFeature
    });
    
    //Group layers into overlay to toggle on/off
    var overlays = {
        "Zip Codes": geojsonZipcodes,
        "Block Areas": geojsonTravis
    }; 

    //Add overlays to control
    L.control.layers(null, overlays, {position: 'topleft'}).addTo(map);
    
    //Add Routing Functionality
    var routing = L.Routing.control({
        waypoints: [L.latLng(30.33, -97.69),L.latLng(30.2, -97.7)],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);

    function createButton(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }
    
    map.on('click', function(e) {
        
        var container = L.DomUtil.create('div'),
            startBtn = createButton('Start from this location', container),
            destBtn = createButton('Go to this location', container);

        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);   

        L.DomEvent.on(startBtn, 'click', function() {
        routing.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
        });

        L.DomEvent.on(destBtn, 'click', function() {
            routing.spliceWaypoints(routing.getWaypoints().length - 1, 1, e.latlng);
            map.closePopup();
        });

    });

    /*
    //Legend for heatmap ***will need to be tested and legend css added****
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, 10, 20, 50, 100, 200, 500, 1000],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
            }

        return div;
    };

    legend.addTo(map);
    */
