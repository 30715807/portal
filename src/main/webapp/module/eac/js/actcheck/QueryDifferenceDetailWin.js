/**
* 差异处理查询
* version:1.0
* date:2016-10-19
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.QueryDiffDetailWin=function(winId,winName,desk) {
	Ext.define('beacactcheck_querydifferencedetailrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
			'brhtransid',
			'bfbtransid',
			'orderno',
			'actcheckdate',
			'transtype',
			'direction',
			'transamt',
			'transdate',
			'transtime',
			'status',
			'handlestatus',
			'handledate',
			'inputdatetime',
			'updatedatetime'
        ]
    });

	var sql="SQL_ID=beacactcheck_querydifferencedetailrst&SIZE_SQL_ID=beacactcheck_querydifferencedetailtotal";
    var store = constant.grid.store("beacactcheck_querydifferencedetailrst",sql);

    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
         	{xtype:'rownumberer',width:30},
            {text:'订单号',width:160,dataIndex: 'orderno'},
            {text:'对账日期',width:120,dataIndex: 'actcheckdate'},
            {text: "交易方向", width: 80, dataIndex: 'direction',renderer:function(v){return DICT.getText(v,'eac_direction');}},
            {text: "交易金额（元）", width: 120, dataIndex: 'transamt'},
            {text:'来源',width:80,dataIndex: 'transtype',renderer:function(v,c,r){ if(v.length >=4) return '邦融汇';else return '邦付宝';}},
            {text: "处理状态", width: 80, dataIndex: 'handlestatus',
            	renderer:function(v){
                    var m = DICT.getText(v,'eac_handleStatus');
                    return v=='0'?eac.fun.getRedColor(true,m):eac.fun.getRedColor(false,m);
                }
             },
            {text: "交易类型", width: 180, dataIndex: 'transtype',
            	renderer:function(v,c,r){                  
        	       if (v.length >=4) 
        	    	    return DICT.getText(v,'brh_transtype');
        	       else 
        	    	    return DICT.getText(v,'eac_bfbtranstype');
        	   	}
            },
            {text: "交易时间", width: 150, dataIndex: 'transtime',renderer:function(v,c,r){return eac.fun.getVal(r.data.transdate) + " " + eac.fun.getVal(v);}},
            {text: "处理时间", width: 150, dataIndex: 'handledate'}
        ],
        tbar:[
              orderNo=Ext.create({xtype:'textfield',fieldLabel:'订单号',name:'orderNo',labelWidth:50,width:190}),
              transAmt=Ext.create({xtype:'textfield',fieldLabel:'交易金额',name:'transAmt',labelWidth:60,width:150}),
              transDate=Ext.create({xtype:'datefield',fieldLabel:'交易日期',format: 'Y/m/d',name:'transDate',labelWidth:60,width:180}),
              handleStatus=Ext.create({
              	xtype:'combo',
              	name:'handleStatus',
              	fieldLabel: '处理状态',
              	labelWidth:60,
              	width:155,
              	store:DICT.store('eac_handleStatus'),
                valueField: 'value',
                emptyText: '全部',
                allowBlank:false,
                selectOnFocus: true 
              }),
              direction=Ext.create({
                  xtype:'combo',
                  name:'direction',
                  labelWidth: 60,
                  width:150,
                  fieldLabel: '交易方向',
                  store: DICT.store('eac_direction'),
                  valueField: 'value',
                  emptyText: '全部',
                  allowBlank:false,
                  selectOnFocus: true 
              }),
              '-',
              {icon:constant.iconPath+'find.png', text:'查询',handler:function(){
            	  this.disable();
            	  var params = util.form.getValues(orderNo,transAmt,direction,handleStatus);
                  params.transDate = Ext.util.Format.date(transDate.getValue(),'Y/m/d');
                  store.proxy.url=store.proxy._url+Ext.urlEncode(params);
                  store.reload({scope:this,callback:function(){this.enable()}});
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

