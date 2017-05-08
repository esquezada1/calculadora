var resultados, barraResultados;
var widthLeft = '10%', widthCentral = '40%', widthRight = '50%', heightTitResultados = 100, heightResultados = 70;
Ext.onReady(function () {

    barraResultados = Ext.create('Ext.panel.Panel', {
        items: [
            {
                layout: 'hbox',
                items: [{
                        flex: 1,
                        cls: 'consumoTotal',
                        title: '<center><strong style="color:#003F72;">OPCIONES DE AHORRO</strong></center>',
                        items: [{
                                xtype: 'checkboxgroup',
                                items: [
                                    {flex: 1, labelAlign: 'top', fieldLabel: '<b>Consejos de Ahorro</b>', labelStyle: 'height: 50px', cls: 'checkResultados'},
                                    {flex: 1, labelAlign: 'top', fieldLabel: '<b>Panel Solar</b>', labelStyle: 'height: 50px', checked: true, cls: 'checkResultados'},
                                    {flex: 1, labelAlign: 'top', fieldLabel: '<b>Colector Solar</b>', labelStyle: 'height: 50px', cls: 'checkResultados'}
                                ]
                            }
                        ]
                    }, {
                        flex: 1,
                        cls: 'consumoTotal',
                        title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
                        html: '<p class="valorTotal" style="margin-top: 3% !important; margin-bottom: 8% !important; font-size: 200% !important;" id="ahorroTotalDis">0%</p>',
                    }
                ]
            }
        ]
    });

    resultados = Ext.create('Ext.panel.Panel', {
        margin: '15 0 0 0',
        items: [{
                layout: 'hbox',
                items: [{
                        width: widthLeft,
                        cls: 'consumoTotalDis',
                        height: heightTitResultados,
                        bodyStyle: 'background-image:url(img/resultados.png) !important; background-repeat:no-repeat !important; background-size: 100% 100% !important;'
                    },
                    {
                        width: widthCentral,
                        cls: 'consumoTotalDis',
                        height: heightTitResultados,
                        html: '<center class="valorTotalRes" style="color:#003F72; font-size: 120%; padding-top: 8%;"><strong>CONSUMO DEL HOGAR</strong></center>',
                    },
                    {
                        width: widthRight,
                        cls: 'consumoTotalDis',
                        height: heightTitResultados,
                        html: '<center class="valorTotalRes" style="color:#003F72; font-size: 120%; padding-top: 7%;"><strong>OPTIMIZACIÒN DEL HOGAR</strong></center>',
                    }]
            }, {
                layout: 'hbox',
                items: [{
                        width: widthLeft,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<center class="titleAhorroRes"><strong style="color:#003F72; font-size: 85%; padding-top: 5% !important;">CONSUMO</strong></center>',
                    },
                    {
                        width: widthCentral,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<p class="valorTotalRes" id="optimizacionDis1">0KWH</p>'
                    },
                    {
                        width: widthRight,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<p class="valorTotalRes" id="ahorroDis1">0%</p>'
                    }]
            }, {
                layout: 'hbox',
                items: [{
                        width: widthLeft,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<center class="titleAhorroRes"><strong style="color:#003F72; font-size: 85%; padding-top: 5% !important;">EMISIONES</strong></center>',
                    },
                    {
                        width: widthCentral,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<p class="valorTotalRes" id="optimizacionDis1">0KWH</p>'
                    },
                    {
                        width: widthRight,
                        cls: 'consumoTotalDis',
                        height: heightResultados,
                        html: '<p class="valorTotalRes" id="ahorroDis1">0%</p>'
                    }]
            }]
    });

});

