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
        [1, "Televisor", 1, 'Electrodomésticos', 100, "http://www.lg.com/co/images/TV/features/co_cat_tvs_sub-navi_004.jpg"],
        [2, "Licuadora", 1, 'Electrodomésticos', 600, "http://www.tventas.com/img/p/2/4/3/6/8/24368-thickbox_default.jpg"],
        [3, "Portatil", 1, 'Electrodomésticos', 45, "https://i.blogs.es/4acfba/acer-aspire-v5-nav2/450_1000.png"],
        [4, "Cocina", 1, 'Electrodomésticos', 4400, "https://http2.mlstatic.com/cocina-electrica-por-induccion-akio-2-hornallas-8-niveles-D_NQ_NP_20465-MLA20190886580_112014-F.jpg"],
        [5, "Lavadora", 1, 'Electrodomésticos', 321, "http://www.comohacer.eu/wp-content/uploads/2011/11/como-funciona-una-lavadora-2.jpg"],
        [6, "Refrigeradora", 1, 'Electrodomésticos', 150, "http://www.indurama.com/sites/default/files/RI780D.png"],
        [7, "Olla Arrocera", 1, 'Electrodomésticos', 700, "http://tienda.comedera.com/wp-content/uploads/2016/02/olla-arrocera-electrica.jpg"],
        [8, "Plancha", 1, 'Electrodomésticos', 1200, "http://blackanddeckerhome.com/ve/wp-content/themes/wpbootstrap/img/products/IRBD100_B+D_FP%20copy.jpg"],
        [9, "Microondas", 1, 'Electrodomésticos', 1000, "http://media.www.bestbuy.com.mx/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/H/o/Horno-Microondas.Conveccion-Samsung-1.1_x1.jpg"],
        [10, "Plancha de Pelo", 1, 'Electrodomésticos', 50, "http://www.andaluciaconfort.es/data/imagenes/HP4669_1.jpg"],
        [11, "Led", 2, 'Iluminación', 9, "http://cipresshop.com/513-thickbox_default/foco-led-10-watts-1100-lumenes-mazorca-e27-marte.jpg"],
        [12, "Fluorescente", 2, 'Iluminación', 20, "http://2a33bac5d73c8f56fc53-0b086369f3430e616156762bdbd428e5.r73.cf1.rackcdn.com/productos/622262/622262-z.jpg"],
        [13, "Ducha Eléctrica", 3, 'Agua Caliente', 100, "https://cristobaledu.files.wordpress.com/2012/05/ducha.jpg"],
        [14, "Calefón a Gas", 3, 'Agua Caliente', 150, "http://www.ecoline.com.ec/es/images/stories/virtuemart/product/complementocilindro.jpg"]
    ];

    Ext.define('DispositivosModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            'name',
            'idCategoria',
            'categoria',
            'potencia',
            'url'
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