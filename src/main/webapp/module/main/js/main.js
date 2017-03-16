/**
* sso模块公共信息与函数
* version:1.0
* date:2016-08-30
* author:chenjs
* modify:
*/
var main=main||{};
main.constant={
};


Ext.apply(Ext.form.field.VTypes,{
	main_username:function(v){return /^[a-zA-Z][-_.a-zA-Z0-9]{0,30}$/.test(v)},
	main_usernameText:"Username must begin with a letter and cannot exceed 255 characters",
	main_usernameMask:/[-_.a-zA-Z0-9]/,

	main_pwd:function(v){
	    if(!((/^\S{5,20}$/i).test(v))){
	    	Ext.form.field.VTypes["main_pwdText"]="长度为5-20位，必须包括数字、字母或字符中的2种";
	    	return false;
	    }
	    if(/^[0-9]+$/.test(v)){
	    	console.log(v);
	    	Ext.form.field.VTypes["main_pwdText"]="密码不能全部为数字";
	    	return false;
	    }
	    if(/^[a-zA-Z]+$/.test(v)){
	    	console.log(v);
	    	Ext.form.field.VTypes["main_pwdText"]="密码不能全部为字母";
	    	return false;
	    }
	    if(/[\'<>%=;)(&+]/.test(v)){
	    	Ext.form.field.VTypes["main_pwdText"]="禁止输入<>%=;)(&+特殊字符";
	    	return false;
	    }
	    return true;
	},
	main_pwdText:"无效的密码",
	main_pwdMask:/./
});