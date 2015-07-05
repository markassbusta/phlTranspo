/**
 * Add polygons from geojson on the map
 *
 * In addition to points, leaflet can display
 * polygons from geojson
 */

// Center on Philadelphia
var map = L.map('basic-map').setView([39.952299, -75.163256], 11);

/**
 * Add OpenStreetMap tiles to the map
 */
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

// Neighborhoods geojson URL
var condomsURL = "/static/data/condoms.geojson"

var noSperm = "/static/lib/images/condoms.png"

$.getJSON(condomsURL,function(data){
	var condomIcon = L.icon({
		iconUrl: noSperm,
		iconSize: [40,40]
	});
	 var distibution = L.geoJson(data,{
		pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng,{icon: condomIcon});
			marker.bindPopup(feature.properties.SITE_NAME + '<br/>' + feature.properties.ADDRESS);
			return marker;
		}
	});
	 var clusters = L.markerClusterGroup();
	 clusters.addLayer(distibution);
	 map.addLayer(clusters);
	});

