/**
 * 手工录入凭证 
 * version:1.0 
 * date:2016-11-07 
 * author:czz 
 * modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac, {manvoucher : {}});
eac.manvoucher.AddManVoucher=function(winId,winName,parentGrid,desk){
	desk=desk||desktop;
	var win=desk.getComponent(winId);
	if(win){desk.setActiveTab(win);return;};
	
	Ext.define('beacvoucher_queryvouchersummarydetail',{
        extend: 'Ext.data.Model',
        fields: [
            'dcFlag',
            'company',
            'companyName',
            'department',
            'departmentName',
            'subject',
            'subjectName',
            'subacct',
            'subacctName',
            'product',
            'productName',
            'channel',
            'channelName',
            'remark1',
            'remark2',
            'amount',
            'digest',
            'addflag'
        ]
    });
    var store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        model: 'beacvoucher_queryvouchersummarydetail',
        proxy: {
            type: 'memory'
        },
        data: []
    });
    var addFun=function(){
    	if(rowEditing.editing)return;
        if(grid.getSelection().length){ // 根据选中的记录，copy增加
            var d=grid.getSelection()[0].data;
            //alert(Ext.util.JSON.encode(d));
            store.insert(0, Ext.create('beacvoucher_queryvouchersummarydetail', {
            	dcFlag: d['dcFlag'],
            	company: d['company'],
            	department: d['department'],
            	subject: d['subject'],
            	subacct:d['subacct'],
            	product:d['product'],
            	channel:d['channel'],
            	remark1:d['remark1'],
            	remark2:d['remark2'],
            	amount:0.00,
                addflag:'1'
            }));
        }else{ 
        	//第一次增加，默认都是空
            store.insert(0, Ext.create('beacvoucher_queryvouchersummarydetail', {remark1:'0',remark2:'0',addflag:'1'}));
        }
        rowEditing.cancelEdit();
        rowEditing.startEdit(0, 0);
        grid.getView().refresh();
    }
    
    var deleteFun=function(){
        if(!grid.getSelection().length)return;
        rowEditing.cancelEdit();
        var data=grid.getSelection()[0].data;
        
        if(data['dcFlag']=='DR'){
        	drAmt-=Ext.Number.from(data['amount']);
            drAmtcd.setText(drAmt+'元');
        }
        if(data['dcFlag']=='CR'){
			crAmt-=Ext.Number.from(data['amount']);
            crAmtcd.setText(crAmt+'元');                	
        }
        balanceAmt = drAmt-crAmt;
        balanceAmtcd.setText(Math.abs(balanceAmt)+'元');
        
        var sm = grid.getSelectionModel();
        store.remove(sm.getSelection()[0]);
        //刷新view，序号重新编排
        grid.getView().refresh();
        if (store.getCount() > 0)sm.select(0);
        
        // 主键为空，可能为界面增加数据 //界面增加标志,非后台数据
        if(data['code']==''||data['addflag']=='1'){
        	return;
        }
        util.ajax.async('persistence.delete',function(r){
            util.notify('success delete:'+data['code']);
        })('Config',{code:code});
        
    }
    
    var submitFun=function(){
    	//console.info(store.data.length);
    	if(store.data.length>0){
    		this.disable();
    		var data=[];
            store.each(function(r){data.push(r.data)});
            if(balanceAmt==0){
            	util.ajax.async('eacVoucherSummary.addVoucherSummary',
		        	function(ret){
	        	   		Ext.Msg.alert('提示','手工调账保存成功!');
		        		parentGrid.store.load();
		        		desk.getComponent(winId).close();
		        	}
		        )(data);
        		
            }else{
            	Ext.Msg.alert('提示','借贷合计金额不符，请重新审核');
            	this.enable();
            }
    	}
    }
    
    var balanceAmt = 0;	//借贷余额
    var drAmt = 0;	//借方金额
    var crAmt = 0;	//贷方金额
    
    /**行编辑定义*/
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 2,
        autoCancel: false,
        listeners:{
        	'beforeedit':function(e,c,opt){
                if(c.record.data['dcFlag']=='DR'){
                	drAmt-=Ext.Number.from(c.record.data['amount']);
	                drAmtcd.setText(drAmt+'元');
                }
                if(c.record.data['dcFlag']=='CR'){
					crAmt-=Ext.Number.from(c.record.data['amount']);
	                crAmtcd.setText(crAmt+'元');                	
                }
                balanceAmt = drAmt-crAmt;
		        balanceAmtcd.setText(Math.abs(balanceAmt)+'元');
            },
            'edit':function(e,c,opt){
                c.record.data['companyName']=DICT.getText(c.record.data['company'],'eac_company');
                c.record.data['departmentName']=DICT.getText(c.record.data['department'],'eac_department');
                c.record.data['subjectName']=DICT.getText(c.record.data['subject'],'eac_subject');
                c.record.data['subacctName']=DICT.getText(c.record.data['subacct'],'eac_subacct');
                c.record.data['productName']=DICT.getText(c.record.data['product'],'eac_product');
                c.record.data['channelName']=DICT.getText(c.record.data['channel'],'eac_channel');
                //alert(Ext.util.JSON.encode(c.record.data))
                if(c.record.data['dcFlag']=='DR'){
                	drAmt+=Ext.Number.from(c.record.data['amount']);
	                drAmtcd.setText(drAmt+'元');
                }
                if(c.record.data['dcFlag']=='CR'){
					crAmt+=Ext.Number.from(c.record.data['amount']);
	                crAmtcd.setText(crAmt+'元');                	
                }
                balanceAmt = drAmt-crAmt;
                balanceAmtcd.setText(Math.abs(balanceAmt)+'元');
            },
            'canceledit':function(e,c,opt){
            	/*if(c.record.data['addflag']=='1'){
                    store.remove(c.record);
                    grid.getView().refresh();
                }*/
            	if(c.record.data['dcFlag']=='DR'){
                	drAmt+=Ext.Number.from(c.record.data['amount']);
	                drAmtcd.setText(drAmt+'元');
                }
                if(c.record.data['dcFlag']=='CR'){
					crAmt+=Ext.Number.from(c.record.data['amount']);
	                crAmtcd.setText(crAmt+'元');                	
                }
                balanceAmt = drAmt-crAmt;
		        balanceAmtcd.setText(Math.abs(balanceAmt)+'元');
            }
        }
    });
    
    //公司下拉选择框
    var companyCombo = Ext.create({
    	xtype:'combo',
        store: constant.form.combo.store('SQL_ID=beacetl_querycompany',{dict:'eac_company'}),
        displayField: 'text',
        valueField: 'value',
        emptyText: '请选择',
        editable:false,
        allowBlank: false,
        selectOnFocus: true 
    });
    //部门下拉选择框
    var departmentCombo = Ext.create({
    	xtype:'combo',
        store:constant.form.combo.store('SQL_ID=beacetl_querydepartment',{dict:'eac_department'}),
        valueField: 'value',
        value:'0',
        displayField: 'text',
        allowBlank:false,
        selectOnFocus: true ,
        queryMode:'local',
        minChars:1,
        listeners: {
            beforequery: constant.form.combo.beforequery
        }
    });
    
    var drAmtcd,crAmtcd,balanceAmtcd;
    
	var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        forceFit:false,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},
        columns:[
            {xtype:'rownumberer',width:30},
            {text:'借贷方向',width:100,dataIndex: 'dcFlag', editor:{
            	xtype: 'combo',
            	store: DICT.store('DCFlag'),
                valueField: 'value',
                displayField: 'text',
                allowBlank: false,
                editable:false,
                forceSelected: true,
                selectOnFocus: true
            },renderer:DICT.renderer('DCFlag')},
            {text: "公司", width: 240, dataIndex: 'company', editor:companyCombo,renderer:DICT.renderer('eac_company')},
            {text: "部门", width: 140, dataIndex: 'department',editor:departmentCombo,renderer:DICT.renderer('eac_department')},
            {text: "科目", width: 175, dataIndex: 'subject', editor:{
            	xtype:'combo',
                store: constant.form.combo.store('SQL_ID=beacetl_querysubject',{dict:'eac_subject'}),
                valueField: 'value',
                emptyText: '请选择',
                allowBlank:false,
                queryMode:'local',
                minChars:1,
                triggerAction : 'all',
                selectOnFocus: true,
                listeners: {
                    beforequery: constant.form.combo.beforequery
                }
            },renderer:DICT.renderer('eac_subject')},
            {text: "明细", width: 220, dataIndex: 'subacct', editor:{
            	xtype:'combo',
                store: constant.form.combo.store('SQL_ID=beacetl_querysubacct',{dict:'eac_subacct'}),
                valueField: 'value',
                displayField: 'text',
                emptyText: '请选择',
                allowBlank:false,
                selectOnFocus: true 
            },renderer:DICT.renderer('eac_subacct')},
            {text: "产品", width: 110, dataIndex: 'product', editor: {
            	xtype:'combo',
                store:constant.form.combo.store('SQL_ID=beacetl_queryproduct',{dict:'eac_product'}),
                valueField: 'value',
                value:'0',
                displayField: 'text',
                allowBlank:false,
                selectOnFocus: true,
                queryMode:'local',
                minChars:1,
                listeners: {
                    beforequery: constant.form.combo.beforequery
                }
            },renderer:DICT.renderer('eac_product')},
            {text: "渠道", width: 230, dataIndex: 'channel', editor: {
            	xtype:'combo',
                store: constant.form.combo.store('SQL_ID=beacetl_querychannel',{dict:'eac_channel'}),
                valueField: 'value',
                value:'0',
                displayField: 'text',
                allowBlank:false,
                selectOnFocus: true ,
                queryMode:'local',
                minChars:1,
                listeners: {
                    beforequery: constant.form.combo.beforequery
                }
            },renderer:DICT.renderer('eac_channel')},
            {text: "备用1", width: 60, dataIndex: 'remark1', value:'0'},
            {text: "备用2", width: 60, dataIndex: 'remark2', value:'0'},
            {text: "调账金额", width: 100, dataIndex: 'amount', editor:{
            	xtype:'numberfield',
            	blankText : "请输入有效数字",
            	maxLength : 12,
            	maxValue :99999999.99,//可输入最大值
                minValue : 0,//可输入的最小值
                allowBlank: false
            }},
            {text: "会计摘要", dataIndex: 'digest', editor:{
                allowBlank: false
            }}
        ],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            enableGroupingMenu: false
        }],
        plugins : rowEditing,
        tbar:[
                {xtype:'tbtext',text:'凭证类型：'+'手工调账'},
                '-',
                {xtype:'tbtext',text:'借方金额：'},
        drAmtcd=Ext.create({xtype:'tbtext',labelWidth:120 ,text:'0元',cls:'boldtxt'}),
                '-',
                {xtype:'tbtext',text:'贷方金额：'},
        crAmtcd=Ext.create({xtype:'tbtext',labelWidth:120 ,text:'0元',cls:'boldtxt'}),
                '-',
                {xtype:'tbtext',text:'差额：'},
        balanceAmtcd=Ext.create({xtype:'tbtext',labelWidth:120,text:'0元',cls:['boldtxt','red']}),
                '-',
                {text:'增加',icon:util.iconPath+'copy.gif',handler:addFun},
                {text:'删除',icon:util.iconPath+'delete.gif',handler:deleteFun},
                '->',
                {text:'提交',icon:util.iconPath+'accept.png',handler:submitFun}
      ],
      listeners:{
        rowcontextmenu:function(g,r,t,i,e,o){ // 表格中右键菜单
            e.preventDefault();
            new Ext.menu.Menu({items:[
                {text:'复制增加',icon:util.iconPath+'copy.gif',handler:addFun},
                {text:'删除',icon:util.iconPath+'delete.gif',handler:deleteFun}
            ]}).showAt(e.getXY());
        },
        afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
      }
    });
   
    
	desk.setActiveTab(desk.add(grid));
}