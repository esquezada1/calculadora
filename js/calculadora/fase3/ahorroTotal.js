var consumoMayores, optimizacionConsumo, porcentajeAhorroTotal;
var heightBarraDetalle = 68;

consumoMayores = Ext.create('Ext.panel.Panel', {
    height: 100,
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">MAYORES CONSUMIDORES</strong></center>',
    flex: 2,
    layout: 'hbox',
    items: [{
            flex: 1,
            cls: 'barraDetalle',
            height: heightBarraDetalle,
            title: '<center class="titDetalle"><strong>CONSUMO</strong></center>',
            html: '<p class="valorTotal" id="consumoTotalDis">0 kWh</p>'
        }, {
            flex: 1,
            cls: 'barraDetalle',
            height: heightBarraDetalle,
            style: 'border-right-width: 0px !important;',
            title: '<center class="titDetalle"><strong>EMISIONES</strong></center>',
            html: '<p class="valorTotal" id="consumoTotalDisEmi">0 kg de CO<sub>2</sub></p>'
        }]
});

optimizacionConsumo = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">OPTIMIZACIÓN</strong></center>',
    flex: 2,
    height: 100,
    layout: 'hbox',
    items: [{
            flex: 1,
            cls: 'barraDetalle',
            height: heightBarraDetalle,
            style: 'border-left-width: 0px !important;',
            title: '<center class="titDetalle"><strong>CONSUMO</strong></center>',
            html: '<p class="valorTotal" id="optimizacionTotalDis">0KWH</p>'
        }, {
            flex: 1,
            cls: 'barraDetalle',
            height: heightBarraDetalle,
            style: 'border-right-width: 0px !important;',
            title: '<center class="titDetalle"><strong>EMISIONES</strong></center>',
            html: '<p class="valorTotal" id="optimizacionTotalDisEmi">0 kg de CO<sub>2</sub></p>'
        }]
});

porcentajeAhorroTotal = Ext.create('Ext.panel.Panel', {
    height: 100,
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
    html: '<p class="valorTotal" style="margin-top: 3% !important; font-size: 200% !important;" id="ahorroTotalDis">0%</p>',
    flex: 1
});

ahorroTotal = Ext.create('Ext.panel.Panel', {
    width: '100%',
    items: [
        {
            layout: 'hbox',
            items: [consumoMayores, optimizacionConsumo, porcentajeAhorroTotal]
        }
    ]
});
