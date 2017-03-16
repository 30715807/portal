/**
* 修改密码
* version:1.0
* date:2016-11-03
* author:
* modify:
*/
util.import('main/js/main.js');
var main=main||{};
main.PwdResetWin=function() {
	var form=new Ext.form.Panel({
        margin:10,
        border:false,
        fieldDefaults: {
            labelWidth: 100,
            labelAlign: "left",
            flex: 1,
            margin: 8
        },
        items:[{
            	xtype:'textfield',
            	name:'oldPwd',
            	inputType:'password',
            	fieldLabel: '原密码',
	            allowBlank:false,
	            width:300,
	            maxLength:20
			},{
            	xtype:'textfield',
            	name:'newPwd',
            	inputType:'password',
            	fieldLabel: '新密码',
	            allowBlank:false,
	            vtype:'main_pwd',
	            width:300,
	            maxLength:20
			},{
            	xtype:'textfield',
            	inputType:'password',
            	name:'confirmPwd',
            	fieldLabel: '确认密码',
	            allowBlank:false,
	            vtype:'main_pwd',
	            width:300,
	            maxLength:20
			}]
    });
	
	
	 var win=new Ext.Window({title:'修改密码',modal:true,width:400,height:240,border:false,plain:true,
	        buttonAlign:'center',layout:'fit',items:form,
	        buttons:[
	            {text:'提交',handler:function(){            	            
	                if(!form.isValid()){
	                    return;
	                }
	                
	                var fields = util.form.getFields(form.getForm());
	                
	                if(fields['newPwd'].getValue() == fields['oldPwd'].getValue()){
	                	util.notify('旧密码与新密码不能相同');
	                	return;
	                }
	                
	                if(fields['newPwd'].getValue() != fields['confirmPwd'].getValue()){
	                	util.notify('新密码两次输入不一致');
	                	return;
	                }
	                
	                util.ajax.async('login.pwd',function(ret){
	                	util.notify('修改密码成功！');
	                	win.close();
	                	})(fields['oldPwd'].getValue(),fields['newPwd'].getValue());
	                
	            }},
	            {text:"关闭",handler:function(){win.close()}}
	        ]
	    });
	    win.show();
}
