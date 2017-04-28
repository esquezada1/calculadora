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
        layout: 'anchor',
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    padding: '0 5 5 5'
                },
                items: [
                    {
                        name: 'numeroPersonas',
                        xtype: 'combobox',
                        store: storeColector,
                        displayField: 'numPersonas',
                        valueField: 'id',
                        fieldLabel: '<b>Cantidad de personas </b>',
                        labelStyle: 'width:150px;',
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
            }
        ]
    });
    detalleColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Caracteristicas del Sistema',
        flex: 1,
        layout: 'anchor',
        items: []
    });
    colectorSolar = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Colector Solar',
        layout: 'hbox',
        items: [formularioColector, detalleColector]
    });
});

