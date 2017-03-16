
var demo=demo||{};
demo.TreeTabWin=function(winId,winName) {
	var tb=Ext.create('Ext.tab.Panel',{region:'center'});
	return {
        id:winId,title:winName,closable:true,
        layout:'border',
        items:[
            Ext.create('Ext.tree.Panel', {
                region:'west',width:200,
                store: Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true,
                        text:winName,
                        children: [
                            { text: 'AreaCharts', mid:'00',win:'charts.AreaCharts',js:'charts/js/AreaCharts.js',leaf: true },
                            { id:'homework', text: 'homework', expanded: true, children: [
                                {text: 'Charts', mid:'01',win:'charts.Charts',js:'charts/js/Charts.js',leaf: true },
                                {text: 'PieCharts', mid:'02',win:'charts.PieCharts',js:'charts/js/PieCharts.js',leaf: true },
                            ] },
                            { text: 'buy lottery tickets', leaf: true }
                        ]
                    }
                }),
                listeners: {
                    itemclick:function(t,r,i,idx,e,opt){
                        if(!r.isLeaf()) return;
                        //alert(i.id+',' + r.data.text +','+r.data.win +','+r.data.js+','+tb);
                        openWin({text:r.data.text},r.data.win,r.data.js,tb);
                    }
                }
            }),
            tb
    ]};
}