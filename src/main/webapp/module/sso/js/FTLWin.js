/**
* 管理sys_ftl
* version:1.0
* date:2017-01-23
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.FTLWin=function(winId,winName,desk) {
	Ext.define('sso_ftl',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'fid',mapping:'id'},
            {name:'ftl',convert:function(v){return v?v.toHTML():''}},
            {name:'ftl1',convert:function(v){return v?v.toHTML():''}},
            {name:'ftl2',convert:function(v){return v?v.toHTML():''}},
            {name:'ftl3',convert:function(v){return v?v.toHTML():''}},
            'sys','remark'
        ]
    });

    var store=util.grid.store({model:'sso_ftl',pageSize:10,groupField:'sys'},
    	'sid=sso_ftl&ssid=sso_ftltotal');
    var sys,fid; // filter condition
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "id", width:300, dataIndex: 'fid'},
            {text: "ftl", hidden:true,width:80, dataIndex: 'ftl'},
            {text: "ftl1", hidden:true,width:80, dataIndex: 'ftl1'},
            {text: "ftl2", hidden:true,width:80, dataIndex: 'ftl2'},
            {text: "ftl3", hidden:true,width:80, dataIndex: 'ftl3'},
            {text: "sys",hidden:true,width:80, dataIndex: 'sys'},
            {text: "remark", flex:1, dataIndex: 'remark'}
        ],
        tbar:[
              sys=Ext.create({xtype:'textfield',fieldLabel:'系统',name:'sys',labelWidth:50,width:150}),
              fid=Ext.create({xtype:'textfield',fieldLabel:'ID',name:'id',labelWidth:30,width:200}),
              '-',
              {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                  this.disable();
                  store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sys,fid));
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
                '<b>{ftl}</b><br>',
                '<b>{ftl1}</b><br>',
                '<b>{ftl2}</b><br>',
                '<b>{ftl3}</b><br>'
            ])
        }],
        listeners:{
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
    return grid;
}


