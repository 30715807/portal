/**
 * 对账明细
 * version:1.0
 * date:2016-09-09
 * author:czz
 * modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.ViewDetail=function(winId,winName,data,desk){
	desk=desk||desktop;
	var win=desk.getComponent(winId);
	if(win){desk.setActiveTab(win);return;};
	
	Ext.define('beacactcheck_querycheckbilldetailrst',{
        extend: 'Ext.data.Model',
        fields: [
            'actcheckstatus',
            'orderno',
            'transamt',
            'transtype',
            'direction',
            'transdate',
            'transtime',
            'bfborderno',
            'bfbtransamt',
            'bfbtranstype',
            'bfbtransdate',
            'bfbtranstime',
            'status',
            'handledate'
        ]
    });
	
	//统计交易金额
    var transAmtData = constant.ajax.sync('persistence.query',constant.ajax.failure)('beacactcheck_statcheckbilltransamt',{direction:data.direction,actcheckdate:data.actcheckdate})||{};
    
	var sql="SQL_ID=beacactcheck_querycheckbilldetailrst&direction="+data.direction+"&actcheckdate="+data.actcheckdate+"" +
			"&SIZE_SQL_ID=beacactcheck_querycheckbilldetailtotal&direction="+data.direction+"&actcheckdate="+data.actcheckdate;
    var store = constant.grid.store("beacactcheck_querycheckbilldetailrst",sql);
    
    //对账状态---去掉 0：未对账
    var statusStore=DICT.store('eac_actcheckstatus');
    statusStore.filterBy(function(r,i){return r.data['value']!='0'});
    
	var viewGrid = Ext.create('Ext.grid.Panel', {
	        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
	        tooltip:data.actcheckdate+winName,
	        forceFit:false,
	        store:store,
	        viewConfig:{enableTextSelection:true},
	        stripeRows:true,
	        columns:[
	            {xtype:'rownumberer',width:30},
	            {text:'状态',width:100,dataIndex: 'actcheckstatus',
	            	renderer:function(v,c,r){
	            		if(v == '1' && (r.data.status == '21' || r.data.status == '22')){
	            			v = '3';
	            		}
	                    var m = DICT.getText(v,'eac_actcheckstatus');
	                    return v=='2'?eac.fun.getRedColor(true,m):eac.fun.getRedColor(false,m);
	                 }},
	            {text:'订单号',width:160,dataIndex: 'orderno'},
	            {text: "交易金额（元）", width: 120, dataIndex: 'transamt',renderer:function(v,c,r){return formatAmt(v,r);}},
	            {text: "交易类型", width: 180, dataIndex: 'transtype',renderer:function(v){ return DICT.getText(v,'brh_transtype');}},
	            {text: "交易时间", width: 150, dataIndex: 'transtime',renderer:function(v,c,r){return eac.fun.getVal(r.data.transdate) + " " + eac.fun.getVal(v);}},
	            {text: "邦付宝订单号", width: 160, dataIndex: 'bfborderno'},
	            {text: "邦付宝交易金额（元）", width: 160, dataIndex: 'bfbtransamt',renderer:function(v,c,r){return formatAmt(v,r,r.data.bfbtranstype);}},            
	            {text: "邦付宝交易类型", width: 120, dataIndex: 'bfbtranstype',renderer:function(v){return DICT.getText(v,'eac_bfbtranstype')}},
	            {text: "邦付宝交易时间", width: 150, dataIndex: 'bfbtranstime',renderer:function(v,c,r){return eac.fun.getVal(r.data.bfbtransdate) + " " + eac.fun.getVal(v);}},
	            {text: "处理时间", width: 150, hidden:true,dataIndex: 'updatedatetime'}
	        ],
	      tbar:[
	                orderNo=Ext.create({xtype:'textfield',fieldLabel:'订单号',labelWidth:50,width:260}),
	                transAmt=Ext.create({xtype:'textfield',fieldLabel:'交易金额',labelWidth:60,width:200}),
	                actCheckStatus=Ext.create({
	                    xtype:'combo',
	                    labelWidth: 50,
	                    width:180,
	                    fieldLabel: '状态',
	                    store: statusStore,
	                    valueField: 'value',
	                    emptyText: '全部',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),
	                '-',
	                {icon:constant.iconPath+'find.png', text:'查询',handler:function(){
	                    var params={};
	                    params.orderno = orderNo.getValue();
	                    params.transamt = transAmt.getValue();
	                    params.actcheckstatus = actCheckStatus.getValue();
	                    params.direction = data.direction;
	                    params.actcheckdate = data.actcheckdate;
	                    store.proxy.url=store.proxy._url+Ext.urlEncode(params);
	                    store.reload({scope:this,callback:function(){this.enable()}});
	                }},
	                {icon:constant.iconPath+'excel.png', text:'导出Excel',handler:function(){
	                	var sqls="BATCH_SQL=beacactcheck_querycheckbilldetailrstall,beacactcheck_statcheckbilltransamt&direction="+
	                		data.direction+"&actcheckdate="+data.actcheckdate;
	                	document.getElementById('main_hiddenFrame').src=constant.page+'eac/checkBillDetail?VIEW=excel&'+sqls;
	                }}
	            ],
	        bbar:{
	            xtype : 'pagingtoolbar',
	            displayInfo : true,
	            store : store,
	            items:['-',
	                   '<span class="boldtxt" style="margin:0px 20px 0px 10px;">交易总金额：'+ eac.fun.getVal(transAmtData.transamt) +' 元</span>',
	                   '<span class="boldtxt">邦付宝交易总金额：'+ eac.fun.getVal(transAmtData.bfbtransamt) +' 元</span>'
	               ]
	        },
	        listeners:{
	        	afterrender:function(){store.load();}
	        }
	    });
	
	 //格式化金额
	 function formatAmt(v,r,bfbtranstype){
		 if(eac.fun.getVal(v) == "") return "";
     	
       	if(r.data.direction == 'R'){
     		return "+"+v;
     	}else{
     		if(bfbtranstype != null){
     			if(bfbtranstype == '01J'){
         			return "+"+v;
         		}
     		}
     		
     		return "-"+v;
     		
     	}
	 }
	 
	 desk.setActiveTab(desk.add(viewGrid));
}