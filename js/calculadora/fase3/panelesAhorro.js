var panelesSolares, formularioPaneles, detallePaneles;
var storeRegiones, storeProvincias, storeCostos;
Ext.onReady(function () {
    storeCostos = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'kwhMin', type: 'int'},
            {name: 'kwhMax', type: 'int'},
            {name: 'costo', type: 'float'}
        ],
        data: [
            {id: 0, kwhMin: 1, kwhMax: 50, costo: 0.091},
            {id: 1, kwhMin: 51, kwhMax: 100, costo: 0.093},
            {id: 2, kwhMin: 101, kwhMax: 150, costo: 0.095},
            {id: 3, kwhMin: 151, kwhMax: 200, costo: 0.097},
            {id: 4, kwhMin: 201, kwhMax: 250, costo: 0.099},
            {id: 5, kwhMin: 251, kwhMax: 300, costo: 0.101},
            {id: 6, kwhMin: 301, kwhMax: 350, costo: 0.103},
            {id: 7, kwhMin: 351, kwhMax: 500, costo: 0.105},
            {id: 8, kwhMin: 501, kwhMax: 700, costo: 0.1285},
            {id: 9, kwhMin: 701, kwhMax: 1000, costo: 0.145},
            {id: 10, kwhMin: 1001, kwhMax: 1500, costo: 0.1709},
            {id: 11, kwhMin: 1501, kwhMax: 2500, costo: 0.2752},
            {id: 12, kwhMin: 2501, kwhMax: 3500, costo: 0.436},
            {id: 13, kwhMin: 3501, kwhMax: 0, costo: 0.6812}
        ]
    });
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
                        width: '27%',
                        listConfig: {
                            minWidth: 150
                        },
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{name}</div>',
                                '</tpl>'),
                        listeners: {
                            select: function (combo, record, eOpts) { 
                                Ext.getCmp('checkDisPaneles').disable();
                                formularioPaneles.down('[name=comboProvincias]').clearValue();
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
                        name: 'comboProvincias',
                        xtype: 'combobox',
                        store: storeProvincias,
                        displayField: 'name',
                        valueField: 'id',
                        emptyText: 'Seleccionar Provincia...',
                        fieldLabel: '<b>PROVINCIA</b>',
                        labelStyle: 'width:80px;',
                        width: '49%',
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
                                Ext.getCmp('checkDisPaneles').enable();
                            }
                        }
                    },
                    {
                        xtype: 'checkbox',
                        name: 'checkStore',
                        boxLabel: 'Utilizar consejos de ahorro',
                        checked: true,
                        width: '24%',
                        height: 40,
                        listeners: {
                            change: function (store, check) {
                                if (check) {
                                    Ext.getCmp('gridPaneles').reconfigure(storeConsumoFinal);
                                } else {
                                    Ext.getCmp('gridPaneles').reconfigure(storeConsumoDispositivos);
                                }
                                Ext.getCmp('gridPaneles').getStore().each(function (rec) {
                                    rec.set('excluir', false);
                                });
                                document.getElementById('consumoSust').innerHTML = '0 kWh';
                                document.getElementById('precioSust').innerHTML = '$ 0.00';
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
                            {header: '<center><b>Consumo</b><center>', width: 120, sortable: false, dataIndex: 'kwhMes', renderer: function (value) {
                                    return value + ' kWh';
                                }},
                            {header: '<center>Check</b><center>', width: 50, xtype: 'checkcolumn', sortable: false, dataIndex: 'excluir', menuDisabled: true, disabled: true, id: 'checkDisPaneles',
                                listeners: {
                                    checkchange: function (col, rowIndex, checked, eOpts) {
                                        var cont = 0;
                                        var provinciaSelect = storeProvincias.getById(formularioPaneles.down('[name=comboProvincias]').getValue());
                                        var hsp = provinciaSelect.get('horaSolar');
                                        var record = col.up('grid').store.getAt(rowIndex);
                                        var store = Ext.getCmp('gridPaneles').getStore();
                                        var valorExcluir = 0;
                                        var costoAhorro = 0;
                                        var costoMayoresConsumidores = 0;
                                        var costoMayoresConsumidoresAhorro = 0;
                                        var potenciaNecesaria = 0;
                                        var panel150 = 0, panel300 = 0;
                                        var mensajeNumPaneles = "0 Panel(es)";
                                        var costoInversion = 0;
                                        var costoVariosPanel150 = 708.16;
                                        var costoVariosPanel300 = 910.38;
                                        var tiempoAmortizacion = 0;
                                        var areaTotal = 0;
                                        store.each(function (rec) {
                                            if (cont !== rowIndex) {
                                                rec.set('excluir', false);
                                            }
                                            if (rec.get('excluir')) {
                                                valorExcluir += rec.get('kwhMes');
                                            }
                                            cont++;
                                        });
                                        if (checked) {
                                            var consumoSustituir = record.get('kwhMes');
                                            if (formularioPaneles.down('[name=checkStore]').getValue()) {
                                                costoMayoresConsumidores = calcularCosto(mayorConsumoAhorro);
                                                costoMayoresConsumidoresAhorro = calcularCosto(mayorConsumoAhorro - consumoSustituir);
                                            } else {
                                                costoMayoresConsumidores = calcularCosto(mayorConsumo);
                                                costoMayoresConsumidoresAhorro = calcularCosto(mayorConsumo - consumoSustituir);
                                            }
                                            costoAhorro = costoMayoresConsumidores - costoMayoresConsumidoresAhorro;

                                            ////////CARACTERISTICAS DEL SISTEMA/////
                                            potenciaNecesaria = (consumoSustituir / 30) * 1000;
                                            potenciaNecesaria = potenciaNecesaria / hsp;
                                            if (potenciaNecesaria <= 150) {
                                                panel150 = 1;
                                                mensajeNumPaneles = panel150 + ' Panel(es) de 150W';
                                            } else if (potenciaNecesaria > 150 && potenciaNecesaria <= 300) {
                                                panel300 = 1;
                                                mensajeNumPaneles = panel300 + ' Panel(es) de 300W';
                                            } else {
                                                panel300 = parseInt(potenciaNecesaria / 150);
                                                if (esPar(panel300)) {
                                                    panel300 = panel300 / 2;
                                                    if (potenciaNecesaria > panel300 * 300) {
                                                        panel150 = 1;
                                                    }
                                                } else {
                                                    panel150 = 1;
                                                    panel300 = panel300 - panel150;
                                                    panel300 = panel300 / 2;
                                                }
                                                mensajeNumPaneles = panel150 + ' Panel(es) de 150W<br>' + panel300 + ' Panel(es) de 300W';
                                            }
                                            /////////INVERSION EN PANELES/////////
                                            var costoPanel150 = 207.9 * panel150;
                                            var costoPanel300 = 406.82 * panel300;
                                            if (panel150 !== 0 && panel300 !== 0) {
                                                costoInversion = costoPanel150 + costoVariosPanel150 + costoPanel300 + costoVariosPanel300;
                                            } else if (panel150 !== 0) {
                                                costoInversion = costoPanel150 + costoVariosPanel150;
                                            } else if (panel300 !== 0) {
                                                costoInversion = costoPanel300 + costoVariosPanel300;
                                            }
                                            /////////AMORTIZACION/////////////
                                            tiempoAmortizacion = costoAhorro * 12;
                                            tiempoAmortizacion = 1500 / tiempoAmortizacion;
                                            /////////AREA//////
                                            areaTotal = (panel150 * 1) + (panel300 * 2);
                                        }
                                        document.getElementById('consumoSust').innerHTML = valorExcluir + ' kWh';
                                        document.getElementById('precioSust').innerHTML = '$ ' + costoAhorro.toFixed(2);
                                        document.getElementById('potenciaNeces').innerHTML = potenciaNecesaria.toFixed(2) + ' Wattios';
                                        document.getElementById('panelesNeces').innerHTML = mensajeNumPaneles;
                                        document.getElementById('inversion').innerHTML = '$ ' + costoInversion.toFixed(2);
                                        document.getElementById('tiempoAmort').innerHTML = tiempoAmortizacion.toFixed(2) + ' años';
                                        document.getElementById('areaTotal').innerHTML = areaTotal + ' m&#178';
                                    }
                                }}
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
                cls: 'panel-valores',
                margin: '5 0 0 0',
                items: [{
                        flex: 1,
                        html: '<center><b>Consumo a sustituir en el hogar</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center><b id="consumoSust">0 kWh</b></center>'
                    }]
            }, {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-valores',
                items: [{
                        flex: 1,
                        html: '<center><b>Precio del consumo a sustituir</b></center>'
                    },
                    {
                        flex: 2,
                        html: '<center><b id="precioSust">$ 0.00</b></center>'
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
                        padding: '10 0 0 0',
                        items: [{
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Total Potencia necesaria</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="potenciaNeces">0 Wattios</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Numeros de paneles necesarios</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        height: 34,
                                        html: '<center id="panelesNeces">0 Panel(es)</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '50%',
                                        html: '<center><b>Inversion</b></center>'
                                    },
                                    {
                                        width: '50%',
                                        html: '<center id="inversion">$ 0.00</center>'
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
                                        html: '<center id="tiempoVida">30 años</center>'
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
                                        html: '<center id="tiempoAmort">0 años</center>'
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
                                        html: '<center id="areaTotal">0 m&#178</center>'
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

