Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager'
]);
var storeConsumoDispositivos, gridConsumoDispositivos;
var storePeriodos;
Ext.onReady(function () {
    Ext.define('ConsumoModel', {
        extend: 'Ext.data.Model',
        idProperty: 'nombreDis',
        fields: [
            {name: 'idMaquina', type: 'int'},
            {name: 'nombreDis', type: 'string'},
            {name: 'idCategoria', type: 'int'},
            {name: 'categoria', type: 'string'},
            {name: 'cantidad', type: 'int'},
            {name: 'potencia', type: 'float'},
            {name: 'tiempoUso', type: 'int'},
            {name: 'idPeriodo', type: 'int'},
            {name: 'kwhMes', type: 'float'},
            {name: 'participacion', type: 'float'}
        ]
    });

    var dataConsumosDis = [
        [1, "Televisor", 1, 'Electrodomésticos', 1, 90, 3, 3, 29.39],
        [2, "Licuadora", 1, 'Electrodomésticos', 1, 600, 1, 2, 2.4],
        [3, "Portátil", 1, 'Electrodomésticos', 1, 45, 4, 3, 0.72],
        [4, "Cocina de inducción", 1, 'Electrodomésticos', 1, 2000, 90, 4, 90],
        [5, "Lavadora", 1, 'Electrodomésticos', 1, 50.23, 3, 2, 0.6],
        [6, "Refrigeradora", 1, 'Electrodomésticos', 1, 40.83, 24, 3, 29.39],
        [8, "Plancha", 1, 'Electrodomésticos', 1, 1200, 4, 1, 4.8],
        [13, "Horno Eléctrico", 1, 'Electrodomésticos', 1, 0.74, 1, 1, 2.96],
        [16, "Fluorescente", 2, 'Iluminación', 1, 23, 5, 3, 3.22],
        [18, "Ducha Eléctrica", 3, 'Agua Caliente', 1, 3300, 20, 1, 66],
        [21, "Equipo de Sonido", 1, 'Electrodomésticos', 1, 100, 20, 1, 2]
    ];

    storeConsumoDispositivos = Ext.create('Ext.data.Store', {
        model: 'ConsumoModel',
        groupField: 'categoria',
        data: dataConsumosDis,
        listeners: {
            datachanged: consumoTotal,
            update: consumoTotal
        }
    });

    storePeriodos = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'cant', type: 'float'}
        ],
        data: [
            {id: 1, name: 'Horas/Mes', cant: 1},
            {id: 2, name: 'Horas/Semana', cant: 4},
            {id: 3, name: 'Horas/Día', cant: 30},
            {id: 4, name: 'Minutos/Día', cant: 0.5}
        ]
    });

    storeCategorias = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ],
        data: [
            {id: 1, name: 'Electrodomésticos'},
            {id: 2, name: 'Iluminación'},
            {id: 3, name: 'Agua Caliente'}
        ]
    });

    gridConsumoDispositivos = Ext.create('Ext.grid.Panel', {
        height: 318,
        frame: true,
        multiSelect: false,
        columnLines: true,
        region: 'center',
        store: storeConsumoDispositivos,
        cls: 'tablas-calculadora',
        plugins: Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeedit: function (e, editor) {
                    if (editor.record.get('idMaquina') === 19) {
                        if (editor.colIdx === 2) {
                            return false;
                        }
                    }
                }
            }
        }),
        tbar: [
            {
                id: 'btnGTotal',
                xtype: 'button',
                text: 'Suma por Categorias',
                tooltip: 'Total de consumo por categorias',
                enableToggle: true,
                pressed: false,
                handler: function () {
                    gridConsumoDispositivos.getView().getFeature('groupSum').toggleSummaryRow();
                    gridConsumoDispositivos.getView().refresh();
                }
            },
            {
                xtype: 'panel',
                html: '<span style="background-color:#FFF59D !important;">Campo Editable</span>'
            },
            '->',
            {
                xtype: 'button',
                text: 'Limpiar Tabla',
                tooltip: 'Eliminar todos los elementos',
                handler: function () {
                    storeConsumoDispositivos.removeAll();
                    gridConsumoDispositivos.getView().refresh();
                }
            }
        ],
        features: [
            {
                id: 'groupSum',
                ftype: 'groupingsummary',
                groupHeaderTpl: '<center class="group-title">{name}<center>',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
        columns: [
            {header: "<center class='title-column'>DISPOSITIVO</center>", width: 200, dataIndex: 'nombreDis', name: 'nombreDis',
                hideable: false,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return ((value === 0 || value > 1) ? '<strong>(' + value + ' Elementos)</strong>' : '<strong>(1 Elemento)</strong>');
                }
            },
            {
                header: '<center class="title-column">CATEGORÍA</center>',
                width: 180,
                sortable: true,
                dataIndex: 'categoria'
            },
            {header: "<center class='title-column'>CANTIDAD</center>", width: 130, dataIndex: 'cantidad', name: 'cantidad',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "background-color:#FFF59D !important;";
                    return value + ' Dispositivo(s)';
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<strong>' + value + ' Dispositivo(s)</strong>';
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>POTENCIA</center>", width: 115, dataIndex: 'potencia', name: 'potencia',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    if (record.get('idMaquina') !== 19) {
                        metaData.style = "background-color:#FFF59D !important;";
                        return value + ' watts';
                    } else {
                        return '-';
                    }
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>TIEMPO DE USO</center>", width: 125, dataIndex: 'tiempoUso', name: 'tiempoUso',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "background-color:#FFF59D !important;";
                    if (record.get('idPeriodo') === 4) {
                        return value + ' minuto(s)';
                    } else {
                        return value + ' hora(s)';
                    }
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>PERÍODO</center>", width: 110, dataIndex: 'idPeriodo', name: 'idPeriodo',
                renderer: formatoPeriodos,
                editor: {
                    xtype: 'combobox',
                    store: storePeriodos,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'id'
                }
            },
            {header: "<center class='title-column'>kWh/MES</center>", width: 100, dataIndex: 'kwhMes', name: 'kwhMes',
                hideable: false,
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    value = value.toFixed(2);
                    return value;
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    value = value.toFixed(2);
                    return '<strong>' + value + ' KWh/mes<strong>';
                }
            },
            {
                xtype: 'actioncolumn',
                width: 30,
                items: [{
                        icon: 'img/delete.png',
                        tooltip: 'Eliminar de la Tabla',
                        handler: function (grid, rowIndex, colIndex) {
                            grid.getStore().removeAt(rowIndex);
                            gridConsumoDispositivos.getView().refresh();
                        },
                        scope: this
                    }]
            }
        ],
        listeners: {
            edit: function (thisObj, record, item, index, e, eOpts) {
                var cantPeriodo = storePeriodos.getById(record.record.data.idPeriodo).data.cant;
                var totalConsumo = 0;
                if (record.record.get('idMaquina') === 19) {
                    totalConsumo = record.record.data.cantidad * 14000 * record.record.data.tiempoUso * cantPeriodo;
                    totalConsumo = totalConsumo / 2.54;
                } else {
                    totalConsumo = record.record.data.cantidad * record.record.data.potencia * record.record.data.tiempoUso * cantPeriodo;
                }
                totalConsumo = totalConsumo / 1000;
                storeConsumoDispositivos.commitChanges();
                record.record.set('kwhMes', totalConsumo);
                gridConsumoDispositivos.getView().refresh();
            },
            groupclick: function () {
                gridConsumoDispositivos.getView().refresh();
            }
        },
        viewConfig: {
            loadingText: 'Cargando...',
            emptyText: '<br><center>No hay datos que Mostrar</center>',
            getRowClass: function (record, index) {

            }
        }
    });
    gridConsumoDispositivos.getView().getFeature('groupSum').toggleSummaryRow();
});

