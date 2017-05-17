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
    document.getElementById('cons-casa').innerHTML = record.get('kwhMes').toFixed(2) + ' kWh/mes';
}
var mayorConsumo = 0;
var numColector = 0;
function filtrarStores() {
    gridConsejos1.hide();
    gridConsejos2.hide();
    gridConsejos3.hide();
    gridConsejos4.hide();
    viewAhorro.child('#tabColector').tab.hide();
    var storeDis, idConsumoDis, idEmisionDis, idGridDis, idImgDis, idNameDis;
    var cont = 0, banderaPanel = false;
    mayorConsumo = 0;
    storeConsumoDispositivos.each(function (rec) {
        if (cont < 4) {
            mayorConsumo += rec.get('kwhMes');
        } else {
            return false;
        }
        cont++;
    });
    cont = 0;
    storeConsumoFinal.each(function (rec) {
//        if (rec.get('idMaquina') !== 24) {
        var consumoDis = rec.get('kwhMes').toFixed(2);
        switch (cont) {
            case 0:
                gridConsejos1.show();
                storeDis = storeConsejos1;
                idImgDis = 'img-consumidor1';
                idNameDis = 'nombre-consumidor1';
                idConsumoDis = 'consumoDis1';
                idEmisionDis = 'emisionDis1';
                idGridDis = 'gridConsejos1';
                if (rec.get('idMaquina') === 24) {
                    Ext.getCmp(idGridDis).getView().emptyText = '<br><center>Optimizaciòn disponible en la pestaña "Colector Solar"</center>';
                    viewAhorro.child('#tabColector').tab.show();
                }
                break;
            case 1:
                gridConsejos2.show();
                storeDis = storeConsejos2;
                idImgDis = 'img-consumidor2';
                idNameDis = 'nombre-consumidor2';
                idConsumoDis = 'consumoDis2';
                idEmisionDis = 'emisionDis2';
                idGridDis = 'gridConsejos2';
                if (rec.get('idMaquina') === 24) {
                    Ext.getCmp(idGridDis).getView().emptyText = '<br><center>Optimizaciòn disponible en la pestaña "Colector Solar"</center>';
                    viewAhorro.child('#tabColector').tab.show();
                }
                break;
            case 2:
                gridConsejos3.show();
                storeDis = storeConsejos3;
                idImgDis = 'img-consumidor3';
                idNameDis = 'nombre-consumidor3';
                idConsumoDis = 'consumoDis3';
                idEmisionDis = 'emisionDis3';
                idGridDis = 'gridConsejos3';
                if (rec.get('idMaquina') === 24) {
                    Ext.getCmp(idGridDis).getView().emptyText = '<br><center>Optimizaciòn disponible en la pestaña "Colector Solar"</center>';
                    viewAhorro.child('#tabColector').tab.show();
                }
                break;
            case 3:
                gridConsejos4.show();
                storeDis = storeConsejos4;
                idImgDis = 'img-consumidor4';
                idNameDis = 'nombre-consumidor4';
                idConsumoDis = 'consumoDis4';
                idEmisionDis = 'emisionDis4';
                idGridDis = 'gridConsejos4';
                if (rec.get('idMaquina') === 24) {
                    Ext.getCmp(idGridDis).getView().emptyText = '<br><center>Optimizaciòn disponible en la pestaña "Colector Solar"</center>';
                    viewAhorro.child('#tabColector').tab.show();
                }
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
        document.getElementById(idConsumoDis).innerHTML = consumoDis + " kWh";
        document.getElementById(idEmisionDis).innerHTML = emisionCO2(consumoDis) + " kg de CO<sub>2</sub>";
        aplicarConsejos(idGridDis);
        if (cont === 3) {
            return false;
        }
        cont++;
//        } else {
//            viewAhorro.child('#tabColector').tab.show();
//            banderaPanel = true;
//            numColector = cont;
//        }
//        if (cont === 3 && banderaPanel) {
//            return false;
//        }
    });
    mayorConsumo = mayorConsumo.toFixed(2);
//    document.getElementById('consumoTotalDis').innerHTML = mayorConsumo + " kWh";
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
function aplicarConsejos(idGrid, recordCheck) {
    var optimizacion = 0;
    var ahorro = 0;
    var storeConsejo;
    var idDivAhorro, idDivOptimizacion, idDivOptEmision;
    var numDis = 0;
//    var gridComprobar = 'gridConsejos' + (numColector + 1);
//    console.log(gridComprobar);
//    var banderaColector = false;
//    if (gridComprobar === idGrid) {
//        banderaColector = true;
//    }
    switch (idGrid) {
        case 'gridConsejos1':
            storeConsejo = storeConsejos1;
            idDivAhorro = 'ahorroDis1';
            idDivOptEmision = 'emisionOptDis1';
            idDivOptimizacion = 'consumoOptDis1';
            numDis = 0;
            break;
        case 'gridConsejos2':
            storeConsejo = storeConsejos2;
            idDivAhorro = 'ahorroDis2';
            idDivOptEmision = 'emisionOptDis2';
            idDivOptimizacion = 'consumoOptDis2';
            numDis = 1;
            break;
        case 'gridConsejos3':
            storeConsejo = storeConsejos3;
            idDivAhorro = 'ahorroDis3';
            idDivOptEmision = 'emisionOptDis3';
            idDivOptimizacion = 'consumoOptDis3';
            numDis = 2;
            break;
        case 'gridConsejos4':
            storeConsejo = storeConsejos4;
            idDivAhorro = 'ahorroDis4';
            idDivOptEmision = 'emisionOptDis4';
            idDivOptimizacion = 'consumoOptDis4';
            numDis = 3;
            break;
    }
//    if (banderaColector) {
//        numDis++;
//    }
    storeConsejo.each(function (rec) {
        //        if (rec.get('active') && rec.get('cambio')) {
        //            storeConsejo.each(function (rec) {
        //                if (!rec.get('cambio')) {
        //                    rec.set('active', false);
        //                }
        //            });
        //        }
        if (rec.get('active')) {
            ahorro += parseFloat(rec.get('ahorro'));
        }
    });
    if (ahorro > 70) {
        recordCheck.set('active', false);
        ahorro = ahorro - parseFloat(recordCheck.get('ahorro'));
    }
    var record = storeConsumoDispositivos.data.items[numDis];
    var recordFinal = storeConsumoFinal.data.items[numDis];
    optimizacion = 100 - ahorro;
    optimizacion = optimizacion / 100;
    optimizacion = optimizacion * record.get('kwhMes');
    var ahorroDis = record.get('kwhMes') - optimizacion;
    ahorroDis = record.get('kwhMes') - ahorroDis;
    optimizacion = optimizacion.toFixed(2);
    recordFinal.set('kwhMes', optimizacion);
    document.getElementById(idDivOptimizacion).innerHTML = ahorroDis.toFixed(2) + " kWh";
    document.getElementById(idDivOptEmision).innerHTML = emisionCO2(ahorroDis) + " kg de CO<sub>2</sub>";
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
    consejosAhorro = mayorConsumo - optimizacionTotal;
    ahorroTotal = getPorcentajeAhorro(consejosAhorro, mayorConsumo);
    //    optimizacionTotal = optimizacionTotal.toFixed(2);
    var emisionConsumoTotal = emisionCO2(mayorConsumo);
    var emisionConsumoOptimo = emisionCO2(mayorConsumo - consejosAhorro);
    cambiarTotales(mayorConsumo, emisionConsumoTotal, mayorConsumo - consejosAhorro, emisionConsumoOptimo, ahorroTotal);
    mayorConsumoAhorro = optimizacionTotal;
}

function getPorcentajeAhorro(optimizacion, total) {
    var ahorro = parseFloat(optimizacion) / parseFloat(total);
    ahorro = ahorro * 100;
    ahorro = ahorro.toFixed(2);
    return parseFloat(ahorro);
}

function cambiarTotales(consumoTotalDis, consumoTotalDisEmi, optimizacionTotalDis, optimizacionTotalDisEmi, ahorroTotalDis) {
    ahorroTotalDis = parseFloat(ahorroTotalDis).toFixed(2);
    consumoTotalDis = parseFloat(consumoTotalDis).toFixed(2);
    consumoTotalDisEmi = parseFloat(consumoTotalDisEmi).toFixed(2);
    optimizacionTotalDis = parseFloat(optimizacionTotalDis).toFixed(2);
    optimizacionTotalDisEmi = parseFloat(optimizacionTotalDisEmi).toFixed(2);
    document.getElementById('ahorroTotalDis').innerHTML = ahorroTotalDis + "%";
    document.getElementById('consumoTotalDis').innerHTML = consumoTotalDis + " kWh";
    document.getElementById('consumoTotalDisEmi').innerHTML = consumoTotalDisEmi + " kg de CO<sub>2</sub>";
    document.getElementById('optimizacionTotalDis').innerHTML = optimizacionTotalDis + " kWh";
    document.getElementById('optimizacionTotalDisEmi').innerHTML = optimizacionTotalDisEmi + " kg de CO<sub>2</sub>";
}

function consumoTotal() {
    var totalDispositivos = 0;
    var totalConsumo = 0;
    var totalEmisiones = 0;
    storeConsumoDispositivos.each(function (rec) {
        totalDispositivos += rec.get('cantidad');
        totalConsumo += rec.get('kwhMes');
    });
    totalEmisiones = totalConsumo * 0.7079;
    if (fase === 1) {
        document.getElementById('totalDispositivos').innerHTML = totalDispositivos + " Dispositivo(s)";
        document.getElementById('totalConsumo').innerHTML = totalConsumo.toFixed(2) + " kWh/mes";
        document.getElementById('totalEmisiones').innerHTML = totalEmisiones.toFixed(2) + " kg de CO<sub>2</sub>";
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
    colectorAhorro = 0;
    var record = storeConsumoFinal.getById('Agua Caliente');
    document.getElementById('consumoColectorSust').innerHTML = record.get('kwhMes') + ' kWh';
    var costoMayoresConsumidores = calcularCosto(mayorConsumo);
    var costoMayoresConsumidoresAhorro = calcularCosto(mayorConsumo - record.get('kwhMes'));
    var costoAhorro = costoMayoresConsumidores - costoMayoresConsumidoresAhorro;
    costoAhorro = getPorcentajeAhorro(costoAhorro, costoMayoresConsumidores);
    document.getElementById('precioColectorSust').innerHTML = costoAhorro.toFixed(2) + ' %';
    colectorAhorro = record.get('kwhMes');
}

function crearStoreMayoresConsumidores(store) {
    var cont = 0;
    storeMayoresConsumidores.removeAll();
    store.each(function (rec) {
        if (cont < 4) {
            if (rec.id !== 'Agua Caliente' && rec.get('kwhMes') !== 0) {
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
        cambiarTotales(mayorConsumoAhorro, emisionCO2(mayorConsumoAhorro), mayorConsumoAhorro - panelesAhorro, emisionCO2(mayorConsumoAhorro - panelesAhorro), ahorro);
    } else {
        var ahorro = getPorcentajeAhorro(panelesAhorro, mayorConsumo);
        cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo - panelesAhorro, emisionCO2(mayorConsumo - panelesAhorro), ahorro);
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

function comprobarTiempoUso(periodo, record) {
    if (periodo.get('max') < record.get('tiempoUso')) {
        record.set('tiempoUso', periodo.get('max'));
    }
}

function emisionCO2(emision) {
    emision = emision * 0.7079;
    emision = emision.toFixed(2);
    return parseFloat(emision);
}

function cambiarResultados() {
    var optimizacionConsumo = 0, optimizacionTotal = 0, consumoTotal = 0;
    var cont = 0;
    if (Ext.getCmp('checkConsejosRes').checked) {
        optimizacionTotal += getPorcentajeAhorro(consejosAhorro, sumaTotal);
        consumoTotal += consejosAhorro;
        if (optimizacionTotal > 70) {
            Ext.getCmp('checkConsejosRes').setValue(false);
            optimizacionTotal -= getPorcentajeAhorro(consejosAhorro, sumaTotal);
            consumoTotal -= consejosAhorro;
        }
        cont++;
    }
    if (Ext.getCmp('checkPanelesRes').checked) {
        optimizacionTotal += getPorcentajeAhorro(panelesAhorro, sumaTotal);
        consumoTotal += panelesAhorro;
        if (optimizacionTotal > 70) {
            Ext.getCmp('checkPanelesRes').setValue(false);
            optimizacionTotal -= getPorcentajeAhorro(panelesAhorro, sumaTotal);
            consumoTotal -= panelesAhorro;
        }
        cont++;
    }
    if (Ext.getCmp('checkColectorRes').checked) {
        optimizacionTotal += getPorcentajeAhorro(colectorAhorro, sumaTotal);
        consumoTotal += colectorAhorro;
        if (optimizacionTotal > 70) {
            Ext.getCmp('checkPanelesRes').setValue(false);
            optimizacionTotal -= getPorcentajeAhorro(colectorAhorro, sumaTotal);
            consumoTotal -= colectorAhorro;
        }
        cont++;
    }
    optimizacionConsumo = sumaTotal - consumoTotal;
    if (cont === 0) {
        mostrarResultados();
    } else {
        document.getElementById('resultadosAhorro').innerHTML = optimizacionTotal.toFixed(2) + "%";
        document.getElementById('resultadosOptConsumo').innerHTML = optimizacionConsumo.toFixed(2) + " kWh";
        document.getElementById('resultadosOptEmision').innerHTML = emisionCO2(optimizacionConsumo) + " kg de CO<sub>2</sub>";

    }
}

function mostrarResultados() {
    document.getElementById('resultadosAhorro').innerHTML = "0%";
    document.getElementById('resultadosConsumo').innerHTML = sumaTotal.toFixed(2) + " kWh";
    document.getElementById('resultadosEmision').innerHTML = emisionCO2(sumaTotal) + " kg de CO<sub>2</sub>";
    document.getElementById('resultadosOptConsumo').innerHTML = sumaTotal.toFixed(2) + " kWh";
    document.getElementById('resultadosOptEmision').innerHTML = emisionCO2(sumaTotal) + " kg de CO<sub>2</sub>";
    checkConsejos();
}


function checkConsejos() {
    var x = 0, cont1 = 0, cont2 = 0, cont3 = 0, cont4 = 0;
    var dispositivo1 = storeConsumoFinal.data.items[0];
    var dispositivo2 = storeConsumoFinal.data.items[1];
    var dispositivo3 = storeConsumoFinal.data.items[2];
    var dispositivo4 = storeConsumoFinal.data.items[3];
    var consejos = "";
    x = (dispositivo1.get("idMaquina") === 24 || dispositivo2.get("idMaquina") !== 24 || dispositivo3.get("idMaquina") !== 24 || dispositivo4.get("idMaquina") !== 24) ? 1 : 0;
    if (dispositivo1.get("idMaquina") !== 24) {
        consejos += "<strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + dispositivo1.get("nombreDis") + "</em></u></strong></ul>";
        storeConsejos1.each(function (rec) {
            if (dispositivo1.get("idMaquina") === rec.get("idMaquina") && rec.get("active")) {
                var final = (rec.get("consejo").length <= 50) ? "</li>" : "...</li>";
                consejos += "<li title= '" + rec.get("consejo") + "' style = 'font-size:12px;'>" + rec.get("consejo").substr(0, 50) + final;
                cont1++;
            }
        });
        if (cont1 === 0) {
            consejos += "<li>No tiene optimización de ahorro</li>";
            x++;
        }
        consejos += "</ul>";
    }
    if (dispositivo2.get("idMaquina") !== 24) {
        consejos += "<strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + dispositivo2.get("nombreDis") + "</em></u></strong></ul>";
        storeConsejos2.each(function (rec) {
            if (dispositivo2.get("idMaquina") === rec.get("idMaquina") && rec.get("active")) {
                var final = (rec.get("consejo").length <= 50) ? "</li>" : "...</li>";
                consejos += "<li title= '" + rec.get("consejo") + "' style = 'font-size:12px;'>" + rec.get("consejo").substr(0, 50) + final;
                cont2++;
            }
        });
        if (cont2 === 0) {
            consejos += "<li>No tiene optimización de ahorro</li>";
            x++;
        }
        consejos += "</ul>";
    }
    if (dispositivo3.get("idMaquina") !== 24) {
        consejos += "<strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + dispositivo3.get("nombreDis") + "</em></u></strong></ul>";
        storeConsejos3.each(function (rec) {
            if (dispositivo3.get("idMaquina") === rec.get("idMaquina") && rec.get("active")) {
                var final = (rec.get("consejo").length <= 50) ? "</li>" : "...</li>";
                consejos += "<li title= '" + rec.get("consejo") + "' style = 'font-size:12px;'>" + rec.get("consejo").substr(0, 50) + final;
                cont3++;
            }
        });
        if (cont3 === 0) {
            consejos += "<li>No tiene optimización de ahorro</li>";
            x++;
        }
        consejos += "</ul>";
    }
    if (dispositivo4.get("idMaquina") !== 24) {
        consejos += "<strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + dispositivo4.get("nombreDis") + "</em></u></strong></ul>";
        storeConsejos4.each(function (rec) {
            if (dispositivo4.get("idMaquina") === rec.get("idMaquina") && rec.get("active")) {
                var final = (rec.get("consejo").length <= 50) ? "</li>" : "...</li>";
                consejos += "<li title= '" + rec.get("consejo") + "' style = 'font-size:12px;'>" + rec.get("consejo").substr(0, 50) + final;
                cont4++;
            }
        });
        if (cont4 === 0) {
            consejos += "<li>No tiene optimización de ahorro</li>";
            x++;
        }
        consejos += "</ul>";
    }
    if (x === 4) {
        Ext.getCmp('ResumenOptimizacion').update("<i>No tiene optimización de ahorro</i>");
    } else {
        Ext.getCmp('ResumenOptimizacion').update(consejos);
    }

    var recordPanel = storeMayoresConsumidores.findRecord('excluir', true);
    if (!recordPanel) {
        Ext.getCmp('ResumenPaneles').update("<i>No tiene optimización de ahorro</i>");
    } else {
        var consejos = "<strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + recordPanel.get("nombreDis") + "</em></u></strong>";
        Ext.getCmp('ResumenPaneles').update(consejos);
    }


    var consejos = "<ul>";
    storeConsumoDispositivos.each(function (rec) {
        if (rec.get('idCategoria') === 3) {
            consejos += "<li><strong style = 'font-size:12px; text-transform: capitalize;'><em><u>" + rec.get("nombreDis") + "</em></u></strong></li>";
        }
    });
    consejos += "</ul>";
    Ext.getCmp('ResumenColector').update(consejos);

    if (consejosAhorro === 0) {
        Ext.getCmp('ResumenOptimizacion').setTitle('<small style="color:#7B241C">Usted no escogió medidas de ahorro.</small>');
        Ext.getCmp('ResumenOptimizacion').update('');
        Ext.getCmp('checkConsejosRes').disable();
    } else {
        Ext.getCmp('checkConsejosRes').enable();
        Ext.getCmp('ResumenOptimizacion').setTitle('<small style="color:black">Detalle optimización de consumo</small>');
    }
    if (panelesAhorro === 0) {
        Ext.getCmp('ResumenPaneles').setTitle('<small style="color:#7B241C">Usted no escogió medidas de ahorro.</small>');
        Ext.getCmp('ResumenPaneles').update('');
        Ext.getCmp('checkPanelesRes').disable();
    } else {
        Ext.getCmp('checkPanelesRes').enable();
        Ext.getCmp('ResumenPaneles').setTitle('<small style="color:black">Detalle paneles solares</small>');
    }
    if (colectorAhorro === 0) {
        Ext.getCmp('ResumenColector').setTitle('<small style="color:#7B241C">Usted no escogió medidas de ahorro.</small>');
        Ext.getCmp('ResumenColector').update('');
        Ext.getCmp('checkColectorRes').disable();
    } else {
        Ext.getCmp('checkColectorRes').enable();
        Ext.getCmp('ResumenColector').setTitle('<small style="color:black">Detalle colector solar</small>');
    }
}