/**
* 用于集成日志展现工具Kibana
* version:1.0
* date:2017-01-10
* author:chenjs
* modify:
*/
var main=main||{};
main.KibanaWin=function(winId,winName) {
	if(!constant.conf.url.kibana||constant.conf.url.kibana==''){
		util.notify('Kibana监控应用没有配置!!!');
		return;
	}
	return {id:winId,title:winName,closable:true,layout:'border',
		html:'<iframe src="'+constant.conf.url.kibana+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>'};
}


