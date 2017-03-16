/**
* 管理sys_js
* version:1.0
* date:2017-01-23
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.JsWin=function(winId,winName,desk) {
	Ext.define('sso_js',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'jid',mapping:'id'},
            {name:'js',convert:function(v){return v?v.toHTML():''}},
            {name:'js1',convert:function(v){return v?v.toHTML():''}},
            {name:'js2',convert:function(v){return v?v.toHTML():''}},
            {name:'js3',convert:function(v){return v?v.toHTML():''}},
            'sys','remark'
        ]
    });

    var store=util.grid.store({model:'sso_js',pageSize:10,groupField:'sys'},
    	'sid=sso_js&ssid=sso_jstotal');
    var sys,jid;
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "id", width:300, dataIndex: 'jid'},
            {text: "js", hidden:true,width:80, dataIndex: 'js'},
            {text: "js1", hidden:true,width:80, dataIndex: 'js1'},
            {text: "js2", hidden:true,width:80, dataIndex: 'js2'},
            {text: "js3", hidden:true,width:80, dataIndex: 'js3'},
            {text: "sys",hidden:true,width:80, dataIndex: 'sys'},
            {text: "remark", flex:1, dataIndex: 'remark'}
        ],
        tbar:[
              sys=Ext.create({xtype:'textfield',fieldLabel:'系统',name:'sys',labelWidth:50,width:150}),
              jid=Ext.create({xtype:'textfield',fieldLabel:'ID',name:'id',labelWidth:30,width:200}),
              '-',
              {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                  this.disable();
                  store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sys,jid));
                  store.reload({scope:this,callback:function(){this.enable()}});
              }}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '系统:{name}',
            enableGroupingMenu: true
        }],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '<b>{js}</b><br>',
                '<b>{js1}</b><br>',
                '<b>{js2}</b><br>',
                '<b>{js3}</b><br>'
            ])
        }],
        listeners:{
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
    return grid;
}