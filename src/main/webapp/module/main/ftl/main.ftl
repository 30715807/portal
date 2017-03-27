<#assign resPath=_cfg.getProperty('app.web.resPath',false,appPath+'/res')>
<#assign appVersion=_conf['app.version']!'1.0'>
<html>
<head>
	<title>业务运营中心</title>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<link href="${resPath}/css/theme-triton-all.css" rel="stylesheet" />
	<link href="${resPath}/css/charts-all.css" rel="stylesheet" />
	<link href="${resPath}/css/ux.css" rel="stylesheet" />
	<script src="${resPath}/js/ext-all.js"></script>
	<script src="${resPath}/js/charts.js"></script>
	<script src="${resPath}/js/ext-locale-zh_CN.js"></script>
	<script src="${resPath}/js/ux.js?${appVersion}"></script>
	<script src="${resPath}/js/jpy.js"></script>
	<script src="${appPath}/module/main/js/util.js?${appVersion}"></script>
	<script src="${appPath}/p/main/dict?${appVersion}"></script>
	<style>.main-body{background:#FFFFFF url(${appPath}/module/main/images/logo/logo.gif) center no-repeat;}</style>
</head>
<body>
</body>
</html>

<script>
Ext.apply(constant,{version:'${appVersion}',product:${_conf['app.product']!'true'},debug:<#if debug?exists>${debug}<#else>!${_conf['app.product']!'true'}</#if>,jscache:<#if jscache?exists>${jscache}<#else>${_conf['app.web.js.cache']!'true'}</#if>,
	appPath:'${appPath}/',iconPath:'${appPath}/module/main/images/icons/',modulePath:'${appPath}/module/',page:'${appPath}/p/',
	conf:{
		<#if SUI.user.code=='admin'>user:{pwd:'${_conf['app.web.user.pwd']!'DD4B21E9EF71E1291183A46B913AE6F2'}'},
		url:{kibana:'${_conf['app.web.url.kibana']!''}',esb:'${_conf['esb.ws.location']!''}',dubbo:'${_conf['app.web.url.dubbo']!''}'},</#if>
		webos:'${_statics["spc.webos.constant.Common"].VER()}'
	},
	user:{code:'${SUI.user.code}',name:'${SUI.user.name!('')}',autoruns:[],menus:${_spring.getBean("extjsService").menus}}
});
util.session.maxInactiveInterval=${_conf['app.web.session.maxInactive']!'1800'};
<#if SUI.getUser().getAutoruns()?exists>
<#list _stringx.split(SUI.getUser().getAutoruns(),",") as id>
<#if _spring.getBean("extjsService").getMenu(id)?exists>
<#assign menu=_spring.getBean("extjsService").getMenu(id)>
constant.user.autoruns.push([{mid:"${id}",text:"${menu.text}"},"${menu.win}","${menu.js}"]);
</#if>
</#list>
</#if>
Ext.onReady(util.main);
</script>
