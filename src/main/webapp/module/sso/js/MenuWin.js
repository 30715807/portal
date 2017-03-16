/**
* 管理系统配置信息
* version:1.0
* date:2016-11-11
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.MenuWin=function(winId,winName,desk) {
	Ext.define('sso_menu',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'primary',mapping:'mid'},
            'mid','text','parentid',
            'win','js',
            'config','morder',
            'service','sqlid','mmenu'
        ]
    });
    var store = Ext.create('Ext.data.TreeStore', {model: 'sso_menu',
    	proxy:{
    		type: 'ajax',
    		url:constant.appPath+"ext/s/extjs/getExtTree?root=true&args=['sso_menu']"
    	}});
    var grid = Ext.create('Ext.tree.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        useArrows: true,
        rootVisible: false,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
        	{
 			    xtype: 'treecolumn',
 			    text: '菜单名',
 			    width: 300,
 			    dataIndex: 'text',
 			    locked: true
 			},
            {text: "菜单编码", width: 120, dataIndex: 'mid'},
            //{text: "菜单名", width:150, dataIndex: 'text'},
            //{text: "父菜单", width:100, dataIndex: 'parentid'},
            {text: "函数名", width:200, dataIndex: 'win'},
            {text: "JS文件", flex: 1, dataIndex: 'js'},
            {text: "属性", hidden:true,width: 100, dataIndex: 'config'},
            {text: "授权服务", hidden:true,width: 100, dataIndex: 'service'},
            {text: "授权SQL", hidden:true,width: 100, dataIndex: 'sqlid'},
            {text: "主菜单", width: 60, dataIndex: 'mmenu'},
            {text: "顺序", width: 50, dataIndex: 'morder'}
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '授权服务: <b>{service}</b><br/>',
                '授权SQL: <b>{sqlid}</b><br/>'
            ])
        }],
        listeners:{
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
    return grid;
}


