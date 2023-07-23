//JS con la definición del mapa

//Declarar variable mapa, centrando vista en SYNGENTA
var map = L.map('map', {
    zoomControl:true, 
    zoomAnimation: false,
    markerZoomAnimation: false,
    maxZoom:28, 
    minZoom:1}).setView( [10.347717213310704, -75.49283144956479], 16);

//Control de coordenadas del mouse
L.control.coordinates({
    position: 'bottomleft',
    labelTemplateLat: "{y}",
    labelTemplateLng: "{x}, ",
    enableUserInput: false,
    useLatLngOrder: false,
}).addTo(map);

//Declarar variable mapa base Google Satelite
var GoogleSatellites_Layer = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    opacity: 1.0,
    attribution: '<a href="https://www.arcgis.com/home/group.html?id=702026e41f6641fb85da88efe79dc166">Esri</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 21
});

//Declarar variable mapa base Open Street Map
var OSM_Layer = L.tileLayer('https://d.tile.openstreetmap.de/{z}/{x}/{y}.png', {
    opacity: 1.0,
    attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 21
});

//Declarar variable WMS mapa base Imagen Satelital
var ImaSat = L.tileLayer.wms('http://localhost:8080/geoserver/Syngenta/wms?', {
            layers: 'Syngenta:ImaSatDet02262018',
            attribution: '<a href="https://www.syngenta.com.co/">Syngenta S.A.</a>',
            format: 'image/png',
            transparent: true,
            version: '1.1.0'
}).addTo(map); 

//Declarar grupo de mapas base
var BaseMap = {
    "Imagen Satelital": ImaSat,
    "Google Satellite": GoogleSatellites_Layer,
    "OpenStreetMap": OSM_Layer
};

//Añadir WMS de capas temáticas desde Geoserver
var zonificacionambiental = L.tileLayer.wms('http://localhost:8080/geoserver/Syngenta/wms?', {
            layers: 'Syngenta:zonificacionambiental',
            format: 'image/png',
            transparent: true,
            opacity: 0.5,
            version: '1.1.0'
}).addTo(map);

var coberturatierra = L.tileLayer.wms('http://localhost:8080/geoserver/Syngenta/wms?', {
            layers: 'Syngenta:coberturatierra',
            format: 'image/png',
            transparent: true,
            opacity: 0.5,
            version: '1.1.0'
});

//Declarar grupo de capas de superposición
var OverlayMap = {
    "Zonificación Ambiental": zonificacionambiental,
    "Cobertura Tierra": coberturatierra,
    "Área Proyecto": lyr_areaproyecto,
    "Área Influencia": lyr_areainfluencia,
    "Infraestructura polígono": lyr_infraproyectopg
};

//Declarar botón vista principal
var ZoomHomeButton = document.getElementById('zoom-home-button');
ZoomHomeButton.addEventListener('click', function () {
    map.setView([10.347717213310704, -75.49283144956479], 16)
});        

//Declarar control de escala	
var scaleControl = L.control.scale({position: 'bottomright', maxWidth: 100, metric: true, imperial: false}).addTo(map);    

//Declarar variable mapa base para mini mapa
var EsriTerrain_MiniLayer = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    opacity: 1.0,
    minZoom: 0,
    maxZoom: 13,
});

//Declarar varaible control de capas con leyenda de los GeoJson
var selectorCapas = new L.control.layers(BaseMap, {
    '<img src="img/infraproyectopg.png" /> Infraestructura (polígono)': lyr_infraproyectopg,
    '<img src="img/areaproyecto.png" /> Área del proyecto': lyr_areaproyecto,
    '<img src="img/areainfluencia.png" /> Área de influencia': lyr_areainfluencia,
    "Zonificación Ambiental": zonificacionambiental,
    "Cobertura Tierra": coberturatierra,
});
selectorCapas.addTo(map);

//Declarar variable leyenda para el WMS
var legend2 = L.control({position: 'bottomright'});
    legend2.onAdd = function(map){
        var div = L.DomUtil.create('div', 'mylegend');
        div.innerHTML= "<img src='http://localhost:8080/geoserver/Syngenta/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Syngenta:coberturatierra'/>";
        return div;
    }
    legend2.addTo(map);

var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(map){
        var div = L.DomUtil.create('div', 'mylegend');
        div.innerHTML= "<img src='http://localhost:8080/geoserver/Syngenta/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=Syngenta:zonificacionambiental'/>";
        return div;
    }
    legend.addTo(map);



              