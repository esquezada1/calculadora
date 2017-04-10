var consumoMayores, optimizacionConsumo, porcentajeAhorroTotal;

consumoMayores = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">CONSUMO DE MAYORES CONSUMIDORES</strong></center>',
    html: '<p class="valorTotal">50KWH</p>',
    flex: 1
});

optimizacionConsumo = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
    html: '<p class="valorTotal">50KWH</p>',
    flex: 1
});

porcentajeAhorroTotal = Ext.create('Ext.panel.Panel', {
    cls: 'consumoTotal',
    title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
    html: '<p class="valorTotal">50%</p>',
    flex: 1
});

ahorroTotal = Ext.create('Ext.panel.Panel', {
    layout: 'hbox',
    items: [consumoMayores, optimizacionConsumo, porcentajeAhorroTotal]
});
