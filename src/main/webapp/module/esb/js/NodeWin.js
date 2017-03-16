/**
* esb_node
* version:1.0
* date:2017-01-11
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.NodeWin=function(winId,winName,desk) {
	Ext.define('esb_node',{
        extend: 'Ext.data.Model',
        fields: [
            'appcd',
            'name',
            'appattr',
            'accesstype',
            'fabeanid',
            'babeanid'
        ]
    });
    var nodeStore = util.grid.store('esb_node','SQL_ID=esb_node');
    var nodeGrid = Ext.create('Ext.grid.Panel', {
        forceFit:true,
        region:'center',
        store:nodeStore,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "系统编号", width: 100, dataIndex: 'appcd'},
            {text: "系统名称", width:150, dataIndex: 'name'},
            {text: "接入类型", width:80, dataIndex: 'accesstype'},
            {text: "请求适配", width: 180, dataIndex: 'fabeanid'},
            {text: "服务适配", width: 180, dataIndex: 'babeanid'},
            {text: "属性", flex:1, dataIndex: 'appattr'}
        ],
        listeners:{
        	selectionchange:function(sm,r){
                if (r.length){
                	nodesStore.proxy.url=nodesStore.proxy._url+Ext.urlEncode({appcd:r[0].data['appcd']});
                	nodesStore.load();
                }
            },
            afterrender:function(){nodeStore.load()}
        }
    });
   
    Ext.define('esb_nodeservice',{
        extend: 'Ext.data.Model',
        fields: [
            'appcd',
            'msgcd',
            'attr'
        ]
    });
    var nodesStore = util.grid.store('esb_nodeservice','SQL_ID=esb_nodeservice');
    var nodesGrid = Ext.create('Ext.grid.Panel', {
    	split:true,
        region:'east',width:400,
        store:nodesStore,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "报文编号", width: 150, dataIndex: 'msgcd'},
            {text: "报文属性", flex:1, dataIndex: 'attr'}
        ]
    });
    
    return {id:winId,title:winName,closable:true,layout:'border',items:[nodeGrid,nodesGrid]};
}


