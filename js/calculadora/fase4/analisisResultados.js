var resultados, barraResultados;
var widthTotal = '35%', widthOptimizado = '65%', margenGeneral = '5 5 0 5', heightResultados = 270;
Ext.onReady(function () {

    barraResultados = Ext.create('Ext.panel.Panel', {

        layout: 'hbox',
        margin: margenGeneral,
        items: [{
                width: widthTotal,
                margin: margenGeneral,
                cls: 'barraResultados',
                title: '<center><strong style="color:#003F72;"><h3>CONSUMO DEL HOGAR</h3></strong></center>',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '65%',
                                html: '<center><b>Porcentaje de aporte al consumidor</b></center>'
                            },
                            {
                                width: '35%',
                                html: '<center><b id="precioSust">0.00 %</b></center>'
                            }]
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '65%',
                                html: '<center><b>Porcentaje de aporte al consumidor</b></center>'
                            },
                            {
                                width: '35%',
                                html: '<center><b id="precioSust">0.00 %</b></center>'
                            }]
                    }
                ]

            }, {
                width: widthOptimizado,
                margin: margenGeneral,
                cls: 'barraResultados',
                title: '<center><strong style="color:#003F72;"><h3>OPTIMIZACIÓN DEL HOGAR</h3></strong></center>',
                items: [{
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '60%',
                                html: '<center><b>Porcentaje de aporte al consumidor</b></center>'
                            },
                            {
                                width: '40%',
                                html: '<center><b id="precioSust">0.00 %</b></center>'
                            }]
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '60%',
                                html: '<center><b>Porcentaje de aporte al consumidor</b></center>'
                            },
                            {
                                width: '40%',
                                html: '<center><b id="precioSust">0.00 %</b></center>'
                            }]
                    }]
            }
        ]
    });

    resultados = Ext.create('Ext.panel.Panel', {
        margin: margenGeneral,
        layout: 'hbox',
        height: heightResultados,
        items: [{
                width: widthTotal,
                id: 'casa-ahorro',
                margin: margenGeneral,
                height: 250,
                html: '<img src="img/casa-resultados.png" id="casa-resultados">'
            }, {
                width: widthOptimizado,
                margin: margenGeneral,
                height: heightResultados,
                layout: 'hbox',
                items: [
                    {
                        width: '65%',
                        margin: margenGeneral,
                        title: '<center><strong style="color:black;">RESUMEN DE MEDIDAS DE OPTIMIZACIÓN </strong></center>',
                        items: [
                            {
                                cls: 'resumen-medidas',
                                items: [
                                    {id: 'checkConsejosRes', xtype: 'checkbox', flex: 1, fieldLabel: '<b>Optimización de Ahorro</b>', labelStyle: 'width: 380px', cls: 'checkResultados',
                                        listeners: {
                                            change: function (object, check) {
                                                if (check) {
                                                    cambiarResultados(object);
                                                }
                                            }
                                        }
                                    },
                                    {
                                        id: 'ResumenOptimizacion',
                                        html: 'Resumen Optimizacion de consumo'
                                    }
                                ]
                            }, {
                                cls: 'resumen-medidas',
                                items: [
                                    {id: 'checkPanelesRes', xtype: 'checkbox', flex: 1, fieldLabel: '<b>Panel Solar</b>', labelStyle: 'width: 380px', cls: 'checkResultados',
                                        listeners: {
                                            change: function (object, check) {
                                                if (check) {
                                                    cambiarResultados(object);
                                                }
                                            }
                                        }},
                                    {
                                        id: 'ResumenPaneles',
                                        html: 'Resumen Paneles Solares'
                                    }
                                ]
                            }, {
                                cls: 'resumen-medidas',
                                items: [
                                    {id: 'checkColectorRes', xtype: 'checkbox', flex: 1, fieldLabel: '<b>Colector Solar</b>', labelStyle: 'width: 380px', cls: 'checkResultados',
                                        listeners: {
                                            change: function (object, check) {
                                                if (check) {
                                                    cambiarResultados(object);
                                                }
                                            }
                                        }},
                                    {
                                        id: 'ResumenColector',
                                        html: 'Resumen Colector Solar'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        width: '35%',
                        height: heightResultados,
                        cls: 'consumoTotal',
                        margin: margenGeneral,
                        title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
                        html: '<p class="valorTotal" style="margin-top: 3% !important; font-size: 200% !important;" id="ahorroTotalDis">0%</p>',
                    }
                ]
            }]
    });

});

