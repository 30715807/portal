/**
* 管理系统配置信息
* version:1.0
* date:2016-11-11
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.RoleWin=function(winId,winName,desk) {
	Ext.define('sso_role',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'primary',mapping:'id'},
            'id',
            'name',
            'menu',
            'remark'
        ]
    });
 
    var store=util.grid.store({model: 'sso_role'},'sid=sso_role');
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit:2,
        //autoCancel: false,
        listeners:{
            'beforeedit':function(e,c,opt){
                return !c.record.data['primary']||c.field!='id';
            },
            'edit':function(e,c,opt){
                if(c.record.data['primary']&&c.record.data['primary']!=c.record.data['id'])
                {
                    util.notify('主键不能修改','角色ID:'+c.record.data['primary']+'!='+c.record.data['id']);
                    rowEditing.cancelEdit();
                    return false;
                }
                //util.notify(Ext.util.JSON.encode(c.record.data))
                util.ajax.async('persistence.'+(c.record.data['primary']?'update':'insert'))('Role',c.record.data);
            },
            'canceledit':function(e,c,opt){
                if(!c.record.data['primary'])store.remove(c.record); // 表格新增记录直接从数据源直接删除
            },
            'validateedit':function(e,c,opt){
                if(c.record.data['primary']&&c.record.data['primary']!=c.record.data['code']){
                    util.notify('主键不能修改','角色ID:'+c.record.data['primary']+' 不等于 '+c.record.data['id']);
                    rowEditing.cancelEdit();
                    return false;
                }
            }
        }
    });

    var addFun=function(){
        if(rowEditing.editing)return;
        if(grid.getSelection().length){ // 根据选中的记录，copy增加
            var d=grid.getSelection()[0].data;
            store.insert(0, Ext.create('sso_role', {
                name: d['name'],
                menu: d['menu'],
                remark:d['remark']
            }));
        }else{ // 直接使用默认数据增加
            store.insert(0, Ext.create('sso_role', {
            }));
        }
        rowEditing.cancelEdit();
        rowEditing.startEdit(0, 0);
    }
    var deleteFun=function(){
        if(!grid.getSelection().length)return;
        rowEditing.cancelEdit();
        var data=grid.getSelection()[0].data;

        // 主键为空，可能为界面增加数据 //界面增加标志,非后台数据
        var id=data['primary'];
        if(id=='')return;
    	Ext.MessageBox.confirm('删除角色',
				'确定删除角色:<b>'+id+'</b>',
				function(btn){
					if(btn!='yes')return;
					util.ajax.async('persistence.delete',function(r){
		            	util.notify('成功删除角色:<b>'+id+'</b>')
		            })('Role',{id:id});
		})
        store.remove(grid.getSelection()[0]);
        //if (store.getCount() > 0)grid.getSelectionModel().select(0);
    }

    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "角色ID", width: 100, dataIndex: 'id',editor:{
                allowBlank: false
            }},
            {text: "角色名", width: 100, dataIndex: 'name',editor:{
                allowBlank: false
            }},
            {text: "菜单权限", flex: 1, dataIndex: 'menu',editor:{
                allowBlank:false
            }},
            {text: "备注", width: 100, dataIndex: 'remark',editor:{
                
            }}
        ],
        plugins: rowEditing,
        tbar:[
            {text:'增加',icon:util.iconPath+'copy.gif',handler:addFun},
            {text:'删除',icon:util.iconPath+'delete.gif',handler:deleteFun}
        ],
        listeners:{
            rowcontextmenu:function(g,r,t,i,e,o){ // 表格中右键菜单
                e.preventDefault();
                new Ext.menu.Menu({items:[
                    {text:'复制增加',icon:util.iconPath+'copy.gif',handler:addFun},
                    {text:'删除',icon:util.iconPath+'delete.gif',handler:deleteFun}
                ]}).showAt(e.getXY());
            },
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
   
    return grid;
}


