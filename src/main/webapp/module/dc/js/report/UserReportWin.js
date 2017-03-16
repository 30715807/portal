/**
* 用户信息统计表
* version:1.0
* date:2016-11-15
* author:fp
* modify:
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.QueryUserReportWin=function(winId,winName,desk) {
	var resultPanelId='dc_userReportP';
	var curDate = new Date();
	var year=Ext.Date.format(curDate,'Y');
	function getHtml(yearParam) {
		var contextHtml = '<iframe src="'+constant.page+'dc/userReport?BATCH_SQL=reportcheck_queryuserreportexcel&yearparam='+yearParam+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
			actcheckdate=Ext.create({xtype:'datefield',fieldLabel:'年份',format: 'Y',value:Ext.util.Format.date(new Date(),"Y"),readOnly:true,labelWidth:40,width:150}),
			'-',
			{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				year = Ext.util.Format.date(actcheckdate.getValue(),'Y');
			    Ext.getCmp(resultPanelId).body.update(getHtml(year)); 
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				document.getElementById('main_hiddenFrame').src=constant.page+'dc/userReport?VIEW=excel&BATCH_SQL=reportcheck_queryuserreportexcel&yearparam='+year;
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true,
		html:getHtml(year)
	});
	return {id:winId,title:winName,closable:true,layout:'border',items:[resultPanel]};
}