/**
* TCC_transaction管理
* version:1.0
* date:2017-01-25
* author:chenjs
* modify:
*/
var tcc=tcc||{};
tcc.TransactionWin=function(winId,winName,desk) {
	Ext.define('tcc_transaction',{
        extend: 'Ext.data.Model',
        fields: [
            'xid','gname','sn',
            'status','app','jvm','proxy',
            'exseq','exsn','ex',
            'createtm','laststatustm',
            'args'
        ]
    });

    var transStore=util.grid.store({model: 'tcc_transaction',pageSize:100},
    	'SQL_ID=tcc_trans&SIZE_SQL_ID=tcc_transtotal');
    var xid,sn;
    var transGrid = Ext.create('Ext.grid.Panel', {
        forceFit:true,region:'center',
        store:transStore,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "TCC事务号", width: 250, dataIndex: 'xid'},
            {text: "TCC组", width: 80, dataIndex: 'gname'},
            {text: "业务流水号", flex:1, dataIndex: 'sn'},
            {text: "状态", width:60, dataIndex: 'status'},
            {text: "应用节点", width:100, dataIndex: 'app',renderer:function(v,m,r,ri,ci,s,view){return v+'/'+r.data['jvm']}},
            //{text: "jvm", width:60, dataIndex: 'jvm'},
            {text: "proxy", hidden:true,width:80, dataIndex: 'proxy'},
            {text: "异常子序号", width:80, dataIndex: 'exseq'},
            {text: "异常子事务业务流水", hidden:true,width:120,dataIndex: 'exsn'},
            {text: "ex",hidden:true,width:80, dataIndex: 'ex'},
            {text: "创建时间", width:150, dataIndex: 'createtm'},
            {text: "最后更新时间",width:150, dataIndex: 'laststatustm'},
            {text: "参数",hidden:true,width: 80, dataIndex: 'args'}
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                'TCC方法: <b>{proxy}</b><br/>',
                '参数: <b>{args}</b><br/>',
                '异常: <b>{ex}</b><br/>'
            ])
        }],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : transStore,
            items:[
            	'-',
                xid=Ext.create({xtype:'textfield',fieldLabel:'事务号',name:'xid',labelWidth:50}),
                sn=Ext.create({xtype:'textfield',fieldLabel:'业务流水',name:'sn',labelWidth:60}),
                '-',
                {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                    this.disable();
                    transStore.reload({params:util.form.getValues(xid,sn),scope:this,callback:function(){this.enable()}});
                }}
            ]
        },
        listeners:{
        	selectionchange:function(sm,r){
                if (r.length) {
                	termStore.proxy.url=termStore.proxy._url+Ext.urlEncode({xid:r[0].data['xid']});
                	termStore.load();
                }
            },
            afterrender:function(){transStore.load()}
        }
    });
    	
    Ext.define('tcc_term',{
        extend: 'Ext.data.Model',
        fields: [
            'xid','seq','sn','tsn',
            'dotry','doconfirm','cannotcancel',
            'clazz','method','types','args'
        ]
    });
    var termStore=util.grid.store('tcc_term','SQL_ID=tcc_terminator');
    var termGrid = Ext.create('Ext.grid.Panel', {
        forceFit:true,region:'south',height:250,
        store:termStore,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "TCC事务号", hidden:true,width: 200, dataIndex: 'xid'},
            {text: "子序号", width: 60, dataIndex: 'seq'},
            {text: "TCC子事务业务流水号", width: 200, dataIndex: 'sn'},
            {text: "TCC事务业务流水号", hidden:true,width: 200, dataIndex: 'tsn'},
            
            {text: "try", width:60, dataIndex: 'dotry'},
            {text: "confirm", width:80, dataIndex: 'doconfirm'},
            {text: "nocancel", width:80, dataIndex: 'cannotcancel'},
            
            {text: "TCC子事务原子方法", flex:1,width:180, dataIndex: 'clazz',renderer:function(v,m,r,ri,ci,s,view){return v+'.try'+r.data['method']}},
            {text: "method",hidden:true,width:80, dataIndex: 'method'},
            {text: "参数类型",hidden:true,width:80, dataIndex: 'types'},
            {text: "参数",hidden:true,width: 80, dataIndex: 'args'}
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '参数类型: <b>{types}</b><br/>',
                '参数: <b>{args}</b><br/>'
            ])
        }]
    });
    
    return {id:winId,title:winName,closable:true,layout:'border',items:[transGrid,termGrid]};
}


