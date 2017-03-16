/**
* 管理SQL， 表单
* version:1.0
* date:2017-02-27
* author:czz
* modify:
*/
// grid: 表格对象，
// action: 0:add, 1:update操作标志, 
// data: update时数据，或者新增固定数据
sso.SQLForm=function(grid,action,data){

	
    var form=Ext.create("Ext.form.Panel",{
        margin:2,
        fieldDefaults: {
            labelAlign: "right",
            msgTarget: 'side',
            defaultType: 'textfield',
            margin: 2
        },
        items:[
            {title:'基本信息',xtype:'fieldset',items:[
                 {xtype: "container",layout: "hbox",items:[
                              {   xtype: 'textfield',
                                  name:'mdl',    
                              	  fieldLabel: "SQL唯一标识", 
                                  labelWidth: 100,
                                  width:200,
                              	  allowBlank: false,
                              	  value:data.mdl,
                              	  readOnly:(action == 1)
                              },{ xtype: 'textfield',
                                  name:'id',
                                  fieldLabel: '_',
                                  labelSeparator:'',
                                  labelWidth: 5,
                                  width:300,
                                  allowBlank:false,
                                  value:(action == 0)?"":data.sid,
                                  readOnly:(action == 1)
                              }]
                 },{xtype: "container",layout: "hbox",items:[
                    {   xtype: 'textfield',
                        name:'sys',    
                    	fieldLabel: "分类", 
                        labelWidth: 100,
                        width:220,
                    	allowBlank: false,
                    	value:data.sys,
                    }, {
                    	xtype: 'textfield',
                        name:'resultclass',
                        fieldLabel: '返回类型',
                        labelWidth: 80,
                        width:364,
                        allowBlank:false,
                        value:data.resultclass,
                        
                    },{
					    xtype:'combo',
					    name:'paging',  
					    labelWidth: 100,
					    width:220,
					    fieldLabel: '分页',
					    store: DICT.store('sso_paging'),
					    valueField: 'value',
					    emptyText: '请选择',
					    selectOnFocus: true,
					    value:(action == 0)?"":data.paging
					}]
	            },{xtype: "container",layout: "hbox",items:[
					 { xtype: 'textfield',
                        name:'ds',
                        fieldLabel: '数据源',
                        labelWidth: 100,
                        width:220,
                        allowBlank:false,
                        value:data.ds,
                       
                    }, {
                    	xtype: 'textfield',
                        name:'slave',
                        fieldLabel: '从数据源',
                        labelWidth: 80,
                        width:200,
                        value:(action == 0)?"":data.slave
                        
                    },{
					    xtype:'combo',
					    name:'auth',  
					    labelWidth: 50,
					    width:160,
					    fieldLabel: '权限',
					    store: DICT.store('sso_auth'),
					    valueField: 'value',
					    emptyText: '请选择',
					    selectOnFocus: true,
					    value:(action == 0)?"":data.auth
					}, {
                    	xtype: 'textfield',
                        name:'injection',
                        fieldLabel: 'SQL注入约束',
                        labelWidth: 100,
                        width:340,
                        value:(action == 0)?"":data.injection,
                        
                    }]
	            },{xtype: "container",layout: "hbox",items:[
					{
                    	xtype: 'textfield',
                        name:'remark',
                        fieldLabel: '备注',
                        labelWidth: 100,
                        width:500,
                        allowBlank:false,
                        value:(action == 0)?"":data.remark
                        
                    }]
	            }]
             },	{title:'SQL文本',xtype:'fieldset',items:[
                      { xtype:"textareafield",
                        name:'text',
                        fieldLabel: "",
                        labelWidth: 10,
                        width:950,
                        height:350,
                        allowBlank:false,
                        value:(action == 0)?"":data.text+data.text1+data.text2+data.text3
                       }
                   ]}
	            ]
    });
    // 给表单中的元素设置默认值
    
	var submitForm=function(){
		var btnObj = this;
		btnObj.disable();
        if(!form.isValid()){
        	btnObj.enable();
            return;
        }
        
        var f=form.getForm();

        // 获得所以name - value
        var params=f.getValues(false,false);
        params.type = 0;
        
        //sql文本的字节数长度
        var byteLen = params.text.byteLength();
	    if(byteLen > 15200) {
		   Ext.Msg.alert("", "SQL文本内容不能超过15200字节，请重新填写！");
		   btnObj.enable();
		   return;
	    }else if(byteLen > 3800 && byteLen <= 15200){//sql文本切割
	    	splitSqlText(params,byteLen);
	    }

	    if(action == 0){//新增
               util.ajax.ainsert(function(rows){
	        		 Ext.Msg.alert("", "新增成功！");
	        		 win.close();
	                 grid.store.load();
		        },function(r){
		        	 util.ajax.failure(r);
		        	 btnObj.enable();
		        })('SQL',params);
	    }else{//修改
		    	util.ajax.aupdate(function(rows){
	       		     Ext.Msg.alert("", "修改成功！");
	       		     win.close();
	                 grid.store.load();
		        },function(r){
		        	 util.ajax.failure(r);
		        	 btnObj.enable();
		        })('SQL',params);
	    }
    }

    var win=new Ext.Window({title:((action?'修改':'新增')+'SQL'),modal:true,width:1000,height:700,border:false,plain:true,
        buttonAlign:'center',layout:'fit',items:form,
        buttons:[
            {text:'提交',handler:submitForm},
            {text:"关闭",handler:function(){win.close()}}
        ]
    });
    win.show();
    
    //sql文本切割
    function splitSqlText(params,byteLen){
             var text = params.text;
             var len = text.length;
             var maxLen = 3800;
             
             if(len > maxLen && len <= 2*maxLen){
            	 params.text = text.substr(0,maxLen);
            	 params.text1 = text.substr(maxLen);
             }else if(len >2*maxLen && len <= 3*maxLen){
            	 params.text = text.substr(0,maxLen);
            	 params.text1 = text.substr(maxLen,2*maxLen);
            	 params.text2 = text.substr(2*maxLen);
             }else if(len >3*maxLen && len <= 4*maxLen){
            	 params.text = text.substr(0,maxLen);
            	 params.text1 = text.substr(maxLen,2*maxLen);
            	 params.text2 = text.substr(2*maxLen,3*maxLen);
            	 params.text3 = text.substr(3*maxLen);
             }
    }
}

