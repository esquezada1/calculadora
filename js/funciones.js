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

function agruparDispositivos() {
    var consumoIluminacion = 0;
    var consumoAguaCaliente = 0;
    storeConsumoDispositivos.each(function (rec) {
        switch (rec.get('idCategoria')) {
            case 2:
                consumoIluminacion += rec.get('kwhMes');
                break;
            case 3:
                consumoAguaCaliente += rec.get('kwhMes');
                break;
        }
    });
    if (consumoIluminacion !== 0) {
        var rIluminacion = Ext.create('ConsumoModel', {
            idMaquina: 23,
            nombreDis: 'Iluminación',
            idCategoria: 4,
            categoria: 'Otros',
            cantidad: 0,
            potencia: 0,
            tiempoUso: 0,
            idPeriodo: 1,
            kwhMes: consumoIluminacion
        });
        storeConsumoDispositivos.insert(0, rIluminacion);
    }
    if (consumoAguaCaliente !== 0) {
        var rAguaCaliente = Ext.create('ConsumoModel', {
            idMaquina: 24,
            nombreDis: 'Agua Caliente',
            idCategoria: 4,
            categoria: 'Otros',
            cantidad: 0,
            potencia: 0,
            tiempoUso: 0,
            idPeriodo: 1,
            kwhMes: consumoAguaCaliente
        });
        storeConsumoDispositivos.add(rAguaCaliente);
    }
    storeConsumoDispositivos.filter(function (r) {
        var value = r.get('idCategoria');
        return (value === 1 || value === 4);
    });
}

function calcularParticipacion() {
    storeConsumoDispositivos.each(function (rec) {
        var participacion = rec.get('kwhMes') / sumaTotal;
        participacion = participacion * 100;
        rec.set('participacion', participacion);
    });
    storeConsumoFinal.removeAll();
    storeConsumoDispositivos.each(function (rec) {
        var r = Ext.create('ConsumoModelFinal', {
            idMaquina: rec.get('idMaquina'),
            nombreDis: rec.get('nombreDis'),
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
    document.getElementById('tit-casa').innerHTML = record.get('nombreDis');
    document.getElementById('cons-casa').innerHTML = record.get('kwhMes').toFixed(2) + ' KWh/MES';
}
var mayorConsumo = 0;
function filtrarStores() {
    gridConsejos1.hide();
    gridConsejos2.hide();
    gridConsejos3.hide();
    gridConsejos4.hide();
    var storeDis, idConsumoDis, idGridDis, idImgDis, idNameDis;
    var cont = 0;
    mayorConsumo = 0;
    storeConsumoDispositivos.each(function (rec) {
        var consumoDis = rec.get('kwhMes').toFixed(2);
        switch (cont) {
            case 0:
                gridConsejos1.show();
                storeDis = storeConsejos1;
                idImgDis = 'img-consumidor1';
                idNameDis = 'nombre-consumidor1';
                idConsumoDis = 'consumoDis1';
                idGridDis = 'gridConsejos1';
                mayorConsumo += rec.get('kwhMes');
                break;
            case 1:
                gridConsejos2.show();
                storeDis = storeConsejos2;
                idImgDis = 'img-consumidor2';
                idNameDis = 'nombre-consumidor2';
                idConsumoDis = 'consumoDis2';
                idGridDis = 'gridConsejos2';
                mayorConsumo += rec.get('kwhMes');
                break;
            case 2:
                gridConsejos3.show();
                storeDis = storeConsejos3;
                idImgDis = 'img-consumidor3';
                idNameDis = 'nombre-consumidor3';
                idConsumoDis = 'consumoDis3';
                idGridDis = 'gridConsejos3';
                mayorConsumo += rec.get('kwhMes');
                break;
            case 3:
                gridConsejos4.show();
                storeDis = storeConsejos4;
                idImgDis = 'img-consumidor4';
                idNameDis = 'nombre-consumidor4';
                idConsumoDis = 'consumoDis4';
                idGridDis = 'gridConsejos4';
                mayorConsumo += rec.get('kwhMes');
                break;
        }
        var urlImagenDis = storeDispositivos.getById(rec.get('idMaquina')).get('url');
        var consumoOptimoDis = storeDispositivos.getById(rec.get('idMaquina')).get('optimo');
        storeDis.filter({
            property: 'idMaquina',
            exactMatch: true,
            value: rec.get('idMaquina')
        });
        if (rec.get('potencia') < consumoOptimoDis) {
            storeDis.filter({
                property: 'cambio',
                exactMatch: true,
                value: false
            });
        }
        document.getElementById(idImgDis).src = urlImagenDis;
        document.getElementById(idNameDis).innerHTML = rec.get('nombreDis');
        document.getElementById(idConsumoDis).innerHTML = consumoDis + " KWH";
        aplicarConsejos(idGridDis);
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
    storeConsejos1.clearFilter(true);
    storeConsejos2.clearFilter(true);
    storeConsejos3.clearFilter(true);
    storeConsejos4.clearFilter(true);
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

var mayorConsumoAhorro = 0;
function aplicarConsejos(idGrid) {
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
//        if (rec.get('active') && rec.get('cambio')) {
//            storeConsejo.each(function (rec) {
//                if (!rec.get('cambio')) {
//                    rec.set('active', false);
//                }
//            });
//        }
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
    var limit = 0;
    if (storeConsumoFinal.data.items.length < 4) {
        limit = storeConsumoFinal.data.items.length;
    } else {
        limit = 4;
    }
    for (var i = 0; i < limit; i++) {
        optimizacionTotal += storeConsumoFinal.data.items[i].get('kwhMes');
    }
    ahorroTotal = getPorcentajeAhorro(optimizacionTotal, mayorConsumo);
    optimizacionTotal = optimizacionTotal.toFixed(2);
    cambiarTotales(mayorConsumo, optimizacionTotal, ahorroTotal);
    mayorConsumoAhorro = optimizacionTotal;
    consejosAhorro = mayorConsumo - optimizacionTotal;
}

function getPorcentajeAhorro(optimizacion, total) {
    var ahorro = parseFloat(optimizacion)/ parseFloat(total);
    console.log(parseFloat(optimizacion) + '/' + parseFloat(total) + ' = ' + ahorro);
//    console.log(ahorro + ' - ' + 1 + ' = ');
//    ahorro = ahorro - 1;
//    console.log(ahorro);
    console.log(ahorro + ' * ' + 100 + ' = ');
    ahorro = ahorro * 100;
    console.log(ahorro);
    console.log(ahorro + ' - ' + 100 + ' = ');
//    ahorro = 100 - ahorro;
    console.log(ahorro);
    ahorro = ahorro.toFixed(2);
    console.log('2 Decimales: ' + ahorro);

    return parseFloat(ahorro);
}

function cambiarTotales(consumoTotalDis, optimizacionTotalDis, ahorroTotalDis) {
    document.getElementById('consumoTotalDis').innerHTML = consumoTotalDis + " KWH";
    document.getElementById('optimizacionTotalDis').innerHTML = optimizacionTotalDis + " KWH";
    document.getElementById('ahorroTotalDis').innerHTML = ahorroTotalDis + "%";
}

function consumoTotal() {
    var totalDispositivos = 0;
    var totalConsumo = 0;
    storeConsumoDispositivos.each(function (rec) {
        totalDispositivos += rec.get('cantidad');
        totalConsumo += rec.get('kwhMes');
    });
    if (fase === 1) {
        document.getElementById('totalDispositivos').innerHTML = totalDispositivos + " Dispositivo(s)";
        document.getElementById('totalConsumo').innerHTML = totalConsumo.toFixed(2) + " KWH/MES";
    }
}

function calcularCosto(kwh) {
    var banderaConsumo = parseFloat(kwh);
    var costo = 0;
    storeCostos.each(function (rec) {
        var newCosto = 0;
        var newConsumo = rec.get('kwhMax') - rec.get('kwhMin') + 1;
        banderaConsumo -= newConsumo;
        if (banderaConsumo > 0) {
            newCosto = (newConsumo * rec.get('costo'));
            costo += newCosto;
        } else {
            newCosto = (kwh * rec.get('costo'));
            costo += newCosto;
            return false;
        }
        kwh -= newConsumo;
    });
    costo = costo.toFixed(2);
    return parseFloat(costo);
}

function consumoColectorSust() {
    var record = storeConsumoFinal.getById('Agua Caliente');
    document.getElementById('consumoColectorSust').innerHTML = record.get('kwhMes') + ' kWh';
    var costoMayoresConsumidores = calcularCosto(mayorConsumo);
    var costoMayoresConsumidoresAhorro = calcularCosto(mayorConsumo - record.get('kwhMes'));
    var costoAhorro = costoMayoresConsumidores - costoMayoresConsumidoresAhorro;
    document.getElementById('precioColectorSust').innerHTML = '$ ' + Math.round(costoAhorro * 100) / 100;
    colectorAhorro = record.get('kwhMes');
}

function crearStoreMayoresConsumidores(store) {
    var cont = 0;
    storeMayoresConsumidores.removeAll();
    store.each(function (rec) {
        if (cont < 4) {
            if (rec.id !== 'Agua Caliente') {
                var r = Ext.create('ConsumoModelFinal', {
                    idMaquina: rec.get('idMaquina'),
                    nombreDis: rec.get('nombreDis'),
                    cantidad: rec.get('cantidad'),
                    potencia: rec.get('potencia'),
                    tiempoUso: rec.get('tiempoUso'),
                    idPeriodo: rec.get('idPeriodo'),
                    kwhMes: rec.get('kwhMes'),
                    participacion: rec.get('participacion')
                });
            }
            storeMayoresConsumidores.add(r);
        } else {
            return false;
        }
        cont++;
    });
    storeMayoresConsumidores.setSorters({
        property: 'participacion',
        direction: 'DESC'
    });
    Ext.getCmp('gridPaneles').getView().refresh();
}

function cambiarTotalesPaneles() {
    if (formularioPaneles.down('[name=checkStore]').getValue()) {
        var ahorro = getPorcentajeAhorro(panelesAhorro, mayorConsumoAhorro);
        cambiarTotales(mayorConsumoAhorro, panelesAhorro, ahorro);
    } else {
        var ahorro = getPorcentajeAhorro(panelesAhorro, mayorConsumo);
        cambiarTotales(mayorConsumo, panelesAhorro, ahorro);
    }
}

function esPar(val) {
    if (val % 2 === 0)
    {
        return true;
    } else {
        return false;
    }
}
