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
            {name: 'participacion', type: 'float'},
            {name: 'excluir', type: 'bool'}
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
            {name: 'cant', type: 'float'},
            {name: 'max', type: 'int'}
        ],
        data: [
            {id: 1, name: 'Horas/Mes', cant: 1, max: 720},
            {id: 2, name: 'Horas/Semana', cant: 4, max: 168},
            {id: 3, name: 'Horas/Día', cant: 30, max: 24},
            {id: 4, name: 'Minutos/Día', cant: 0.5, max: 1440}
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
//                    if (editor.record.get('idMaquina') === 19) {
//                        if (editor.colIdx === 2) {
//                            return false;
//                        }
//                    }
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
            },
            {
                xtype: 'button',
                iconCls: 'icon-ayuda',
                text: 'Instrucciones',
                handler: function () {
                    var conten = '<P ALIGN=CENTER STYLE="margin-right: -0.04in; margin-bottom: 0.11in"><FONT COLOR="#ff0000"><FONT FACE="Arial, serif"><SPAN LANG="es-ES"><B>ESTIMACIÓN DE CONSUMO</B></SPAN></FONT></FONT></P> <P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0.11in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">Se calcula el consumo total mensual (kWh/mes) según los electrodomésticos o cualquier otro dispositivo que se posee en el hogar. Aparecerá por defecto en la tabla un ejemplo del consumo promedio de los dispositivos más comunes.</SPAN></FONT></P> <P ALIGN=CENTER STYLE="margin-right: -0.04in; margin-bottom: 0.11in"><IMG SRC="img/ayuda/instru1.png" NAME="Imagen 3" ALIGN=BOTTOM WIDTH=426 HEIGHT=211 BORDER=0></P> <P STYLE="margin-right: -0.04in; margin-bottom: 0.11in"><IMG SRC="img/ayuda/instru2.png" NAME="Imagen 7" ALIGN=BOTTOM WIDTH=108 HEIGHT=18 BORDER=0><FONT FACE="Arial, serif"><SPAN LANG="es-ES">Se refiere a que solo se puede editar las casillas amarillas.</SPAN></FONT></P> <UL> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.2in; margin-bottom: 0.11in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">Los dispositivos electrónicos están agrupados por categorías como electrodomésticos, iluminación y agua caliente sanitaria. Si desea un cálculo más detallado del consumo de cada una de las categorías dar click en el botón<IMG SRC="img/ayuda/instru3.png" NAME="Imagen 9" ALIGN=BOTTOM WIDTH=98 HEIGHT=19 BORDER=0></SPAN></FONT></P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">Para adaptar los datos a su realidad, dar click en la imagen de los dispositivos para agregar otro a la tabla, y solo cambie la cantidad del conjunto de dispositivos, la potencia, uso del tiempo y período. </SPAN></FONT> </P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-top: 0.17in; margin-bottom: 0in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">Si desea eliminar un dispositivo de la tabla haga click en la <IMG SRC="img/ayuda/instru4.png" NAME="Imagen 13" ALIGN=BOTTOM WIDTH=25 HEIGHT=17 BORDER=0>o si desea volver a llenarla para un nuevo cálculo haga click en <IMG SRC="img/ayuda/instru5.png" NAME="Imagen 14" ALIGN=BOTTOM WIDTH=82 HEIGHT=16 BORDER=0> </SPAN></FONT> </P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-top: 0.17in; margin-bottom: 0in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">En la casilla tiempo de uso, se refiere al tiempo que el dispositivo está encendido.</SPAN></FONT></P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0in"><A NAME="_GoBack"></A> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">En la casilla período se puede seleccionar minutos por día, horas al día, horas a la semana u horas al mes (Ejemplo: 15 minutos al día, 2 horas al día, 48 horas a la semana u 100 horas al mes). </SPAN></FONT> </P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0.11in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">En la casilla Potencia, se refiere al consumo de energía por hora(Watts). Si necesita adaptarlo a sus necesidades, mire en los laterales o debajo de su dispositivo y encontrará los datos de placa del consumo de cada uno de ellos (Ejemplo: 20W o 250W). </SPAN></FONT> </P> <LI><P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0.11in"> <FONT FACE="Arial, serif"><SPAN LANG="es-ES">Para conocer de forma más detallada de cómo se obtiene la potencia de consumo (Watts), dar click en <IMG SRC="img/ayuda/instru6.png" NAME="Imagen 15" ALIGN=BOTTOM WIDTH=23 HEIGHT=18 BORDER=0> que se encuentra ubicado junto a la potencia en Watts en la tabla, o dar click derecho sobre cualquiera de las imágenes de los dispositivos y luego seleccionar la opción ayuda. </SPAN></FONT> </P> </UL> <P STYLE="margin-left: 0.3in; margin-right: -0.04in; margin-bottom: 0.11in"> <IMG SRC="img/ayuda/instru7.png" NAME="Imagen 16" ALIGN=BOTTOM WIDTH=118 HEIGHT=109 BORDER=0></P> <P STYLE="margin-right: -0.04in; margin-bottom: 0.11in"><BR><BR> </P>';
                    abrirVentanaAyudaDis();
                    ventanaAyudaDis.setTitle("Instrucciones");
                    ventanaAyudaDis.body.update(conten);
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
//                    if (record.get('idMaquina') !== 19) {
//                        metaData.style = "background-color:#FFF59D !important;";
//                        if (record.get('idMaquina') !== 22) {
//                            return value + ' watts <img src="img/help.png" onclick="ayuda(' + record.get('idMaquina') + ');" style="cursor: pointer; width:13px !important; padding: 0px; marin: 0px;">';
//                        } else {
//                            return value + ' watts';
//                        }
//                    } else {
//                        return '-';
//                    }
                    metaData.style = "background-color:#FFF59D !important;";
                    if (record.get('idMaquina') !== 19) {

                        if (record.get('idMaquina') !== 22) {
                            return value + ' watts <img src="img/help.png" onclick="ayuda(' + record.get('idMaquina') + ');" style="cursor: pointer; width:13px !important; padding: 0px; marin: 0px;">';
                        } else {
                            return value + ' watts';
                        }
                    } else {
                        return value + ' cilindros <img src="img/help.png" onclick="ayuda(' + record.get('idMaquina') + ');" style="cursor: pointer; width:13px !important; padding: 0px; marin: 0px;">';
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
            {header: "<center class='title-column'>kWh/mes</center>", width: 100, dataIndex: 'kwhMes', name: 'kwhMes',
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
                            sumaTotal = 0;
                            grid.getStore().removeAt(rowIndex);
                            gridConsumoDispositivos.getView().refresh();
                        },
                        scope: this
                    }]
            }
        ],
        listeners: {
            edit: function (thisObj, record, item, index, e, eOpts) {
                var cantPeriodo = storePeriodos.getById(record.record.get('idPeriodo'));
                var totalConsumo = 0;
                comprobarTiempoUso(cantPeriodo, record.record);
                if (record.record.get('idMaquina') === 1) {
                    var standByTv = 0;
                    if (record.record.get('idPeriodo') === 4) {
                        standByTv = (cantPeriodo.get('max') - record.record.get('tiempoUso')) / 60;
                        standByTv = standByTv * record.record.get('cantidad') * 3 * 30;
                    } else {
                        standByTv = cantPeriodo.get('max') - record.record.get('tiempoUso');
                        standByTv = standByTv * record.record.get('cantidad') * 3 * cantPeriodo.get('cant');
                    }
                    standByTv = standByTv / 1000;
                    totalConsumo = record.record.get('cantidad') * record.record.get('potencia') * record.record.get('tiempoUso') * cantPeriodo.get('cant');
                    totalConsumo = totalConsumo / 1000;
                    totalConsumo = totalConsumo + standByTv;
                    var ahorro = getPorcentajeAhorro(standByTv, totalConsumo);
                    storeConsejos1.getById(2).set('ahorro', ahorro.toFixed(2));
                    storeConsejos2.getById(2).set('ahorro', ahorro.toFixed(2));
                    storeConsejos3.getById(2).set('ahorro', ahorro.toFixed(2));
                    storeConsejos4.getById(2).set('ahorro', ahorro.toFixed(2));
                } else if (record.record.get('idMaquina') === 19) {
                    totalConsumo = record.record.get('cantidad') * 14000 * record.record.get('tiempoUso') * cantPeriodo.get('cant');
                    totalConsumo = totalConsumo / 2.54;
                    totalConsumo = totalConsumo / 1000;
                } else {
                    totalConsumo = record.record.get('cantidad') * record.record.get('potencia') * record.record.get('tiempoUso') * cantPeriodo.get('cant');
                    totalConsumo = totalConsumo / 1000;
                }
                storeConsumoDispositivos.commitChanges();
                record.record.set('kwhMes', totalConsumo);
                gridConsumoDispositivos.getView().refresh();
                sumaTotal = 0;
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

