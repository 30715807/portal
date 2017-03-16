/**
* 模拟器，用于界面模拟ESB请求
* version:1.0
* date:2017-01-19
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.SimulatorWin=function(winId,winName) {
	var call=function(){
		var request=reqCnt.getValue().trim();
		var type = msgType.getValue();
		var snd=sndAppCd.getValue();
		var code = msgCd.getValue();
		if(request==''||type==''){
			util.notify('警告','<b>请求报文</b>和<b>报文类型</b> 都不能为空!!!');
			return;
		}
		if(type=='json'||type=='api'){
			if(type=='api' && (code==''||snd=='')){
				util.notify('警告','报文类型为api时 <b>发送系统</b>和<b>报文编号</b> 都不能为空!!!');
				return;
			}
		}
		var sndDt=Ext.util.Format.date(new Date(), "Ymd");
		var sndTm=Ext.util.Format.date(new Date(), "His");
		var uri=constant.conf.url.esb+type+'/'+code+'/sndAppCd/'+snd+'/sndDt/'+sndDt+'/sndTm/'+sndTm+'/seqNb/'+new Date().getTime();
		if(sig.getValue()!='')uri+='/signature/'+sig.getValue();
		location.setText('POST:&nbsp;<b>'+uri+'</b>');
		Ext.Ajax.request({method:'POST',url:uri,
            params:request,
            failure:function(r,o){
            	status.setText('Http status:&nbsp;<b>'+r.status+'</b>');
            	if(r.status==555) Ext.getCmp('esb_sim_res').setHtml('<b>'+r.responseText.formatJson().toHTML()+'</b>');
            	else Ext.getCmp('esb_sim_res').setHtml(r.responseText);
            },
            success:function(r,o){
            	status.setText('Http status:&nbsp;<b>'+r.status+'</b>');
            	if(type=='ws'||type=='xml')Ext.getCmp('esb_sim_res').setHtml('<b>'+r.responseText.formatXml().toHTML()+'</b>');
            	else if(type=='json'||type=='api')Ext.getCmp('esb_sim_res').setHtml('<b>'+r.responseText.formatJson().toHTML()+'</b>');
            	else Ext.getCmp('esb_sim_res').setHtml(r.responseText);
            }
        });
	}
	var location,reqCnt,msgType,sndAppCd,msgCd,sig,status;
	return {id:winId,title:winName,closable:true, // 每个tabpanel标准配置
		tbar:[location=Ext.create({
			xtype:"tbtext",hiddenLabel:true,
			text:'POST:&nbsp;<b>'+constant.conf.url.esb+'</b>'
		})],
		layout:'border',items:[{
			region:'center',layout:'fit',
			tbar:[
			      msgType=Ext.create({
		            xtype:'combo',
		            hiddenLabel:true,
		            queryMode:'local',
		            store: Ext.create('Ext.data.ArrayStore',{fields:['value','text'],data:[['ws','soap'],['xml','xml'],['json','json'],['api','api'],['custom','自定义']]}),
		            valueField: 'value',
		            value:'xml',
		            width:100,
		            emptyText: '选择一个格式...',
		            allowBlank:false,
		            selectOnFocus: true
		        }),
		        sndAppCd=Ext.create({xtype:'textfield',labelWidth:50,fieldLabel:'发送方',width:120,value:'ESB'}),
		        msgCd=Ext.create({xtype:'textfield',labelWidth:40,fieldLabel:'报文'}),
		        sig=Ext.create({xtype:'textfield',labelWidth:40,fieldLabel:'签名'}),
		        '->',{icon:util.iconPath+'send.png',tooltip:'Ctrl+Enter直接请求',handler:call}
			],
			items:[
			    reqCnt=Ext.create({
					xtype:"textarea",hiddenLabel:true,
					listeners: {
						specialkey: function (t, e) {
							if (e.getKey() == Ext.EventObject.ENTER) call();
				    	},
				    	blur: function(f){
				    		var type = msgType.getValue();
				    		var request=f.getValue().trim();
				    		if(type=='json'||type=='api')f.setValue(request.formatJson());
				    		else f.setValue(request.formatXml());
				       }
			  }
			})]
		},
		{id:'esb_sim_res',region:'east',width:500,bodyStyle:'overflow-y:auto;',layout:'fit',split:true,
			tbar:[status=Ext.create({
			xtype:"tbtext",hiddenLabel:true,
			text:'Http status:&nbsp;'
		})],}
	]};

}