var chartSemaforo, gridSemaforo, selectItemChart;
Ext.onReady(function () {
    gridSemaforo = Ext.create('Ext.grid.Panel', {
            width: '30%',
            margin: 5,
            hidden: true,
            forceFit: true,
            multiSelect: false,
            region: 'center',
            store: storeConsumoDispositivos,
            cls: 'gridSemaforo',
            layout: 'fit',
            defaults: {
                sortable: true
            },
            columns: [
                {header: "", width: 90, height: 60, dataIndex: 'idMaquina', width: 50, name: 'idMaquina',
                    renderer: formatoImgDispositivos
                },
                {header: "<center class='title-column'>Dispositivo</center>", width: 110, height: 60, dataIndex: 'idMaquina', name: 'idMaquina',
                    renderer: formatoDispositivos, filter: {type: 'list', store: storeDispositivos}, align: "center"
                },
                {header: "<center class='title-column'>kWh<br>(mes)</center>", width: 80, dataIndex: 'kwhMes', name: 'kwhMes',
                    renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                        value = value.toFixed(2);
                        return value;
                    }
                },
                {header: "<center class='title-column'>%</center>", width: 80, dataIndex: 'kwhMes', name: 'kwhMes',
                    renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                        if (rowIdx < 4) {
                            metaData.style = "background-color: #EF423C !important;";
                        } else if (rowIdx >= 4 && rowIdx < 8) {
                            metaData.style = "background-color: #DAA948 !important;";
                        } else {
                            metaData.style = "background-color: green !important;";
                        }
                        value = (value / sumaTotal) * 100;
                        value = value.toFixed(2);
                        return value + ' %';
                    }
                }
            ],
            listeners: {
                selectionchange: function (model, records) {
                    if (records[0]) {
                        var selectedRec = records[0];
                        selectItemChart(selectedRec);
                    }
                }
            },
            viewConfig: {
                loadingText: 'Cargando...',
                emptyText: '<br><center>No hay datos que Mostrar</center>',
                getRowClass: function (record, index) {
                }
            }
    });
    chartSemaforo = Ext.create('Ext.chart.Chart', {
        background: 'rgba(220, 220, 220, 0.5)',
        width: '65%',
        height: 410,
        hidden: true,
        padding: '10 0 0 0',
        insetPadding: 40,
        animate: true,
        shadow: false,
        flipXY: true,
        store: storeConsumoDispositivos,
        axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['kwhMes'],
                label: {
                    renderer: function (value) {
                        value = (value / sumaTotal) * 100;
                        value = value.toFixed(2);
                        return value + ' %';
                    }
                },
                grid: true,
                minimum: 0,
                maximum: 100
            }, {
                type: 'Category',
                position: 'left',
                fields: ['idMaquina'],
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    },
                    renderer: function (value) {
                        return formatoDispositivos(value);
                    }
                }
            }],
        series: [{
                type: 'bar',
                axis: 'left',
                yField: 'idMaquina',
                xField: 'kwhMes',
                renderer: function (sprite, record, attr, index, store) {
                    var setColor = 0;
                    if (index < 4) {
                        setColor = 0;
                    } else if (index >= 4 && index < 8) {
                        setColor = 1;
                    } else {
                        setColor = 2;
                    }
                    var color = [
                        '#EF423C',
                        '#DAA948',
                        'green'][setColor];
                    return Ext.apply(attr, {
                        fill: color
                    });
                },
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 20,
                    stroke: '#fff'
                },
                label: {
                    contrast: true,
                    display: 'insideEnd',
                    font: '1.5em news-gothic-std,sans-serif',
                    field: 'kwhMes',
                    color: '#000',
                    orientation: 'horizontal',
                    renderer: function (value) {
                        value = (value / sumaTotal) * 100;
                        value = value.toFixed(2);
                        return value + ' %';
                    }
                },
                tips: {
                    trackMouse: true,
                    style: 'background-color: white !important; color: black !important;',
                    height: 20,
                    renderer: function (storeItem, item) {
                        this.setTitle('Consumo: ' + storeItem.data.kwhMes + " KWh/Mes");
                    }
                }
            }]
    });

    selectItemChart = function (storeItem) {
        var name = storeItem.get('kwhMes'),
                series = chartSemaforo.series.get(0),
                i, items, l;

        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();
        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('kwhMes')) {
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    };
});