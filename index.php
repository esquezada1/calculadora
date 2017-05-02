<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>CALCULADORA CONSUMO ENERGIA</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="extjs/ext-theme-neptune/build/resources/ext-theme-neptune-all.css">
        <link rel="stylesheet" type="text/css" href="extjs/examples/shared/example.css">
        <link rel="stylesheet" type="text/css" href="extjs/examples/ux/css/ItemSelector.css">
        <link href="extjs/ext-charts/build/resources/ext-charts-all.css" rel="stylesheet" type="text/css"/>
        <link href="css/estilos.css" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="extjs/ext-all.js"></script>
        <script type="text/javascript" src="extjs/ext-theme-neptune/build/ext-theme-neptune.js"></script>
        <script type="text/javascript" src="extjs/ext-charts/build/ext-charts.js"></script>
        <script type="text/javascript" src="extjs/examples/shared/examples.js"></script>
        <script type="text/javascript" src="extjs/examples/ux/DataView/Animated.js"></script>
        <script type="text/javascript" src="extjs/examples/ux/DataView/DragSelector.js"></script>
        <script type="text/javascript" src="extjs/examples/ux/DataView/LabelEditor.js"></script>
        <script src="lib/extjs/GMapPanel.js.js" type="text/javascript"></script>
        <script type="text/javascript" src="http://code.highcharts.com/highcharts.js?<?php echo $version ?>"></script>
        <script type="text/javascript" src="http://code.highcharts.com/highcharts-more.js?<?php echo $version ?>"></script>
        <script type="text/javascript" src="http://code.highcharts.com/modules/funnel.js?<?php echo $version ?>"></script> 
        <script type="text/javascript" src="http://code.highcharts.com/modules/solid-gauge.js?<?php echo $version ?>"></script>
        <script type="text/javascript" src="http://code.highcharts.com/highcharts-3d.js?<?php echo $version ?>"></script>
        <!--Lógica de la calculadora-->
        <script src="js/calculadora/dispositivos.js" type="text/javascript"></script>
        <script src="js/calculadora/fase1/consumoTotal.js" type="text/javascript"></script>
        <script src="js/calculadora/fase2/chartSemaforo.js" type="text/javascript"></script>
        <script src="js/calculadora/fase2/casa.js" type="text/javascript"></script>   
        <script src="js/calculadora/fase3/calculoAhorro.js" type="text/javascript"></script>
        <script src="js/calculadora/fase3/ahorroTotal.js" type="text/javascript"></script>
        <script src="js/calculadora/fase3/panelesAhorro.js" type="text/javascript"></script>
        <script src="js/calculadora/fase3/colectorAhorro.js" type="text/javascript"></script>
        <script src="js/calculadora/fase4/analisisPlanilla.js" type="text/javascript"></script>
        <script src="js/calculadora/general.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <!--<script type="text/javascript" src="vistas/grid/newPanel.js"></script>
        <script type="text/javascript" language="Javascript">
            document.oncontextmenu = function () {
                Ext.Msg.alert("ALERTA", "Lo sentimos, por seguridad el boton derecho del raton esta inhabilitado");
                return false;
            }
        </script>-->
    </head>
    <body oncontextmenu="return false">
        <header></header>
        <nav></nav>
        <footer>            
        </footer>
    </body>
</html>
