// Declarar variable mapa base para mini mapa
var EsriTerrain_MiniLayer = L.tileLayer('http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    opacity: 1.0,
    minZoom: 0,
    maxZoom: 13,
});

//Declarar variable mini mapa
var miniMap = new L.Control.MiniMap(EsriTerrain_MiniLayer, { toggleDisplay: true, minimized: false, position: 'bottomleft' }).addTo(map);
