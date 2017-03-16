/**
* esb_service, esb_msgschema
* version:1.0
* date:2017-01-11
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.ServiceWin=function(winId,winName,desk) {
	Ext.define('esb_service',{
        extend: 'Ext.data.Model',
        fields: [
            'serviceid','ver','name','appcd','reqmsgcd','repmsgcd','status'
        ]
    });
    var serviceStore = util.grid.store('esb_service','sid=esb_service');
    var serviceid;
    var serviceGrid = Ext.create('Ext.grid.Panel', {
        forceFit:true,
        region:'north',
        height:200,
        store:serviceStore,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "服务编号", width: 150, dataIndex: 'serviceid'},
            {text: "版本号", width:60, dataIndex: 'ver'},
            {text: "服务名称", flex:1, dataIndex: 'name'},
            {text: "服务系统", width: 100, dataIndex: 'appcd'},
            {text: "状态", width: 120, dataIndex: 'status'},
            {text: "请求报文", width: 150, dataIndex: 'reqmsgcd'},
            {text: "应答报文", width: 150, dataIndex: 'repmsgcd'}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : serviceStore,
            items:['-',
                   serviceid=Ext.create({xtype:'textfield',fieldLabel:'服务编号',name:'serviceid',labelWidth:80}),
                   '-',
                   {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                       this.disable();
                       serviceStore.proxy.url=serviceStore.proxy._url+Ext.urlEncode(util.form.getValues(serviceid));
                       serviceStore.reload({scope:this,callback:function(){this.enable()}});
                   }}
             ]
        },
        listeners:{
        	selectionchange:function(sm,r){
                if (r.length){
                	reqGrid.setTitle('请求报文结构('+r[0].data['reqmsgcd']+')');
                	reqStore.proxy.url=constant.appPath+"ext/s/extjs/getExtTree?root=true&args=['esb.treemsgschema',{msgcd:'"+r[0].data['reqmsgcd']+"'}]";
                	reqStore.load();
                	repGrid.setTitle('应答报文结构('+r[0].data['repmsgcd']+')');
                	repStore.proxy.url=constant.appPath+"ext/s/extjs/getExtTree?root=true&args=['esb.treemsgschema',{msgcd:'"+r[0].data['repmsgcd']+"'}]";
                	repStore.load();
                }
            },
            rowcontextmenu:function(g,r,t,i,e,o){
                e.preventDefault();
                new Ext.menu.Menu({items:[
                    {text:'WSDL',handler:function(){
                    	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['reqmsgcd']+'?wsdl', 'WSDL')
                    }},
                    {text:'Schema',handler:function(){
                    	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['reqmsgcd']+'?schema', 'Schema')
                    }},
                    {
                    	text: '样例报文',
                        menu: {
                            items: [{
                        			text:'请求报文',
                        			menu:{
                            			items:[
                            				{text:'XML',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['reqmsgcd']+'?xml', '请求XML')
        		                            }},
        		                            {text:'JSON',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['reqmsgcd']+'?json', '请求JSON')
        		                            }},
        		                            {text:'api',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['reqmsgcd']+'?api', '请求Api')
        		                            }}
                            			]
                        		}},
                        		{
                        			text:'应答报文',
                        			menu:{
                            			items:[
                            				{text:'XML',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['repmsgcd']+'?xml', '应答XML')
        		                            }},
        		                            {text:'JSON',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['repmsgcd']+'?json', '应答JSON')
        		                            }},
        		                            {text:'api',handler:function(){
        		                            	if(g.getSelection().length) window.open(constant.conf.url.esb+g.getSelection()[0].data['repmsgcd']+'?api', '应答Api')
        		                            }}
                            			]
                        		}}  
		                ]}
                    }
                ]}).showAt(e.getXY());
            },
            afterrender:function(){serviceStore.load()}
        }
    });
   
    Ext.define('esb_msgschema',{
        extend: 'Ext.data.Model',
        fields: ['esbname','rcvname','text','ftyp','optional','minlen','maxlen','deci','sig','tagattr']
    });
    var columns=[
 			{
 			    xtype: 'treecolumn',
 			    text: 'ESB标签名',
 			    width: 200,
 			    dataIndex: 'esbname',
 			    locked: true
 			},
             {text: "服务标签", hidden:true,width:150, dataIndex: 'rcvname'},
             {text: "类型", width:60, dataIndex: 'ftyp'},
             {text: "可选", width:60, dataIndex: 'optional'},
             {text: "签名", width:60, dataIndex: 'sig'},
             {text: "字段名称", flex:1, dataIndex: 'text'},
             {text: "最小", hidden:true,width:60, dataIndex: 'minlen'},
             {text: "最大", hidden:true,width:60, dataIndex: 'maxlen'},
             {text: "小数", hidden:true,width:60, dataIndex: 'deci'},
             {text: "属性", hidden:true,width:120, dataIndex: 'tagattr'}
         ];
    var reqStore = Ext.create('Ext.data.TreeStore', {model: 'esb_msgschema',proxy: {type: 'ajax'}});
    var reqGrid = Ext.create('Ext.tree.Panel', {
    	title:{text:'请求报文结构',height:12},padding:5,
        region:'center',
        store:reqStore,
        useArrows: true,
        rootVisible: false,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:columns
    });
    
    var repStore = Ext.create('Ext.data.TreeStore', {model: 'esb_msgschema',proxy: {type: 'ajax'}});
    var repGrid = Ext.create('Ext.tree.Panel', {
    	title:{text:'应答报文结构',height:12},padding:5,
        region:'east',
        width:500,
        store:repStore,
        useArrows: true,
        rootVisible: false,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:columns
    });

    
    return {id:winId,title:winName,closable:true,layout:'border',
    	items:[
    	       Ext.create('Ext.tree.Panel', {
	                region:'west', width:200,split:true,
	                //title:{text:'金融服务模型',height:12},
	                rootVisible:false,
	                store: Ext.create('Ext.data.TreeStore',{root: DICT.tree['esb_svcat']}),
	                listeners: {
	                    itemclick:function(t,r,i,idx,e,opt){
	                    	serviceStore.proxy.url=serviceStore.proxy._url+Ext.urlEncode({category:r.data.code});
	                    	serviceStore.reload();
	                    }
	                }
	            }),
               {region:'center',layout:'border',
            	   items:[
            	          serviceGrid,
            	          {layout:'border',region:'center',items:[reqGrid,repGrid]}
            	]}
    	]};
}
