var tabAhorro;
Ext.onReady(function () {
    Ext.define('KitchenSink.view.tab.BasicTabs', {extend: 'Ext.tab.Panel',
    });
    tabAhorro = Ext.create('Ext.tab.Panel', {
        controller: 'tab-view',
        width: 400,
        height: 300,
        plain: true,
        defaults: {
            bodyPadding: 10,
            scrollable: true
        },
        items: [{
                title: 'Active Tab',
                html: 'Hola'
            }, {
                title: 'Inactive Tab',
                html: 'chao'
            }],
        listeners: {
            tabchange: 'onTabChange'
        }
    });
});