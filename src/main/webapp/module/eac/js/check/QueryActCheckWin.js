/**
* 差异调账审批
* version:1.0
* date:2016-09-28
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{check:{}});
eac.check.QueryActCheckWin=function(winId,winName,desk) {
	Ext.define('beacactcheck_querywaitchkcheckbilldetailrst',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
            'transamt',
            'direction',
            'transtype',
            'servicetype',
            'operatorid',
            'operatorname',
            'updatedatetime',
            'bfbtransid',
            'orderno'
        ]
    });

	var sql="SQL_ID=beacactcheck_querywaitchkcheckbilldetailrst&SIZE_SQL_ID=beacactcheck_querywaitchkcheckbilldetailtotal";
    var store = constant.grid.store("beacactcheck_querywaitchkcheckbilldetailrst",sql);
    
    //差异处理
    var actCheckHandle=function(data){
    	//constant.call('eac.actcheck.DifferenceDisposal')("incomeDiffDis"+data.id,"差异调账审批",data,desk);
    };
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
            {xtype:'rownumberer',width:30},
            {text:'业务类型',width:110,dataIndex: 'servicetype',renderer:function(v){return  DICT.getText(v,'eac_serviceType');}},
            {text:'交易金额（元）',width:80,dataIndex: 'transamt'},
            {text:'交易类型',width:80,dataIndex: 'transtype',renderer:function(v,c,r){return DICT.getText(getTransType(r.data),'brh_transtype');}},
            {text: "申请人", width: 120, dataIndex: 'operatorname'},
            {text: "申请日期", width: 120, dataIndex: 'updatedatetime'},
            {
                menuDisabled: true,
                text: "操作",
                sortable: false,
                xtype: 'actioncolumn',
                width: 140,
                items: [
	                	{icon:constant.iconPath+'ok.png',tooltip:'同意',
			               handler:function(g,ri,ci) {
			            	   agree(store.getAt(ri).data);
			                }
			             },
                        '-',
                        {icon:constant.iconPath+'error.png',tooltip:'驳回',
			               handler:function(g,ri,ci) {
			            	   reject(store.getAt(ri).data);
			                }
			             },
			            '-',
                        {icon:constant.iconPath+'detail.png',tooltip:'详情',handler:function(g,ri,ci){
                        	var data = store.getAt(ri).data;
                        	constant.call('eac.check.ActCheckDetail')(grid,data);
                        }}]
            }
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
        listeners:{
        	rowdblclick:function(g,r,t,i,e,o){
        		constant.call('eac.check.ActCheckDetail')(grid,r.data);
            }, 
        	rowcontextmenu:function(g,r,t,i,e,o){
                 e.preventDefault();
            	 var menu=new Ext.menu.Menu({
            		 items:[
                        {text:'同意',icon:constant.iconPath+'ok.png', handler:function(g,ri,ci){
                        	agree(r.data);
                        }},
                        {text:'驳回',icon:constant.iconPath+'error.png', handler:function(g,ri,ci){
                        	reject(r.data);
                        }},
                        {text:'详情',icon:constant.iconPath+'detail.png',handler:function(g,ri,ci){
                        	constant.call('eac.check.ActCheckDetail')(grid,r.data);
                        }}
                    ]});
                 menu.showAt(e.getXY());
            },
        	afterrender:function(){store.load();}
        }
    });
    
    //获取交易类型
    function getTransType(data){
    	if(data.direction == 'P') return '1024';//退票
        if(data.servicetype == '01' && data.direction == 'R'){//对账且为充值
        	if(data.bfbtransid == undefined){//充值撤单
        		return '1014';
        	}else{//充值补单
        		return '1022';
        	}
        }
    }
    
    //同意
    function agree(data){
	  Ext.MessageBox.confirm("信息确认", "您确定审核通过该条记录吗？", function (btn) {
		 if(btn == 'yes'){
			 var params={};
			 params.id = data.id;
			 params.serviceType = data.servicetype;
			 params.transType = getTransType(data);
			 params.sysUserCode = constant.user.code;
         	 params.sysUserName = constant.user.name;
			 
			 constant.ajax.async("eacCheck.agree", function() {
         	    Ext.Msg.alert("", "操作成功！");
                 grid.store.load();
         	})(params);
		  }
	        
	   });
    }
    
    //拒绝
    function reject(data){
    	  var win = new Ext.Window({
    	        title:"拒绝",
    	        modal:true,
    	        width:400,
    	        height:150,
    	        border:false,
    	        plain:true,
    	        buttonAlign:"center",
    	        layout:"fit",
    	        items:form = new Ext.form.Panel({
    	            	margin:5,
    	                border:false,
    	                items:[reason=Ext.create({
    	                	xtype:'textfield',
    	                	fieldLabel: '拒绝原因',
    	                	labelWidth:60,
    	                    width:380,
    	                    height:35,
    	                    allowBlank:false,
    	                    maxLength:60,
    	                    margin:5
    	                })]
    	            }),
    	        	
    	        buttons:[ {
    	            text:"确定",
    	            handler:function() {
    	            	 if(!form.isValid()){
    	                     return;
    	                 }
	    	             var params={};
	    	   			 params.id = data.id;
	    	   			 params.serviceType = data.servicetype;
	    	   			 params.transType = getTransType(data);
	    	   			 params.sysUserCode = constant.user.code;
	    	             params.sysUserName = constant.user.name;
	    	             params.reason = reason.getValue();
	    	   			 
	    	   			 constant.ajax.async("eacCheck.reject", function() {
	    	            	    Ext.Msg.alert("", "操作成功！");
	    	                    grid.store.load();
	    	                    win.close();
	    	            	})(params);
    	            }
    	        }, {
    	            text:"关闭",
    	            handler:function() {
    	                win.close();
    	            }
    	        } ]
    	    });
    	    win.show();
    }
    
    // 将当前panel放到desktop中并激活
    return grid;
  
}

