var charts = charts || {};
charts.BarAjaxCharts = function(winId,winName) {
	var html = 'title';
	/*
	var myStore = new Ext.data.JsonStore({
		//storeId : 'myStore',
		proxy : {
			type : 'ajax',
			url : constant.appPath+'module/demo/js/data.json',
			reader : {
				type : 'json',
				rootProperty : 'ExtBar'
			}
		},
		fields : ['name', 'value']
	});*/
	var myStore=util.grid.store({fields : ['name', 'value']},
    	'sid=sso_chart');
	
	myStore.load();
	desktop.setActiveTab(desktop.add({
		id : winId,
		title : winName,
		closable : true,

		xtype : 'cartesian',
		store : myStore,
		axes : [{
				type : 'numeric',
				position : 'left',
				title : {
					text : '使用人数（万）',
					fontSize : 15
				},
				fields : 'value',
				grid : true
			}, {
				type : 'category',
				position : 'bottom',
				title : {
					text : '开发语言',
					fontSize : 15
				},
				fields : 'name'
			}],
		series : {
			type : 'bar',
			subStyle : {
				fill : ['#388FAD'],
				stroke : '#1F6D91'
			},
			xField : 'name',
			yField : 'value',
			tooltip : {
				trackMouse : true,
				width : 140,
				height : 28,
				title : 'title',
				renderer : function(sprite, config, rendererData, index) {
					console.log(myStore);
					// Ext.Msg.alert(rendererData.record.data.name,
					// rendererData.record.data.value);
				}
			}
			// ,
			// listeners : {
			// itemmouseover : function(series, item, event) {
			// // alert(item.record.data.value);
			// }
			// }
		}
	}));
}