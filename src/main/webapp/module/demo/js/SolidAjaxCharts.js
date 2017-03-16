var charts = charts || {};
charts.SolidAjaxCharts = function(winId,winName) {
	var myStore = new Ext.data.JsonStore({
		storeId : 'myStore',
		proxy : {
			type : 'ajax',
			url : constant.appPath+'module/demo/js/data.json',
			reader : {
				type : 'json',
				rootProperty : 'ExtDay'
			}
		},
		fields : ['day', 'apple', 'orange']
	});
	myStore.load();
	desktop.setActiveTab(desktop.add({
		id : winId,
		title : winName,
		closable : true,

		xtype : 'cartesian',
		innerPadding : '0 10 0 10',
		store : myStore,
		legend : {
			docked : 'bottom'// 显示图例在底部
		},
		axes : [{
				type : 'numeric3d',
				position : 'left',
				fields : ['apple', 'orange'],
				title : {
					text : 'Inventory',
					fontSize : 15
				},
				grid : {
					odd : {// 奇数填充颜色
						fillStyle : 'rgba(255, 255,255, 0.09)'
					},
					even : {// 偶数填充颜色
						fillStyle : 'rgba(0, 0, 0, 0.03)'
					}
				}
			}, {
				type : 'category3d',
				position : 'bottom',
				title : {
					text : 'fruitSort',
					fontSize : 15
				},
				fields : 'day'
			}],
		series : {
			type : 'bar3d',
			title : ['苹果', '桔子'],
			xField : 'day',
			yField : ['apple', 'orange']
		}
	}));
}