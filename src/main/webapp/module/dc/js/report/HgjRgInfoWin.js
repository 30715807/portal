/**
* 海南股交认购信息
* version:1.0
* date:2016-12-27
* author:fp
* modify:
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.QueryHgjRgInfoWin=function(winId,winName,desk) {
	var resultPanelId='dc_gujiaorengouP';
	var curDate = new Date();
	var date=Ext.Date.format(curDate,'Y/m/d');
	var bdate;
	var edate;
	var transAmtData3;
	var btn;
	function getHtml(begandate,enddate) {
		var contextHtml = '<iframe src="'+constant.page+'dc/haiGuJiaoRenGou?BATCH_SQL=reportcheck_queryhaigujiaorengouexcel&begandate='+begandate+'&enddate='+enddate+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
			bdate=Ext.create({xtype:'datefield',fieldLabel:'满标开始日期',format: 'Y/m/d',value:Ext.util.Format.date(new Date(),"Y/m/d"),labelWidth:90,width:230}),
			edate=Ext.create({xtype:'datefield',fieldLabel:'满标结束日期',format: 'Y/m/d',value:Ext.util.Format.date(new Date(),"Y/m/d"),labelWidth:90,width:230}),
			'-',
			{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				var btn = this;
				    btn.disable();//防止重复点击
				    setTimeout(function() {
				    	btn.enable();
				 	  }, 5000);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				if(Ext.isEmpty(begandate) && Ext.isEmpty(enddate)) {
					begandate = date;
					enddate = date;
				} else if(Ext.isEmpty(begandate)) {
					Ext.Msg.alert("检查日期选项","请输入满标开始日期");
					return;
				} else if(Ext.isEmpty(enddate)) {
					Ext.Msg.alert("检查日期选项","请输入满标结束日期");
					return;
				} else if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
			    Ext.getCmp(resultPanelId).body.update(getHtml(begandate,enddate)); 
			   
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				if(Ext.isEmpty(begandate) && Ext.isEmpty(begandate)) {
					begandate = date;
					enddate = date;
				} else if(Ext.isEmpty(begandate)) {
					Ext.MessageBox.alert("检查日期选项","请输入满标开始日期");
					return;
				} else if(Ext.isEmpty(enddate)) {
					Ext.MessageBox.alert("检查日期选项","请输入满标结束日期");
					return;
				} else if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
				transAmtData3 = constant.ajax.sync('persistence.query',constant.ajax.failure)('reportcheck_queryhaigujiaorengoucount',{begandate:begandate,enddate:enddate});
				if(transAmtData3[0].num > 0){
					document.getElementById('main_hiddenFrame').src=constant.page+'dc/haiGuJiaoRenGou?VIEW=excel&BATCH_SQL=reportcheck_queryhaigujiaorengouexcel&begandate='+begandate+'&enddate='+enddate;
				}else{
					Ext.Msg.alert("检查查询条件","没有查询到相关数据不能下载！");
				}
				
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true,
		html:getHtml(date,date)
	});
	return {id:winId,title:winName,closable:true,layout:'border',items:[resultPanel]};
}