/**
 * 新增凭证
 * version:1.0
 * date:2016-09-09
 * author:czz
 * modify:
 */
constant.import('eac/js/eac.js');
Ext.applyIf(eac,{voucher:{}});
eac.voucher.AddForm=function(grid){
	
	var form=new Ext.form.Panel({
        margin:5,
        fieldDefaults: {
            labelWidth: 100,
            labelAlign: "left",
            flex: 1,
            //msgTarget: 'side',
            defaultType: 'textfield',
            margin: 5
        },
        items:[
            {xtype: 'fieldset',items:[voucherCode=Ext.create({
							        	xtype:'combo',
							            fieldLabel: '凭证类型',
							            store: DICT.store('VoucherType'),
							            valueField: 'value',
							            emptyText: '请选择',
							            allowBlank:false,
							            selectOnFocus: true,
							            queryMode:'local',
							            width:300,
							            minChars:1,
							            listeners: {
							                beforequery: constant.form.combo.beforequery
							            }
							        })]
            },
            {xtype: "container",layout: "hbox",
                items:[
	            {
	                title: '借方',
	                xtype: 'fieldset',
	                bodyPadding: 5,
	                defaults:{labelWidth: 100,width:400},
	                items: [company=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '公司',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querycompany'),
	                    valueField: 'value',
	                    emptyText: '请选择',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),department=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '部门',
	                    store:constant.form.combo.store('SQL_ID=beacetl_querydepartment'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true ,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),subject=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '科目',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querysubject'),
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
	                }),subacct=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '明细',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querysubacct'),
	                    valueField: 'value',
	                    value:'0',
	                    emptyText: '请选择',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),product=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '产品',
	                    store:constant.form.combo.store('SQL_ID=beacetl_queryproduct'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),channel=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '渠道',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querychannel'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true ,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),remark1=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '备用1',
	                    value:'0',
	                    readOnly:true
	                }),remark2=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '备用2',
	                    value:'0',
	                    readOnly:true
	                }),digest=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '会计摘要',
	                	allowBlank:false,
	                    maxLength:80
	                })]
	            },
	            {
	                title: '贷方',
	                xtype: 'fieldset',
	                bodyPadding: 5,
	                defaults:{labelWidth: 100,width:400},
	                defaultType: 'textfield',
	                items: [company_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '公司',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querycompany'),
	                    valueField: 'value',
	                    emptyText: '请选择',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),department_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '部门',
	                    store:constant.form.combo.store('SQL_ID=beacetl_querydepartment'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true ,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),subject_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '科目',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querysubject'),
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
	                }),subacct_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '明细',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querysubacct'),
	                    valueField: 'value',
	                    value:'0',
	                    emptyText: '请选择',
	                    allowBlank:false,
	                    selectOnFocus: true 
	                }),product_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '产品',
	                    store:constant.form.combo.store('SQL_ID=beacetl_queryproduct'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),channel_c=Ext.create({
	                	xtype:'combo',
	                    fieldLabel: '渠道',
	                    store: constant.form.combo.store('SQL_ID=beacetl_querychannel'),
	                    valueField: 'value',
	                    value:'0',
	                    allowBlank:false,
	                    selectOnFocus: true ,
	                    queryMode:'local',
	                    minChars:1,
	                    listeners: {
	                        beforequery: constant.form.combo.beforequery
	                    }
	                }),remark1_c=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '备用1',
	                    value:'0',
	                    readOnly:true
	                }),remark2_c=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '备用2',
	                    value:'0',
	                    readOnly:true
	                }),digest_c=Ext.create({
	                	xtype:'textfield',
	                	fieldLabel: '会计摘要',
	                	allowBlank:false,
	                    maxLength:80
	                })]
	            }]
            }]
    });
    
    
    var win=new Ext.Window({title:'新增凭证配置',modal:true,width:900,height:600,border:false,plain:true,
        buttonAlign:'center',layout:'fit',items:form,
       /* listeners:{
            show:function(f,e){
            	form.isValid();
            }
   		},*/
        buttons:[
            {text:'提交',handler:function(){
            	this.disable();
                if(!form.isValid()){
                	this.enable();
                    return;
                }
                
                var params=[{
                	voucherCode:voucherCode.getValue(),
                	dcFlag:'DR',
                	company:company.getValue(),
                	companyName:company.getRawValue(),
                	department:department.getValue(),
                	departmentName:department.getRawValue(),
                	subject:subject.getValue(),
                	subjectName:subject.getRawValue(),
                	subacct:subacct.getValue(),
                	subacctName:subacct.getRawValue(),
                	product:product.getValue(),
                	productName:product.getRawValue(),
                	channel:channel.getValue(),
                	channelName:channel.getRawValue(),
                	remark1:remark1.getValue(),
                	remark2:remark2.getRawValue(),
                	digest:digest.getValue()
                },
                {
                	voucherCode:voucherCode.getValue(),
                	dcFlag:'CR',
                	company:company_c.getValue(),
                	companyName:company_c.getRawValue(),
                	department:department_c.getValue(),
                	departmentName:department_c.getRawValue(),
                	subject:subject_c.getValue(),
                	subjectName:subject_c.getRawValue(),
                	subacct:subacct_c.getValue(),
                	subacctName:subacct_c.getRawValue(),
                	product:product_c.getValue(),
                	productName:product_c.getRawValue(),
                	channel:channel_c.getValue(),
                	channelName:channel_c.getRawValue(),
                	remark1:remark1_c.getValue(),
                	remark2:remark2_c.getRawValue(),
                	digest:digest_c.getValue()
                }];
                
                constant.ajax.async("eacVoucher.addVoucherRule", function() {
            	    Ext.Msg.alert("", "新增凭证配置成功！");
                    grid.store.load();
                    win.close();
            	}, function(r) {
            	    util.ajax.failure(r);
            	    this.enable();
            	})(params);
                
               
            }},
            {text:"关闭",handler:function(){win.close()}}
        ]
    });
    win.show();
}