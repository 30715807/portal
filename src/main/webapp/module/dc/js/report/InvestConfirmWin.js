/**
* 邦融汇投资成功确认
* version:1.0
* date:2017-01-19
* author:lx
*/
constant.import('dc/js/dc.js');
Ext.applyIf(dc,{report:{}});
dc.report.InvestConfirmWin=function(winId,winName,desk) {
	var resultPanelId='dc_ludanSuccessP';
	var curDate = '';
	var date=Ext.Date.format(curDate,'Y/m/d');
	var rouzixiangmu='kobe';
	var rouziren='';
	var bdate;
	var edate;
	var transAmtData2;
	//创建数组数据源
	var combostore = new Ext.data.ArrayStore({
		                 fields: ['id', 'name'],
		               data: [[1, '汇保利'], [2, '汇金利'], [3, '汇鑫利'],[4, '汇盈利'],[5, '汇增利']]
		             });
	function getHtml(investname,begandate,enddate,investproject) {
		if(typeof(investproject) == 'undefined'){
			investproject = 'kobe';
		}
		var contextHtml = '<iframe src="'+constant.page+'dc/investConfirm?BATCH_SQL=reportcheck_brhinvestsuccessexcel,reportcheck_brhinvestcountexcel&begandate='+begandate+'&enddate='+enddate+'&investproject='+investproject+'&investname='+investname+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
		return contextHtml;
	}
	var resultPanel=new Ext.Panel({
		tbar:[
            investname=Ext.create({id:'investname', xtype:'textfield',value:'',fieldLabel:'融资人名称',labelWidth:70,width:190}),
			bdate=Ext.create({xtype:'datefield',fieldLabel:'进件开始日期',format: 'Y/m/d',value:Ext.util.Format.date('',"Y/m/d"),labelWidth:90,width:220}),
			edate=Ext.create({xtype:'datefield',fieldLabel:'进件结束日期',format: 'Y/m/d',value:Ext.util.Format.date('',"Y/m/d"),labelWidth:90,width:220}),
			//创建下拉框
			
			  combobox = new Ext.form.ComboBox({
				                 fieldLabel: '融资项目',
				                 labelWidth:67,
				                 width:190,
				                  store: combostore,
				                 displayField: 'name',
				               valueField: 'id',
				                 triggerAction: 'all',
				                 emptyText: '请选择...',
				                allowBlank: false,
				                  blankText: '请选择融资项目',
				                  editable: false,
				                  mode: 'local',
				                id:'combo'	  
				              }),
				              //获取下拉框显示的值
			 combobox.on('select', function () {
				 				           var  rouzixiangmu = Ext.getCmp('combo').getRawValue();
				 				              }),	              
			{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var investname = Ext.getCmp('investname').getValue();
				var investproject4 = Ext.getCmp('combo').getRawValue();
//				var investproject = Ext.util.Format.substr(investproject4,1,2);
				var investproject2 = Ext.util.Format.substr(investproject4,1,2);
				var investproject1 = Ext.util.Format.substr(investproject4,0,1);
				var investproject=investproject1+'.'+investproject2;
//				alert(investproject3);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				if(Ext.isEmpty(investname)){
					Ext.Msg.alert("检查查询条件","请填写融资人名称");
					return;
				}
				if(Ext.isEmpty(investproject)){
					Ext.Msg.alert("检查查询条件","请填写融资项目");
					return;
				}
				if(enddate.length>7){//不选择开始日期，只选择结束日期不让查询
					if(begandate.length<7){
						Ext.Msg.alert("检查日期选项","请选择开始日期");
						return;
					}
				}
				if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
				if(Ext.isEmpty(investname)&&Ext.isEmpty(investproject)&&Ext.isEmpty(begandate)&&Ext.isEmpty(enddate)) {
					Ext.Msg.alert("检查查询条件","请填写至少一个查询条件");
					return;
				} 
				Ext.getCmp(resultPanelId).body.update(getHtml(investname,begandate,enddate,investproject)); 
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				var btn = this;
			    btn.disable();//防止重复点击
			    setTimeout(function() {
			    	btn.enable();
			 	  }, 5000);
				var investname = Ext.getCmp('investname').getValue();
				var investproject4 = Ext.getCmp('combo').getRawValue();
				var investproject2 = Ext.util.Format.substr(investproject4,1,2);
				var investproject1 = Ext.util.Format.substr(investproject4,0,1);
				var investproject=investproject1+'.'+investproject2;
//				var investproject = Ext.getCmp('combo').getRawValue();
//				investproject = Ext.util.Format.substr(investproject,1,2);
				var begandate = Ext.util.Format.date(bdate.getValue(),'Y/m/d');
				var enddate = Ext.util.Format.date(edate.getValue(),'Y/m/d');
				if(Ext.isEmpty(investname)){
					Ext.Msg.alert("检查查询条件","请填写融资人名称");
					return;
				}
				if(Ext.isEmpty(investproject)){
					Ext.Msg.alert("检查查询条件","请填写融资项目");
					return;
				}
				if(enddate.length>7){//不选择开始日期，只选择结束日期不让查询
					if(begandate.length<7){
						Ext.Msg.alert("检查日期选项","请选择开始日期");
						return;
					}
				}
				if(begandate>enddate) {
					Ext.Msg.alert("检查日期选项","结束日期必须大于等于开始日期");
					return;
				} 
				if(Ext.isEmpty(investname)&&Ext.isEmpty(investproject)&&Ext.isEmpty(begandate)&&Ext.isEmpty(enddate)) {
					Ext.Msg.alert("检查查询条件","请填写至少一个查询条件");
					return;
				} 
				 transAmtData2 = constant.ajax.sync('persistence.query',constant.ajax.failure)('reportcheck_brhinvestcountexcel',{begandate:begandate,enddate:enddate,investname:investname,investproject:investproject});
					if(transAmtData2[0].num > 0){
						document.getElementById('main_hiddenFrame').src=constant.page+'dc/investConfirm?VIEW=excel&BATCH_SQL=reportcheck_brhinvestsuccessexcel,reportcheck_brhinvestcountexcel&begandate='+begandate+'&enddate='+enddate+'&investname='+investname+'&investproject='+investproject;
					}else{
						Ext.Msg.alert("检查查询条件","没有查询到相关数据不能下载！");
					}
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true,
		html:getHtml(rouziren,date,date,rouzixiangmu)
	});
	return {id:winId,title:winName,closable:true,layout:'border',items:[resultPanel]};
}