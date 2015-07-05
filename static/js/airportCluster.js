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

//var clusters = L.markerClusterGroup();
//clusters.addLayer(exhibits);
//map.addLayer(clusters);











