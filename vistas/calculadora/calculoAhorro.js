var consejosAhorro, panelesSolares;

Ext.onReady(function () {
    consejosAhorro = Ext.create('Ext.panel.Panel', {
        title: 'Consejos de Ahorro',
        html: 'Consejos de Ahorro'
    });

    panelesSolares = Ext.create('Ext.panel.Panel', {
        title: 'Paneles Solares',
        html: 'Paneles Solares'
    });
});