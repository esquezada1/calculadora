var consumoMayores, optimizacionConsumo, porcentajeAhorroTotal;

consumoMayores = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">CONSUMO DE MAYORES CONSUMIDORES</strong></center>',
    html: '<p class="valorTotal" id="consumoTotalDis">0KWH</p>',
    flex: 1
});

optimizacionConsumo = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
    html: '<p class="valorTotal" id="optimizacionTotalDis">0KWH</p>',
    flex: 1
});

porcentajeAhorroTotal = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
    html: '<p class="valorTotal" id="ahorroTotalDis">0%</p>',
    flex: 1
});

ahorroTotal = Ext.create('Ext.panel.Panel', {
    items: [
        {
            layout: 'hbox',
            items: [consumoMayores, optimizacionConsumo, porcentajeAhorroTotal]
        }, {
            style: 'background-color: rgba(255, 255, 255, 0.9) !important;',
            html: '<img style="padding-top:2px" width="15" height="15" src="img/cambio.png"> Cambio a dispositivo de etiqueta A  |  <img style="padding-top:2px" width="15" height="15" src="img/consejo.png"> Criterio de optimización '
        }
    ]
});
