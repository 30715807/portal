var charts = charts || {};
charts.PieCharts = function(winId,winName) {
	return Ext.create('Ext.chart.PolarChart', {
		id : winId,
		title : winName,
		closable : true,

		innerpadding : '0 5 0 0',
		store : {
			fields : ['name', 'g1'],
			data : [{
					"name" : "谷类",
					"g1" : 25.67
				}, {
					"name" : "小麦",
					"g1" : 30.90
				}, {
					"name" : "大豆",
					"g1" : 38.37
				}, {
					"name" : "棉花",
					"g1" : 21.34
				}]
		},

		interactions : ['rotate'],// 交互：旋转
		legend : {
			docked : 'bottom'// 图例：停驻-底部
		},
		series : [{
			highlight : true,
			showInLegend : true,// 是否显示图例
			type : 'pie',
			xField : 'g1',
			label : {
				field : 'name',
				display : 'rotate'

			},
			donut : 25,
			style : {
				miterLimit : 10,
				lineCap : 'miter',
				lineWidth : 2
			},
			tips : {
				trackMouse : true,
				width : 140,
				height : 28,
				renderer : function(storeItem, item) {
					//alert(pieChartsPanel.store.getData());
					this.setTitle(storeItem.getData());
				}

			}

		}]
	});
}