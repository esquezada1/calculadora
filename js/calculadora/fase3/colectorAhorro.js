var colectorSolar, formularioColector, detalleColector;
var storeColector;

Ext.onReady(function () {
    storeColector = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'numPersonas', type: 'int'},
            {name: 'capacidad', type: 'int'},
            {name: 'precio', type: 'int'},
            {name: 'areaInstalacion', type: 'string'},
            {name: 'tiempoVida', type: 'int'}
        ],
        data: [
            {id: 1, numPersonas: 2, capacidad: 100, precio: 600, areaInstalacion: '2.14', tiempoVida: 25},
            {id: 2, numPersonas: 3, capacidad: 160, precio: 650, areaInstalacion: '2.74', tiempoVida: 25},
            {id: 3, numPersonas: 5, capacidad: 200, precio: 750, areaInstalacion: '3.34', tiempoVida: 25},
            {id: 4, numPersonas: 7, capacidad: 240, precio: 850, areaInstalacion: '3.94', tiempoVida: 25},
            {id: 5, numPersonas: 9, capacidad: 300, precio: 950, areaInstalacion: '4.54', tiempoVida: 25}
        ]
    });

    formularioColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Datos',
        flex: 1,
        height: 300,
        layout: 'anchor',
        padding: '20 10 10 5',
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        name: 'numeroPersonas',
                        xtype: 'combobox',
                        store: storeColector,
                        displayField: 'numPersonas',
                        valueField: 'id',
                        fieldLabel: '<b>Cantidad de personas que viven en el hogar</b>',
                        value: 2,
                        flex: 1,
                        listConfig: {
                            minWidth: 150
                        },
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{numPersonas}</div>',
                                '</tpl>'),
                        listeners: {select: function (combo, record, eOpts) {
                                formularioColector.down('[name=numPersonas]').clearValue();
                                storeColector.clearFilter(true);
                                storeColector.filter({
                                    property: 'idPersonas',
                                    exactMatch: true,
                                    value: formularioColector.down('[name=numeroPersonas]').getValue()
                                });
                            }}
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                padding: '15 10 15 10',
                html: '<br></br>'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-valores',
                margin: '5 0 0 0',
                items: [{
                        flex: 1,
                        html: '<center><b>Consumo a sustituir en el hogar</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center id="consumoColectorSust" style="font-weight: normal !important!">0 kWh</center>'
                    }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-valores',
                margin: '5 0 0 0',
                items: [{
                        flex: 1,
                        html: '<center><b>Precio del consumo a sustituir</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center style="font-weight: normal" id="precioColectorSust">$ 0.00</center>'
                    }]
            }
        ]
    });
    detalleColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Caracteristicas del Sistema',
        flex: 1,
        height: 300,
        layout: 'anchor',
        padding: '20 10 10 5',
        items: [{
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        padding: '20 0 20 0',
                        html: '<img src="img/panelSolar.png" style="width:90%; height: 150px;">'
                    },
                    {
                        flex: 2,
                        defaults: {
                            margin: '3 0 3 0'
                        },
                        padding: '10 0 0 0',
                        items: [{
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Capacidad del tanque</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="capacidadTanque">0 Litros</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Inversión</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        height: 34,
                                        html: '<center id="inversionColector">$ 0.00</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Tiempo de vida del sistema</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="tiempoVidaColector">0 año(s)</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Tiempo de amortización</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="tiempoAmortizacionColector">0 año(s)</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Área necesaria para instalación</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="areaInstalacion">0 m&#178</center>'
                                    }]
                            }]
                    }]
            }]
    });
    colectorSolar = Ext.create('Ext.panel.Panel', {
        id: 'tabColector',
        cls: 'tabs-ahorro',
        title: 'Colector Solar',
        layout: 'hbox',
        items: [formularioColector, detalleColector]
    });
});

