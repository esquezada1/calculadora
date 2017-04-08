Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');
var sumaTotal = 0;
var btnSiguiente, btnAtras, fase = 1;
var panelDerecha;
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
                var totalConsumo = 1 * record.data.potencia * 1 * cantPeriodo;
                totalConsumo = totalConsumo / 1000;
                var r = Ext.create('ConsumoModel', {
                    idMaquina: record.id,
                    idCategoria: record.data.idCategoria,
                    categoria: record.data.categoria,
                    cantidad: 1,
                    potencia: record.data.potencia,
                    tiempoUso: 1,
                    idPeriodo: 1,
                    kwhMes: totalConsumo,
//                    costoMes: 2,
                    participacion: 0
                });
                storeConsumoDispositivos.insert(0, r);
                gridConsumoDispositivos.editingPlugin.startEdit(0, 0);
                gridConsumoDispositivos.getView().refresh();
                sumaTotal = 0;
                storeConsumoDispositivos.each(function (rec) {
                    sumaTotal += rec.get('kwhMes');
                });
            }
        }
    });

    panelDerecha = Ext.create('Ext.panel.Panel', {
        id: 'panelDerecha',
        region: 'east',
        title: '<center class="title-general">Dispositivos</center>',
        bodyStyle: "background: rgba(255, 255, 255, 0.7) !important; border-radius:30px;",
        collapsible: true,
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
                collapsible: true,
                title: '<center class="title-general">Pasos</center>',
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
                        text: 'CÁLCULO DE<br>CONSUMO',
                        handler: function () {
                            Ext.getCmp('panelCentral').setTitle('<center class="title-general">CÁLCULO DE CONSUMO</center>');
                            limpiarPanelCentral();
                            gridConsumoDispositivos.show();
                            storeConsumoDispositivos.sorters.clear();
                            panelDerecha.show();
                            dataview.enable();
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
                                Ext.getCmp('panelCentral').setTitle('<center class="title-general">ANÁLISIS DE CONSUMIDORES</center>');
                                limpiarPanelCentral();
                                calcularParticipacion();
                                casaSemaforo.show();
                                chartSemaforo.show();
                                storeConsumoDispositivos.setSorters({
                                    property: 'kwhMes',
                                    direction: 'DESC'
                                });
                                cargarDispositivoCasa(storeConsumoDispositivos.data.items[0]);
                                panelDerecha.hide();
                                dataview.disable();
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
            panelDerecha, {
                id: 'panelCentral',
                title: '<center class="title-general">CONSUMO TOTAL</center>',
                region: 'center',
                bodyStyle: "background: rgba(255, 255, 255, 0.5) !important; padding: 3%;",
                width: '100% !important',
                buttons: [
                    btnAtras
                            , '->',
                    btnSiguiente
                ],
                items: [
                    gridConsumoDispositivos,
                    {
                        xtype: 'panel',
                        id: 'viewSemaforo',
                        autoScroll: true,
                        layout: 'hbox',
                        bodyStyle: 'background: rgba(255, 255, 255, 0.7) !important',
                        items: [casaSemaforo, chartSemaforo]
                    }
                ]
            }]
    });
    storeDispositivos.filter({
        property: 'idCategoria',
        value: 1,
        exactMatch: true,
        caseSensitive: true
    });
});


