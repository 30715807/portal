/**
* 交易明细
* version:1.0
* date:2016-10-31
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{voucher:{}});
eac.voucher.TransationDetail=function(winId,data) {
	var win=desktop.getComponent(winId);
	if(win){desktop.setActiveTab(win);return;};
	
	Ext.define('beacvoucher_queryvouchertransactionrst',{
        extend: 'Ext.data.Model',
        fields: [
            'actcheckstatus',
            'orderno',
            'transamt',
            'transtype',
            'transdate',
            'transtime',
            'serialno',
            'bfbtransid',
            'brhtransid',
            'status'
        ]
    });
	  

	var sql="SQL_ID=beacvoucher_queryvouchertransactionrst&SIZE_SQL_ID=beacvoucher_queryvouchertransactiontotal&sid="+data.id;
    var store = constant.grid.store("beacvoucher_queryvouchertransactionrst",sql);
    var grid = Ext.create('Ext.grid.Panel', {
        region:'center',
        //split:false,
        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        //selModel:{mode:'SINGLE'},
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "订单号", width: 120, dataIndex: 'orderno'},
            {text: "交易流水", width: 120, dataIndex: 'serialno', 
              renderer:function(v,c,r){
            	if(r.data.brhtransid == undefined){
            		  return "";
            	  }else{
            		  return v;
            	  }
              }
            },
            {text:'交易金额（元）',width:110,dataIndex: 'transamt'},
            {text: "交易类型", width: 160, dataIndex: 'transtype',
            	renderer:function(v,c,r){                  
            	       if (v.length >=4) 
            	    	    return DICT.getText(v,'brh_transtype');
            	       else 
            	    	    return DICT.getText(v,'eac_bfbtranstype');}
            },
            {text: "交易日期", width: 100, dataIndex: 'transdate',renderer:function(v,c,r){return eac.fun.getVal(v) + " " +  eac.fun.getVal(r.data.transtime);}},
            {text:'来源',width:80,dataIndex: 'transtype',renderer:function(v,c,r){ if(v.length >=4) return '邦融汇';else return '邦付宝';}},
            {text: "是否对账", width: 100, dataIndex: 'actcheckstatus',renderer:function(v,c,r){
            	if(r.data.status == '4'){
            		v = '3';
            	}
            	return DICT.getText(v,'eac_actcheckstatus');
            }}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store
        },
        listeners:{
        	afterrender:function(){store.load();}
        }
    });

    
    desktop.setActiveTab(desktop.add({id:winId,title:'交易明细',closable:true,layout:'border',tooltip:data.voucherno,items:[grid,
    	{
                xtype: 'buttongroup',  
                region:'north',
                height:85,
                columns: 4,   
                floatable:false,  
                border:false,
                margin:0,
                items: [
						{xtype:'tbtext',text:'凭证号：<span class="boldtxt">'+data.voucherno,width:200,height:30},
						{xtype:'tbtext',text:'凭证日期：<span class="boldtxt">'+data.voucherdate,width:200},
						{xtype:'tbtext',text:'凭证金额：<span class="boldtxt">'+data.voucheramt+' 元',width:200},
						{xtype:'tbtext',text:'凭证类型：<span class="boldtxt">'+DICT.getText(data.vouchercode,'VoucherType'),width:200},
						 orderNo=Ext.create({xtype:'textfield',fieldLabel:'订单号',labelWidth:60,width:240}),
						 transAmt=Ext.create({xtype:'textfield',fieldLabel:'订单金额',labelWidth:80,width:240}),
						{icon:constant.iconPath+'find.png', text:'查询',handler:function(){
						    var params={};
						    params.orderNo = orderNo.getValue();
						    params.transAmt = transAmt.getValue();
						    store.reload({params : params});
						}},
						{icon:constant.iconPath+'excel.png', text:'导出Excel',handler:function(){
							var sqls="BATCH_SQL=beacvoucher_queryvoucherdetailbyvoucherid,beacvoucher_queryvouchersummarybyid&sid="+data.id;
			            	document.getElementById('main_hiddenFrame').src=constant.page+'eac/voucherDetail?VIEW=excel&'+sqls;
			            }}
                ]
		 }
	]}));
}