/**
* 管理系统配置信息
* version:1.0
* date:2016-11-11
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.DictWin=function(winId,winName,desk) {
	Ext.define('sso_dict',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'primary',mapping:'code'},
            'code',
            'name',
            'dtype',
            'dlevel',
            'parentcode',
            'dorder'
        ]
    });

    var store=util.grid.store({model: 'sso_dict',pageSize:100,groupField:'dtype'},
    	'sid=sso_dict&ssid=sso_dicttotal');
    var code; // filter condition
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "字典编码", width: 200, dataIndex: 'code'},
            {text: "字典名", flex: 1, dataIndex: 'name'},
            {text: "父节点", width: 150, dataIndex: 'parentcode'},
            {text: "字典类型", hidden:true,width:180, dataIndex: 'dtype'},
            {text: "字典层次", width:80, dataIndex: 'dlevel'},
            {text: "字典顺序", width: 80, dataIndex: 'dorder'}
        ],
        tbar:[
            code=Ext.create({xtype:'textfield',fieldLabel:'字典编码',name:'code',labelWidth:80}),
            '-',
            {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                this.disable(); // 防止重复点击，在数据没加载完前disable按钮
                store.reload({params:util.form.getValues(code),scope:this,callback:function(){this.enable()}});
            }}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '字典类型:{name}',
            //hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        listeners:{
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
   
    
    // 将当前panel放到desktop中并激活
    return grid;
}


