function formatoDispositivos(id) {
    var item = storeDispositivos.getById(id);
    return item.data.name;
}

function formatoPeriodos(id, metaData) {
    metaData.style = "background-color:#FFF59D !important;";
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
    storeConsumoFinal.removeAll();
    storeConsumoDispositivos.each(function (rec) {
        var participacion = (parseFloat(rec.get('kwhMes'))) / parseFloat(sumaTotal);
        participacion = participacion * 100;
        var r = Ext.create('ConsumoModelFinal', {
            idMaquina: rec.get('idMaquina'),
            cantidad: rec.get('cantidad'),
            potencia: rec.get('potencia'),
            tiempoUso: rec.get('tiempoUso'),
            idPeriodo: rec.get('idPeriodo'),
            kwhMes: rec.get('kwhMes'),
            participacion: participacion
        });
        storeConsumoFinal.add(r);
    });
    storeConsumoFinal.setSorters({
        property: 'participacion',
        direction: 'DESC'
    });
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

function filtrarStores() {
    var cont = 0;
    storeConsumoFinal.each(function (rec) {
        switch (cont) {
            case 0:
                storeConsejos1.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: storeConsumoFinal.data.items[cont].data.idMaquina
                });
                document.getElementById('img-consumidor1').src = storeDispositivos.getById(storeConsumoFinal.data.items[cont].data.idMaquina).get('url');

                break;
            case 1:
                storeConsejos2.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: storeConsumoFinal.data.items[cont].data.idMaquina
                });
                document.getElementById('img-consumidor2').src = storeDispositivos.getById(storeConsumoFinal.data.items[cont].data.idMaquina).get('url');

                break;
            case 2:
                storeConsejos3.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: storeConsumoFinal.data.items[cont].data.idMaquina
                });
                document.getElementById('img-consumidor3').src = storeDispositivos.getById(storeConsumoFinal.data.items[cont].data.idMaquina).get('url');

                break;
            case 3:
                storeConsejos4.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: storeConsumoFinal.data.items[cont].data.idMaquina
                });
                document.getElementById('img-consumidor4').src = storeDispositivos.getById(storeConsumoFinal.data.items[cont].data.idMaquina).get('url');

                break;
        }
        cont++;
    });
}

function limpiarFiltros() {
    document.getElementById('img-consumidor1').src = "";
    document.getElementById('img-consumidor2').src = "";
    document.getElementById('img-consumidor3').src = "";
    document.getElementById('img-consumidor4').src = "";
    storeConsejos1.filter({
        property: 'idMaquina',
        exactMatch: true,
        value: 0
    });
    storeConsejos2.filter({
        property: 'idMaquina',
        exactMatch: true,
        value: 0
    });
    storeConsejos3.filter({
        property: 'idMaquina',
        exactMatch: true,
        value: 0
    });
    storeConsejos4.filter({
        property: 'idMaquina',
        exactMatch: true,
        value: 0
    });
}
