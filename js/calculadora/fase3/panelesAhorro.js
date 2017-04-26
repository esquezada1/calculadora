var panelesSolares, formularioPaneles, detallePaneles;

Ext.onReady(function () {
    formularioPaneles = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Datos',
        flex: 1,
        layout: 'anchor',
        items: [{
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'combobox',
                        store: storeCategorias,
                        displayField: 'name',
                        valueField: 'id',
                        value: 1,
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{name}</div>',
                                '</tpl>'),
                        listeners: {
                            select: function (combo, record, eOpts) {
                                
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        store: storeCategorias,
                        displayField: 'name',
                        valueField: 'id',
                        value: 1,
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{name}</div>',
                                '</tpl>'),
                        listeners: {
                            select: function (combo, record, eOpts) {
                                
                            }
                        }
                    }
                ]
            }
        ]
    });
    detallePaneles = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Caracteristicas del Sistema',
        flex: 1,
        layout: 'anchor',
        items: []
    });
    panelesSolares = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Paneles Solares',
        layout: 'hbox',
        items: [formularioPaneles, detallePaneles]
    });
});

