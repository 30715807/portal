/**
 * 查询用户列表
 * version:1.0
 * date:2016-10-13
 * author:czz
 * modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{actcheck:{}});
eac.actcheck.QueryUserList=function(form,transAmt){
	
	Ext.define('bbrhuser_queryuserlistrst',{
        extend: 'Ext.data.Model',
        fields: [
            'userid',
            'realname',
            'certid',
            'usertype',
            'usablebalance'
        ]
    });
    
	var sql="SQL_ID=bbrhuser_queryuserlistrst&SIZE_SQL_ID=bbrhuser_queryuserlisttotal";
    var store = constant.grid.store("bbrhuser_queryuserlistrst",sql);

    
	var grid = Ext.create('Ext.grid.Panel', {
	        forceFit:true,
	        store:store,
	        viewConfig:{enableTextSelection:true},
	        stripeRows:true,
	        columns:[
	            {xtype:'rownumberer',width:30},
	            {text:'姓名',width:120,dataIndex: 'realname'},
	            {text: "证件号码", flex:1, dataIndex: 'certid'},
	            {text: "用户类型", width: 180, dataIndex: 'usertype',renderer:function(v,c,r){return DICT.getText(v,'eac_brhUserType');}},
	            {text: "可用余额（元）", width: 150, dataIndex: 'usablebalance'}
	        ],
	      tbar:[
	                realName=Ext.create({xtype:'textfield',fieldLabel:'姓名',name:'realName',labelWidth:50,width:180}),
	                certId=Ext.create({xtype:'textfield',fieldLabel:'证件号码',name:'certId',labelWidth:60,width:190}),
	                userType=Ext.create({
	                    xtype:'combo',
	                    name:'userType',
	                    labelWidth: 80,
	                    width:180,
	                    fieldLabel: '用户类型',
	                    store: DICT.store('eac_brhUserType'),
	                    valueField: 'value',
	                    emptyText: '全部',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),
	                '-',
	                {icon:constant.iconPath+'find.png', text:'查询',handler:function(){
	                    store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(realName,certId,userType));
	                    store.reload({scope:this,callback:function(){this.enable()}});
	                }}
	            ],
	        bbar:{
	            xtype : 'pagingtoolbar',
	            displayInfo : true,
	            store : store
	        },
	        listeners:{
	        	rowdblclick:function(g,r,t,i,e,o){
	        		setFormValue(r.data)
	            }, 
	        	afterrender:function(){store.load();}
	        }
	    });
	
    var win=new Ext.Window({title:'用户列表',modal:true,width:800,height:550,border:false,plain:true,
        buttonAlign:'center',layout:'fit',items:grid,
        buttons:[
            {text:'确定',handler:function(){
            	 if(!grid.getSelection().length){
            		 alert("请选中一条记录！");
            		 return;
            	 };
            	setFormValue(grid.getSelection()[0].data);
            }},
            {text:"关闭",handler:function(){win.close()}}
        ]
    });
	win.show();
	
	
	function setFormValue(data){
		Ext.getCmp('tds_realName').setText('<div>用户：'+data.realname+'<a href="javascript:void(0);" class="btn bbtn small middle">请选择</a></div>');
		Ext.getCmp('tds_certId').setText("证件号码："+data.certid);
		Ext.getCmp('tds_usableBalance').setText("可用余额："+data.usablebalance+" 元");
		var lastUsableBalance = parseFloat(data.usablebalance) + parseFloat(transAmt);
		Ext.getCmp('tds_lastUsableBalance').setText("调账后余额："+lastUsableBalance+" 元");
		Ext.getCmp('tds_userId').setValue(data.userid);
		win.close();
	}
}