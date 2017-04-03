Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager'
]);
var storeConsumoDispositivos, gridConsumoDispositivos;
var storePeriodos, boolTotal = true;
Ext.onReady(function () {
    Ext.define('ConsumoModel', {
        extend: 'Ext.data.Model',
        idProperty: 'idMaquina',
        fields: [
            {name: 'idMaquina', type: 'int'},
            {name: 'idCategoria', type: 'int'},
            {name: 'categoria', type: 'string'},
            {name: 'cantidad', type: 'int'},
            {name: 'potencia', type: 'int'},
            {name: 'tiempoUso', type: 'int'},
            {name: 'idPeriodo', type: 'int'},
            {name: 'kwhMes', type: 'float'},
//            {name: 'costoMes', type: 'float'},
            {name: 'participacion', type: 'float'}
        ]
    });

    storeConsumoDispositivos = Ext.create('Ext.data.Store', {
        model: 'ConsumoModel',
        groupField: 'categoria'
    });

    storePeriodos = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'cant', type: 'int'}
        ],
        data: [
            {id: 1, name: 'Horas/Día', cant: 30},
            {id: 2, name: 'Horas/Semana', cant: 4},
            {id: 3, name: 'Horas/Mes', cant: 1},
            {id: 4, name: 'Minutos/Día', cant: 30}
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
        forceFit: true,
        multiSelect: false,
        region: 'center',
        store: storeConsumoDispositivos,
//        title: 'Consumo del hogar',
        plugins: Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        }),
        tbar: [{
                id: 'btnTotal',
                xtype: 'button',
                text: 'Suma Total',
                tooltip: 'Total de consumo',
                enableToggle: true,
                disabled: true,
                handler: function () {
                    gridConsumoDispositivos.getView().getFeature('totalSum').toggleSummaryRow();
                    gridConsumoDispositivos.getView().getFeature('groupSum').toggleSummaryRow();
                    boolTotal = true;
                    gridConsumoDispositivos.getView().refresh();
                    Ext.getCmp('btnTotal').disable();
                    Ext.getCmp('btnGTotal').enable();
                    Ext.getCmp('btnTotal').toggle(false);
                    Ext.getCmp('btnGTotal').toggle(false);
                }
            },
            {
                id: 'btnGTotal',
                xtype: 'button',
                text: 'Suma por Categorias',
                tooltip: 'Total de consumo por categorias',
                enableToggle: true,
                pressed: false,
                handler: function () {
                    gridConsumoDispositivos.getView().getFeature('totalSum').toggleSummaryRow();
                    gridConsumoDispositivos.getView().getFeature('groupSum').toggleSummaryRow();
                    boolTotal = false;
                    gridConsumoDispositivos.getView().refresh();
                    Ext.getCmp('btnTotal').enable();
                    Ext.getCmp('btnGTotal').disable();
                    Ext.getCmp('btnTotal').toggle(false);
                    Ext.getCmp('btnGTotal').toggle(false);
                }
            },
            {
                xtype: 'panel',
                html: '<span style="background-color:#DAA948 !important;">Campo Editable</span>'
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
            }, {
                id: 'totalSum',
                HeaderTpl: 'TOTAL',
                ftype: 'summary'
            }],
        columns: [
            {
                header: '<center class="title-column">Categoria</center>',
                width: 180,
                sortable: true,
                dataIndex: 'categoria'
            },
            {header: "<center class='title-column'>Dispositivo</center>", width: 100, dataIndex: 'idMaquina', name: 'idMaquina',
                renderer: formatoDispositivos, filter: {type: 'list', store: storeDispositivos},
                hideable: false,
                summaryType: 'count',
                summaryRenderer: function (value, summaryData, dataIndex) {
                    if (boolTotal) {
                        return '<center><strong>TOTAL</strong></center>';
                    } else {
                        return ((value === 0 || value > 1) ? '<strong>(' + value + ' Elementos)</strong>' : '<strong>(1 Elemento)</strong>');
                    }
                }
            },
            {header: "<center class='title-column'>Cantidad</center>", width: 80, dataIndex: 'cantidad', name: 'cantidad',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                summaryType: 'sum',
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "background-color:#DAA948 !important;";
                    return value + ' Dispositivo(s)';
                },
                summaryRenderer: function (value, summaryData, dataIndex) {
                    return '<strong>' + value + ' Dispositivo(s)</strong>';
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>Potencia</center>", width: 80, dataIndex: 'potencia', name: 'potencia',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "background-color:#DAA948 !important;";
                    return value + ' watts';
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>Tiempo Uso<br>(Horas)</center>", width: 80, dataIndex: 'tiempoUso', name: 'tiempoUso',
                editor: {
                    xtype: 'textfield',
                    value: 1,
                    emptyText: 'Nro'
                },
                renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = "background-color:#DAA948 !important;";
                    return value + ' hora(s)';
                },
                field: {
                    xtype: 'numberfield'
                }
            },
            {header: "<center class='title-column'>Periodo</center>", width: 100, dataIndex: 'idPeriodo', name: 'idPeriodo',
                renderer: formatoPeriodos,
                editor: {
                    xtype: 'combobox',
                    store: storePeriodos,
                    displayField: 'name',
                    queryMode: 'local',
                    valueField: 'id'
                }
            },
            {header: "<center class='title-column'>kWh(mes)</center>", width: 80, dataIndex: 'kwhMes', name: 'kwhMes',
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
//            {header: "<center class='title-column'>Costo por<br>Mes(S/.)</center>", width: 80, dataIndex: 'costoMes', name: 'costoMes',
//                editor: {
//                    xtype: 'textfield',
//                    value: 1,
//                    emptyText: 'Nro'
//                }
//            },
//            {header: "<center class='title-column'>%<br>Participación</center>", width: 80, dataIndex: 'participacion', name: 'participacion',
//                editor: {
//                    xtype: 'textfield',
//                    value: 1,
//                    emptyText: 'Nro'
//                }
//            },
            {
                xtype: 'actioncolumn',
                width: 20,
                items: [{
                        icon: 'https://cdn4.iconfinder.com/data/icons/colicon/24/close_delete-128.png',
                        tooltip: 'Eliminar de la Tabla',
                        handler: function (grid, rowIndex, colIndex) {
                            grid.getStore().removeAt(rowIndex);
                        },
                        scope: this
                    }]
            }
        ],
        listeners: {
            select: function (thisObj, record, item, index, e, eOpts) {

            },
            edit: function (thisObj, record, item, index, e, eOpts) {
                var cantPeriodo = storePeriodos.getById(record.record.data.idPeriodo).data.cant;
                var totalConsumo = record.record.data.cantidad * record.record.data.potencia * record.record.data.tiempoUso * cantPeriodo;
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

