/**
 * 满标放款管理 version:1.0 date:2016-10-17 author:foolish modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac, {
	check : {}
});
eac.check.QueryFScaleWin = function(winId, winName, desk) {
	Ext.define('brhfullscaleloan', {
		extend : 'Ext.data.Model',
		fields : [ 'id', 'serialNo', 'customerName', 'projectName',
				'paymentMethod', 'loanAmount', 'amount', 'loanTerm',
				'loanRate', 'addRate', 'loanDays', 'returnRate', 'feeRate',
				'fee', 'policyRate', 'policyAmount', 'rateDate',
				'maturityDate', 'putoutAmount', 'operateUsername',
				'operateTime' ]
	});

	var store = Ext.create('Ext.data.Store', {
		model : 'brhfullscaleloan',
		proxy : util.grid.sproxy('brhFinanceLoan.queryFullScalesProjectInfo')(
				util.grid.paging.page, util.grid.paging.limit),
		sortInfo : {
			field : 'operateTime',
			direction : 'DESC'
		}
	});

	var grid = Ext.create('Ext.grid.Panel', {
		id : winId,
		title : winName,
		closable : true, // 每个tabpanel标准配置
		store : store,
		viewConfig : {
			enableTextSelection : true,
			forceFit : true
		},
		stripeRows : true,
		columns : [ {
			xtype : 'rownumberer',
			width : 30
		}, {
			text : '项目编号',
			width : 140,
			dataIndex : 'serialNo'
		}, {
			text : '借款人',
			width : 80,
			dataIndex : 'customerName'
		}, {
			text : '项目名称',
			width : 150,
			dataIndex : 'projectName'
		}, {
			text : "还款方式",
			width : 120,
			dataIndex : 'paymentMethod'
		}, {
			text : "募集金额(元)",
			width : 95,
			dataIndex : 'loanAmount'
		}, {
			text : "借款满标金额(元)",
			width : 120,
			dataIndex : 'amount'
		}, {
			text : "借款期限",
			width : 80,
			dataIndex : 'loanTerm'
		}, {
			text : "借款利率%",
			width : 85,
			dataIndex : 'loanRate'
		}, {
			text : "加送利率%",
			width : 85,
			dataIndex : 'addRate'
		}, {
			text : "借款天数",
			width : 80,
			dataIndex : 'loanDays'
		}, {
			text : "投资收益率%",
			width : 100,
			dataIndex : 'returnRate'
		}, {
			text : "平台服务费费率%",
			width : 130,
			dataIndex : 'feeRate'
		}, {
			text : "平台服务费(元)",
			width : 110,
			dataIndex : 'fee'
		}, {
			text : "信用险费率%",
			width : 100,
			dataIndex : 'policyRate'
		}, {
			text : "信用险保费(元)",
			width : 110,
			dataIndex : 'policyAmount'
		}, {
			text : "起息日",
			width : 90,
			dataIndex : 'rateDate',
			renderer : Ext.util.Format.dateRenderer('Y-m-d')
		}, {
			text : "到期日",
			width : 90,
			dataIndex : 'maturityDate',
			renderer : Ext.util.Format.dateRenderer('Y-m-d')
		}, {
			text : "放款金额(元)",
			width : 110,
			dataIndex : 'putoutAmount'
		}, {
			text : "操作人",
			width : 80,
			dataIndex : 'operateUsername'
		}, {
			text : "操作时间",
			width : 150,
			dataIndex : 'operateTime',
			renderer : Ext.util.Format.dateRenderer('Y-m-d h:i:s')
		} ],
		tbar : [ {
			icon : constant.iconPath + 'accept.png',
			text : '同意',
			handler : fullScaleLoanAccept
		}, {
			icon : constant.iconPath + 'delete.gif',
			text : '驳回',
			handler : fullScaleLoanRefuse
		} ],
		bbar : {
			xtype : 'pagingtoolbar',
			displayInfo : true,
			store : store
		},
		listeners : {
			rowcontextmenu : function(g, r, t, i, e, o) {
				e.preventDefault();
				var menu = new Ext.menu.Menu({
					items : [ {
						text : '同意',
						icon : constant.iconPath + 'accept.png',
						handler : fullScaleLoanAccept
					}, {
						text : '驳回',
						icon : constant.iconPath + 'delete.gif',
						handler : fullScaleLoanRefuse
					} ]
				});
				menu.showAt(e.getXY());
			},
			afterrender : function() {
				store.load();
			}
		}
	});

	var selected;
	// 满标放款操作
	function fullScaleLoanAccept() {
		selected = grid.getSelection()[0];// 获取一行
		if (selected == undefined) {
			Ext.Msg.alert("提示", "请选择一条记录！");
			return;
		}
		this.disable();
		var bn = this;
		Ext.MessageBox.confirm("信息确认", "满标审核通过！", function(btn) {
			if (btn == 'yes') {
				var params = {};
				params.serialNo = selected.data.serialNo;
				params.status = "00";
				params.operateUsername = constant.user.name;
				util.ajax.async('brhFinanceLoan.approveFullScalesProject',
					function(ret) {
						util.notify('提示', ret.message);
						store.load();
						bn.enable();
					})(params);
			}
			bn.enable();
		});
	}
	// 拒绝
	function fullScaleLoanRefuse() {
		selected = grid.getSelection()[0];// 获取一行
		if (selected == undefined) {
			Ext.Msg.alert("", "请选择一条记录！");
			return;
		}
		fullScaleLoanUpdate();
	}

	function fullScaleLoanUpdate() {
		var refuseWin = new Ext.Window({
			title : "驳回原因",
			modal : true,
			width : 500,
			height : 220,
			border : false,
			plain : true,
			buttonAlign : "center",
			layout : "fit",
			items : form = new Ext.form.Panel({
				margin : 5,
				border : false,
				items : [ reason = Ext.create({
					xtype : 'textarea',
					fieldLabel : '驳回原因',
					blankText : '请输入驳回原因',
					maxLengthText : '驳回原因过长(限50字内)',
					labelWidth : 60,
					width : 450,
					height : 100,
					allowBlank : false,
					maxLength : 50,
					margin : 5
				}) ]
			}),

			buttons : [
					{
						text : "确定",
						handler : function() {
							if (!form.isValid()) {
								return;
							}
							var params = {};
							params.serialNo = selected.data.serialNo;
							params.status = "01";
							params.operateUsername = constant.user.name;
							params.reason = reason.getValue();
							util.ajax.async(
									'brhFinanceLoan.approveFullScalesProject',
									function(ret) {
										util.notify('提示', ret.message);
										store.load();
									})(params);
							refuseWin.close();
						}
					}, {
						text : "关闭",
						handler : function() {
							refuseWin.close();
						}
					} ]
		});
		refuseWin.show();
	}
	/*
	 * var showDialog; function fullScaleLoanRefuse(){ selected
	 * =grid.getSelection()[0];//获取一行 if(selected == undefined){
	 * Ext.Msg.alert("", "请选择一条记录！"); return; }
	 * 
	 * showDialog = Ext.Msg.show({ title: "驳回原因", msg: "输入项目驳回原因(限50字内)", width:
	 * 500, prompt: true, buttons: Ext.Msg.OKCANCEL, multiline: true, fn:
	 * fullScaleLoanUpdate }); } function fullScaleLoanUpdate(btn, text) { if(
	 * btn == 'ok' ){ if(text.length>50){ Ext.Msg.alert("输入字数过长，请重新输入！");
	 * showDialog; }else if(Ext.util.Format.trim(text).length==0){
	 * alert("请输入驳回原因！"); showDialog; }else{ var params={}; params.serialNo =
	 * selected.data.serialNo; params.status = "01"; params.operateUsername =
	 * constant.user.name; params.reason = text;
	 * util.ajax.async('brhFinanceLoan.approveFullScalesProject',
	 * function(ret){util.notify('提示',ret.message);store.load();})(params); } } }
	 */
	// 将当前panel放到desktop中并激活
	return grid;
}
