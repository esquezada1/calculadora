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
    gridConsumoDispositivos.hide();
    casaSemaforo.hide();
    chartSemaforo.hide();
}

function calcularParticipacion() {
    var limit = storeConsumoDispositivos.data.items.length;
    for (var i = 0; i < limit; i++) {
        var record = storeConsumoDispositivos.data.items[i];
        var participacion = (record.data.kwhMes / sumaTotal) * 100;
        record.set('participacion', participacion);
    }
}


