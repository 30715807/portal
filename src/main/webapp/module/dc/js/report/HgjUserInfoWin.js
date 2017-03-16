/**
* 海股交用户信息
* version:1.0
* date:2016-12-30
* author:fp
* modify:
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.QueryHgjUserInfoWin=function(winId,winName,desk) {
	var resultPanelId='dc_hiagujiaouserinfoP';
	var cpbh;
	var resultmessage;
	function getHtml(bh) {
		if(typeof(bh) == 'undefined'){
			bh = '';
		}
		var contextHtml = '<iframe src="'+constant.page+'dc/haiGuJiaoUserInfo?BATCH_SQL=dcreport_queryhaigujiaouserinfoexcel&hgjproductid='+bh+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
			cpbh1=Ext.create({id:'cpbh1' ,xtype:'textfield',value:'',fieldLabel:'产品编号',labelWidth:60,width:190}),
			{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var bh = Ext.getCmp('cpbh1').getValue();
				if(Ext.isEmpty(bh)) {
					Ext.Msg.alert("检查输入选项","请输入产品编号");
					return;
				}
			    Ext.getCmp(resultPanelId).body.update(getHtml(bh)); 
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var bh = Ext.getCmp('cpbh1').getValue();
				if(Ext.isEmpty(bh)) {
					Ext.Msg.alert("检查输入选项","请输入产品编号");
					return;
				}
				resultmessage = constant.ajax.sync('persistence.query',constant.ajax.failure)('reportcheck_queryhaigujiaouserinfocount',{hgjproductid:bh});
				if(resultmessage[0].num > 0){
					document.getElementById('main_hiddenFrame').src=constant.page+'dc/haiGuJiaoUserInfo?VIEW=excel&BATCH_SQL=dcreport_queryhaigujiaouserinfoexcel&hgjproductid='+bh+'';
				}else{
					Ext.Msg.alert("检查查询条件","没有查询到相关数据不能下载！");
				}
				
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true,
		html:getHtml(cpbh)
	});
	return {id:winId,title:winName,closable:true,layout:'border',items:[resultPanel]};
}