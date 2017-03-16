/**
* 业务异常监控
* version:1.0
* date:2017-01-22
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.AlarmWin=function(winId,winName,desk) {
	Ext.define('sso_alarm',{
        extend: 'Ext.data.Model',
        fields: [
            'id','sqlid','ftlid','service','param',
            'msgftlid','msgq',
            'lastchecktm','lastalarmtm','lastalarmmsg',
            'status','sys','remark'
        ]
    });
	
	var store=util.grid.store({model:'sso_alarm',groupField:'sys'},'sid=sso_alarm&ssid=sso_alarmtotal');
	var sys,id;
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true,

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "ID", width: 100, dataIndex: 'id'},
            {text: "SQL", width: 100, dataIndex: 'sqlid'},
            {text: "FTL", width:100, dataIndex: 'ftlid'},
            {text: "service", width:120, dataIndex: 'service'},
            {text: "MsgFTL", hidden:true,width: 100, dataIndex: 'msgftlid'},
            {text: "MsgQ", hidden:true,width:80, dataIndex: 'msgq'},
            {text: "参数", hidden:true,width:200, dataIndex: 'param'},
            {text: "上次检查时间", width:150, dataIndex: 'lastchecktm'},
            {text: "上次警告时间", width:150, dataIndex: 'lastalarmtm'},
            {text: "上次警告", hidden:true,width:80, dataIndex: 'lastalarmmsg'},
            {text: "系统", hidden:true,width:60, dataIndex: 'sys'},
            {text: "备注", flex: 1, dataIndex: 'remark'},
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                        icon   : util.iconPath+'check.png',
                        tooltip: '业务检查',
                        handler: function(g,ri,ci){
                        	var id = store.getAt(ri).get('id');
                        	util.ajax.async('alarm.proccessEvent',function(msg){
                        		if(msg!='')store.reload();
                        		util.notify('业务检查',msg)
                        	})(id);
                        }
                    },{
                        icon   : util.iconPath+'message.png',
                        tooltip: '发送警告',
                        handler: function(g,ri,ci){
                        	var id = store.getAt(ri).get('id');
                        	util.ajax.async('alarm.getEventMsg',function(msg){
                        		if(msg&&msg!=''){
                        			var h='队列:<b>'+store.getAt(ri).get('msgq')+'</b><br>内容:<br><b>'+msg.formatJson().toHTML()+'</b>';
	                        		Ext.MessageBox.confirm('发送警告短信',h,
										function(btn){
											if(btn!='yes')return;
											util.ajax.async('alarm.sendEventMsg',function(m){
												util.notify('短信发送成功',h)
											})(id);
									})
                        		}else util.notify('业务检查成功，无需发警告短信!');
                        	})(id);
                        }
                    }]
            }
        ],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '系统:{name}',
            enableGroupingMenu: true
        }],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '参数: <b>{param}</b><br>',
                '上次警告内容:<b>{lastalarmmsg}</b><br>',
                '备注:<b>{remark}</b><br>'
            ])
        }],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store,
            items:['-',
            	 sys=Ext.create({xtype:'textfield',fieldLabel:'系统',name:'sys',labelWidth:40,width:120}),
            	 id=Ext.create({xtype:'textfield',fieldLabel:'ID',name:'id',labelWidth:30,width:150}),
                 '-',
                 {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                     this.disable(); // 防止重复点击，在数据没加载完前disable按钮
                     store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sys,id));
                     store.reload({scope:this,callback:function(){this.enable()}});
                 }}
            ]
        },
        listeners:{
            afterrender:function(){store.load()}
        }
    });
   
    return grid;
}


