/**
* esb_endpoint
* version:1.0
* date:2017-01-11
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.EndpointWin=function(winId,winName,desk) {
	Ext.define('esb_endpoint',{
        extend: 'Ext.data.Model',
        fields: [
            'location',
            'uri',
            'remark'
        ]
    });
    var store = util.grid.store('esb_endpoint','SQL_ID=esb_endpoint');
    var grid = Ext.create('Ext.grid.Panel', {
    	id:winId,title:winName,closable:true,
        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "位置", width: 150, dataIndex: 'location'},
            {text: "uri", flex:1, dataIndex: 'uri'},
            {text: "描述", width:200, dataIndex: 'remark'}
        ],
        listeners:{
            afterrender:function(){store.load()}
        }
    });
    
    return grid;
}


