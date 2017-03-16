var charts = charts || {};
charts.AreaCharts = function(winId,winName) {
	var myData = [["一月", 22], ["二月", 45], ["三月", 20], ["四月", 35], ["五月", 31],
			["六月", 64], ["七月", 25], ["八月", 81], ["九月", 46], ["十月", 59],
			["十一月", 65], ["十二月", 20]];
	var myStore = new Ext.data.SimpleStore({
				storeId : 'myStore',
				data : myData,
				fields : ['month', 'visit']
			});
	return Ext.create('Ext.chart.Chart', {
		id : winId,
		title : winName,
		closable : true,
		
		store : myStore,
		innerPadding : 10,
		legend : {
			docked : 'bottom'// 显示图例在底部
		},
		axes : [{
				type : 'category',// 分类在底部，显示为name，标题为title
				position : 'bottom',
				fields : ['month'],
				title : 'EXTJS-2016年度'
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
				// x轴最小值
			}],
		series : [{
			type : 'area',
			title : '访问量',
			yField : ['visit'],
			xField : ['month'],
			style : {
				opacity : 0.63
				// 透明度
			}
		}]
	});
}