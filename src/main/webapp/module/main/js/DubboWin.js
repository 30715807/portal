/**
* 用于集成dubbo监控平台
* version:1.0
* date:2017-01-18
* author:chenjs
* modify:
*/
var main=main||{};
main.DubboWin=function(winId,winName) {
	if(!constant.conf.url.dubbo||constant.conf.url.dubbo==''){
		util.notify('Dubbo监控应用没有配置!!!');
		return;
	}
	return {id:winId,title:winName,closable:true,layout:'border',
		html:'<iframe src="'+constant.conf.url.dubbo+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>'};
}


