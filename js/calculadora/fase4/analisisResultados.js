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
                                html: '<center><b>Consumo total del hogar</b></center>'
                            },
                            {
                                width: '35%',
                                html: '<center><b id="resultadosConsumo">0 kWh</b></center>'
                            }]
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '65%',
                                html: '<center><b>Emisiones de CO<sub>2</sub></b></center>'
                            },
                            {
                                width: '35%',
                                html: '<center><b id="resultadosEmision">0 kg de CO<sub>2</sub></b></center>'
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
                                html: '<center><b>Optimización del consumo</b></center>'
                            },
                            {
                                width: '40%',
                                html: '<center><b id="resultadosOptConsumo">0 kWh</b></center>'
                            }]
                    }, {
                        xtype: 'panel',
                        layout: 'hbox',
                        cls: 'panel-valores',
                        margin: '0 0 10 0',
                        items: [{
                                width: '60%',
                                html: '<center><b>Optimización de emisiones de CO<sub>2</sub></b></center>'
                            },
                            {
                                width: '40%',
                                html: '<center><b id="resultadosOptEmision">0 kg de CO<sub>2</sub></b></center>'
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
                        height: 230,
                        width: '65%',
                        autoScroll: true,
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
                                                } else {
                                                    mostrarResultados();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        collapsed: true,
                                        collapsible: true,
                                        titleCollapse: true,
                                        cls: 'detalleColapse',
                                        id: 'ResumenOptimizacion',
                                        padding: '0 15 0 10',
                                        title: '<small style="color:black">Detalle Optimización de consumo</small>'
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
                                                } else {
                                                    mostrarResultados();
                                                }
                                            }
                                        }},
                                    {
                                        collapsed: true,
                                        collapsible: true,
                                        titleCollapse: true,
                                        cls: 'detalleColapse',
                                        id: 'ResumenPaneles',
                                        padding: '0 15 0 10',
                                        title: '<small style="color:black">Detalle Paneles Solares</small>'
                                    }
                                ]
                            }, {
                                cls: 'resumen-medidas',
                                items: [
                                    {id: 'checkColectorRes', disabled: true, xtype: 'checkbox', flex: 1, fieldLabel: '<b>Colector Solar</b>', labelStyle: 'width: 380px', cls: 'checkResultados',
                                        listeners: {
                                            change: function (object, check) {
                                                if (check) {
                                                    cambiarResultados(object);
                                                } else {
                                                    mostrarResultados();
                                                }
                                            }
                                        }},
                                    {
                                        collapsed: true,
                                        collapsible: true,
                                        titleCollapse: true,
                                        cls: 'detalleColapse',
                                        id: 'ResumenColector',
                                        padding: '0 15 0 10',
                                        title: '<small style="color:black">Detalle Colector Solar</small>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        width: '35%',
                        height: 230,
                        cls: 'consumoTotal',
                        padding: '70% 0 0 0',
                        margin: margenGeneral,
                        html: '<center><strong style="color:#003F72;"><h3>PORCENTAJE DE AHORRO</h3></strong></center><p class="valorTotal" style="margin-top: 3% !important; font-size: 200% !important;" id="resultadosAhorro">0%</p>'
                    }
                ]
            }]
    });

});

