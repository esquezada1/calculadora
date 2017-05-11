Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');
var sumaTotal = 0;
var btnSiguiente, btnAtras, fase = 1;
var panelDerecha, panelCentral;
var viewConsumo, viewSemaforo, viewAhorro, viewResultados;
var ventanaAyudaDis;
Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.ux.DataView.Animated',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.toolbar.*',
    'Ext.slider.Multi'
]);
Ext.onReady(function () {
    btnAtras = Ext.create('Ext.Button', {
        text: '<',
        cls: 'btnNextFase',
        scale: 'large',
        hidden: true,
        handler: function () {
            switch (fase) {
                case 2:
                    document.getElementById("btnFase1").click();
                    break;
                case 3:
                    document.getElementById("btnFase2").click();
                    break;
                case 4:
                    document.getElementById("btnFase3").click();
                    break;
            }
        }
    });
    btnSiguiente = Ext.create('Ext.Button', {
        text: '>',
        cls: 'btnNextFase',
        scale: 'large',
        handler: function () {
            switch (fase) {
                case 1:
                    document.getElementById("btnFase2").click();
                    break;
                case 2:
                    document.getElementById("btnFase3").click();
                    break;
                case 3:
                    document.getElementById("btnFase4").click();
                    break;
            }
        }
    });
    Ext.tip.QuickTipManager.init();
    var dataview = Ext.create('Ext.view.View', {
        deferInitialRefresh: false,
        store: storeDispositivos,
        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="phone">',
                (!Ext.isIE6 ? '<img width="64" height="64" src="{url}" />' :
                        '<div style="width:70px;height:70px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{url}\',sizingMethod=\'scale\')"></div>'),
                '<strong>{name}</strong>',
                '</div>',
                '</tpl>'
                ),
        plugins: [
            Ext.create('Ext.ux.DataView.Animated', {
                duration: 550,
                idProperty: 'id'
            })
        ],
        id: 'maquinas',
        itemSelector: 'div.phone',
        overItemCls: 'phone-hover',
        multiSelect: false,
        autoScroll: true,
        listeners: {
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function (dv) {
                    var record = dv.record;
                    var cantPeriodo = storePeriodos.getById(record.get('idPeriodo')).get('cant');
                    var tiempoUso = record.get('tiempoUso');
                    var cantidad = 1;
                    var totalConsumo = cantidad * record.get('potencia') * tiempoUso * cantPeriodo;
                    totalConsumo = totalConsumo / 1000;
                    var contDis = 1;
                    storeConsumoDispositivos.each(function (rec) {
                        if (rec.get('idMaquina') === record.id) {
                            contDis++;
                        }
                    });
                    if (contDis === 1) {
                        var nombreDis = record.get('name');
                    } else {
                        var nombreDis = record.get('name') + " " + contDis;
                    }
                    var r = Ext.create('ConsumoModel', {
                        idMaquina: record.id,
                        nombreDis: nombreDis,
                        idCategoria: record.get('idCategoria'),
                        categoria: record.get('categoria'),
                        cantidad: cantidad,
                        potencia: record.get('potencia'),
                        tiempoUso: tiempoUso,
                        idPeriodo: record.get('idPeriodo'),
                        kwhMes: totalConsumo
                    });
                    storeConsumoDispositivos.clearGrouping();
                    storeConsumoDispositivos.add(r);
                    storeConsumoDispositivos.group('categoria');
                    gridConsumoDispositivos.getView().refresh();
                    sumaTotal = 0;
                }
            },
            contextmenu: {
                element: 'el', //bind to the underlying body property on the panel
                fn: function (e) {
                    var record = e.record;
                    if (record.id !== 22) {
                        var contextMenu = Ext.create('Ext.menu.Menu', {
                            id: 'menuContextDis',
                            items: [
                                {
                                    iconCls: 'icon-ayuda',
                                    text: 'Ayuda',
                                    handler: function () {
                                        abrirVentanaAyudaDis();
                                        ventanaAyudaDis.setTitle("Potencia de " + record.get('name'));
                                        ventanaAyudaDis.body.update(record.get('ayuda'));
                                        Ext.destroy(contextMenu);
                                    }
                                }
                            ]
                        });
                        e.stopEvent();
                        contextMenu.showAt(e.getXY());
                    }
                }
            }
        }
    });
    viewConsumo = Ext.create('Ext.panel.Panel', {
        id: 'viewConsumo',
        xtype: 'panel',
        items: [
            {
                margin: '20 0 5 0',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        height: 68,
                        cls: 'consumoTotal',
                        title: '<center class="titleAhorro"><strong style="color:#003F72;">DISPOSITIVOS</strong></center>',
                        html: '<p class="valorTotal" id="totalDispositivos">0 Dispositivo(s)</p>'
                    },
                    {
                        flex: 1,
                        height: 68,
                        cls: 'consumoTotal',
                        title: '<center class="titleAhorro"><strong style="color:#003F72;">CONSUMO TOTAL</strong></center>',
                        html: '<p class="valorTotal" id="totalConsumo">0 KWH/MES</p>'
                    },
                    {
                        flex: 1,
                        height: 68,
                        cls: 'consumoTotal',
                        title: '<center class="titleAhorro"><strong style="color:#003F72;">EMISIONES DE CO<sub>2</sub></strong></center>',
                        html: '<p class="valorTotal" id="totalEmisiones">0 kg de CO<sub>2</sub></p>'
                    }]
            },
            {
                layout: 'fit',
                items: gridConsumoDispositivos
            }]
    });
    viewSemaforo = Ext.create('Ext.panel.Panel', {
        id: 'viewSemaforo',
        autoScroll: true,
        layout: 'hbox',
        bodyStyle: 'background: rgba(255, 255, 255, 0.7) !important',
        items: [casaSemaforo, chartSemaforo]
    });
    viewAhorro = Ext.create('Ext.tab.Panel', {
        id: 'viewAhorro',
        tabBar: {
            layout: {pack: 'center'}
        },
        tbar: [ahorroTotal],
        margin: '7 0 0 0',
        listeners: {
            tabchange: function (tabs, newTab, oldTab) {
                switch (newTab.id) {
                    case 'tabConsejos':
                        var ahorro = getPorcentajeAhorro(consejosAhorro, mayorConsumo);
                        cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo - consejosAhorro, emisionCO2(mayorConsumo - consejosAhorro), ahorro);
                        break;
                    case 'tabPaneles':
                        if (formularioPaneles.down('[name=checkStore]').getValue()) {
                            crearStoreMayoresConsumidores(storeConsumoFinal);
                        } else {
                            crearStoreMayoresConsumidores(storeConsumoDispositivos);
                        }
                        cambiarTotalesPaneles();
                        break;
                    case 'tabColector':
                        if (formularioColector.down('[name=checkPanelSolar]').getValue()) {
                            consumoColectorSust();
                            var ahorro = getPorcentajeAhorro(colectorAhorro, mayorConsumo);
                            cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo - colectorAhorro, emisionCO2(mayorConsumo - colectorAhorro), ahorro);
                            formularioColector.down('[name=numeroPersonas]').enable();
                        } else {
                            formularioColector.down('[name=numeroPersonas]').disable();
                            cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo, emisionCO2(mayorConsumo), 0);
                            colectorAhorro = 0;
                        }
                        break;
                }
            }
        },
        items: [calculoAhorro, panelesSolares, colectorSolar]
    });
    viewResultados = Ext.create('Ext.panel.Panel', {
        id: 'viewResultados',
        autoScroll: true,
        margin: '20 0 0 0',
        bodyStyle: 'background: rgba(255, 255, 255, 0.7) !important',
        items: [barraResultados, resultados]
    });
    panelDerecha = Ext.create('Ext.panel.Panel', {
        id: 'panelDerecha',
        region: 'east',
        title: '<center class="title-general">Dispositivos</center>',
        bodyStyle: "background: rgba(255, 255, 255, 0.7) !important; border-radius:30px;",
        collapsible: false,
        split: true,
        scrollable: true,
        width: 240,
        items: [
            {
                xtype: 'combobox',
                store: storeCategorias,
                displayField: 'name',
                valueField: 'id',
                margin: '5 10 3 25',
                value: 1,
                tpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                        '<div class="x-boundlist-item">{name}</div>',
                        '</tpl>'),
                listeners: {
                    select: function (combo, record, eOpts) {
                        storeDispositivos.filter({
                            property: 'idCategoria',
                            value: record.id,
                            exactMatch: true,
                            caseSensitive: true
                        });
                    }
                }
            },
            dataview]
    }
    );
    panelCentral = Ext.create('Ext.panel.Panel', {
        id: 'panelCentral',
        title: '<center class="title-general">ESTIMACIÓN DE CONSUMO</center>',
        region: 'center',
        bodyStyle: "background: rgba(255, 255, 255, 0.5) !important; padding: 1% 3% 2% 3%;",
        width: '100% !important',
        buttons: [
            btnAtras
                    , '->',
            btnSiguiente
        ],
        layout: 'fit',
        items: [
            viewConsumo
        ]
    });
    Ext.create('Ext.container.Viewport', {
        id: 'myContainer',
        renderTo: Ext.getBody(),
        layout: {
            type: 'border'
        },
        items: [{
                region: 'north',
                border: false,
                margins: '0 0 5 0',
                items: [{
                        xtype: 'container',
                        html: '<center id="titulo-header"><h1>CALCULADORA PARA EL CONSUMO DE ENERGIA EN EL HOGAR</h1></center><hr class="separador">'
                    }]
            }, {
                region: 'west',
                margin: '30 0 0 0',
                collapsible: false,
                width: 200,
                split: true,
                items: [{
                        html: '<img class = "fondo-menu" src="img/menu.png">'
                    }],
                lbar: [
                    {
                        id: 'btnFase1',
                        pressed: true,
                        cls: 'itemMenu fase1',
                        text: 'ESTIMACIÓN<br>DE CONSUMO',
                        handler: function () {
                            fase = 1;
                            Ext.getCmp('panelCentral').setTitle('<center class="title-general">ESTIMACIÓN DE CONSUMO</center>');
                            limpiarPanelCentral();
                            panelDerecha.show();
                            panelCentral.add(viewConsumo);
                            storeConsumoDispositivos.remove(storeConsumoDispositivos.getById('Iluminación'));
                            storeConsumoDispositivos.remove(storeConsumoDispositivos.getById('Agua Caliente'));
                            storeConsumoDispositivos.clearFilter(true);
                            storeConsumoDispositivos.sorters.clear();
                            storeConsumoDispositivos.group('categoria');
                            btnAtras.hide();
                        }
                    },
                    {
                        id: 'btnFase2',
                        cls: 'itemMenu fase2',
                        text: 'ANÁLISIS DE<br>CONSUMIDORES',
                        handler: function () {
                            if (storeConsumoDispositivos.data.items.length > 0) {
                                fase = 2;
                                panelCentral.setTitle('<center class="title-general">ANÁLISIS DE CONSUMIDORES</center>');
                                sumaTotal = 0;
                                storeConsumoDispositivos.each(function (rec) {
                                    sumaTotal += rec.get('kwhMes');
                                });
                                limpiarPanelCentral();
                                agruparDispositivos();
                                calcularParticipacion();
                                panelCentral.add(viewSemaforo);
                                storeConsumoDispositivos.clearGrouping();
                                storeConsumoDispositivos.setSorters({
                                    property: 'kwhMes',
                                    direction: 'DESC'
                                });
                                cargarDispositivoCasa(storeConsumoDispositivos.data.items[0]);
                                panelDerecha.hide();
                                btnAtras.show();
                            } else {
                                mostrarNotificacion('Aún no se han agregado dispositivos.');
                            }
                        }
                    }, {
                        id: 'btnFase3',
                        cls: 'itemMenu fase3',
                        text: 'CÁLCULO DE<br>AHORRO',
                        handler: function () {
                            if (storeConsumoDispositivos.data.items.length > 0) {
                                if (sumaTotal === 0) {
                                    document.getElementById("btnFase2").click();
                                }
                                fase = 3;
                                viewAhorro.child('#tabColector').tab.hide();
                                Ext.getCmp('panelCentral').setTitle('<center class="title-general">CÁLCULO DE AHORRO</center>');
                                limpiarPanelCentral();
                                panelCentral.add(viewAhorro);
                                limpiarFiltros();
                                filtrarStores();
                                viewAhorro.setActiveTab(calculoAhorro);
                                panelDerecha.hide();
                                btnSiguiente.show();
                            } else {
                                mostrarNotificacion('Aún no se han agregado dispositivos.');
                            }
                        }
                    }, {
                        id: 'btnFase4',
                        cls: 'itemMenu fase4',
                        text: 'RESULTADOS DE<br>OPTIMIZACIÓN',
                        handler: function () {
                            if (storeConsumoDispositivos.data.items.length > 0) {
                                if (sumaTotal === 0) {
                                    document.getElementById("btnFase2").click();
                                }
                                fase = 4;
                                Ext.getCmp('panelCentral').setTitle('<center class="title-general">RESULTADOS DE OPTIMIZACIÓN - TOTAL</center>');
                                limpiarPanelCentral();
                                panelCentral.add(viewResultados);
                                panelDerecha.hide();
                                btnSiguiente.hide();
                            } else {
                                mostrarNotificacion('Aún no se han agregado dispositivos.');
                            }
                            checkConsejos();
                        }
                    },{
                        cls: 'footer',
                        text:'<span style="color:#19426E; font-size: 11px;">Copyrigth &copy; 2017 &copy;<br> Leuris T. Garcés | UTPL</span>'
                    }
                ]
          },
//            {
//                region: 'south',
//                title: 'South Panel',
//                collapsible: true,
//                html: 'Information goes here',
//                split: true,
//                height: 100,
//                minHeight: 100
//            }, 
            panelDerecha,
            panelCentral]
    });
    storeDispositivos.filter({
        property: 'idCategoria',
        value: 1,
        exactMatch: true,
        caseSensitive: true
    });
    consumoTotal();
});
function abrirVentanaAyudaDis() {
    if (!ventanaAyudaDis) {
        ventanaAyudaDis = Ext.create('Ext.window.Window', {
            layout: 'fit',
            title: 'Potencia de Refrigerador',
            iconCls: 'icon-ayuda',
            resizable: true,
            width: 800,
            height: 500,
            closable: false,
            plain: false,
            autoScroll: true,
            cls: 'ventana-ayuda',
//            items: formReportGeneralVentana,
            tools: [{
//                    type: 'help',
//                    tooltip: '<b>Atención!!!</b><br>Los campos marcados con asterisco(*), <br> son obligatorios.</b>'
//                }, {
                    type: 'restore',
                    id: 'btn-restore-general',
                    hidden: true,
                    tooltip: '<b>Expandir</b>',
                    handler: function (evt, toolEl, owner, tool) {
                        var window = owner.up('window');
                        window.expand();
                        window.setWidth(800);
                        this.hide();
                        this.nextSibling().show();
                    }
                }, {
                    type: 'minimize',
                    tooltip: '<b>Minimizar</b>',
                    handler: function (evt, toolEl, owner, tool) {
                        var window = owner.up('window');
                        window.collapse();
                        window.setWidth(340);
                        this.hide();
                        this.previousSibling().show();
                    }
                }, {
                    type: 'close',
                    tooltip: '<b>Cerrar</b>',
                    handler: function (evt, toolEl, owner, tool) {
                        ventanaAyudaDis.hide();
                    }
                }
            ]
        });
    }
    ventanaAyudaDis.show();
}

function ayuda(idDis) {
    var record = storeDispositivos.getById(idDis);
    abrirVentanaAyudaDis();
    ventanaAyudaDis.setTitle("Potencia de " + record.get('name'));
    ventanaAyudaDis.body.update(record.get('ayuda'));
}

function checkConsejos() {
    var x = 0, cont1 = 0, cont2 = 0, cont3 = 0, cont4 = 0;
    var dispositivo1 = storeConsumoFinal.data.items[0];
    var dispositivo2 = storeConsumoFinal.data.items[1];
    var dispositivo3 = storeConsumoFinal.data.items[2];
    var dispositivo4 = storeConsumoFinal.data.items[3];
    var consejos = "";
    x = (dispositivo1.get("idMaquina") === 24 || dispositivo2.get("idMaquina") !== 24 || dispositivo3.get("idMaquina") !== 24||dispositivo4.get("idMaquina") !== 24)?1:0;
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
            if (dispositivo1.get("idMaquina") === rec.get("idMaquina") && rec.get("active")) {
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
    }if (dispositivo4.get("idMaquina") !== 24) {
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
    return consejos;
}