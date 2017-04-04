casaSemaforo = Ext.create('Ext.panel.Panel', {
    width: '35%',
    hidden: true,
    items: [{
            html: '<img class = "fondo-casa" src="img/casaSemaforo1.png">',
            items: [
                {
                    html: '<div class="img-dis"><center><strong><img id="dis-casa" width="140" height="140" src="https://i.blogs.es/4acfba/acer-aspire-v5-nav2/450_1000.png"><h2 id="tit-casa">PORTATIL</h2><p id="cons-casa">108KW/Mes</p></strong></center></div>'
                }
            ]
        }]
});
