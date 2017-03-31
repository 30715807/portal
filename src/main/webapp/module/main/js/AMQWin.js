/**
* 用于集成activemq监控平台
* version:1.0
* date:2017-01-18
* author:chenjs
* modify:
*/
var main=main||{};
main.AMQWin=function(winId,winName) {
	if(!constant.conf.url.amq||constant.conf.url.amq==''){
		util.notify('AMQ监控应用没有配置!!!');
		return;
	}
	var items=[];
	constant.conf.url.amq.split(",").forEach(function(u){
		items.push({
			title:u,closable:true,layout:'border',
			html:'<iframe src="'+u+'" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>'});
	});
	// 需要解决浏览器跨域访问问题
	return {id:winId,title:winName,closable:true,xtype:'tabpanel',layout:'border',items:items};
}


