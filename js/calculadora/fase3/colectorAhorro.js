var colectorSolar, formularioColector, detalleColector;

Ext.onReady(function () {
    formularioColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Datos',
        flex: 1,
        layout: 'anchor',
        items: []
    });
    detalleColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: 'Caracteristicas del Sistema',
        flex: 1,
        layout: 'anchor',
        items: []
    });
    colectorSolar = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Colector Solar',
        layout: 'hbox',
        items: [formularioColector, detalleColector]
    });
});

