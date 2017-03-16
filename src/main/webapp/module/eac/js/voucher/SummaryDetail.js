/**
* 凭证规则
* version:1.0
* date:2016-09-08
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{voucher:{}});
eac.voucher.SummaryDetail=function(winId,data) {
	var win=desktop.getComponent(winId);
	if(win){desktop.setActiveTab(win);return;};
	
	Ext.define('beacvoucher_queryvouchersummarydetail',{
        extend: 'Ext.data.Model',
        fields: [
            'voucherno',
            'vouchercode',
            'dcflag',
            'company',
            'companyname',
            'department',
            'departmentname',
            'subject',
            'subjectname',
            'subacct',
            'subacctname',
            'product',
            'productname',
            'channel',
            'channelname',
            'remark1',
            'remark2',
            'amount',
            'digest'
        ]
    });

	var sql="SQL_ID=beacvoucher_queryvouchersummarydetail&voucherNo="+data.voucherno;
    /*var store = constant.grid.store("beacvoucher_queryvouchersummarydetail",sql);*/

    var store = Ext.create('Ext.data.Store', {
		model : 'beacvoucher_queryvouchersummarydetail',
		proxy : util.grid.proxy(sql),
		groupField: 'dcflag' // 如果表格数据需要分组显示则需要配置
	});
	
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:'凭证详情',closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        //selModel:{mode:'SINGLE'},
        columns:[
            {xtype:'rownumberer',width:30},
            {text:'借/贷',width:60,dataIndex: 'dcflag', renderer:function(v){return DICT.getText(v,'DCFlag')},hidden:true},
            {text: "公司", width: 60, dataIndex: 'company'},
            {text: "公司名称", width: 230, dataIndex: 'companyname'},
            {text: "部门", width: 80, dataIndex: 'department',hidden:true},
            {text: "部门名称", width: 100, dataIndex: 'departmentname'},            
            {text: "科目", width: 80, dataIndex: 'subject'},
            {text: "科目名称", width: 180, dataIndex: 'subjectname'},
            {text: "明细", width: 80, dataIndex: 'subacct'},
            {text: "明细名称", width: 280, dataIndex: 'subacctname'},
            {text: "产品", width: 60, dataIndex: 'product',hidden:true},
            {text: "产品名称", width: 100, dataIndex: 'productname'},
            {text: "渠道", width: 80, dataIndex: 'channel',hidden:true},
            {text: "渠道名称", width: 180, dataIndex: 'channelname'},
            {text: "备用1", width: 60, dataIndex: 'remark1'},
            {text: "备用2", width: 60, dataIndex: 'remark2'},
            {text: "凭证金额(元)", width: 120, dataIndex: 'amount'},
            {text: "会计摘要", width: 140, dataIndex: 'digest'}
        ], 
        features:[{
            ftype: 'groupingsummary',
           	groupHeaderTpl: '{name}',
            enableGroupingMenu: false
        }],
        tbar:[
                {xtype:'tbtext',text:'凭证号：<span class="boldtxt">'+data.voucherno,width:250},
				{xtype:'tbtext',text:'凭证日期：<span class="boldtxt">'+data.voucherdate,width:250},
				{xtype:'tbtext',text:'凭证金额：<span class="boldtxt">'+data.voucheramt+' 元',width:260},
				{xtype:'tbtext',text:'凭证类型：<span class="boldtxt">'+DICT.getText(data.vouchercode,'VoucherType'),width:260}
      ],
        listeners:{
        	afterrender:function(){store.load();}
        }
    });
  
    desktop.setActiveTab(desktop.add(grid));
}