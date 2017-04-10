var consejosAhorro, panelesSolares, gridConsejos, storeConsejosDispositivos;
var ahorroTotal;

Ext.onReady(function () {
    consejosAhorro = Ext.create('Ext.panel.Panel', {
        title: 'Consejos de Ahorro',
        items: [ahorroTotal, gridConsejos]
    });

    panelesSolares = Ext.create('Ext.panel.Panel', {
        title: 'Paneles Solares',
        html: 'Paneles Solares'
    });

    gridConsejos = Ext.create('Ext.grid.Panel', {
        width: 300,
        data: [{consejo1:'hola'}],
        columns: [
            {header: 'consejo1', width: 100},
            {header: 'consejo2', width: 120}
        ]
    });

    storeConsejosDispositivos = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'idMaquina', type: 'int'},
            {name: 'consejo', type: 'string'},
            {name: 'ahorro', type: 'int'},
            {name: 'cambio', type: 'bool'}
        ],
        data: [
            {id: 1, idMaquina: 1, consejo: 'Pasar de tecnologia LCD  a tecnologia LED', cant: 40, cambio: true},
            {id: 2, idMaquina: 1, consejo: 'Eliminar el uso Stan by', cant: 40},
            {id: 3, idMaquina: 4, consejo: 'Usar ollas con diametro superior al de la placa', cant: 20},
            {id: 4, idMaquina: 4, consejo: 'Tapar los recipientes a la hora de cocinar', cant: 20},
            {id: 5, idMaquina: 4, consejo: 'Usar olla de presion para cocinar', cant: 60},
            {id: 6, idMaquina: 5, consejo: 'Configurar a "Capacidad variable automatica"', cant: 40},
            {id: 7, idMaquina: 5, consejo: 'Cambiar a una lavadora mas eficiente de Etiqueta A', cant: 45, cambio: true},
            {id: 8, idMaquina: 6, consejo: 'No abrir innecesariamente la puerta del congelador', cant: 2},
            {id: 9, idMaquina: 6, consejo: 'Aumentar grado de temperatura', cant: 5},
            {id: 10, idMaquina: 6, consejo: 'No abrir innecesariamente la puerta del refrigerador', cant: 8},
            {id: 11, idMaquina: 6, consejo: 'No ingresar comidas calientes ', cant: 15},
            {id: 12, idMaquina: 6, consejo: 'No pegar el refrigerador contra la pared', cant: 15},
            {id: 13, idMaquina: 6, consejo: 'Descongelar antes de que la capa de hielo alcance 3mm de espesor', cant: 30},
            {id: 14, idMaquina: 6, consejo: 'Cambiar a un rerigerador  mas eficiente de Etiqueta A ', cant: 70, cambio: true},
            {id: 15, idMaquina: 8, consejo: 'Usar planchas con centro de planchado compacto en vez de las planchas convencionales de vapor', cant: 46, cambio: true},
            {id: 16, idMaquina: 10, consejo: 'Cambiar a un aire mas eficiente  de tecnologia inverter', cant: 60},
            {id: 17, idMaquina: 10, consejo: 'Instalar toldos ( carpas) en las ventanas ', cant: 30},
            {id: 18, idMaquina: 13, consejo: 'No abrir innecesariamente la puerta del horno ', cant: 20},
            {id: 19, idMaquina: 13, consejo: 'Se recomienda usar microondas ', cant: 70},
            {id: 20, idMaquina: 23, consejo: 'Cambiar focos incandecentes a led', cant: 30, cambio: true},
            {id: 21, idMaquina: 23, consejo: 'Cambiar focos incandecentes a fluoroscentes', cant: 30, cambio: true},
            {id: 22, idMaquina: 23, consejo: 'Cambiar de Fluorescentes a Led ', cant: 30, cambio: true}
        ]
    });
});