var viewDispositivos, storeDispositivos;
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');

Ext.require([
    'Ext.data.*',
    'Ext.util.*',
    'Ext.view.View',
    'Ext.ux.DataView.Animated',
    'Ext.XTemplate',
    'Ext.panel.Panel',
    'Ext.toolbar.*',
    'Ext.slider.Multi'
]);

Ext.onReady(function () {

    var data = [
        [1, "Televisor", 1, 'Electrodomésticos', 90, 3, 3, 0, "img/dis/televisor.png"],
        [2, "Licuadora", 1, 'Electrodomésticos', 600, 1, 2, 0, "img/dis/licuadora.png"],
        [3, "Portátil", 1, 'Electrodomésticos', 45, 4, 3, 0, "img/dis/portatil.png"],
        [4, "Cocina de inducción", 1, 'Electrodomésticos', 2000, 90, 4, 0, "img/dis/cocina.png"],
        [5, "Lavadora", 1, 'Electrodomésticos', 50.23, 3, 2, 40, "img/dis/lavadora.png"],
        [6, "Refrigeradora", 1, 'Electrodomésticos', 40.83, 24, 3, 60, "img/dis/refrigeradora.png",
        "<P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><CENTER><B>¿Cómo encontrar la potencia (W) en su refrigerador?</B></CENTER></SPAN></P><OL><LI><P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Ver la potencia en Watios(W) directamente en el dispositivo</SPAN></P></OL><P LANG='es-ES' STYLE='margin-left: 0.5in; margin-bottom: 0.11in'></P><P STYLE='margin-left: 0.5in; margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref1.jpg' NAME='Imagen 1' ALIGN=BOTTOM WIDTH=228 HEIGHT=233 BORDER=0></CENTER></P><OL START=2>	<LI><P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Pasar del consumo anual (kWh/año) al consumo por hora (W)</SPAN></P></OL><P STYLE='margin-left: 0.5in; margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref2.jpg' NAME='Imagen 9' ALIGN=BOTTOM WIDTH=267 HEIGHT=362 BORDER=0></CENTER></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><FONT SIZE=2 STYLE='font-size: 9pt'><SPAN LANG='es-ES'>Proceso para pasar su consumo anual a Kilovatios por hora(kWh): </SPAN></FONT></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref3.gif' ALIGN=ABSMIDDLE HSPACE=8></CENTER></P><P LANG='es-ES' ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><BR><BR></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref4.gif' ALIGN=ABSMIDDLE HSPACE=8></CENTER></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref5.gif' ALIGN=ABSMIDDLE HSPACE=8></P><P LANG='es-ES' ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'></CENTER><BR></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><FONT SIZE=2 STYLE='font-size: 9pt'><SPAN LANG='es-ES'>Se convierte el consumo a Vatios por hora y el necesario para los cálculos:</SPAN></FONT></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref6.gif' ALIGN=ABSMIDDLE HSPACE=8></P><P LANG='es-ES' ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'></CENTER><BR><BR></P><OL START=3><LI><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Se toma en cuenta la siguiente equivalencia para determinar la potencia (W) de su refrigerador:</SPAN></P></OL><P ALIGN=CENTER STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>1HP = 746 W</SPAN></P><P ALIGN=CENTER STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref7.gif' ALIGN=ABSMIDDLE HSPACE=8></CENTER></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><I>Donde</I></SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><FONT SIZE=2><SPAN LANG='es-ES'>HP (caballo de fuerza) es la potencia del motor (compresor) de la refrigeradora que se encuentra ubicado en la parte posterior del dispositivo. </SPAN></FONT></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><FONT SIZE=2><SPAN LANG='es-ES'>W es la potencia en Watts del consumo por hora de la refrigeradora que se necesita para los cálculos</SPAN></FONT><SPAN LANG='es-ES'>. </SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ref9.png' NAME='Imagen 4' ALIGN=BOTTOM WIDTH=325 HEIGHT=174 BORDER=0><IMG SRC='img/ayuda/ref10.png' NAME='Imagen 23' ALIGN=BOTTOM WIDTH=180 HEIGHT=181 BORDER=0></CENTER></P><P LANG='es-ES' ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><BR><BR></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'>"],
        [7, "Olla Arrocera", 1, 'Electrodomésticos', 700, 28, 1, 0, "img/dis/olla.png"],
        [8, "Plancha", 1, 'Electrodomésticos', 1200, 4, 1, 0, "img/dis/plancha.png"],
        [9, "Microondas", 1, 'Electrodomésticos', 1200, 1, 1, 0, "img/dis/microondas.png"],
        [10, "Aire Acondicionado", 1, 'Electrodomésticos', 1220, 112, 1, 0, "img/dis/aire-acond.png"],
        [11, "Plancha de Pelo", 1, 'Electrodomésticos', 50, 4, 1, 0, "img/dis/plancha-pelo.png"],
        [12, "Aspiradora", 1, 'Electrodomésticos', 700, 8, 1, 0, "img/dis/aspiradora.png"],
        [13, "Horno Eléctrico", 1, 'Electrodomésticos', 0.74, 1, 1, 0, "img/dis/horno.png"],
        [14, "Secador de pelo", 1, 'Electrodomésticos', 1200, 2, 1, 0, "img/dis/secador.png"],
        [15, "Led", 2, 'Iluminación', 23, 5, 3, 0, "img/dis/led.png"],
        [16, "Fluorescente", 2, 'Iluminación', 23, 5, 3, 0, "img/dis/fluorescente.png"],
        [17, "Incandescente", 2, 'Iluminación', 23, 5, 3, 0, "img/dis/incandescente.png"],
        [18, "Ducha Eléctrica", 3, 'Agua Caliente', 3300, 20, 1, 0, "img/dis/ducha.png",
        "<P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><CENTER><B>¿Cómo encontrar la potencia (W) en su ducha eléctrica?</B></CENTER></SPAN></P><OL><LI><P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Ver la potencia en Watios(W) directamente en el dispositivo</SPAN></P></OL><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ducha1.jpg' NAME='Imagen 10' ALIGN=BOTTOM WIDTH=271 HEIGHT=203 BORDER=0></CENTER></P><OL START=2><LI><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Se puede observar el voltaje de operación (V) y la corriente (A) del dispositivo.</SPAN></P></OL><P ALIGN=CENTER STYLE='margin-left: 0.5in; margin-bottom: 0.11in'><CENTER><IMG SRC='img/ayuda/ducha2.png' NAME='Imagen 5' ALIGN=BOTTOM WIDTH=300 HEIGHT=154 BORDER=0></CENTER></P><P STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'>Para calcular el consumo por hora: </SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><CENTER>P=V*I<BR>P=110 V*30 A=3300W</CENTER></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><A NAME='_GoBack'></A><SPAN LANG='es-ES'><I>Donde:</I></SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><I>P es la potencia(W) en Vatios por hora (Watts) que se necesita</I></SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><I>V es el voltaje de operación del dispositivo que viene dado en Voltios(V)</I></SPAN></P><P ALIGN=JUSTIFY STYLE='margin-bottom: 0.11in'><SPAN LANG='es-ES'><I>I es la corriente que necesita el dispositivo para que funcione que viene dado en Amperios (A)</I></SPAN></P>"],
        [19, "Calefón a Gas", 3, 'Agua Caliente', 150, 20, 1, 0, "img/dis/gas.png"],
        [20, "Sanduchera", 1, 'Electrodomésticos', 750, 4, 1, 0, "img/dis/sanduchera.png"],
        [21, "Equipo de Sonido", 1, 'Electrodomésticos', 100, 20, 1, 0, "img/dis/equipo-sonido.png"],
        [22, "Otro", 1, 'Electrodomésticos', 100, 1, 1, 0, "img/dis/otro.png"],
        [23, "Iluminación", 4, 'Otros', 10, 0, 0, 0, "img/dis/iluminacion.png"],
        [24, "Agua Caliente", 4, 'Otros', 10, 0, 0, 0, "img/dis/aguaCaliente.png"]
    ];

    Ext.define('DispositivosModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'idCategoria', type: 'int'},
            {name: 'categoria', type: 'string'},
            {name: 'potencia', type: 'float'},
            {name: 'tiempoUso', type: 'int'},
            {name: 'idPeriodo', type: 'int'},
            {name: 'optimo', type: 'int'},
            {name: 'url', type: 'string'},
            {name: 'ayuda', type: 'string'}
        ]
    });

    storeDispositivos = Ext.create('Ext.data.ArrayStore', {
        model: 'DispositivosModel',
        sortInfo: {
            field: 'name',
            direction: 'ASC'
        },
        data: data
    });
});