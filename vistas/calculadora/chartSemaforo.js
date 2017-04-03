var chartSemaforo, casaSemaforo, selectItemChart;
Ext.onReady(function () {

    chartSemaforo = Ext.create('Ext.chart.Chart', {
        background: 'rgba(220, 220, 220, 0.5)',
        width: '65%',
        height: 410,
        hidden: true,
        padding: '0',
        animate: true,
        shadow: false,
        store: storeConsumoDispositivos,
        axes: [{
                hidden: true,
                type: 'Numeric',
                position: 'bottom',
                fields: ['participacion']
            }, {
                hidden: true,
                type: 'Category',
                position: 'left',
                fields: ['idMaquina']
            }],
        series: [{
                type: 'bar',
                axis: 'left',
                yField: 'participacion',
                xField: 'idMaquina',
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
                    field: 'participacion',
                    color: '#000',
                    orientation: 'horizontal',
                    renderer: function (value) {
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
//
//    selectItemChart = function (storeItem) {
//        var name = storeItem.get('kwhMes'),
//                series = chartSemaforo.series.get(0),
//                i, items, l;
//
//        series.highlight = true;
//        series.unHighlightItem();
//        series.cleanHighlights();
//        for (i = 0, items = series.items, l = items.length; i < l; i++) {
//            if (name == items[i].storeItem.get('kwhMes')) {
//                series.highlightItem(items[i]);
//                break;
//            }
//        }
//        series.highlight = false;
//    };
});