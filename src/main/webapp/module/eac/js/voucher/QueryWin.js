/**
* 凭证规则
* version:1.0
* date:2016-09-08
* author:czz
* modify:
*/
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{voucher:{}});
eac.voucher.QueryWin=function(winId,winName) {
	Ext.define('beacvoucher_queryvoucherrule',{
        extend: 'Ext.data.Model',
        fields: [
            'id',
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
            'digest'
        ]
    });

    var store = Ext.create('Ext.data.Store', {
        model: 'beacvoucher_queryvoucherrule',
        groupField: 'vouchercode', // 如果表格数据需要分组显示则需要配置
        //pageSize:10,
        proxy:constant.grid.proxy('SQL_ID=beacvoucher_queryvoucherrule'),
        listeners:{load:util.grid.load}
    });

    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        //selModel:{mode:'SINGLE'},
        columns:[
            
            //{xtype:'rownumberer',width:30},
            {text:'业务类型',width:150,dataIndex: 'vouchercode', renderer:function(v){return DICT.getText(v,'VoucherType')},hidden:true},
            {text:'借/贷',width:60,dataIndex: 'dcflag', renderer:function(v){return DICT.getText(v,'DCFlag')}},
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
            {text: "会计摘要", width: 140, dataIndex: 'digest'}
        ],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            //hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        tbar:[
            {icon:constant.iconPath+'add.gif',text:'增加',handler:function(){
            	constant.call('eac.voucher.AddForm')(grid);
            }},
            {icon:constant.iconPath+'delete.gif',text:'失  效',handler:voucherDisabled}
        ],
        listeners:{
        	rowcontextmenu:function(g,r,t,i,e,o){
                e.preventDefault();
           	 var menu=new Ext.menu.Menu({
           		 items:[
                       {text:'失效',icon:constant.iconPath+'delete.gif', handler:voucherDisabled}
                   ]});
                menu.showAt(e.getXY());
           },
        	afterrender:function(){store.load();}
        }
    });
    
    //使凭证配置失效
    function voucherDisabled(){
    	var selected =grid.getSelection()[0];//获取一行
    	if(selected == undefined){
    		 Ext.Msg.alert("", "请选择一条记录！");
    		return;
    	}
    	
	  Ext.MessageBox.confirm("信息确认", "您确定使该记录失效吗？", function (btn) {
		 if(btn == 'yes'){
			 var params=["VoucherRule",{
		    		vouchercode:selected.data.vouchercode,
		        	status:'0'
		        },['voucherCode']];
		        Ext.Ajax.request({
		        	method:'POST',
		            url:eac.constant.persistence.update,
		            params: Ext.util.JSON.encode(params),
		            success: function (r, o) {
		            	 Ext.Msg.alert("", "操作成功！");
		                 grid.store.load();
		            },
		            failure: function (r, o) {
		            	Ext.Msg.alert('请求失败', constant.getErrMsg(r));
		            }   
		        });
		  }
	        
	     });
    }
    
  
    // 将当前panel放到desktop中并激活
    return grid;
}

