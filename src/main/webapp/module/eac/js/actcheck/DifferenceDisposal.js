/**
 * 差异处理记录列表
 * version:1.0
 * date:2016-10-11
 * author:czz
 * modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.DifferenceDisposal=function(winId,winName,data,desk){
	desk=desk||desktop;
	var win=desk.getComponent(winId);
	if(win){desk.setActiveTab(win);return;};
	
	Ext.define('beacactcheck_queryfailcheckbilldetailrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'actcheckstatus',
            'orderno',
            'transamt',
            'transtype',
            'direction',
            'transdate',
            'transtime',
            'bfbtransid',
            'brhtransid',
            'checkstatus',
            'reason',
            'checkername'
        ]
    });
    
	var sql="SQL_ID=beacactcheck_queryfailcheckbilldetailrst&direction="+data.direction+"" +
			"&SIZE_SQL_ID=beacactcheck_queryfailcheckbilldetailtotal&direction="+data.direction;
    var store = constant.grid.store("beacactcheck_queryfailcheckbilldetailrst",sql);

    
	var viewGrid = Ext.create('Ext.grid.Panel', {
	        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
	        forceFit:true,
	        store:store,
	        viewConfig:{enableTextSelection:true},
	        stripeRows:true,
	        columns:[
	            {text:'订单号',width:155,dataIndex: 'orderno'},
	            {text: "交易金额（元）", width: 115, dataIndex: 'transamt',renderer:function(v,c,r){return formatAmt(v,r);}},
	            {text: "交易类型", width: 170, dataIndex: 'transtype',
	            	renderer:function(v,c,r){                  
	            	       if (r.data.brhtransid != undefined) 
	            	    	    return DICT.getText(v,'brh_transtype');
	            	       else 
	            	    	    return DICT.getText(v,'eac_bfbtranstype');}
	            },
	            {text: "交易时间", width: 142, dataIndex: 'transtime',renderer:function(v,c,r){return eac.fun.getVal(r.data.transdate) + " " + eac.fun.getVal(v);}},
	            {text: "来源", width: 60, dataIndex: 'brhtransid',renderer:function(v,c,r){if(v!=undefined) return '邦融汇'; else return '邦付宝';}},
	            {text: "审批状态", width: 80, dataIndex: 'checkstatus',
	            	renderer:function(v,c,r){
			            	if(v == null || v == undefined)
			            		return '待处理';
			            	return DICT.getText(v,'eac_checkStatus')}
	            },
	            {text: "审批人", width: 70, dataIndex: 'checkername'},
	            {text: "原因", flex:1, dataIndex: 'reason'},
	            {
	                menuDisabled: true,
	                text: "操作",
	                sortable: false,
	                xtype: 'actioncolumn',
	                width: 50,
	                items: [
		                	{icon:constant.iconPath+'wrench_orange.png',tooltip:'调账',
		                	 getClass: function(v, meta, r) {
					              if(r.data.checkstatus == '0') {//待复核，置灰按钮
					                  return this.disabledCls;
					              }
					         },
		                     handler:function(g,ri,ci) {
				                 var data = store.getAt(ri).data;
				                 constant.call('eac.actcheck.ToDisposal')(viewGrid,data);
				             }
				            }]
	            }
	        ],
	      tbar:[
	                orderNo=Ext.create({xtype:'textfield',fieldLabel:'订单号',labelWidth:50,width:210}),
	                transAmt=Ext.create({xtype:'textfield',fieldLabel:'交易金额',labelWidth:60,width:190}),
	                transdate=Ext.create({xtype:'datefield',fieldLabel:'交易日期',format: 'Y/m/d',labelWidth:60,width:200}),
	                origin=Ext.create({
	                    xtype:'combo',
	                    labelWidth: 50,
	                    width:140,
	                    fieldLabel: '来源',
	                    store: DICT.store('eac_dataOrigin'),
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
	                    params.transdate = Ext.util.Format.date(transdate.getValue(),'Y/m/d');
	                    params.origin = origin.getValue();
	                    params.direction = data.direction;
	                    params.actcheckdate = data.actcheckdate;
	                    store.proxy.url=store.proxy._url+Ext.urlEncode(params);
	                    store.reload({scope:this,callback:function(){this.enable()}});
	                }},
	                {icon:constant.iconPath+'wrench_orange.png', text:'批量调账',handler:function(){
	                	this.disable();
	                	var bn=this;
	                	constant.ajax.async("eacActCheck.batchActCheck", function(count) {
	                		Ext.create('widget.uxNotification',{title:'提示',minWidth:250,autoCloseDelay:5000,html:'成功处理'+count+'笔记录',position:'t',paddingY:260}).show();
	                	    //Ext.Msg.alert("提示", "成功处理"+count+"笔记录");
	                	    if (count > 0) store.load();
	                	    bn.enable();
	                	}, function(r) {
	                	    bn.enable();
	                	    util.ajax.failure(r);
	                	})(data.direction);
	                }}
	            ],
	        bbar:{
	            xtype : 'pagingtoolbar',
	            displayInfo : true,
	            store : store
	        },
	        listeners:{
	        	rowdblclick:function(g,r,t,i,e,o){
	        		if(r.data.checkstatus!='0'){
	                    constant.call('eac.actcheck.ToDisposal')(viewGrid,r.data);
	        		}
	            }, 
	        	rowcontextmenu:function(g,r,t,i,e,o){
	                 e.preventDefault();
	            	 var menu=new Ext.menu.Menu({
	            		 items:[
	                        {text:'调账',icon:constant.iconPath+'wrench_orange.png',disabled:r.data.checkstatus=='0',handler:function(g,ri,ci){
	                        	constant.call('eac.actcheck.ToDisposal')(viewGrid,r.data);
	                        }}
	                    ]});
	                 menu.showAt(e.getXY());
	            },
	        	afterrender:function(){store.load();}
	        }
	    });
	
	 //格式化金额
	 function formatAmt(v,r){
		 if(eac.fun.getVal(v) == "") return "";
     	
       	if(r.data.direction == 'R'){
     		return "+"+v;
     	}else{
 			if(r.data.transtype == '01J'){
     			return "+"+v;
            }
     		return "-"+v;
     	}
	 }
	 
	 desk.setActiveTab(desk.add(viewGrid));
}