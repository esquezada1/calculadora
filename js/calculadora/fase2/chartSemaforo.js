var chartSemaforo, casaSemaforo, selectItemChart, storeConsumoFinal;
Ext.onReady(function () {
    Ext.define('ConsumoModelFinal', {
        extend: 'Ext.data.Model',
        idProperty: 'nombreDis',
        fields: [
            {name: 'idMaquina', type: 'int'},
            {name: 'nombreDis', type: 'string'},
            {name: 'cantidad', type: 'int'},
            {name: 'potencia', type: 'float'},
            {name: 'tiempoUso', type: 'int'},
            {name: 'idPeriodo', type: 'int'},
            {name: 'kwhMes', type: 'float'},
            {name: 'participacion', type: 'float'},
            {name: 'excluir', type: 'bool'}
        ]
    });

    storeConsumoFinal = Ext.create('Ext.data.Store', {
        model: 'ConsumoModelFinal'
    });

    chartSemaforo = Ext.create('Ext.chart.Chart', {
        width: '60%',
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
                        var urlImg = storeDispositivos.getById(storeItem.get('idMaquina')).get('url');
                        this.setTitle('<center><strong>' + storeItem.get('nombreDis').toUpperCase() + '</strong><center>');
                        var conten = '<center>';
                        conten += '<img src="' + urlImg + '" width="45" height="45">';
                        conten += '</center>';
                        this.setHtml(conten);
                    }
                },
                listeners: {
                    itemmouseup: function (item) {
                        var record = item.storeItem;
                        selectItemChart(record);
                        cargarDispositivoCasa(record);
                    }
                }
            }],
        items: [{
                type: 'text',
                text: 'Menor consumidor',
                font: '20px Helvetica',
                width: 100,
                height: 30,
                fill: "#088E33",
                x: 12, //the sprite x position
                y: 10  //the sprite y position
            }, {
                type: 'text',
                text: 'Mayor consumidor',
                font: '20px Helvetica',
                width: 100,
                height: 30,
                fill: "#F44336",
                x: 12,
                y: 384
            }]
    });

    selectItemChart = function (storeItem) {
        var name = storeItem.get('nombreDis'),
                series = chartSemaforo.series.get(0),
                i, items, l;

        series.highlight = true;
        series.unHighlightItem();
        series.cleanHighlights();
        for (i = 0, items = series.items, l = items.length; i < l; i++) {
            if (name == items[i].storeItem.get('nombreDis')) {
                series.highlightItem(items[i]);
                break;
            }
        }
        series.highlight = false;
    };
});
