/**
* 支出对账管理
* version:1.0
* date:2016-09-28
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.QueryPayWin=function(winId,winName,desk) {  
	Ext.define('beacactcheck_querycheckbillrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'actcheckdate',
            'direction',
            'sumnum',
            'notmatchnum',
            'matchnum',
            'handlenum',
            'sumamt',
            'notmatchamt',
            'matchamt',
            'handleamt',
            'actcheckresult'
        ]
    });

	var sql="SQL_ID=beacactcheck_querycheckbillrst&direction=P&SIZE_SQL_ID=beacactcheck_querycheckbilltotal&direction=P";
    var store = constant.grid.store("beacactcheck_querycheckbillrst",sql);
    
    //差异处理
    var actCheckHandle=function(data){
    	constant.call('eac.actcheck.DifferenceDisposal')("payDiffDis"+data.id,"支出差异处理",data,desk);
   };
    
   var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
            {xtype:'rownumberer',width:30},
            {text:'对账日期',width:110,dataIndex: 'actcheckdate'},
            {text:'状态',width:60,dataIndex: 'actcheckresult',
            	renderer:function(v){
                    var m = DICT.getText(v,'eac_actCheckResult');
                    return v=='0'?eac.fun.getRedColor(true,m):eac.fun.getRedColor(false,m);
                 }
            },
            {text: "支出笔数", width: 80, dataIndex: 'sumnum'},
            {text: "匹配笔数", width: 80, dataIndex: 'matchnum'},
            {text: "未匹配笔数", width: 90, dataIndex: 'notmatchnum',renderer:function(v){return v>'0'?eac.fun.getRedColor(true,v):eac.fun.getRedColor(false,v);}},
            {text: "处理笔数", width: 80, dataIndex: 'handlenum',renderer:function(v){return v>'0'?eac.fun.getRedColor(true,v):eac.fun.getRedColor(false,v);}},
            {text: "支出发生额(元)", width: 115, dataIndex: 'sumamt'}, 
            {text: "匹配金额(元)", width: 105, dataIndex: 'matchamt'},
            {text: "未匹配金额(元)", width: 115, dataIndex: 'notmatchamt',renderer:function(v){return v>'0'?eac.fun.getRedColor(true,v):eac.fun.getRedColor(false,v);}},
            {text: "处理金额(元)", width: 105, dataIndex: 'handleamt',renderer:function(v){return v>'0'?eac.fun.getRedColor(true,v):eac.fun.getRedColor(false,v);}},
            {
                menuDisabled: true,
                text: "操作",
                sortable: false,
                xtype: 'actioncolumn',
                width: 70,
                items: [
                        {icon:constant.iconPath+'detail.png',tooltip:'详情',handler:function(g,ri,ci){
                        	var id = store.getAt(ri).data.id;
                        	constant.call('eac.actcheck.ViewDetail')("payDetail"+id,"支出对账明细",store.getAt(ri).data,desk);
                        }}
			           ]
            }
        ],
       tbar:[
              actcheckdate=Ext.create({xtype:'datefield',fieldLabel:'日期',format: 'Y/m/d',labelWidth:40,width:180}),
              '-',
              {icon:constant.iconPath+'find.png', text:'查询',handler:function(){
                  var params={};
                  params.actcheckdate = Ext.util.Format.date(actcheckdate.getValue(),'Y/m/d');
                  params.direction = 'P';
                  store.proxy.url=store.proxy._url+Ext.urlEncode(params);
                  store.reload({scope:this,callback:function(){this.enable()}});
              }},
              {icon:constant.iconPath+'excel.png', text:'导出Excel',handler:function(){
                  document.getElementById('main_hiddenFrame').src=constant.page+'eac/checkBillSummary?VIEW=excel&BATCH_SQL=beacactcheck_querycheckbillrstall&direction=P';
              }}
              /*,
              {icon:constant.iconPath+'plugin.gif',text:'差异处理',
	               handler:function(g,ri,ci) {
	               actCheckHandle(store.getAt(0).data);
	          }}*/
          ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
        listeners:{
        	rowdblclick:function(g,r,t,i,e,o){
        		var data = r.data;
        		constant.call('eac.actcheck.ViewDetail')("payDetail"+id,"支出对账明细",r.data,desk);
            }, 
        	rowcontextmenu:function(g,r,t,i,e,o){
                 e.preventDefault();
                 var actcheckdate = store.getAt(0).data.actcheckdate;
            	 var menu=new Ext.menu.Menu({
            		 items:[
                        {text:'详情',icon:constant.iconPath+'detail.png',handler:function(g,ri,ci){
                        	var id = r.data.id;
                        	constant.call('eac.actcheck.ViewDetail')("payDetail"+id,"支出对账明细",r.data,desk);
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

