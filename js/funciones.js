function formatoDispositivos(id) {
    var item = storeDispositivos.getById(id);
    return item.data.name;
}

function formatoPeriodos(id, metaData) {
    metaData.style = "background-color:#DAA948 !important;";
    var item = storePeriodos.getById(id);
    return item.data.name;
}

function formatoCategorias(id) {
    var item = storeCategorias.getById(id);
    return item.data.name;
}

function formatoImgDispositivos(id) {
    var img = storeDispositivos.getById(id).data.url;
    return '<img src="' + img + '" width="30" height="30" style="margin: 0px; padding: 0px;">';
}

function limpiarPanelCentral() {
    for (var i = 0; i < panelCentral.items.length; i++) {
        panelCentral.remove(i, false);
    }
}

function calcularParticipacion() {
    var limit = storeConsumoDispositivos.data.items.length;
    for (var i = 0; i < limit; i++) {
        var record = storeConsumoDispositivos.data.items[i];
        var participacion = (record.data.kwhMes / sumaTotal) * 100;
        record.set('participacion', participacion);
    }
}

function mostrarNotificacion(text) {
    Ext.example.msg("Aviso!", text);
}

function cargarDispositivoCasa(record) {
    var srcImg = storeDispositivos.getById(record.get('idMaquina')).data.url;
    document.getElementById('dis-casa').src = srcImg;
    document.getElementById('tit-casa').innerHTML = formatoDispositivos(record.get('idMaquina'));
    document.getElementById('cons-casa').innerHTML = record.data.kwhMes + ' KWh/MES';
}
