var charts = charts || {};
charts.LineAjaxCharts = function(winId,winName) {
	var myStore = new Ext.data.JsonStore({
		storeId : 'myStore',
		proxy : {
			type : 'ajax',
			url : constant.appPath+'module/demo/js/data.json',
			reader : {
				type : 'json',
				rootProperty : 'ExtLine'
			}
		},
		fields : ['name', 'data1', 'data2']
	});
	myStore.load();
	desktop.setActiveTab(desktop.add({
		id : winId,
		title : winName,
		closable : true,

		xtype : 'cartesian',
		insetPadding : 40,
		store : myStore,
		legend : {
			docked : 'bottom'// 显示图例在底部
		},
		axes : [{
				type : 'numeric',
				position : 'left',
				fields : ['data1', 'data2', 'data3'],
				title : {
					text : 'Sample Values',
					fontSize : 15
				},
				grid : true,
				minimum : 0
			}, {
				type : 'category',
				position : 'bottom',
				fields : ['name'],
				title : {
					text : 'Sample Values',
					fontSize : 15
				}
			}],
		series : [{
				type : 'line',
				style : {
					// stroke : '#30BDA7',
					lineWidth : 2
				},
				xField : 'name',
				yField : 'data1',
				marker : {
					type : 'path',
					path : ['M', -4, 0, 0, 4, 4, 0, 0, -4, 'Z'],
					// stroke : '#30BDA7',
					lineWidth : 2,
					fill : 'white'
				}
			}, {
				type : 'line',
				fill : true,
				style : {
					// fill : '#96D4C6',// 填充区域颜色&透明度
					fillOpacity : .6,
					// stroke : '#F70938',// 线的颜色&透明度
					strokeOpacity : 0.96
				},
				xField : 'name',
				yField : ['data2'],
				marker : {
					type : 'circle',
					radius : 4,// 圆圈的半径
					lineWidth : 2,// 圆圈线的粗细
					fill : 'white'
				}
			}, {
				type : 'line',
				fill : true,
				style : {
					// fill : '#96D4C6',// 填充区域颜色&透明度
					fillOpacity : .6,
					// stroke : '#F70938',// 线的颜色&透明度
					strokeOpacity : 0.96
				},
				xField : 'name',
				yField : ['data3'],
				marker : {
					type : 'circle',
					radius : 4,// 圆圈的半径
					lineWidth : 2,// 圆圈线的粗细
					fill : 'white'
				}
			}]
	}));
}