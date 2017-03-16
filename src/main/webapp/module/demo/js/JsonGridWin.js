var demo=demo||{};
demo.JsonGridWin=function(winId,winName) {
	Ext.define('demo.JsonGridWin.Book',{
        extend: 'Ext.data.Model',
        fields: [
            'retcd',
            'text',
            'lastupdtm',
            'actionnm',
            'verdt'
        ]
    });

    var store = Ext.create('Ext.data.Store', {
        model: 'demo.JsonGridWin.Book',
        proxy: {
            type:'ajax', url:constant.grid.uri + 'SQL_ID=common_retcode',
            reader: constant.grid.reader
        }
    });

    var grid = Ext.create('Ext.grid.Panel', {
        forceFit: true,
        height:450,
        split: true,
        region: 'north',
        store: store,
        columns: [
            {text: "返回码", width: 120, dataIndex: 'retcd', sortable: true},
            {text: "名称", flex: 1, dataIndex: 'text', sortable: true},
            {text: "修改时间", width: 200, dataIndex: 'lastupdtm', sortable: true},
            {text: "处理动作", width: 125, dataIndex: 'actionnm', sortable: true}
        ],
        tbar:[
            {text:'增加', handler:function(){alert(0)}}
        ],
        bbar : {
            xtype : 'pagingtoolbar',
            store : store,
            displayInfo : true,
            displayMsg : '显示 {2} 条中的第 {0} 条到第 {1} 条',
            emptyMsg : "没有满足查询条件的"
        }
    });

    var detailPanelId='detailPanel';
    grid.getSelectionModel().on('selectionchange', function(sm, record) {
        if (!record.length) return;
        // define a template to use for the detail view
        var bookTpl = Ext.create('Ext.Template', [
            'Title: <a href="{lastupdtm}" target="_blank">{retcd}</a><br/>',
            '返回码: {retcd}<br/>',
            '名称: {text}<br/>',
            '处理动作: {actionnm}<br/>'
        ]);
        Ext.getCmp(detailPanelId).update(bookTpl.apply(record[0].data));
    });
    
    // 将当前panel放到desktop中并激活
    desktop.setActiveTab(desktop.add({
        id:winId, // 每个panel的ID就是模块名
        title:winName,

        closable:true, // tabpanel 可关闭
        layout: 'border',
        items: [
            grid, 
            {
                id: detailPanelId,
                region: 'center',
                bodyPadding: 7,
                bodyStyle: "background: #ffffff;",
                html: 'Please select a book to see additional details.'
        }]
    }));
    
    store.load();
}