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
    var limit = storeConsumoDispositivos.data.items.length;
    for (var i = 0; i < limit; i++) {
        var record = storeConsumoDispositivos.data.items[i];
        var participacion = (parseFloat(record.data.kwhMes) / parseFloat(sumaTotal));
        participacion = participacion * 100;
        record.set('participacion', participacion);
    }
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
            participacion: rec.get('participacion')
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
var mayorConsumo = 0;
function filtrarStores() {
    var cont = 0;
    mayorConsumo = 0;
    storeConsumoDispositivos.each(function (rec) {
        switch (cont) {
            case 0:
                storeConsejos1.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: rec.get('idMaquina')
                });
                document.getElementById('img-consumidor1').src = storeDispositivos.getById(rec.get('idMaquina')).get('url');
                document.getElementById('consumoDis1').innerHTML = rec.get('kwhMes') + " KWH";
                mayorConsumo += rec.get('kwhMes');
                break;
            case 1:
                storeConsejos2.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: rec.get('idMaquina')
                });
                document.getElementById('img-consumidor2').src = storeDispositivos.getById(rec.get('idMaquina')).get('url');
                document.getElementById('consumoDis2').innerHTML = rec.get('kwhMes') + " KWH";
                mayorConsumo += rec.get('kwhMes');
                break;
            case 2:
                storeConsejos3.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: rec.get('idMaquina')
                });
                document.getElementById('img-consumidor3').src = storeDispositivos.getById(rec.get('idMaquina')).get('url');
                document.getElementById('consumoDis3').innerHTML = rec.get('kwhMes') + " KWH";
                mayorConsumo += rec.get('kwhMes');
                break;
            case 3:
                storeConsejos4.filter({
                    property: 'idMaquina',
                    exactMatch: true,
                    value: rec.get('idMaquina')
                });
                document.getElementById('img-consumidor4').src = storeDispositivos.getById(rec.get('idMaquina')).get('url');
                document.getElementById('consumoDis4').innerHTML = rec.get('kwhMes') + " KWH";
                mayorConsumo += rec.get('kwhMes');
                break;
        }
        cont++;
    });
    mayorConsumo = mayorConsumo.toFixed(2);
    document.getElementById('consumoTotalDis').innerHTML = mayorConsumo + " KWH";
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

function aplicarConsejos(idGrid, index, check) {
    var optimizacion = 0;
    var ahorro = 0;
    var storeConsejo;
    var idDivAhorro, idDivOptimizacion;
    var numDis;
    switch (idGrid) {
        case 'gridConsejos1':
            storeConsejo = storeConsejos1;
            idDivAhorro = 'ahorroDis1';
            idDivOptimizacion = 'optimizacionDis1';
            numDis = 0;
            break;
        case 'gridConsejos2':
            storeConsejo = storeConsejos2;
            idDivAhorro = 'ahorroDis2';
            idDivOptimizacion = 'optimizacionDis2';
            numDis = 1;
            break;
        case 'gridConsejos3':
            storeConsejo = storeConsejos3;
            idDivAhorro = 'ahorroDis3';
            idDivOptimizacion = 'optimizacionDis3';
            numDis = 2;
            break;
        case 'gridConsejos4':
            storeConsejo = storeConsejos4;
            idDivAhorro = 'ahorroDis4';
            idDivOptimizacion = 'optimizacionDis4';
            numDis = 3;
            break;
    }
    storeConsejo.each(function (rec) {
        if (rec.get('active') && rec.get('cambio')) {
            storeConsejo.each(function (rec) {
                if (!rec.get('cambio')) {
                    rec.set('active', false);
                }
            });
        }
        if (rec.get('active')) {
            ahorro += parseInt(rec.get('ahorro'));
        }
    });
    var record = storeConsumoDispositivos.data.items[numDis];
    var recordFinal = storeConsumoFinal.data.items[numDis];
    optimizacion = 100 - ahorro;
    optimizacion = optimizacion / 100;
    optimizacion = optimizacion * record.get('kwhMes');
    recordFinal.set('kwhMes', optimizacion);
    optimizacion = optimizacion.toFixed(2);
    document.getElementById(idDivOptimizacion).innerHTML = optimizacion + " KWH";
    document.getElementById(idDivAhorro).innerHTML = ahorro + "%";
    var optimizacionTotal = 0;
    var ahorroTotal = 0;
    for (var i = 0; i < 4; i++) {
        optimizacionTotal += storeConsumoFinal.data.items[i].get('kwhMes');
    }
    ahorroTotal = (1 - optimizacionTotal / mayorConsumo) * 100;
    ahorroTotal = ahorroTotal.toFixed(2);
    optimizacionTotal = optimizacionTotal.toFixed(2);
    document.getElementById('optimizacionTotalDis').innerHTML = optimizacionTotal + " KWH";
    document.getElementById('ahorroTotalDis').innerHTML = ahorroTotal + "%";
}
