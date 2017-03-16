/**
* 收入对账管理
* version:1.0
* date:2016-09-28
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{checkrefund:{}});
eac.checkrefund.QueryRefundWin=function(winId,winName,desk) {
	Ext.define('beaccheckrefund_querycheckrefundrst',{
        extend: 'Ext.data.Model',
        fields: [
        	'id',
        	'bfbtransid',
            'orderno',
            'actcheckdate',
            'transdate',
            'transamt',
            'status',
            'reason',
            'inputdatetime',
            'updatedatetime'
        ]
    });

	var sql="SQL_ID=beacactcheck_querycheckrefundrst&SIZE_SQL_ID=beacactcheck_querycheckrefundtotal";
    var store = constant.grid.store("beaccheckrefund_querycheckrefundrst",sql);
    
    //退票处理
    var actCheckRefundHandle=function(data){
    	console.info(data.id);
    	util.ajax.async('eacActCheck.handleReturnBusiness',
        	function(ret){
    	   		Ext.Msg.alert('提示','操作处理成功!');
    	   		store.load();
        	}
        )(data.id);
   	};
    
   var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "主键", width: 150, hidden:true, dataIndex: 'id'},
            {text: "邦付宝接口表ID", width: 150, hidden:true, dataIndex: 'bfbtransid'},
            {text: "订单号", width: 190, dataIndex: 'orderno'},
            {text:'对账日期',width:100,dataIndex: 'actcheckdate'},
            {text: "交易日期", width: 100, dataIndex: 'transdate'},
            {text: "交易金额(元)", width: 145, dataIndex: 'transamt'},
            {text: "状态", width: 80, dataIndex: 'status',
            	renderer:function(v){
                    var m = DICT.getText(v,'eac_handleStatus');
                    return v=='0'?eac.fun.getRedColor(true,m):eac.fun.getRedColor(false,m);
                }
             },
            {text: "邦融汇处理结果", width: 245, dataIndex: 'reason'},
            {text: "交易插入时间", width: 150, dataIndex: 'inputdatetime'},
            {text: "交易处理时间", width: 150, dataIndex: 'updatedatetime'},
            {
                menuDisabled: true,
                text: "操作",
                sortable: false,
                xtype: 'actioncolumn',
                width: 70,
                items: [
                	{icon:constant.iconPath+'detail.png',tooltip:'处理',
                		handler:function(g,ri,ci) {
	               			actCheckRefundHandle(store.getAt(ri).data);
		        		}
		        	}
		        ]
            }
        ],
        tbar:[
              actcheckdate=Ext.create({xtype:'datefield',fieldLabel:'日期',format: 'Y/m/d',labelWidth:40,width:180}),
              '-',
              status=Ext.create({
              	xtype:'combo',
              	fieldLabel: '状态',
              	name:'status',
              	labelWidth:60,
              	width:155,
              	store:DICT.store('eac_handleStatus'),
                valueField: 'value',
                emptyText: '全部',
                allowBlank:false,
                selectOnFocus: true 
              }),
              '-',
              {icon:constant.iconPath+'find.png', text:'查询',handler:function(){
                  var params={};
                  params.actcheckdate = Ext.util.Format.date(actcheckdate.getValue(),'Y/m/d');
                  params.status = status.getValue();
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

