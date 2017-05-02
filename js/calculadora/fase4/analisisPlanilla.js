var planillaNormal, planillaOptimizada, planilla;

Ext.onReady(function () {

    planillaNormal = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: '<b style="color:#003F72;">CONSUMO TOTAL DEL HOGAR </b>',
        flex: 1,
        height: 250,
        layout: 'anchor',
        padding: 15,
        autoScroll: true,
        items: [
            {
                xtype: 'panel',
                html: '<center><b>SUMINISTRO DEL SERVICIO ELÉCTRICO</b></center>'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                title: '<b style="color: black;">LECTURA</b>',
                cls: 'panel-valores',
                margin: '5 0 5 0',
                padding: '3 20 3 20',
                items: [{
                        width: '50%',
                        layout: 'anchor',
                        items: [
                            {
                                html: '<span class="clsCaracteristicas"><b>Consumo</b></span>'
                            }, {
                                html: '<span class="clsValores" >0 Kwh</span>'
                            }
                        ]
                    },
                    {
                        width: '50%',
                        layout: 'anchor',
                        items: [
                            {
                                html: '<span class="clsCaracteristicas"><b>Precio Kwh</b></span>'
                            }, {
                                html: '<span class="clsValores" >50 * 0,091 = 4,55</span>'
                            }
                        ]
                    }]
            },
            {
                xtype: 'panel',
                layout: 'anchor',
                cls: 'panel-valores',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Total venta de energia (1)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >$ 50</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Cargo por comercialización (2)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        html: '<center class="clsCaracteristicas"><b>IMPUESTOS</b></center>'
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas">Bomberos</span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas">Alumbrado Público</span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Total impuestos (3)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" > $0</span>'
                                    }
                                ]
                            }
                        ]
                    }
                ]},
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-planilla',
                items: [
                    {
                        width: '20%',
                        html: ''
                    },
                    {
                        width: '60%',
                        html: '<span class="clsCaracteristicas"><b>TOTAL A PAGAR (1) + (2) + (3)</b></span>'
                    }, {
                        width: '20%',
                        html: '<span class="clsValores"> $0</span>'
                    }
                ]
            }
        ]
    });
    planillaOptimizada = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: '<b style="color:#003F72;"> OPTIMIZACIÓN DEL CONSUMO </b>',
        flex: 1,
        height: 250,
        layout: 'anchor',
        padding: 15,
        autoScroll: true,
        items: [
            {
                xtype: 'panel',
                html: '<center><b>SUMINISTRO DEL SERVICIO ELÉCTRICO</b></center>'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                title: '<b style="color: black;">LECTURA</b>',
                cls: 'panel-valores',
                margin: '5 0 5 0',
                padding: '3 20 3 20',
                items: [{
                        width: '50%',
                        layout: 'anchor',
                        items: [
                            {
                                html: '<span class="clsCaracteristicas"><b>Consumo</b></span>'
                            }, {
                                html: '<span class="clsValores" >0 Kwh</span>'
                            }
                        ]
                    },
                    {
                        width: '50%',
                        layout: 'anchor',
                        items: [
                            {
                                html: '<span class="clsCaracteristicas"><b>Precio Kwh</b></span>'
                            }, {
                                html: '<span class="clsValores" >50 * 0,091 = 4,55</span>'
                            }
                        ]
                    }]
            },
            {
                xtype: 'panel',
                layout: 'anchor',
                cls: 'panel-valores',
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Total venta de energia (1)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >$ 50</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Cargo por comercialización (2)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        html: '<center class="clsCaracteristicas"><b>IMPUESTOS</b></center>'
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas">Bomberos</span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas">Alumbrado Público</span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" >0</span>'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                width: '30%',
                                layout: 'anchor'
                            },
                            {
                                width: '70%',
                                layout: 'hbox',
                                items: [
                                    {
                                        width: '80%',
                                        html: '<span class="clsCaracteristicas"><b>Total impuestos (3)</b></span>'
                                    }, {
                                        width: '20%',
                                        html: '<span class="clsValores" > $0</span>'
                                    }
                                ]
                            }
                        ]
                    }
                ]},
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-planilla',
                items: [
                    {
                        width: '20%',
                        html: ''
                    },
                    {
                        width: '60%',
                        html: '<span class="clsCaracteristicas"><b>TOTAL A PAGAR (1) + (2) + (3)</b></span>'
                    }, {
                        width: '20%',
                        html: '<span class="clsValores"> $0</span>'
                    }
                ]
            }
        ]
    });

    barraPlanilla = Ext.create('Ext.panel.Panel', {
        width: '100%',
        items: [
            {
                layout: 'hbox',
                items: [{
                        cls: 'consumoTotal',
                        title: '<center><strong style="color:#003F72;">CONSUMO DE MAYORES CONSUMIDORES</strong></center>',
                        html: '<p class="valorTotal">0KWH</p>',
                        flex: 1
                    }, {
                        cls: 'consumoTotal',
                        title: '<center><strong style="color:#003F72;">OPTIMIZACIÓN DEL CONSUMO</strong></center>',
                        html: '<p class="valorTotal" >0KWH</p>',
                        flex: 1
                    }, {
                        cls: 'consumoTotal',
                        title: '<center><strong style="color:#003F72;">PORCENTAJE DE AHORRO</strong></center>',
                        html: '<p class="valorTotal" >0%</p>',
                        flex: 1
                    }]
            }
        ]
    });
});

