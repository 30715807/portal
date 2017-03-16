/**
* 管理系统配置信息
* version:1.0
* date:2017-01-05
* author:chenjs
* modify:
*/
var main=main||{};
main.ConsoleWin=function(winId,winName,desk) {
	
     var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:util.ajax.console.store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "时间", width: 150, dataIndex: 'date'},
            {text: "返回码", width: 100, dataIndex: 'code'},
            {text: "错误信息", hidden:true,width: 100, dataIndex: 'message'},
            {text: "跟踪号", width: 200, dataIndex: 'traceNo'},
            {text: "uri", width: 300, dataIndex: 'uri'},
            {text: "queryString", hidden:true,width: 300, dataIndex: 'queryString'},
            {text: "错误位置", flex: 1, dataIndex: 'location'}
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '错误信息: <b>{message}</b><br/>',
                'queryString: <b>{queryString}</b><br/>'
            ])
        }]
    });
   
    
    // 将当前panel放到desktop中并激活
    return grid;
}


