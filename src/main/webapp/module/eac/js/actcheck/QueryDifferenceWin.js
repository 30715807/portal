/**
* 差异处理查询
* version:1.0
* date:2016-10-19
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.QueryDifferenceWin=function(winId,winName,desk) {
	Ext.define('beacactcheck_querydifferencerst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'orderno',
            'userid',
            'realname',
            'preusablebalance',
            'behindusablebalance',
            'transtype',
            'transdate',
            'transtime',
            'handlestyle',
            'operatorname',
            'checkername',
            'inputdatetime',
            'transamt',
            'direction',
            'origtransamt'
        ]
    });

	var sql="SQL_ID=beacactcheck_querydifferencerst&SIZE_SQL_ID=beacactcheck_querydifferencetotal";
    var store = constant.grid.store("beacactcheck_querydifferencerst",sql);
    
   var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
            {text:'订单号',width:160,dataIndex: 'orderno'},
            {text:'用户',width:60,dataIndex: 'realname'},
            {text: "交易方向", width: 80, dataIndex: 'direction',renderer:function(v){return DICT.getText(v,'eac_direction');}},
            {text: "交易金额（元）", width: 120, dataIndex: 'origtransamt'},
            {text: "处理前可用余额（元）", width: 160, dataIndex: 'preusablebalance'},
            {text: "调账金额（元）", width: 120, dataIndex: 'transamt',renderer: function(v){if(v > 0) return '+'+v ;return v;}},
            {text: "处理后可用金额（元）", width: 160, dataIndex: 'behindusablebalance'},            
            {text: "交易类型", width: 180, dataIndex: 'transtype',renderer:function(v){return DICT.getText(v,'brh_transtype');}},
            {text: "交易时间", width: 150, dataIndex: 'transtime',renderer:function(v,c,r){return eac.fun.getVal(r.data.transdate) + " " + eac.fun.getVal(v);}},
            {text: "处理方式", width: 80, dataIndex: 'handlestyle',renderer:function(v){return DICT.getText(v,'eac_handleStyle');}},
            {text: "操作人", width: 80, dataIndex: 'operatorname'},
            {text: "复核人", width: 80, dataIndex: 'checkername'},
            {text: "处理时间", width: 150, dataIndex: 'inputdatetime'}
        ],
        tbar:[
              orderNo=Ext.create({xtype:'textfield',fieldLabel:'订单号',name:'orderNo',labelWidth:50,width:210}),
              origTransAmt=Ext.create({xtype:'textfield',fieldLabel:'交易金额',name:'origTransAmt',labelWidth:60,width:180}),
              transDate=Ext.create({xtype:'datefield',fieldLabel:'交易日期',format: 'Y/m/d',name:'transDate',labelWidth:60,width:190}),
              realName=Ext.create({xtype:'textfield',fieldLabel:'姓名',name:'realName',labelWidth:40,width:110}),
              direction=Ext.create({
                  xtype:'combo',
                  name:'direction',
                  labelWidth: 70,
                  width:160,
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
            	  var params = util.form.getValues(orderNo,origTransAmt,realName,direction);
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

