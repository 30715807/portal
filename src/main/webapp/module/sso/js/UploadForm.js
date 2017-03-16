/**
 * 上传文件测试， 表单 version:1.0 
 * date:2016-10-11 
 * author:chenjs
 */
sso.UploadForm = function() {
	var form = new Ext.FormPanel({
		url : util.appPath + "js/ssoUpload/upload", // 调用的服务名
		fileUpload : true,
		frame : true,
		border : false,
		items : [ {
			xtype : "textfield",
			width : 400,
			name : "args",
			value : '["2016-11-09"]',
			hidden: true, 
			hideLabel:true
		},{
			fieldLabel:'日期',
			xtype : "textfield",
			width : 400,
			value : '["2016-11-09"]'
		}, {
			fieldLabel : "excel\u62a5\u6587\u6587\u4ef6",
			xtype : "fileuploadfield",
			width : 400,
			name : "file.attach"
		} ]
	});
	var win = new Ext.Window({
		title : '文件上传',
		modal : true,
		width : 700,
		height : 450,
		border : false,
		plain : true,
		buttonAlign : 'center',
		layout : 'fit',
		items : form,
		buttons : [ {
			text : '提交',
			handler : function() {
				var f=form.getForm();
		        var fields = util.form.getFields(f); // 获取所有的field
		        alert(fields['args'].getValue()); // 调用服务参数
				form.submit({
					url : form.url,
					waitMsg : "\u8bf7\u6c42\u670d\u52a1\u5668...",
					failure : function(f,a) {
						alert('fail:' +a.result.message);
					},
					success : function(f,a) {
						alert(a.result.result);
					}
				});
			}
		}, {
			text : "关闭",
			handler : function() {
				win.close()
			}
		} ]
	});
	win.show();
}