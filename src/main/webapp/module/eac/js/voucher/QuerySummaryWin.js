/**
* 凭证详情
* version:1.0
* date:2016-10-31
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{voucher:{}});
eac.voucher.QuerySummaryWin=function(winId,winName) {
	Ext.define('beacvoucher_queryvouchersummaryrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'voucherno',
            'voucheramt',
            'voucherdate',
            'vouchercode',
            'status',
            'updatedatetime',
            'reason'
        ]
    });

	var sql="SQL_ID=beacvoucher_queryvouchersummaryrst&SIZE_SQL_ID=beacvoucher_queryvouchersummarytotal";
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
            {text: "凭证日期", width: 100, dataIndex: 'voucherdate'},
            {text: "凭证号", width: 140, dataIndex: 'voucherno'},
            {text:'业务类型',width:150,dataIndex: 'vouchercode', renderer:function(v){return DICT.getText(v,'VoucherType')}},
            {text: "凭证金额（元）", width: 100, dataIndex: 'voucheramt'},
            {text: "凭证状态", width: 100, dataIndex: 'status', hidden:true, renderer:function(v){return DICT.getText(v,'eac_voucherStatus')}},
            {text: "更新时间", width: 150, dataIndex: 'updatedatetime', hidden:true},
            {text: "原因", width: 300, dataIndex: 'reason', hidden:true},
            {
                menuDisabled: true,
                text: "操作",
                sortable: false,
                xtype: 'actioncolumn',
                width: 140,
                items: [
                        {icon:constant.iconPath+'detail2.png',tooltip:'凭证详情',handler:function(g,ri,ci){
                        	var data = store.getAt(ri).data;
                        	constant.call('eac.voucher.SummaryDetail')("summarydetail"+data.voucherno,data);
                        }},
                        '-',
                        {icon:constant.iconPath+'detail.png',tooltip:'交易明细',
                        	getClass: function(v, meta, r) {
					              if(r.data.vouchercode == '99') {//凭证类型为手工凭证，无交易明细数据，故置灰
					                  return this.disabledCls;
					              }
					         },
					         handler:function(g,ri,ci){
                        		var data = store.getAt(ri).data;
                        		constant.call('eac.voucher.TransationDetail')("TransationDetail"+data.voucherno,data);
                        	}
                        }]
            }
        ],
        tbar:[
				voucherDate=Ext.create({xtype:'datefield',fieldLabel:'日期',format: 'Y/m/d',labelWidth:40,width:180}),
				voucherNo=Ext.create({xtype:'textfield',fieldLabel:'凭证号',labelWidth:50,width:220}),
				voucherAmt=Ext.create({xtype:'textfield',fieldLabel:'凭证金额',labelWidth:80,width:220}),
				'-',
				{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
				    var params={};
				    params.voucherDate = Ext.util.Format.date(voucherDate.getValue(),'Y/m/d');
				    params.voucherNo = voucherNo.getValue();
				    params.voucherAmt = voucherAmt.getValue();
				    store.proxy.url=store.proxy._url+Ext.urlEncode(params);
	                store.reload({scope:this,callback:function(){this.enable()}});
				}}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store
        },
        listeners:{
        	rowcontextmenu:function(g,r,t,i,e,o){
                e.preventDefault();
           	 var menu=new Ext.menu.Menu({
           		 items:[
                       {text:'凭证详情',icon:constant.iconPath+'detail2.png', handler:function(){
                    	   var data = r.data;
                           constant.call('eac.voucher.SummaryDetail')("summarydetail"+data.voucherno,data);
                       }},
                       {text:'交易明细',icon:constant.iconPath+'detail.png', handler:function(){
                    	   
                       }}
                   ]});
                menu.showAt(e.getXY());
           },
        	afterrender:function(){store.load();}
        }
    });
    // 将当前panel放到desktop中并激活
    return grid;
}