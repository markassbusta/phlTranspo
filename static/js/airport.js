/**
 * Add polygons from geojson on the map
 *
 * In addition to points, leaflet can display
 * polygons from geojson
 */

// Center on Philadelphia
var map = L.map('basic-map',{
			zoomControl:true, maxZoom:19
		}).fitBounds([[39.8713055112,-75.2530324737],[39.8835071073,-75.2352446046]]);

/**
 * Add OpenStreetMap tiles to the map
 */
var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

// airport geoJSON URL
//var myStyle = {
	//"color": "#0CF6FF"

//};

//var  apTermURL = "/static/data/airportTerm.geojson"

//$.getJSON(apTermURL, function(data) {
 //   L.geoJson(data, {style: myStyle}).addTo(map)
//});

var overlay_termStyle = L.tileLayer.wms('http://ec2-52-24-208-26.us-west-2.compute.amazonaws.com/geoserver/airportTerminal/wms?version=1.1.0&layers=airportTerminal:GIS_AIRPORT.Terminal_Buildings&styles=&bbox=-75.2526089529656,39.872374656598,-75.2356681252549,39.8824379618888&width=768&height=456&srs=EPSG:4326&', {
			layers: 'GIS_AIRPORT.Terminal_Buildings',
			format: 'image/png',
			transparent: true,
			continuousWorld : true,
		}).addTo(map);

var overlay_DefaultPolygon = L.tileLayer.wms('http://ec2-52-24-208-26.us-west-2.compute.amazonaws.com/geoserver/airportParking/wms?version=1.1.0&layers=airportParking:GIS_AIRPORT.Parking_Lots&styles=&bbox=-75.2516064926151,39.8762681627733,-75.230890030485,39.8917234949106&width=768&height=572&srs=EPSG:4326&', {
			layers: 'GIS_AIRPORT.Parking_Lots',
			format: 'image/png',
			transparent: true,
			continuousWorld : true,
		}).addTo(map);

var artURL = "/static/data/airportArt.geojson"

//$.getJSON(artURL,function(data){
	//L.geoJson(data,{
		//onEachFeature: function(feature, layer){
		//	layer.bindPopup(feature.properties.EXHIBITION)
	//	}
//	}).addTo(map)
//});

var artIcon = L.icon({
	iconUrl: '/static/lib/images/art.png',
	iconSize: [30,30]
});

var createMarker = function(feature,latlng){
	var marker = L.marker(latlng, {icon: artIcon});
	marker.bindPopup(feature.properties.EXHIBITION)
	return marker
}

var displayExhibits = function(data){
	L.geoJson(data,{
		pointToLayer: createMarker
	}).addTo(map);
}

$.getJSON(artURL, displayExhibits);

function onLocationFound(e) {
var mydate = new Date(e.timestamp);
L.marker(e.latlng).addTo(map).bindPopup(mydate.toString());
    

}

function onLocationError(e) {
    alert("Unable to find your location. You may need to enable Geolocation.");
}

map.on('locationerror', onLocationError);
map.on('locationfound', onLocationFound);
map.locate({setView: true, maxZoom:12});




