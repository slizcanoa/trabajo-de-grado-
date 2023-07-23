//Declarar varaible y función para resaltar capa
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString') {
      highlightLayer.setStyle({
        color: '#00e5ff',
      });
    } else {
      highlightLayer.setStyle({
        weight: 2, // grosor de línea
        color: '#0C18D7', // color de línea
        opacity: 1.0, // tansparencia de línea
        fillColor: '#0C18D7',
        fillOpacity: 0.1
      });
    }
    highlightLayer.openPopup();
}

//Declarar función para popup de la capa
function pop_areaproyecto(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2" align="center"><strong>Capa: Área del Proyecto</strong><br />'  + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Expediente:</strong><br />' + (feature.properties['expediente'] !== null ? autolinker.link(feature.properties['expediente'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Operador:</strong><br />' + (feature.properties['operador'] !== null ? autolinker.link(feature.properties['operador'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Proyecto:</strong><br />' + (feature.properties['proyecto'] !== null ? autolinker.link(feature.properties['proyecto'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Descripción:</strong><br />' + (feature.properties['descrip'] !== null ? autolinker.link(feature.properties['descrip'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Nomenclatura:</strong><br />' + (feature.properties['nomenclat'] !== null ? autolinker.link(feature.properties['nomenclat'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Área (Ha):</strong><br />' + (feature.properties['area_ha'] !== null ? autolinker.link(feature.properties['area_ha'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

//Declarar función de estilo de la capa

function style_areaproyecto() {
    return {
        opacity: 1,
        color: 'rgba(4,4,4,0.5)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(247,247,156,0.4)',
        interactive: true,
    }
}

//Declarar la varaible de la capa
var lyr_areaproyecto = new L.geoJson(areaproyecto, {
    attribution: '',
    interactive: true,
    dataVar: 'areaproyecto',
    layerName: 'lyr_areaproyecto',
    style: style_areaproyecto,
    onEachFeature: pop_areaproyecto,
});
//map.addLayer(lyr_areaproyecto);

function pop_areainfluencia(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
            <td colspan="2" align="center"><strong>Capa: Área de Influencia</strong><br />'  + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Expediente:</strong><br />' + (feature.properties['expediente'] !== null ? autolinker.link(feature.properties['expediente'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Operador:</strong><br />' + (feature.properties['operador'] !== null ? autolinker.link(feature.properties['operador'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Proyecto:</strong><br />' + (feature.properties['proyecto'] !== null ? autolinker.link(feature.properties['proyecto'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Observación:</strong><br />' + (feature.properties['observ'] !== null ? autolinker.link(feature.properties['observ'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Área (Ha):</strong><br />' + (feature.properties['area_ha'] !== null ? autolinker.link(feature.properties['area_ha'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>ID:</strong><br />' + (feature.properties['id_areainf'] !== null ? autolinker.link(feature.properties['id_areainf'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_areainfluencia() {
    return {
        opacity: 1,
        color: 'rgba(250,30,202,1.0)',
        dashArray: '10,5',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 4.5, 
        fillOpacity: 0,
        interactive: true,
    }
}

var lyr_areainfluencia = new L.geoJson(areainfluencia, {
    attribution: '',
    interactive: true,
    dataVar: 'areainfluencia',
    layerName: 'lyr_areainfluencia',
    style: style_areainfluencia,
    onEachFeature: pop_areainfluencia,
    
});
//map.addLayer(lyr_areainfluencia);

function pop_infraproyectopg(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (i in e.target._eventParents) {
                e.target._eventParents[i].resetStyle(e.target);
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
            <td colspan="2" align="center"><strong>Capa: Infraestructura (polígono)</strong><br />'  + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Expediente:</strong><br />' + (feature.properties['expediente'] !== null ? autolinker.link(feature.properties['expediente'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Operador:</strong><br />' + (feature.properties['operador'] !== null ? autolinker.link(feature.properties['operador'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Proyecto:</strong><br />' + (feature.properties['proyecto'] !== null ? autolinker.link(feature.properties['proyecto'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Tipo:</strong><br />' + (feature.properties['tipo_infra'] !== null ? autolinker.link(feature.properties['tipo_infra'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>ID:</strong><br />' + (feature.properties['id_infra_pg'] !== null ? autolinker.link(feature.properties['id_infra_pg'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Características:</strong><br />' + (feature.properties['caracter'] !== null ? autolinker.link(feature.properties['caracter'].toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2"><strong>Área (Ha):</strong><br />' + (feature.properties['area_ha'] !== null ? autolinker.link(feature.properties['area_ha'].toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    layer.bindPopup(popupContent, {maxHeight: 400});
}

function style_infraproyectopg() {
    return {
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 0.5,
        fillColor: 'rgba(204,33,76,1.0)',
        interactive: true,
    }
}

var lyr_infraproyectopg = new L.geoJson(infraproyectopg, {
    attribution: '',
    interactive: true,
    dataVar: 'infraproyectopg',
    layerName: 'lye_infraproyectopg',
    onEachFeature: pop_infraproyectopg,
    style: style_infraproyectopg,
});