var colectorSolar, formularioColector, detalleColector, colectorAhorro = 0;
var storeColector;

Ext.onReady(function () {
    storeColector = Ext.create('Ext.data.Store', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'numPersonas', type: 'int'},
            {name: 'capacidad', type: 'int'},
            {name: 'precio', type: 'int'},
            {name: 'areaInstalacion', type: 'string'},
            {name: 'tiempoVida', type: 'int'}
        ],
        data: [
            {id: 1, numPersonas: 2, capacidad: 100, precio: 600, areaInstalacion: '2.14', tiempoVida: 25},
            {id: 2, numPersonas: 3, capacidad: 160, precio: 650, areaInstalacion: '2.74', tiempoVida: 25},
            {id: 3, numPersonas: 5, capacidad: 200, precio: 750, areaInstalacion: '3.34', tiempoVida: 25},
            {id: 4, numPersonas: 7, capacidad: 240, precio: 850, areaInstalacion: '3.94', tiempoVida: 25},
            {id: 5, numPersonas: 9, capacidad: 300, precio: 950, areaInstalacion: '4.54', tiempoVida: 25}
        ]
    });

    formularioColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: '<b style="color:#003F72;"> DATOS </b>',
        flex: 1,
        height: 270,
        layout: 'anchor',
        padding: 15,
        items: [
            {
                xtype: 'checkbox',
                name: 'checkPanelSolar',
                boxLabel: 'Sustituir consumo de agua caliente en el hogar',
                checked: false,
                listeners: {
                    change: function (store, check) {
                        if (check) {
                            consumoColectorSust();
                            var ahorro = getPorcentajeAhorro(colectorAhorro, mayorConsumo);
                            cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo - colectorAhorro, emisionCO2(mayorConsumo - colectorAhorro), ahorro);
                            formularioColector.down('[name=numeroPersonas]').enable();
                        } else {
                            formularioColector.down('[name=numeroPersonas]').disable();
                            cambiarTotales(mayorConsumo, emisionCO2(mayorConsumo), mayorConsumo   , emisionCO2(mayorConsumo), 0);
                            colectorAhorro = 0;
                        }
                    }
                }
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        width: '70%',
                        html: '<span class="clsCaracteristicas"><b>Cantidad de personas que viven en el hogar</b></span>'
                    },
                    {
                        name: 'numeroPersonas',
                        xtype: 'combobox',
                        store: storeColector,
                        displayField: 'numPersonas',
                        valueField: 'id',
                        width: '27%',
                        value: 1,
                        tpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '<div class="x-boundlist-item">{numPersonas} personas</div>',
                                '</tpl>'),
                        displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{numPersonas} personas',
                                '</tpl>'
                                ),
                        listeners: {select: function (combo, record, eOpts) {
                                var idPersonas = formularioColector.down('[name=numeroPersonas]').getValue();
                                var record = storeColector.getById(idPersonas);
                                var consumo = storeConsumoFinal.getById('Agua Caliente');
                                var costoMayoresConsumidores = calcularCosto(mayorConsumo);
                                var costoMayoresConsumidoresAhorro = calcularCosto(mayorConsumo - consumo.get('kwhMes'));
                                var costoAhorro = costoMayoresConsumidores - costoMayoresConsumidoresAhorro;
                                var amortizacion = record.get('precio') / (costoAhorro * 12);
                                document.getElementById('capacidadTanque').innerHTML = record.get('capacidad') + ' Litros';
                                document.getElementById('inversionColector').innerHTML = '$ ' + record.get('precio');
                                document.getElementById('tiempoVidaColector').innerHTML = record.get('tiempoVida') + ' año(s)';
                                document.getElementById('tiempoAmortizacionColector').innerHTML = (Math.round(amortizacion * 100) / 100) + ' año(s)';
                                document.getElementById('areaInstalacion').innerHTML = record.get('areaInstalacion') + ' m&#178';
                            }}
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                padding: '10 10 10 10',
                html: '<br></br>'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-valores',
                margin: '5 0 5 0',
                padding: '3 20 3 20',
                items: [{
                        width: '70%',
                        html: '<span class="clsCaracteristicas"><b>Consumo a sustituir en el hogar</b></span>'
                    },
                    {
                        width: '30%',
                        html: '<center id="consumoColectorSust" class="clsValores">0 kWh</center>'
                    }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                cls: 'panel-valores',
                margin: '5 0 5 0',
                padding: '3 20 3 20',
                items: [{
                        width: '70%',
                        html: '<span class="clsCaracteristicas"><b>Porcentaje de aporte al consumidor</b></span>'
                    },
                    {
                        width: '30%',
                        html: '<center class="clsValores" id="precioColectorSust">0.00%</center>'
                    }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                padding: '20 5 5 5',
                html: '<br></br>'
            },
            {
                xtype: 'button',
                cls: 'btnSugerencia',
                iconCls: 'icon-info',
                text: 'Sugerencias para el colector solar',
                handler: function () {
                    var conten = '<P ALIGN=CENTER STYLE="margin-right: -0.04in; margin-bottom: 0.11in">\n\
                                    <FONT COLOR="#ff0000">\n\
                                        <FONT FACE="Arial, serif">\n\
                                            <SPAN LANG="es-ES"><B>Sugerencias para el colector solar</B></SPAN>\n\
                                        </FONT>\n\
                                    </FONT>\n\
                                </P> \n\
                                <P ALIGN=CENTER STYLE="margin-right: -0.04in; margin-bottom: 0.11in">\n\
                                    <IMG SRC="img/panelSolar.png" NAME="Colector Solar" ALIGN=BOTTOM WIDTH=426 HEIGHT=211 BORDER=0>\n\
                                </P> \n\
                                <UL>\n\
                                    <LI>\n\
                                        <P ALIGN=JUSTIFY STYLE="margin-right: -0.2in; margin-bottom: 0.11in">\n\
                                            <FONT FACE="Arial, serif">\n\
                                                <SPAN LANG="es-ES">Se debe evitar sombras sobre los colectores solares ya que esto limita la produccion de energia</SPAN>\n\
                                            </FONT>\n\
                                        </P>\n\
                                    </LI>\n\
                                    <LI>\n\
                                        <P ALIGN=JUSTIFY STYLE="margin-right: -0.04in; margin-bottom: 0in">\n\
                                            <FONT FACE="Arial, serif">\n\
                                                <SPAN LANG="es-ES">Los colectores solares se instalan en estructuras especiales, preferiblemente en una estructura \n metalica o de cemento para que soporte el peso del colector</SPAN>\n\
                                            </FONT>\n\
                                        </P>\n\
                                    </LI>\n\
                                </UL>\n\
                                <BR><BR>';
                    abrirVentanaAyudaDis();
                    ventanaAyudaDis.setTitle("Sugerencias");
                    ventanaAyudaDis.body.update(conten);
                }
            }
        ]
    });
    detalleColector = Ext.create('Ext.form.FieldSet', {
        cls: 'tabs-ahorro',
        title: '<b style="color:#003F72;"> CARACTERÍSTICAS DEL SISTEMA </b>',
        flex: 1,
        height: 270,
        layout: 'anchor',
        padding: '0 10 5 5',
        items: [{
                flex: 1,
                padding: '0 0 10 0',
                html: '<center><img src="img/panelSolar.png" style="width:40%; height: 80px;"></center>'
            }, {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        flex: 1,
                        defaults: {
                            margin: '3 0 3 0'
                        },
                        padding: '0 20 0 20',
                        items: [{
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '70%',
                                        html: '<span class="clsCaracteristicas"><b>Capacidad del tanque</b></span>'
                                    },
                                    {
                                        width: '30%',
                                        html: '<center id="capacidadTanque" class="clsValores">0 Litros</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '70%',
                                        html: '<span class="clsCaracteristicas"><b>Inversión</b></span>'
                                    },
                                    {
                                        width: '30%',
                                        html: '<center id="inversionColector" class="clsValores">$ 0.00</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '70%',
                                        html: '<span class="clsCaracteristicas"><b>Tiempo de vida del sistema</b></span>'
                                    },
                                    {
                                        width: '30%',
                                        html: '<center id="tiempoVidaColector" class="clsValores">0 año(s)</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '70%',
                                        html: '<span class="clsCaracteristicas"><b>Tiempo de amortización</b></span>'
                                    },
                                    {
                                        width: '30%',
                                        html: '<center id="tiempoAmortizacionColector" class="clsValores">0 año(s)</center>'
                                    }]
                            }, {
                                xtype: 'panel',
                                layout: 'hbox',
                                cls: 'panel-valores',
                                items: [{
                                        width: '70%',
                                        html: '<span class="clsCaracteristicas"><b>Área necesaria para instalación</b></span>'
                                    },
                                    {
                                        width: '30%',
                                        html: '<center id="areaInstalacion" class="clsValores">0 m&#178</center>'
                                    }]
                            }]
                    }]
            }]
    });
    colectorSolar = Ext.create('Ext.panel.Panel', {
        id: 'tabColector',
        cls: 'tabs-ahorro',
        title: 'Colector Solar',
        layout: 'hbox',
        items: [formularioColector, detalleColector]
    });
});

