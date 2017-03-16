/**
* XX被保险人清单
* version:1.0
* date:2016-12-26
* author:fp
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.BaoxianRenWin=function(winId,winName,desk) {
	var resultPanelId='dc_baoxianrenP';
	var curDate = '####';
	var date=Ext.Date.format(curDate,'Y/m/d');
	var toubaoperson;
	var xm;
	var projectname1;
	var bdate;
	var edate;
	function getHtml(xmbh,proname,tbr,begandate,enddate) {
		if(typeof(xmbh) == 'undefined'){
			xmbh = 'ok';
		}
		if(typeof(tbr) == 'undefined'){
			tbr = '';
		}
		if(typeof(proname) == 'undefined'){
			proname = '';
		}
		
		if(typeof(begandate) == 'undefined'||begandate==''){
			begandate = '';
		}
		if(typeof(enddate) == 'undefined'||enddate==''){
			enddate = '';
		}
		var contextHtml = '<iframe src="'+constant.page+'dc/BaoxianRen?BATCH_SQL=dcreport_querybaoxianrenexcel,dcreport_querybaoxianrencountexcel&xmbh='+xmbh+'&toubaoperson='+tbr+'&begandate='+begandate+'&enddate='+enddate+'&proname='+proname+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
//		alert(contextHtml);
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
		      bdate=Ext.create({xtype:'datefield',fieldLabel:'满标开始日期',format: 'Y/m/d',value:Ext.util.Format.date('',"Y/m/d"),labelWidth:85,width:210}),
		      edate=Ext.create({xtype:'datefield',fieldLabel:'满标结束日期',format: 'Y/m/d',value:Ext.util.Format.date( '',"Y/m/d"),labelWidth:85,width:210}),
		      xmbh1=Ext.create({id:'xmbh1', xtype:'textfield',value:'',fieldLabel:'项目编号',labelWidth:60,width:210}),
		      projectname=Ext.create({id:'projname', xtype:'textfield',value:'',fieldLabel:'项目名称',labelWidth:60,width:200}),
			toubaoren=Ext.create({id:'toubaoren1', xtype:'textfield',value:'',fieldLabel:'投保人',labelWidth:60,width:170}),
			{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				var xmbh =Ext.getCmp('xmbh1').getValue();
				var proname =Ext.getCmp('projname').getValue();
				var tbr =Ext.getCmp('toubaoren1').getValue();
				if(enddate.length>7){
					if(begandate.length<7){
						Ext.Msg.alert("检查日期选项","请选择开始日期");
						return;
					}
				}
				if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
				if(Ext.isEmpty(xmbh)&&Ext.isEmpty(tbr)&&Ext.isEmpty(begandate)&&Ext.isEmpty(enddate)&&Ext.isEmpty(proname)) {
					Ext.Msg.alert("检查查询条件","请填写至少一个查询条件");
					return;
				} 
				Ext.getCmp(resultPanelId).body.update(getHtml(xmbh,proname,tbr,begandate,enddate)); 
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				var xmbh =Ext.getCmp('xmbh1').getValue();
				var proname =Ext.getCmp('projname').getValue();
				var tbr =Ext.getCmp('toubaoren1').getValue();
				if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
				if(Ext.isEmpty(xmbh)&&Ext.isEmpty(tbr)&&Ext.isEmpty(begandate)&&Ext.isEmpty(enddate)) {
					Ext.Msg.alert("检查查询条件","请填写至少一个查询条件");
					return;
				} 
				document.getElementById('main_hiddenFrame').src=constant.page+'dc/BaoxianRen?VIEW=excel&BATCH_SQL=dcreport_querybaoxianrenexcel,dcreport_querybaoxianrencountexcel&begandate='+begandate+'&enddate='+enddate+'&xmbh='+xmbh+'&toubaoperson='+tbr+'&proname='+proname;
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true,
		html:getHtml(xm,projectname1,toubaoperson,date,date)
	});
	return {id:winId,title:winName,closable:true,layout:'border',items:[resultPanel]};
}