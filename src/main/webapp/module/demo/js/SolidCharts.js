var charts = charts || {};
charts.SolidCharts = function(winId,winName) {
	var solidChartsPanel = Ext.create({
		id : winId,
		title : winName,
		closable : true,

		xtype : 'cartesian',
		innerPadding : '0 10 0 10',
		tbar:[{text:'Save',handler:function(){
			var image=solidChartsPanel.getImage();
			alert(image.type);
			alert(image.data);
		}}],
		store : {
			fields : ['name', 'apples', 'oranges'],
			data : [{
					name : 'Eric',
					apples : 10,
					oranges : 3
				}, {
					name : 'Mary',
					apples : 7,
					oranges : 2
				}, {
					name : 'John',
					apples : 5,
					oranges : 2
				}, {
					name : 'Bob',
					apples : 2,
					oranges : 3
				}, {
					name : 'Joe',
					apples : 19,
					oranges : 1
				}, {
					name : 'Macy',
					apples : 13,
					oranges : 4
				}]
		},
		legend : {
			docked : 'bottom'// 显示图例在底部
		},
		axes : [{
				type : 'numeric3d',
				position : 'left',
				fields : ['apples', 'oranges'],
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
					text : 'People',
					fontSize : 15
				},
				fields : 'name'
			}],
		series : {
			type : 'bar3d',
			title : ['苹果', '桔子'],
			xField : 'name',
			yField : ['apples', 'oranges']
		}
	});
	desktop.setActiveTab(desktop.add(solidChartsPanel));
}