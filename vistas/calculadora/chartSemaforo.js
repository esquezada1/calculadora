var chartSemaforo, casaSemaforo, selectItemChart;
Ext.onReady(function () {

    chartSemaforo = Ext.create('Ext.chart.Chart', {
//        background: 'rgba(220, 220, 220, 0.5)',
        width: '60%',
        height: 415,
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
                },
                listeners: {
                    itemmouseup: function (item) {
                        var record = item.storeItem;
                        selectItemChart(record);
                        var srcImg = storeDispositivos.getById(record.data.idMaquina).data.url;
                        document.getElementById('dis-casa').src = srcImg;
                        document.getElementById('tit-casa').innerHtml = formatoDispositivos(record.get('idMaquina'));
                        document.getElementById('cons-casa').innerHTML = record.data.kwhMes + 'KW/MES';
                    }
                },
            }],
        items: [{
                type: 'text',
                text: 'Más eficiente',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                fill: "#088E33",
                x: 12, //the sprite x position
                y: 10  //the sprite y position
            }, {
                type: 'text',
                text: 'Menos eficiente',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                fill: "#E72D2E",
                x: 12,
                y: 408
            }]
    });

    selectItemChart = function (storeItem) {
        var name = storeItem.get('participacion'),
                series = chartSemaforo.series.get(0),
                i, items, l;

        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();
        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('participacion')) {
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    };
});