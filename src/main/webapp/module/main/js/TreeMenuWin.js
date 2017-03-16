
var main=main||{};
main.TreeMenuWin=function(winId,winName) {
	var tb=Ext.create('Ext.tab.Panel',{region:'center',tabBar:{height:38,defaults:{height:38}}});

	return {
        id:winId,title:winName,closable:true,
        layout:'border',
        items:[
            Ext.create('Ext.tree.Panel', {
                region:'west', width:200,split:true,
                //title:winName,collapsible:true,//collapseMode:'mini',
                rootVisible:false,
                store:util.tree.store("extjs.getMenuTree")(winId),
                listeners: {
                    itemclick:function(t,r,i,idx,e,opt){if(r.isLeaf())openWin(r.data,r.data.win,r.data.js,tb)}
                }
            }),
            tb
    ]};
}