/**
* 手工调账凭证详情
* version:1.0
* date:2016-11-07
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{manvoucher:{}});
eac.manvoucher.QuerySummaryWin=function(winId,winName,desk) {
	Ext.define('beacvoucher_queryvouchersummaryrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'voucherno',
            'voucheramt',
            'voucherdate',
            'vouchercode'
        ]
    });

	var sql="SQL_ID=beacvoucher_queryvouchersummaryrst&SIZE_SQL_ID=beacvoucher_queryvouchersummarytotal&voucherCode=99";
    var store = constant.grid.store("beacvoucher_queryvouchersummaryrst",sql);

    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        //selModel:{mode:'SINGLE'},
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "凭证号", width: 140, dataIndex: 'voucherno'},
            {text: "凭证日期", width: 100, dataIndex: 'voucherdate'},
            {text:'业务类型',width:150,dataIndex: 'vouchercode', renderer:function(v){return DICT.getText(v,'VoucherType')}},
            {text: "凭证金额（元）", width: 100, dataIndex: 'voucheramt'},
            {text: "凭证会计区间", width: 100, dataIndex: 'voucherdate',renderer:Ext.util.Format.dateRenderer('Y/m')},
            {
                menuDisabled: true,
                text: "操作",
                sortable: false,
                xtype: 'actioncolumn',
                width: 140,
                items: [
                        {icon:constant.iconPath+'detail2.png',tooltip:'手工凭证详情',handler:function(g,ri,ci){
                        	var data = store.getAt(ri).data;
                        	constant.call('eac.manvoucher.SummaryDetail')("summarydetail"+data.voucherno,data,desk);
                        }}
                        ]
            }
        ],
        tbar:[
				voucherDate=Ext.create({xtype:'datefield',fieldLabel:'凭证日期',format: 'Y/m/d',labelWidth:60,width:200}),
				voucherNo=Ext.create({xtype:'textfield',fieldLabel:'凭证号',labelWidth:50,width:220}),
				voucherAmt=Ext.create({xtype:'textfield',fieldLabel:'凭证金额',labelWidth:80,width:220}),
				'-',
				{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				    var params={};
				    params.voucherDate = Ext.util.Format.date(voucherDate.getValue(),'Y/m/d');
				    params.voucherNo = voucherNo.getValue();
				    params.voucherAmt = voucherAmt.getValue();
				    store.reload({params : params});
				}},
				'-',
				{icon:constant.iconPath+'add.gif', text:'手工调账',handler:function(){
					constant.call('eac.manvoucher.AddManVoucher')("addManVoucher"+Math.random(),"增加手工调账",grid,desk);
				}}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
        listeners:{
        	afterrender:function(){store.load();}
        }
    });
    // 将当前panel放到desktop中并激活
    return grid;
}