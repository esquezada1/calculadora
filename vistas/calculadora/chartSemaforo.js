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
                    var color = [
                        '#E72D2E',
                        '#E07115',
                        '#E89D42',
                        '#F9EA1B',
                        '#93C123',
                        '#3BA938',
                        '#3EA738',
                        '#088E33'][index];
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
                    font: '1.4em news-gothic-std,sans-serif',
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
                    renderer: function (storeItem, item) {
                        var consumo = storeItem.get('kwhMes').toFixed(2);
                        var urlImg = storeDispositivos.getById(storeItem.get('idMaquina')).data.url;
                        this.setTitle('<center><strong>' + formatoDispositivos(storeItem.get('idMaquina')).toUpperCase() + '</strong><center>');
                        var conten = '<center>';
                        conten += '<img src="' + urlImg + '" width="100" height="100">';
//                        conten += '<br>';
//                        conten += '<strong>Consumo:</strong><p>' + consumo + ' KWh/Mes</p>';
                        conten += '</center>';
                        this.setHtml(conten);
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