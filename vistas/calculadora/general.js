Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');
var sumaTotal = 0;
var btnSiguiente, btnAtras, fase = 1;
var panelDerecha, panelCentral;
var viewConsumo, viewSemaforo, viewAhorro;
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
        multiSelect: true,
        autoScroll: true,
        listeners: {
            select: function (dv, record, item, index, e) {
                var cantPeriodo = storePeriodos.getById(1).data.cant;
                var tiempoUso = 10;
                var cantidad = 1;
                var totalConsumo = cantidad * record.data.potencia * tiempoUso * cantPeriodo;
                totalConsumo = totalConsumo / 1000;
                var r = Ext.create('ConsumoModel', {
                    idMaquina: record.id,
                    idCategoria: record.data.idCategoria,
                    categoria: record.data.categoria,
                    cantidad: cantidad,
                    potencia: record.data.potencia,
                    tiempoUso: tiempoUso,
                    idPeriodo: 1,
                    kwhMes: totalConsumo
                });
                storeConsumoDispositivos.clearGrouping();
                storeConsumoDispositivos.add(r);
                storeConsumoDispositivos.group('categoria');
//                gridConsumoDispositivos.editingPlugin.startEdit(0, 0);
                gridConsumoDispositivos.getView().refresh();
            }
        }
    });

    viewConsumo = Ext.create('Ext.panel.Panel', {
        id: 'viewConsumo',
        xtype: 'panel',
        autoScroll: true,
        items: [gridConsumoDispositivos]
    });

    viewSemaforo = Ext.create('Ext.panel.Panel', {
        id: 'viewSemaforo',
        autoScroll: true,
        layout: 'hbox',
        bodyStyle: 'background: rgba(255, 255, 255, 0.7) !important',
        items: [casaSemaforo, chartSemaforo]
    });

    viewAhorro = Ext.create('Ext.tab.Panel', {
        width: 600,
        bodyPadding: 10,
        listeners: {
            beforetabchange: function (tabs, newTab, oldTab) {
                return newTab.title != 'P2';
            }
        },
        items: [consejosAhorro, panelesSolares]
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
        title: '<center class="title-general">CÁLCULO DE CONSUMO</center>',
        region: 'center',
        bodyStyle: "background: rgba(255, 255, 255, 0.5) !important; padding: 3%;",
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
                        text: 'CÁLCULO<br>DE CONSUMO',
                        handler: function () {
                            Ext.getCmp('panelCentral').setTitle('<center class="title-general">CÁLCULO DE CONSUMO</center>');
                            limpiarPanelCentral();
                            panelDerecha.show();
                            panelCentral.add(viewConsumo);
//                            storeConsumoDispositivos.sorters.clear();
                            btnAtras.hide();
                            fase = 1;
                        }
                    },
                    {
                        id: 'btnFase2',
                        cls: 'itemMenu fase2',
                        text: 'ANÁLISIS DE<br>CONSUMIDORES',
                        handler: function () {
                            if (storeConsumoDispositivos.data.items.length > 0) {
                                panelCentral.setTitle('<center class="title-general">ANÁLISIS DE CONSUMIDORES</center>');
                                sumaTotal = 0;
                                storeConsumoDispositivos.each(function (rec) {
                                    sumaTotal += rec.get('kwhMes');
                                });
                                limpiarPanelCentral();
                                calcularParticipacion();
                                panelCentral.add(viewSemaforo);
//                                storeConsumoDispositivos.setSorters({
//                                    property: 'kwhMes',
//                                    direction: 'DESC'
//                                });
                                cargarDispositivoCasa(storeConsumoFinal.data.items[0]);
                                panelDerecha.hide();
                                btnAtras.show();
                                fase = 2;
                            } else {
                                mostrarNotificacion('Aún no se han agregado dispositivos.');
                            }
                        }
                    }, {
                        id: 'btnFase3',
                        cls: 'itemMenu fase3',
                        text: 'CALCULO DE<br>AHORRO',
                        handler: function () {
                            Ext.getCmp('panelCentral').setTitle('<center class="title-general">CALCULO DE AHORRO</center>');
                            limpiarPanelCentral();
                            filtrarStores();
                            panelCentral.add(viewAhorro);
                            panelDerecha.hide();
                            btnSiguiente.show();
                            fase = 3;
                        }
                    }, {
                        id: 'btnFase4',
                        cls: 'itemMenu fase4',
                        text: 'ANÁLISIS<br>PLANILLA',
                        handler: function () {
                            Ext.getCmp('panelCentral').setTitle('<center class="title-general">ANÁLISIS PLANILLA</center>');
                            limpiarPanelCentral();
                            panelDerecha.hide();
                            btnSiguiente.hide();
                            fase = 4;
                        }
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
});


