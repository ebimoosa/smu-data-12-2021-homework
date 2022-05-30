$(document).ready(function() {
doWork();
});

function doWork() {
    var url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`;
    var boundaries = 'static/data/boundaries.json';

    requestAjax(url, boundaries);
}

function requestAjax(url, boundaries) {
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
            // boundaries request
            $.ajax({
                type: "GET",
                url: boundaries,
                contentType: "application/json",
                dataType: "json",
                success: function(boundaries) {
                    console.log(data);
                    console.log(boundaries);
                    createMap(data, boundaries);
                }
            });
        },
        error: function(textStatus, errorThrown) {
            console.log("Failed to get data");
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function onEachFeature(feature, layer) {
// pop up on hover
if (feature.properties) {
    layer.bindPopup(`<h3>${ feature.properties.title }</h3><hr><p>${new Date(feature.properties.time)}</p >`);
}
}


// 3.
// createMap() takes the earthquake data and incorporates it into the visualization:

function createMap(data, boundaries) {

    var earthquakes = data.features

    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    var street_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        accessToken: API_KEY
    });

    var outdoors_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/outdoors-v11',
        accessToken: API_KEY
    });


    // Create an overlays object.
    var earthquakeLayer = L.geoJSON(earthquakes, {
        onEachFeature: onEachFeature
    });

    // Prof Booth
    function getRadius(mag) {
        return mag * 50000
    }
    
    // depth ranges from https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake#:~:text=Shallow%20earthquakes%20are%20between%200,earthquakes%20deeper%20than%2070%20km.
    function getColor(depth) {
        let color = 'red';
    
        if (depth >= 300) {
            color = "red";
        } else if (depth >= 70) {
            color = "yellow";
        } else {
            color = 'green';
        }
        return (color);
    }

    // Create earthquake circle overlay object
    var circles = [];
    for (let i = 0; i < earthquakes.length; i++) {
        let earthquake = earthquakes[i];
        // let circle_color = "blue";

        // get coordinates from response
        let coord = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]]

        let circle = L.circle(coord, {
            color: getColor(earthquake.geometry.coordinates[2]),
            fillColor: getColor(earthquake.geometry.coordinates[2]),
            fillOpacity: 0.8,
            radius: getRadius(earthquake.properties.mag)
        }).bindPopup(`<h3>${ earthquake.properties.title } at depth: ${earthquake.geometry.coordinates[2].toFixed(0)}m</h3><hr><p>${new Date(earthquake.properties.time)}</p >`);
        circles.push(circle);
    }

    var markerLayer = L.layerGroup(circles);

    var boundaryLayer = L.geoJson(boundaries.features, {
        style: {
            "color": "red",
            "weight": 1,
            "opacity": 1
        }
    });


    // Create a baseMaps object.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer,
        "Street": street_layer,
        "Outdoors": outdoors_layer
    };

    // Overlays that can be toggled on or off
    var overlayMaps = {
        Earthquake: earthquakeLayer,
        Circles: markerLayer,
        PlateBoundaries: boundaryLayer
    };

    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [dark_layer, earthquakeLayer, markerLayer, boundaryLayer]
    });


    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);


    // create legend
    // Prof Booth
    var legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend');
        var labels = ["0-70", "70-300", "300-700"];
        var colors = ["green", "yellow", "red"];

        for (let i = 0; i < labels.length; i++) {
            let label = labels[i];
            let color = colors[i];

            let html = `<i style='background:${color}'></i>${label}<br>`;
            div.innerHTML += html;
        }
        return div;
    }

    legend.addTo(myMap);

}