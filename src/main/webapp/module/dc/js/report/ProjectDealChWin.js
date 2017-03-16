/**
* 成交规模统计表-产品
* version:1.0
* date:2016-11-15
* author:fp
* modify:
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.QueryProjectDealChWin=function(winId,winName,desk) {
	var resultPanelId='dc_projectDealChReportP';
	var curDate = new Date();
	var date=Ext.Date.format(curDate,'Y/m/d');
	var bdate;
	var edate;
	function getHtml(begandate,enddate) {
		var contextHtml = '<iframe src="'+constant.page+'dc/projectDealCh?BATCH_SQL=reportcheck_queryprojectdealchexcel&begandate='+begandate+'&enddate='+enddate+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
			bdate=Ext.create({xtype:'datefield',fieldLabel:'开始日期',format: 'Y/m/d',value:Ext.util.Format.date(new Date(),"Y/m/d"),labelWidth:60,width:190}),
			edate=Ext.create({xtype:'datefield',fieldLabel:'结束日期',format: 'Y/m/d',value:Ext.util.Format.date(new Date(),"Y/m/d"),labelWidth:60,width:190}),
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
					Ext.Msg.alert("检查日期选项","请输入开始日期");
					return;
				} else if(Ext.isEmpty(enddate)) {
					Ext.Msg.alert("检查日期选项","请输入结束日期");
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
					Ext.MessageBox.alert("检查日期选项","请输入开始日期");
					return;
				} else if(Ext.isEmpty(enddate)) {
					Ext.MessageBox.alert("检查日期选项","请输入结束日期");
					return;
				}
				document.getElementById('main_hiddenFrame').src=constant.page+'dc/projectDealCh?VIEW=excel&BATCH_SQL=reportcheck_queryprojectdealchexcel&begandate='+begandate+'&enddate='+enddate;
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