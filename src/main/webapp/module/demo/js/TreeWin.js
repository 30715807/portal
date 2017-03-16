var demo=demo||{};
demo.TreeWin=function(winId,winName) {
    return {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置
        layout:'border',
        items:[
            Ext.create('Ext.tree.Panel', {
                region:'west', width: 200,
                store: Ext.create('Ext.data.TreeStore', {
                    root: DICT.tree['servicecategory']
                    /*{
                        expanded: true,
                        text:'LocalTree',
                        children: [
                            { text: 'detention', name:'xxx',leaf: true },
                            { text: 'homework', expanded: true, children: [
                                { text: 'book report', leaf: true },
                                { text: 'algebra', leaf: true}
                            ] },
                            { text: 'buy lottery tickets', leaf: true }
                        ]
                    }*/
                }),
                listeners: {
                    itemclick:function(t,r,i,idx,e,opt){
                        if(!r.isLeaf()) return;
                        alert(i.id+' ' + r.data.text +' '+r.data.code);
                        //for(p in r) alert(p);
                    }
                }
            }),



            Ext.create('Ext.tree.Panel', {
                region:'center',
                store:constant.tree.store("extjs.getExtTree",{defaultRootText:'金融服务模型'})('sys.svcTree'),
                listeners: {
                    itemcontextmenu:function(t,r,i,idx,e,opt){
                        e.preventDefault();
                        var menu=new Ext.menu.Menu({items:[
                            {text:'修改',icon:constant.iconPath+'edit.gif',handler:function(){
                                alert(i.id+' '+r.isLeaf() + ' '+r.data.text +' '+r.data.appcd);
                            }},
                            {text:'删除',icon:constant.iconPath+'delete.gif',handler:function(){
                                alert(i.id+' '+r.isLeaf() + ' '+r.data.text +' '+r.data.appcd);
                            }}
                        ]});
                        menu.showAt(e.getXY());
                    },
                    itemclick:function(t,r,i,idx,e,opt){
                        alert(i.id+' '+r.isLeaf() + ' '+r.data.text +' '+r.data.appcd);
                        //for(p in r) alert(p);
                    }
                }
            }),
            
            {
                region:'east',width:200,
                loader:{url:constant.page+'demo/test?name=名字',autoLoad:true,scripts:false}
            }
        ]
    };
}