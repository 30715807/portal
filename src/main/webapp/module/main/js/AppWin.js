/**
* 管理系统配置信息
* version:1.0
* date:2017-01-05
* author:chenjs
* modify:
*/
var main=main||{};
main.AppWin=function(winId,winName,desk) {
	Ext.define('main_app',{
        extend: 'Ext.data.Model',
        fields: [
            'app','jvm',
            'pid','ip','cpu','webos',
            {name:'maxMemory',type:'int'},
            'startDt','dataDir','cfg','bizjar'
        ]
    });
	//alert(util.ajax.sync('token.generate')("{code:'public',realCode:'chenjs',name:'陈劲松'}",500));
	/*
    var store = Ext.create('Ext.data.Store', {
        model: 'main_app',
        groupField: 'app',
        proxy:util.grid.sproxy('appRegister.getApps')(),
        sorters: [{
            property: 'app',
            direction: 'ASC' // DESC
        }],
        listeners:{load:util.grid.load}
    });*/
	var store=util.grid.sstore({model:'main_app',groupField: 'app'})('appRegister.getNodeValue')('/App');
    var timer=window.setInterval(function(){store.reload()},120000); // 表格定时刷新

    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "app", width: 80, dataIndex: 'app'},
            {text: "jvm", width: 60, dataIndex: 'jvm'},
            {text: "pid", width: 90, dataIndex: 'pid'},
            {text: "ip", width: 120, dataIndex: 'ip'},
            {text: "webos", width: 150, dataIndex: 'webos'},
            {text: "最大内存(M)", width: 120, dataIndex: 'maxMemory',renderer:function(v){return parseInt(v/1000000)}},
            {text: "启动时间", flex: 1, dataIndex: 'startDt'},
            {text: "工作目录", hidden:true,width: 80, dataIndex: 'dataDir'},
            {text: "配置信息", hidden:true,width: 80, dataIndex: 'cfg'},
            {text: "业务jar", hidden:true,width: 300, dataIndex: 'bizjar'}
        ],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '应用编号:{name}',
            //hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '工作目录: <b>{dataDir}</b><br/>',
                '配置信息: <b>{cfg}</b><br/>',
                '业务jar: <b>{bizjar}</b><br/>'
            ])
        }],
        listeners:{
            close:function(){clearInterval(timer)}, // 关闭当前页面定时刷新器
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
   
    return grid;
}


