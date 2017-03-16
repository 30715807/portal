/**
* sso模块公共信息与函数
* version:1.0
* date:2016-08-30
* author:chenjs
* modify:
*/
var sso=sso||{};
sso.constant={
	persistence:{insert:'ssoPersistence.insert',update:'ssoPersistence.update',find:'ssoPersistence.find',exe:'ssoPersistence.execute'}
};
Ext.apply(constant.jsfun,{
	'sso.RetCodeForm':'sso/js/RetCodeForm.js',
	'sso.UploadForm':'sso/js/UploadForm.js',
	'sso.SQLForm':'sso/js/SQLForm.js'
});

Ext.applyIf(DICT.data,{
	sso_cfgType:[['string','string'],['int','int'],['long','long'],['double','double'],['bool','bool'],['map','map'],['list','list']],
	sso_cfgMdl:[['simple','简单类型'],['array','数组类型'],['json','json']],
	sso_paging:[['1','分页'],['0','不分页']],
	sso_auth:[['private','授权用户'],['login','登录用户'],['public','所有用户']]
})