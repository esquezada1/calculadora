var consejosAhorro, panelesSolares, gridConsejos;

Ext.onReady(function () {
    consejosAhorro = Ext.create('Ext.panel.Panel', {
        title: 'Consejos de Ahorro',
        items: [gridConsejos]
    });

    panelesSolares = Ext.create('Ext.panel.Panel', {
        title: 'Paneles Solares',
        html: 'Paneles Solares'
    });
    gridConsejos = Ext.create('Ext.grid.Panel', {
        width: 300,
        columns: [
            {header: 'consejo1',  width: 100},
            {header: 'consejo2',  width: 120}
        ]
    });
});