// create map object

var map = L.map('basic-map',{
			zoomControl:true, maxZoom:19
		}).fitBounds([[39.8713055112,-75.2530324737],[39.8835071073,-75.2352446046]]);

/**
 * Add basemap tiles to the map
 */
var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

// add GeoServer WMS layers

var overlay_termStyle = L.tileLayer.wms('http://ec2-52-24-208-26.us-west-2.compute.amazonaws.com/geoserver/airportTerminal/wms?version=1.1.0&layers=airportTerminal:GIS_AIRPORT.Terminal_Buildings&styles=&bbox=-75.2526089529656,39.872374656598,-75.2356681252549,39.8824379618888&width=768&height=456&srs=EPSG:4326&', {
			layers: 'GIS_AIRPORT.Terminal_Buildings',
			format: 'image/png',
			transparent: true,
			continuousWorld : true,
		}).addTo(map);

//var overlay_DefaultPolygon = L.tileLayer.wms('http://ec2-52-24-208-26.us-west-2.compute.amazonaws.com/geoserver/airportParking/wms?version=1.1.0&layers=airportParking:GIS_AIRPORT.Parking_Lots&styles=&bbox=-75.2516064926151,39.8762681627733,-75.230890030485,39.8917234949106&width=768&height=572&srs=EPSG:4326&', {
			//layers: 'GIS_AIRPORT.Parking_Lots',
		//	format: 'image/png',
		//	transparent: true,
		//	continuousWorld : true,
		//}).addTo(map);


var overlay_DefaultPolygon = L.tileLayer.wms('http://ec2-52-24-208-26.us-west-2.compute.amazonaws.com/geoserver/airportRunways/wms?version=1.1.0&layers=airportRunways:GIS_AIRPORT.Runways&styles=&bbox=-75.2752807767853,39.8605440088057,-75.2126961472546,39.8877399676479&width=768&height=333&srs=EPSG:4326&', {
			layers: 'GIS_AIRPORT.Runways',
			format: 'image/png',
			transparent: true,
			continuousWorld : true,
		}).addTo(map);

// add airport amenities points of interest with clustering

var artURL = "/static/data/airportArt.geojson"


var artsy = "/static/lib/images/art.png"

$.getJSON(artURL,function(data){
	var artIcon = L.icon({
		iconUrl: artsy,
		iconSize: [30,30]
	});
	 var exhibits = L.geoJson(data,{
		pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng,{icon: artIcon});
			marker.bindPopup(feature.properties.EXHIBITION + '<br/>' + feature.properties.PATH);
			return marker;
		}
	});
	 var clusters = L.markerClusterGroup();
	 clusters.addLayer(exhibits);
	 map.addLayer(clusters);
	});


var atmURL = "/static/data/ATMS.geojson"

var money = "/static/lib/images/atm.png" 

$.getJSON(atmURL,function(data){
	var atmIcon = L.icon({
		iconUrl: money,
		iconSize: [30,30]
	});
	 var ATMs = L.geoJson(data,{
		pointToLayer: function(feature,latlng){
			var marker = L.marker(latlng,{icon: atmIcon});
			marker.bindPopup(feature.properties.TYPE + '<br/>' + feature.properties.TERMINAL);
			return marker;
		}
	});
	 var clustersB = L.markerClusterGroup();
	 clustersB.addLayer(ATMs);
	 map.addLayer(clustersB);
	});










