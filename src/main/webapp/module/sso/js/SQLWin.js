/**
* 管理sys_sql
* version:1.0
* date:2017-01-23
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.SQLWin=function(winId,winName,desk) {
	Ext.define('sso_sql',{
        extend: 'Ext.data.Model',
        fields: [
            'mdl','sid',
            'resultclass','ds',
            {name:'firstrowonly',convert:function(v){return v=='1'?'true':''}},
            {name:'prepared',convert:function(v){return v=='1'?'true':''}},
            'text', 'text1', 'text2', 'text3',
            'sys','remark','auth','slave','paging','injection'
        ]
    });

    var store=util.grid.store({model:'sso_sql',pageSize:10,groupField:'sys'},
    	'sid=sso_sql&ssid=sso_sqltotal');
    var sys,mdlid; // filter condition
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "model",hidden:true,width: 100, dataIndex: 'mdl'},
            {text: "id", width:300, dataIndex: 'sid',renderer:function(v,m,r,ri,ci,s,view){return r.data['mdl']+'_'+v}},
            {text: "class", width: 80, dataIndex: 'resultclass'},
            {text: "ds", width:100, dataIndex: 'ds'},
            {text: "slave", hidden:true,width:100, dataIndex: 'slave'},
            {text: "first", hidden:true,width:60, dataIndex: 'firstrowonly'},
            {text: "prepare", hidden:true,width:80, dataIndex: 'prepared'},
            {text: "paging", width:80, dataIndex: 'paging',renderer:function(v){return DICT.getText(v,'sso_paging')}},
            {text: "auth", width:80, dataIndex: 'auth',renderer:function(v){return DICT.getText(v,'sso_auth')}},
            {text: "injection", hidden:true,width:100, dataIndex: 'injection'},
            {text: "text", hidden:true,width:80, dataIndex: 'text',renderer:function(v){return v?v.toHTML():'';}},
            {text: "text1", hidden:true,width:80, dataIndex: 'text1',renderer:function(v){return v?v.toHTML():'';}},
            {text: "text2", hidden:true,width:80, dataIndex: 'text2',renderer:function(v){return v?v.toHTML():'';}},
            {text: "text3", hidden:true,width:80, dataIndex: 'text3',renderer:function(v){return v?v.toHTML():'';}},
            {text: "sys",hidden:true,width:80, dataIndex: 'sys'},
            {text: "remark", flex:1, dataIndex: 'remark'},
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 60,
                items: [{
                        icon   : util.iconPath+'delete.gif',
                        tooltip: '删除',
                        handler: function(g,ri,ci){deleteFn(store.getAt(ri).data);}
                    },{
                        icon   : util.iconPath+'add.gif',
                        tooltip: '复制增加',
                        handler: function(g,ri,ci) {
                            var data = store.getAt(ri).data;
                            util.call('sso.SQLForm')(grid,0,data);
                        }
                    }]
            }
        ],
        tbar:[
              sys=Ext.create({xtype:'textfield',fieldLabel:'系统',name:'sys',labelWidth:50,width:150}),
              mdlid=Ext.create({xtype:'textfield',fieldLabel:'ID',name:'mdlid',labelWidth:30,width:200}),
              '-',
              {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                  this.disable();
                  store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sys,mdlid));
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
                '<b>{text}</b><br>',
                '<b>{text1}</b><br>',
                '<b>{text2}</b><br>',
                '<b>{text3}</b><br>'
            ])
        }],
        listeners:{
        	rowdblclick:function(g,r,t,i,e,o){//双击进入修改界面
        		var data = r.data;
        		util.call('sso.SQLForm')(grid,1,data);//修改
            }, 
        	afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
    
 // 删除一个行记录的函数
    var deleteFn=function(r){
    	 Ext.MessageBox.confirm("信息确认", "您确定删除该记录吗？", function (btn) {
    		 if(btn == 'yes'){
    			   util.ajax.adelete(function(rows){
    		        	if(rows > 0){
    		        		 Ext.Msg.alert("", "操作成功！");
    		                 grid.store.load();
    		        	}else{
    		        		 Ext.Msg.alert('', "操作失败！");
    		        	}
    		        })('SQL',{mdl:r.mdl,id:r.sid});
    		  }
    	        
    	 });
    }
      
    return grid;
    
}


