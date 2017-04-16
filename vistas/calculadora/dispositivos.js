var viewDispositivos, storeDispositivos;
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.ux.DataView.Animated',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.toolbar.*',
    'Ext.slider.Multi'
]);

Ext.onReady(function () {

    var data = [
        [1, "Televisor", 1, 'Electrodomésticos', 90, 3, 3, "img/dis/televisor.png"],
        [2, "Licuadora", 1, 'Electrodomésticos', 600, 1, 2, "img/dis/licuadora.png"],
        [3, "Portátil", 1, 'Electrodomésticos', 45, 4, 3, "img/dis/portatil.png"],
        [4, "Cocina de inducción", 1, 'Electrodomésticos', 2000, 90, 4, "img/dis/cocina.png"],
        [5, "Lavadora", 1, 'Electrodomésticos', 50.23, 3, 2, "img/dis/lavadora.png", 40],
        [6, "Refrigeradora", 1, 'Electrodomésticos', 40.83, 24, 3, "img/dis/refrigeradora.png", 60],
        [7, "Olla Arrocera", 1, 'Electrodomésticos', 700, 28, 1, "img/dis/olla.png"],
        [8, "Plancha", 1, 'Electrodomésticos', 1200, 4, 1, "img/dis/plancha.png"],
        [9, "Microondas", 1, 'Electrodomésticos', 1000, 4, 1, "img/dis/microondas.png"],
        [10, "Aire Acondicionado", 1, 'Electrodomésticos', 1220, 112, 1, "img/dis/aire-acond.png"],
        [11, "Plancha de Pelo", 1, 'Electrodomésticos', 50, 4, 1, "img/dis/plancha-pelo.png"],
        [12, "Aspiradora", 1, 'Electrodomésticos', 700, 8, 1, "img/dis/aspiradora.png"],
        [13, "Horno Eléctrico", 1, 'Electrodomésticos', 0.74, 1, 1, "img/dis/horno.png"],
        [14, "Secador de pelo", 1, 'Electrodomésticos', 1200, 2, 1, "img/dis/secador.png"],
        [15, "Led", 2, 'Iluminación', 23, 5, 3, "img/dis/led.png"],
        [16, "Fluorescente", 2, 'Iluminación', 23, 5, 3, "img/dis/fluorescente.png"],
        [17, "Incandescente", 2, 'Iluminación', 23, 5, 3, "img/dis/incandescente.png"],
        [18, "Ducha Eléctrica", 3, 'Agua Caliente', 3300, 20, 1, "img/dis/ducha.png"],
        [19, "Calefón a Gas", 3, 'Agua Caliente', 150, 5, 2, "img/dis/gas.png"],
        [20, "Sanduchera", 1, 'Electrodomésticos', 750, 4, 1, "img/dis/sanduchera.png"],
        [21, "Equipo de Sonido", 1, 'Electrodomésticos', 100, 20, 1, "img/dis/equipo-sonido.png"],
        [22, "Otro", 1, 'Electrodomésticos', 100, 1, 1, "img/dis/otro.png"],
        [23, "Iluminación", 4, 'Otros', 10, 0, 0, "img/dis/iluminacion.png"],
        [24, "Agua Caliente", 4, 'Otros', 10, 0, 0, "img/dis/aguaCaliente.png"]
    ];

    Ext.define('DispositivosModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'idCategoria', type: 'int'},
            {name: 'categoria', type: 'string'},
            {name: 'potencia', type: 'float'},
            {name: 'tiempoUso', type: 'int'},
            {name: 'idPeriodo', type: 'int'},
            {name: 'url', type: 'string'},
            {name: 'optimo', type: 'int'}
        ]
    });

    storeDispositivos = Ext.create('Ext.data.ArrayStore', {
        model: 'DispositivosModel',
        sortInfo: {
            field: 'name',
            direction: 'ASC'
        },
        data: data
    });
});