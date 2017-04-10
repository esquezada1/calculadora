var consejosAhorro, panelesSolares, gridConsejos, storeConsejos1, storeConsejos2, storeConsejos3, storeConsejos4;
var ahorroTotal;

Ext.onReady(function () {
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
        {id: 6, idMaquina: 5, consejo: 'Configurar a "Capacidad variable automatica"', ahorro: 40},
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
        {id: 19, idMaquina: 13, consejo: 'Se recomienda usar microondas ', ahorro: 70},
        {id: 20, idMaquina: 23, consejo: 'Cambiar focos incandecentes a led', ahorro: 30, cambio: true},
        {id: 21, idMaquina: 23, consejo: 'Cambiar focos incandecentes a fluoroscentes', ahorro: 30, cambio: true},
        {id: 22, idMaquina: 23, consejo: 'Cambiar de Fluorescentes a Led ', ahorro: 30, cambio: true}
    ];

    storeConsejos1 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro
    });

    storeConsejos2 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro
    });

    storeConsejos3 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro
    });

    storeConsejos4 = Ext.create('Ext.data.Store', {
        model: 'AhorroModel',
        data: dataAhorro
    });

    var columnsGrids = [
        {header: '<center>Consejo</center>', dataIndex: 'consejo', width: 290},
        {header: '<center>Ahorro<br>de energía</center>', dataIndex: 'ahorro', width: 85, renderer: function (value) {
                return value + "%";
            }},
        {header: '', xtype: 'checkcolumn', width: 35, sortable: false, dataIndex: 'active', menuDisabled: true}
    ];

    var viewConfig = {
        loadingText: 'Cargando...',
        emptyText: '<br><center>No hay consejos disponibles</center>'
    };

    gridConsejos1 = Ext.create('Ext.panel.Panel', {
        flex: 1,
        layout: 'hbox',
        height: 150,
        cls: 'panel-consejos',
        items: [{
                width: '20%',
                height: 150,
                xtype: 'panel',
                html: '<img class="img-consumidores" id="img-consumidor1">'
            },
            {
                width: '80%',
                height: 150,
                xtype: 'grid',
                frame: true,
                multiSelect: false,
                columnLines: true,
                cls: 'tablas-calculadora',
                store: storeConsejos1,
                columns: columnsGrids
            }],
        viewConfig: viewConfig
    });

    gridConsejos2 = Ext.create('Ext.panel.Panel', {
        flex: 1,
        layout: 'hbox',
        height: 150,
        cls: 'panel-consejos',
        items: [{
                width: '20%',
                height: 150,
                xtype: 'panel',
                html: '<img class="img-consumidores" id="img-consumidor2">'
            },
            {
                width: '80%',
                height: 150,
                xtype: 'grid',
                frame: true,
                multiSelect: false,
                columnLines: true,
                cls: 'tablas-calculadora',
                store: storeConsejos2,
                columns: columnsGrids
            }],
        viewConfig: viewConfig
    });

    gridConsejos3 = Ext.create('Ext.panel.Panel', {
        flex: 1,
        layout: 'hbox',
        height: 150,
        cls: 'panel-consejos',
        items: [{
                height: 150,
                width: '20%',
                xtype: 'panel',
                html: '<img class="img-consumidores" id="img-consumidor3">'
            },
            {
                width: '80%',
                height: 150,
                xtype: 'grid',
                frame: true,
                multiSelect: false,
                columnLines: true,
                cls: 'tablas-calculadora',
                store: storeConsejos3,
                columns: columnsGrids
            }],
        viewConfig: viewConfig
    });

    gridConsejos4 = Ext.create('Ext.panel.Panel', {
        flex: 1,
        layout: 'hbox',
        height: 150,
        cls: 'panel-consejos',
        items: [{
                width: '20%',
                height: 150,
                xtype: 'panel',
                html: '<img class="img-consumidores" id="img-consumidor4">'
            },
            {
                width: '80%',
                height: 150,
                xtype: 'grid',
                frame: true,
                multiSelect: false,
                columnLines: true,
                cls: 'tablas-calculadora',
                store: storeConsejos4,
                columns: columnsGrids
            }],
        viewConfig: viewConfig
    });

    viewConsejos = Ext.create('Ext.panel.Panel', {
        defaults: {
            margin: '5 5 5 5'
        },
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