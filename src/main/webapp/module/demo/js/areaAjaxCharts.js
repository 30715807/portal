var charts = charts || {};
charts.areaAjaxCharts = function() {
	var winId = "charts.areaAjaxCharts";

	var win = desktop.getComponent(winId);
	if (win) {
		desktop.setActiveTab(win);
		return;
	}
	var myStore = new Ext.data.JsonStore({
				storeId : 'myStore',
				proxy : {
					type : 'ajax',
					url :constant.appPath+'module/demo/js/data.json',
					reader : {
						type : 'json',
						rootProperty : 'ExtTime'
					}
				},
				fields : ['time', 'visit']
			});
	myStore.load();
	var areaAjaxChartsPanel = Ext.create('Ext.chart.Chart', {
				id : winId,
				title : 'areaAjaxCharts',
				closable : true,// 是否可以关闭
				store : myStore,
				innerPadding : 10,
				legend : {
					docked : 'bottom'// 显示图例在底部
				},
				axes : [{
							type : 'category',// 分类在底部，显示为name，标题为title
							position : 'bottom',
							fields : ['time'],
							title : 'EXTJS-时刻'
						}, {
							type : 'numeric',
							position : 'left',
							fields : ['visit'],
							title : {
								text : '访问量',
								fontSize : 15,
								color : '#FF0033'
							},
							grid : true,
							minimum : 0
						}],
				series : [{
							type : 'area',
							title : '访问量',
							yField : ['visit'],
							xField : ['time'],
							style : {
								opacity : 0.63
							}
						}]
			});
	desktop.setActiveTab(desktop.add(areaAjaxChartsPanel));
}