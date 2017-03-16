var main = main || {};
// 年度销售清单
var data = new Array();
for (var i = 1; i < 11; i++) {
	data.push([i, '奥运会' + i + '号', parseInt(Math.random() * 100 + i),
			'北京嵩山路' + i + '号胡同',
			'此人有' + ((Math.random() * 100000).toFixed(2)) + '元存款']);
}
var store = new Ext.data.SimpleStore({
			data : data,
			fields : ['id', 'name', 'age', 'addr', 'note']
		});

// 当天销售清单
var dayData = new Array();
for (var i = 1; i < 12; i++) {
	var hs = ((Math.random() * 100).toFixed(2));
	var ym = ((Math.random() * 10).toFixed(3));
	var dd = ((Math.random() * 1000).toFixed(2));
	var xm = ((Math.random() * 100).toFixed(1));
	var mh = ((Math.random() * 10).toFixed(2));
	var syy = ((Math.random() * 100).toFixed(3));
	var zj = hs + ym + dd + xm + mh + syy;
	dayData.push([i, hs, ym, dd, xm, mh, syy, zj])
}
var dayStore = new Ext.data.SimpleStore({
			data : dayData,
			fields : ['id', 'hs', 'ym', 'dd', 'xm', 'mh', 'syy', 'zj']
		});
var eastChartsPanel = Ext.create('Ext.chart.CartesianChart', {
			bodyPadding : 15,
			height : 260,
			margin : '0 2 5 0',
			store : {
				fields : ['name', 'g1', 'g2'],
				data : [{
							"name" : "Item-1",
							"g1" : 8.67,
							"g2" : 12.87
						}, {
							"name" : "Item-2",
							"g1" : 5.90,
							"g2" : 7.72
						}, {
							"name" : "Item-3",
							"g1" : 10.37,
							"g2" : 6.13
						}, {
							"name" : "Item-4",
							"g1" : 12.67,
							"g2" : 9.53
						}, {
							"name" : "Item-5",
							"g1" : 9.22,
							"g2" : 4.62
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
main.PanelWin = function() {
	var winId = "main.PanelWin";
	var win = desktop.getComponent(winId);
	if (win) {
		desktop.setActiveTab(win);
		return;
	}
	var date = new Date();
	var year = date.getFullYear();// 年
	var month = date.getMonth() + 1;// 月
	var jd = '二';// 季度
	month = (month < 10 ? "0" + month : month);
	var mydate = date.toLocaleDateString();// 日
	var PanelId = Ext.create('Ext.panel.Panel', {
				id : winId,
				title : '面板管理',
				layout : 'border',
				width : 1000,
				closable : true,
				items : [{
							region : 'west',
							border : 'fit',
							width : 700,
							title : '',
							header : false,
							items : [{
										region : 'north',
										title : year + '年度销售清单',
										height : 300,
										xtype : 'gridpanel',
										collapsible : true,
										columns : [{
													header : '序号',
													dataIndex : 'id',
													sortable : true,
													width : 60
												}, {
													header : '姓名',
													dataIndex : 'name',
													sortable : true,
													width : 120
												}, {
													header : '年龄',
													dataIndex : 'age',
													sortable : true
												}, {
													header : '地址',
													width : 150,
													dataIndex : 'addr',
													sortable : true
												}, {
													header : '备注',
													width : 220,
													dataIndex : 'note',
													sortable : true
												}],
										store : store,
										tools : [{
													type : 'refresh'
												}, {
													type : 'help'
												}],
										bbar : ['->', {// 顶部工具栏
											text : "新增",
											handler : onClickBar
										}, {
											text : "修改",
											handler : onClickBar
										}, {
											text : "刷新",
											handler : onClickBar
										}, {
											text : "删除",
											handler : onClickBar
										}]

									}, {
										region : 'center',
										title : jd + '季度销售清单',
										height : 300,
										collapsible : true
									}]
						}, {
							region : 'center',
							border : 'fit',
							title : '',
							header : false,
							items : [{
										region : 'north',
										height : 300,
										collapsible : true,
										title : year + '年' + month + '月份销售趋势图',
										items : [eastChartsPanel]
									}, {
										region : 'center',
										height : 500,
										collapsible : true,
										scrollable : true,
										title : mydate + '销售清单',
										xtype : 'gridpanel',
										id : 'dayGridPanel',
										columns : [{
													header : '序号',
													dataIndex : 'id',
													sortable : true,
													width : 80
												}, {
													header : '花生',
													dataIndex : 'hs',
													sortable : true,
													width : 80
												}, {
													header : '玉米',
													dataIndex : 'ym',
													width : 60,
													sortable : true
												}, {
													header : '大豆',
													width : 80,
													dataIndex : 'dd',
													sortable : true
												}, {
													header : '小麦',
													width : 80,
													dataIndex : 'xm',
													sortable : true
												}, {
													header : '棉花',
													width : 80,
													dataIndex : 'mh',
													sortable : true
												}, {
													header : '食用油',
													width : 80,
													dataIndex : 'syy',
													sortable : true
												}, {
													header : '统计',
													dataIndex : 'zj',
													sortable : true,
													width : 140
												}],
										store : dayStore,
										listeners : {
											'itemclick' : function(dayGridPanel, record, tr, index, e, eOpts ) {
												alert("1");
												var sm = dayGridPanel
														.getSelectionModel();

												if (sm.isSelected(index)) {
													// var selections =
													// dayGridPanel
													// .getSelectionModel()
													// .getSelections();
													// if (selections != null) {
													// reloadMainDoc(selections[0]
													// .get('id'));
													// }
												}
											}
										}
									}]
						}]
			});
	desktop.setActiveTab(desktop.add(PanelId));
}
function onClickBar(btn) {
	Ext.Msg.alert('温馨提示', '您点击了【' + btn.text + '】按钮！');
}