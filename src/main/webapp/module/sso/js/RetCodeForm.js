/**
* 管理返回码， 表单
* version:1.0
* date:2016-10-11
* author:chenjs
* modify:
*/
// grid: 表格对象，
// action: 0:add, 1:update操作标志, 
// data: update时数据，或者新增固定数据
// config: {}, 其它配置信息
sso.RetCodeForm=function(grid,action,data,config){

    var form=Ext.create("Ext.form.Panel",{
        margin:5,
        fieldDefaults: {
            labelWidth: 100,
            labelAlign: "left",
            msgTarget: 'side',
            defaultType: 'textfield',
            margin: 5
        },
        items:[
            {title:'基本信息',xtype:'fieldset',collapsible:true,items:[
                {xtype: "container",layout:"hbox",defaultType:'textfield',items:[
                    {name:'retcd',fieldLabel: "返回码", allowBlank: false, vtype:'username',
                    	listeners:{
                            // 当前输入框增加回车事件，直接提交form表单
                    		specialKey:function(f,e,o){if(e.getKey()==13&&f.isValid())submitForm();}
                    	}
                	},
					{xtype:"numberfield",name:'age',fieldLabel: "时间", decimalPrecision: 0}]
				},
                {xtype: "container",layout: "hbox",items:[{
                        xtype: 'datefield',
                        name:'birthday',
                        allowBlank:false,
                        fieldLabel: 'D.O.B'
                    }, {
                        xtype:'combo',
                        fieldLabel: '下拉选择',
                        name:'user',
                        queryMode:'local',
                        minChars:0,
                        //store: util.form.combo.store('SQL_ID=sso_dictUsers',{dict:'sso_users'}),
                        store: DICT.store('sso_users'),
                        valueField: 'value',
                        //displayField: 'text',
                        emptyText: '选择一个状态...',
                        allowBlank:false,
                        selectOnFocus: true,
                        listeners: {
                            beforequery: util.form.combo.beforequery
                        }
                    }]
	            }]},
            {xtype: "container",layout: "hbox",
                items:[{
	                title: '扩展信息一',
	                xtype: 'fieldset',
	                bodyPadding: 5,
	                defaults:{labelWidth: 100},
	                defaultType: 'textfield',
	                items: [{
	                    fieldLabel: 'Text',name:'text'//,xtype:'treepicker',displayField:'text'
	                },{
	                    fieldLabel: 'lastupdtm',name:'lastupdtm'
	                }]
	            },{
	                title: '扩展信息二',
	                xtype: 'fieldset',
	                bodyPadding: 5,
	                defaults:{labelWidth: 100},
	                defaultType: 'textfield',
	                items: [
	                	{fieldLabel: 'Phone',name:'phone',readOnly:true},
	                	{fieldLabel: 'Price',name:'tbtext',text:'tbtext'}
	                ]
	            }]
        }]
    });
    // 给表单中的元素设置默认值
    
	var submitForm=function(){
        var f=form.getForm();
        var fields = util.form.getFields(f); // 获取所有的field

        fields['phone'].setValue('aaaa')

        //var names=[];
        //alert(form.getInnerItems)//.forEach(function(kk){names.push(kk.name)});
        //alert(names)

        return;

        // 获得所以name - value
        var params=f.getValues(false,false);
        alert('values:'+Ext.util.JSON.encode(params));

        // 获得所有field组件，找到所有combo并获得每个raw value
        var raw={};
        for(fn in fields){if(['user'].contains(fn))raw[fn+'Text']=fields[fn].getRawValue()};
        alert('raw:'+Ext.util.JSON.encode(raw));

        // 将raw数据放入params中
        Ext.apply(params,raw);
        alert('params:'+Ext.util.JSON.encode(params));

         // 过滤掉value为空的元素
        for(fn in params){if(params[fn]=='')params[fn]=undefined}
        alert('params after filter:'+Ext.util.JSON.encode(params));

        // 获得form中指定名字的组件
        alert(fields['user'].getValue());

        if(!form.isValid()){
            Ext.Msg.alert('Form', '校验失败!');
            return;
        }
        return;
        util.ajax.sync(sso.util.persistence.find)('spc.webos.model.UserPO',{code:'ESB'});
        win.close();
    }

    var win=new Ext.Window({title:((action?'修改':'新增')+'返回码'),modal:true,width:700,height:450,border:false,plain:true,
        buttonAlign:'center',layout:'fit',items:form,
        listeners:{
            show:function(f,e){
            	// 让第一个元素直接获得焦点，方便输入
            	util.form.getFields(form.getForm())['retcd'].focus();

                util.form.setValues(form.getForm(),data);
            }
   		},
        buttons:[
            {text:'提交',handler:submitForm},
            {text:"关闭",handler:function(){win.close()}}
        ]
    });
    win.show();
}

