var charts = charts || {};
charts.Charts = function(winId,winName) {
	var centerChartsPanel = Ext.create('Ext.chart.PolarChart', {
		id : 'polarDom',
		region : 'center',
		margin : '0 5 0 0',
		title : '饼状图表',
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
		highlight : true,
		legend : {
			docked : 'bottom'// 图例：停驻-底部
		},
		series : {
			highlight : true,
			showInLegend : true,// 是否显示图例
			type : 'pie',
			xField : 'g1',
			label : {
				field : 'name',
				display : 'rotate'

			},
			donut : 25
		}
	});
	var westChartsPanel = Ext.create('Ext.chart.CartesianChart', {
		region : 'west',
		title : '笛卡尔图',
		collapsible : true,
		margin : '0 5 0 2',
		bodyPadding : 10,
		width : 500,
		flipXY : true,
		store : {
			fields : ['name', 'g1', 'g2'],
			data : [{
					"name" : "Item-1",
					"g1" : 2.67,
					"g2" : 14.87
				}, {
					"name" : "Item-2",
					"g1" : 1.90,
					"g2" : 5.72
				}, {
					"name" : "Item-3",
					"g1" : 21.37,
					"g2" : 2.13
				}, {
					"name" : "Item-4",
					"g1" : 2.67,
					"g2" : 8.53
				}, {
					"name" : "Item-5",
					"g1" : 18.22,
					"g2" : 4.62
				}, {
					"name" : "Item-6",
					"g1" : 28.51,
					"g2" : 12.43
				}, {
					"name" : "Item-7",
					"g1" : 34.43,
					"g2" : 4.40
				}, {
					"name" : "Item-8",
					"g1" : 21.65,
					"g2" : 13.87
				}, {
					"name" : "Item-9",
					"g1" : 12.98,
					"g2" : 35.44
				}, {
					"name" : "Item-10",
					"g1" : 22.96,
					"g2" : 38.70
				}]
		},
		legend : {
			docked : 'bottom'
		},
		axes : [{
				type : 'numeric',
				position : 'bottom',
				grid : true,
				minimum : 0
			}, {
				type : 'category',
				position : 'left'
			}],
		series : [{
			type : 'bar',
			xField : 'name',
			yField : ['g1', 'g2'],
			axis : 'bottom',
			subStyle : {
				fill : ["#115fa6", "#94ae0a"]
			}
		}]
	});
	var eastChartsPanel = Ext.create('Ext.chart.CartesianChart', {
		title : '线形图表',
		// scrollable : true,
		bodyPadding : 15,
		margin : '0 2 0 0',
		region : 'east',
		collapsible : true,
		width : 450,
		store : {
			fields : ['name', 'g1', 'g2'],
			data : [{
					"name" : "Item-1",
					"g1" : 2.67,
					"g2" : 14.87
				}, {
					"name" : "Item-2",
					"g1" : 1.90,
					"g2" : 5.72
				}, {
					"name" : "Item-3",
					"g1" : 21.37,
					"g2" : 2.13
				}, {
					"name" : "Item-4",
					"g1" : 2.67,
					"g2" : 8.53
				}, {
					"name" : "Item-5",
					"g1" : 18.22,
					"g2" : 4.62
				}, {
					"name" : "Item-6",
					"g1" : 28.51,
					"g2" : 12.43
				}, {
					"name" : "Item-7",
					"g1" : 34.43,
					"g2" : 4.40
				}, {
					"name" : "Item-8",
					"g1" : 21.65,
					"g2" : 13.87
				}, {
					"name" : "Item-9",
					"g1" : 12.98,
					"g2" : 35.44
				}, {
					"name" : "Item-10",
					"g1" : 22.96,
					"g2" : 38.70
				}]
		},
		interactions : ['panzoom'],
		legend : {
			docked : 'bottom'
		},
		axes : [{
				type : 'numeric',
				position : 'left'
			}, {
				type : 'category',
				visibleRange : [0, 1],
				position : 'bottom'
			}],
		series : [{
				type : 'line',
				xField : 'name',
				yField : 'g1',
				title : 'Normal',
				style : {
					fill : "#115fa6",
					stroke : "#115fa6",
					fillOpacity : 0.6,
					miterLimit : 3,
					lineCap : 'miter',
					lineWidth : 2
				}
			}, {
				type : 'line',
				xField : 'name',
				yField : 'g2',
				title : 'Smooth',
				style : {
					smooth : true,
					stroke : "#94ae0a",
					fillOpacity : 0.6,
					miterLimit : 3,
					lineCap : 'miter',
					lineWidth : 2
				}
			}]
	});
	 
	
	return {
		id : winId,
		title : winName,
		closable : true,

		border : 4,
		split : true,
		layout : 'border',
		items : [westChartsPanel, centerChartsPanel, eastChartsPanel]
	}
}