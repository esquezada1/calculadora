var panelesSolares, formularioPaneles, detallePaneles;
var storeRegiones, storeProvincias;
Ext.onReady(function () {
    storeRegiones = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ],
        data: [
            {id: 1, name: 'Costa'},
            {id: 2, name: 'Sierra'},
            {id: 3, name: 'Oriente'},
            {id: 4, name: 'Insular'}
        ]
    });
    storeProvincias = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'horaSolar', type: 'float'},
            {name: 'idRegion', type: 'int'}
        ],
        data: [
            {id: 1, name: 'Santo Domingo', horaSolar: 4.01, idRegion: 1},
            {id: 2, name: 'Esmeraldas', horaSolar: 4.24, idRegion: 1},
            {id: 3, name: 'Manabi', horaSolar: 4.82, idRegion: 1},
            {id: 4, name: 'Los Rios', horaSolar: 4.21, idRegion: 1},
            {id: 5, name: 'Guayas', horaSolar: 4.58, idRegion: 1},
            {id: 6, name: 'Santa Elena', horaSolar: 5.44, idRegion: 1},
            {id: 7, name: 'El Oro', horaSolar: 4.92, idRegion: 1},
            {id: 8, name: 'Azuay', horaSolar: 4.58, idRegion: 2},
            {id: 9, name: 'Bolivar', horaSolar: 4.21, idRegion: 2},
            {id: 10, name: 'Cañar', horaSolar: 4.4, idRegion: 2},
            {id: 11, name: 'Carchi', horaSolar: 4.24, idRegion: 2},
            {id: 12, name: 'Chimborazo', horaSolar: 4.48, idRegion: 2},
            {id: 13, name: 'Cotopaxi', horaSolar: 4.25, idRegion: 2},
            {id: 14, name: 'Imbabura', horaSolar: 3.96, idRegion: 2},
            {id: 15, name: 'Loja', horaSolar: 5.46, idRegion: 2},
            {id: 16, name: 'Pichincha', horaSolar: 4.25, idRegion: 2},
            {id: 17, name: 'Tungurahua', horaSolar: 4.48, idRegion: 2},
            {id: 18, name: 'Sucumbios', horaSolar: 3.73, idRegion: 3},
            {id: 19, name: 'Orellana', horaSolar: 4.08, idRegion: 3},
            {id: 20, name: 'Napo', horaSolar: 3.88, idRegion: 3},
            {id: 21, name: 'Pastaza', horaSolar: 4.48, idRegion: 3},
            {id: 22, name: 'Morona Santiago', horaSolar: 4.4, idRegion: 3},
            {id: 23, name: 'Zamora Chinchipe', horaSolar: 4.22, idRegion: 3},
            {id: 24, name: 'Galapagos', horaSolar: 6.1, idRegion: 4}
        ]
    });
    formularioPaneles = Ext.create('Ext.form.FieldSet', {
        cls: 'panel-consejos',
        title: '<b>Datos</b>',
        flex: 1,
        layout: 'anchor',
        height: 240,
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                height: 40,
                defaults: {
                    padding: '0 5 5 5'
                },
                items: [
                    {
                        name: 'regiones',
                        xtype: 'combobox',
                        store: storeRegiones,
                        displayField: 'name',
                        valueField: 'id',
                        fieldLabel: '<b>REGIÓN</b>',
                        labelStyle: 'width:60px;',
                        value: 2,
                        flex: 1,
                        listConfig: {
                            minWidth: 150
                        },
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{name}</div>',
                                '</tpl>'),
                        listeners: {
                            select: function (combo, record, eOpts) {
                                formularioPaneles.down('[name=provincias]').clearValue();
                                storeProvincias.clearFilter(true);
                                storeProvincias.filter({
                                    property: 'idRegion',
                                    exactMatch: true,
                                    value: formularioPaneles.down('[name=regiones]').getValue()
                                });
                            }
                        }
                    },
                    {
                        name: 'provincias',
                        xtype: 'combobox',
                        store: storeProvincias,
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: 'Seleccionar Provincia...',
                        fieldLabel: '<b>PROVINCIA</b>',
                        labelStyle: 'width:80px;',
                        flex: 2,
                        filters: [{
                                property: 'idRegion',
                                exactMatch: true,
                                value: 2
                            }],
                        listConfig: {
                            minWidth: 250
                        },
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
                        xtype: 'checkbox',
                        boxLabel: 'Utilizar consejos de ahorro',
                        checked: true,
                        flex: 1,
                        height: 40,
                        listeners: {
                            change: function (store, check) {
                                if (check) {
                                    Ext.getCmp('gridPaneles').reconfigure(storeConsumoFinal);
                                } else {
                                    Ext.getCmp('gridPaneles').reconfigure(storeConsumoDispositivos);
                                }
                            }
                        }
                    }
                ]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        cls: 'labels-paneles',
                        html: '<center><b>Seleccione el consumo a sustituir en el hogar</b></center>'
                    },
                    {
                        flex: 2,
                        xtype: 'grid',
                        id: 'gridPaneles',
                        hideHeaders: true,
                        plugins: 'gridfilters',
                        columns: [
                            {header: '<center><b>Dispositivo</b><center>', width: 170, sortable: false, dataIndex: 'nombreDis'},
                            {header: '<center><b>Consumo</b><center>', width: 120, sortable: false, dataIndex: 'kwhMes'},
                            {header: '<center>Check</b><center>', width: 50, xtype: 'checkcolumn', sortable: false, dataIndex: 'state', menuDisabled: true}
                        ],
                        store: storeConsumoFinal,
                        viewConfig: {
                            hideHeaders: true,
                            loadingText: 'Cargando...',
                            emptyText: '<br><center>No hay datos que Mostrar</center>',
                            getRowClass: function (record, index) {
                                if (index > 3) {
                                    this.getView().getRow(index).style.display = 'none';
                                }
                            }
                        }
                    }]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        html: '<center><b>Consumo a sustituir en el hogar</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center><b id="consumoSust">29.52 kWh</b></center>'
                    }]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        html: '<center><b>Precio del consumo a sustituir</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center><b id="precioSust">$ 2.68</b></center>'
                    }]
            }
        ]
    });
    detallePaneles = Ext.create('Ext.form.FieldSet', {
        cls: 'panel-consejos',
        title: '<b>Caracteristicas del Sistema</b>',
        flex: 1,
        layout: 'anchor',
        margin: '0 0 0 5',
        height: 240,
        items: [{
                xtype: 'panel',
                layout: 'hbox',
                items: [{
                        flex: 1,
                        padding: '10 0 10 0',
                        html: '<img src="img/casa-verde.png" style="width:100%; height: 170px;">'
                    },
                    {
                        flex: 2,
                        defaults: {
                            margin: '3 0 3 0'
                        },
                        items: [{
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Total Potencia necesaria</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="potenciaNeces">214.84 Wattios</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Numeros de paneles necesarios</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="panelesNeces">2 Panel(es) de 300W<br>2 Panel(es) de 150W</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Inversion</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="inversion">$ 1500</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Tiempo de vida del sistema</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="tiempoVida">30 años</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Tiempo de amortización</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="precioSust">46.64 años</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                items: [{
                                        flex: 1,
                                        html: '<center><b>Área necesaria para instalación</b></center>'
                                    },
                                    {
                                        flex: 2,
                                        html: '<center id="precioSust">2 m&#178</center>'
                                    }]
                            }]
                    }]
            }]
    });
    panelesSolares = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Paneles Solares',
        layout: 'hbox',
        autoScroll: true,
        height: 260,
        items: [formularioPaneles, detallePaneles]
    });
});

