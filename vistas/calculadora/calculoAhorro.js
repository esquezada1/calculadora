var consejosAhorro, panelesSolares, gridConsejos, storeConsejos1, storeConsejos2, storeConsejos3, storeConsejos4;
var ahorroTotal;

Ext.onReady(function () {
    var heightConsejos = 235, heightGridConsejos = 155;
    Ext.define('AhorroModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'idMaquina', type: 'int'},
            {name: 'consejo', type: 'string'},
            {name: 'ahorro', type: 'int'},
            {name: 'cambio', type: 'bool'},
            {name: 'active', type: 'bool'}
        ]
    });

    var dataAhorro = [
        {id: 1, idMaquina: 1, consejo: 'Pasar de tecnologia LCD  a tecnologia LED', ahorro: 40, cambio: true},
        {id: 2, idMaquina: 1, consejo: 'Eliminar el uso Stan by', ahorro: 40},
        {id: 3, idMaquina: 4, consejo: 'Usar ollas con diametro superior al de la placa', ahorro: 20},
        {id: 4, idMaquina: 4, consejo: 'Tapar los recipientes a la hora de cocinar', ahorro: 20},
        {id: 5, idMaquina: 4, consejo: 'Usar olla de presion para cocinar', ahorro: 60},
        {id: 6, idMaquina: 5, consejo: 'Configurar a Capacidad variable automatica', ahorro: 40},
        {id: 7, idMaquina: 5, consejo: 'Cambiar a una lavadora mas eficiente de Etiqueta A', ahorro: 45, cambio: true},
        {id: 8, idMaquina: 6, consejo: 'No abrir innecesariamente la puerta del congelador', ahorro: 2},
        {id: 9, idMaquina: 6, consejo: 'Aumentar grado de temperatura', ahorro: 5},
        {id: 10, idMaquina: 6, consejo: 'No abrir innecesariamente la puerta del refrigerador', ahorro: 8},
        {id: 11, idMaquina: 6, consejo: 'No ingresar comidas calientes ', ahorro: 15},
        {id: 12, idMaquina: 6, consejo: 'No pegar el refrigerador contra la pared', ahorro: 15},
        {id: 13, idMaquina: 6, consejo: 'Descongelar antes de que la capa de hielo alcance 3mm de espesor', ahorro: 30},
        {id: 14, idMaquina: 6, consejo: 'Cambiar a un rerigerador  mas eficiente de Etiqueta A ', ahorro: 70, cambio: true},
        {id: 15, idMaquina: 8, consejo: 'Usar planchas con centro de planchado compacto en vez de las planchas convencionales de vapor', ahorro: 46, cambio: true},
        {id: 16, idMaquina: 10, consejo: 'Cambiar a un aire mas eficiente  de tecnologia inverter', ahorro: 60},
        {id: 17, idMaquina: 10, consejo: 'Instalar toldos ( carpas) en las ventanas ', ahorro: 30},
        {id: 18, idMaquina: 13, consejo: 'No abrir innecesariamente la puerta del horno ', ahorro: 20},
        {id: 19, idMaquina: 13, consejo: 'Se recomienda usar microondas', ahorro: 70},
        {id: 20, idMaquina: 23, consejo: 'Cambiar focos incandecentes a led', ahorro: 90, cambio: true},
        {id: 21, idMaquina: 23, consejo: 'Cambiar focos incandecentes a fluoroscentes', ahorro: 80, cambio: true},
        {id: 22, idMaquina: 23, consejo: 'Cambiar de Fluorescentes a Led ', ahorro: 60, cambio: true}
    ];

    storeConsejos1 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro,
        sorters: [{
                property: 'cambio',
                direction: 'DESC'
            }, {
                property: 'ahorro',
                direction: 'DESC'
            }]
    });

    storeConsejos2 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro,
        sorters: [{
                property: 'cambio',
                direction: 'DESC'
            }, {
                property: 'ahorro',
                direction: 'DESC'
            }]
    });

    storeConsejos3 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro,
        sorters: [{
                property: 'cambio',
                direction: 'DESC'
            }, {
                property: 'ahorro',
                direction: 'DESC'
            }]
    });

    storeConsejos4 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro,
        sorters: [{
                property: 'cambio',
                direction: 'DESC'
            }, {
                property: 'ahorro',
                direction: 'DESC'
            }]
    });

    var columnsGrids = [
        {header: '<center>Optimización de consumo</center>', dataIndex: 'consejo', width: 289,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip=\"' + value + '\"';
                var srcIcon = "";
                if (record.get('cambio')) {
                    srcIcon = "img/cambio.png";
                } else {
                    srcIcon = "img/consejo.png";
                }
                return '<img style="padding-top:1%" width="15" height="15" src="' + srcIcon + '"> ' + value;
            }
        },
        {header: '<center>Ahorro</center>', dataIndex: 'ahorro', width: 70,
            renderer: function (value) {
                return value + "%";
            }},
        {header: '', xtype: 'checkcolumn', width: 34, sortable: false, dataIndex: 'active', menuDisabled: true,
            listeners: {
                checkchange: function (comp, rowIndex, checked, eOpts, a, b, c) {
                    var gridId = comp.up('grid').getId();
                    aplicarConsejos(gridId);
                }
            }
        }
    ];

    var viewConfig = {
        loadingText: 'Cargando...',
        emptyText: '<br><center>No tiene optimización de consumo</center>'
    };

    gridConsejos1 = Ext.create('Ext.panel.Panel', {
        width: '50%',
        height: heightConsejos,
        cls: 'panel-consejos',
        items: [
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        height: heightGridConsejos,
                        xtype: 'panel',
                        html: '<img class="img-consumidores" id="img-consumidor1"><center id="nombre-consumidor1"></center>'
                    },
                    {
                        id: 'gridConsejos1',
                        width: '80%',
                        height: heightGridConsejos,
                        xtype: 'grid',
                        frame: true,
                        multiSelect: false,
                        columnLines: true,
                        cls: 'tablas-calculadora',
                        store: storeConsejos1,
                        columns: columnsGrids,
                        viewConfig: viewConfig
                    }]
            },
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">COSUMO DEL<br>DISPOSITIVO</strong></center>',
                        html: '<p class="valorTotalDis" id="consumoDis1">0KWH</p>'
                    },
                    {
                        width: '56%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 95%;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
                        html: '<p class="valorTotalDis" id="optimizacionDis1">0KWH</p>'
                    },
                    {
                        width: '23%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">PORCENTAJE DE<br>AHORRO</strong></center>',
                        html: '<p class="valorTotalDis" id="ahorroDis1">0%</p>'
                    }]
            }]
    });

    gridConsejos2 = Ext.create('Ext.panel.Panel', {
        width: '50%',
        height: heightConsejos,
        cls: 'panel-consejos',
        items: [
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        height: heightGridConsejos,
                        xtype: 'panel',
                        html: '<img class="img-consumidores" id="img-consumidor2"><center id="nombre-consumidor2"></center>'
                    },
                    {
                        id: 'gridConsejos2',
                        width: '80%',
                        height: heightGridConsejos,
                        xtype: 'grid',
                        frame: true,
                        multiSelect: false,
                        columnLines: true,
                        cls: 'tablas-calculadora',
                        store: storeConsejos2,
                        columns: columnsGrids,
                        viewConfig: viewConfig
                    }]
            },
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">COSUMO DEL<br>DISPOSITIVO</strong></center>',
                        html: '<p class="valorTotalDis" id="consumoDis2">0KWH</p>'
                    },
                    {
                        width: '56%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 95%;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
                        html: '<p class="valorTotalDis" id="optimizacionDis2">0KWH</p>'
                    },
                    {
                        width: '23%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">PORCENTAJE DE<br>AHORRO</strong></center>',
                        html: '<p class="valorTotalDis" id="ahorroDis2">0%</p>'
                    }]
            }]
    });

    gridConsejos3 = Ext.create('Ext.panel.Panel', {
        width: '50%',
        height: heightConsejos,
        cls: 'panel-consejos',
        items: [
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        height: heightGridConsejos,
                        xtype: 'panel',
                        html: '<img class="img-consumidores" id="img-consumidor3"><center id="nombre-consumidor3"></center>'
                    },
                    {
                        id: 'gridConsejos3',
                        width: '80%',
                        height: heightGridConsejos,
                        xtype: 'grid',
                        frame: true,
                        multiSelect: false,
                        columnLines: true,
                        cls: 'tablas-calculadora',
                        store: storeConsejos3,
                        columns: columnsGrids,
                        viewConfig: viewConfig
                    }]
            },
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">COSUMO DEL<br>DISPOSITIVO</strong></center>',
                        html: '<p class="valorTotalDis" id="consumoDis3">0KWH</p>'
                    },
                    {
                        width: '56%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 95%;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
                        html: '<p class="valorTotalDis" id="optimizacionDis3">0KWH</p>'
                    },
                    {
                        width: '23%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">PORCENTAJE DE<br>AHORRO</strong></center>',
                        html: '<p class="valorTotalDis" id="ahorroDis3">0%</p>'
                    }]
            }]
    });

    gridConsejos4 = Ext.create('Ext.panel.Panel', {
        width: '50%',
        height: heightConsejos,
        cls: 'panel-consejos',
        items: [
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        height: heightGridConsejos,
                        xtype: 'panel',
                        html: '<img class="img-consumidores" id="img-consumidor4"><center id="nombre-consumidor4"></center>'
                    },
                    {
                        id: 'gridConsejos4',
                        width: '80%',
                        height: heightGridConsejos,
                        xtype: 'grid',
                        frame: true,
                        multiSelect: false,
                        columnLines: true,
                        cls: 'tablas-calculadora',
                        store: storeConsejos4,
                        columns: columnsGrids,
                        viewConfig: viewConfig
                    }]
            },
            {
                layout: 'hbox',
                items: [{
                        width: '20%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">COSUMO DEL<br>DISPOSITIVO</strong></center>',
                        html: '<p class="valorTotalDis" id="consumoDis4">0KWH</p>'
                    },
                    {
                        width: '56%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 95%;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
                        html: '<p class="valorTotalDis" id="optimizacionDis4">0KWH</p>'
                    },
                    {
                        width: '23%',
                        cls: 'consumoTotalDis',
                        title: '<center class="titleAhorroDis"><strong style="color:#003F72; font-size: 85%;">PORCENTAJE DE<br>AHORRO</strong></center>',
                        html: '<p class="valorTotalDis" id="ahorroDis4">0%</p>'
                    }]
            }]
    });

    viewConsejos = Ext.create('Ext.panel.Panel', {
        defaults: {
            margin: '5 5 5 5'
        },
        height: 250,
        autoScroll: true,
        items: [{
                layout: 'hbox',
                items: [gridConsejos1, gridConsejos2]
            }, {
                layout: 'hbox',
                items: [gridConsejos3, gridConsejos4]
            }]
    });

    consejosAhorro = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Consejos de Ahorro',
        items: [ahorroTotal, viewConsejos]
    });

    panelesSolares = Ext.create('Ext.panel.Panel', {
        cls: 'tabs-ahorro',
        title: 'Paneles Solares',
        html: 'Paneles Solares'
    });
});