/**
* 管理系统配置信息
* version:1.0
* date:2016-11-11
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.UserWin=function(winId,winName,desk) {
	Ext.define('sso_user',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'primary',mapping:'code'},
            'code',
            'name',
            'orgid',
            'roleid',
            'ipaddress',
            'autoruns'
        ]
    });

    var store=util.grid.store({model: 'sso_user',pageSize:50},
    	'sid=sso_user&ssid=sso_usertotal');
    
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToEdit:2,
        //autoCancel: false,
        listeners:{
            'beforeedit':function(e,c,opt){
                return !c.record.data['primary']||c.field!='code';
            },
            'edit':function(e,c,opt){
                if(c.record.data['primary']&&c.record.data['primary']!=c.record.data['code'])
                {
                    util.notify('主键不能修改','用户代码:'+c.record.data['primary']+'!='+c.record.data['code']);
                    rowEditing.cancelEdit();
                    return false;
                }
                //util.notify(Ext.util.JSON.encode(c.record.data))
                var action=c.record.data['primary']?'update':'insert';
                if (action=='insert')c.record.data['pwd']=constant.conf.user.pwd;
                util.ajax.async('persistence.'+action)('User',c.record.data);
            },
            'canceledit':function(e,c,opt){
                if(!c.record.data['primary'])store.remove(c.record); // 表格新增记录直接从数据源直接删除
            },
            'validateedit':function(e,c,opt){
                if(c.record.data['primary']&&c.record.data['primary']!=c.record.data['code']){
                    util.notify('主键不能修改','用户代码:'+c.record.data['primary']+' 不等于 '+c.record.data['code']);
                    rowEditing.cancelEdit();
                    return false;
                }
            }
        }
    });

    var addFun=function(){
        //alert(editing+':'+rowEditing.editing)
        if(rowEditing.editing)return;
        if(grid.getSelection().length){ // 根据选中的记录，copy增加
            var d=grid.getSelection()[0].data;
            store.insert(0, Ext.create('sso_user', {
                name: d['name'],
                orgid: d['orgid'],
                roleid: d['roleid']
            }));
        }else{ // 直接使用默认数据增加
            store.insert(0, Ext.create('sso_user', {
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
        var code=data['primary'];
        if(code=='')return;
    	Ext.MessageBox.confirm('删除用户',
				'确定删除用户:<b>'+code+'</b>',
				function(btn){
					if(btn!='yes')return;
					util.ajax.async('persistence.delete',function(r){
		            	util.notify('成功删除用户:<b>'+code+'</b>')
		            })('User',{code:code});
		});
        store.remove(grid.getSelection()[0]);
        //if (store.getCount() > 0)grid.getSelectionModel().select(0);
    }

    var code; // filter condition
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "用户代码", width: 100, dataIndex: 'code',editor:{
                allowBlank: false
            }},
            {text: "用户名", width:100, dataIndex: 'name',editor:{
                allowBlank: false
            }},
            {text: "机构代码", width:100, dataIndex: 'orgid',editor:{
                allowBlank:false
            }},
            {text: "角色代码", width:100, dataIndex: 'roleid',editor:{
                allowBlank: false
            }},
            {text: "IP", width: 100, dataIndex: 'ipaddress',editor:{
                
            }},
            {text: "email", width: 100, dataIndex: 'email',editor:{
                
            }},
            {text: "自动运行", flex: 1, dataIndex: 'autoruns',editor:{
            }}
        ],
        plugins: rowEditing,
        tbar:[
            code=Ext.create({xtype:'textfield',fieldLabel:'用户代码',name:'code',labelWidth:60}),
            '-',
            {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                //var data=[];
                //store.each(function(r){data.push(r.data)});
                //alert(data.length);
                //alert(Ext.util.JSON.encode(data));
                
                this.disable(); // 防止重复点击，在数据没加载完前disable按钮
                store.reload({params:util.form.getValues(code),scope:this,callback:function(){this.enable()}});
            }},
            '-',
            {text:'增加',icon:util.iconPath+'copy.gif',handler:addFun},
            {text:'删除',icon:util.iconPath+'delete.gif',handler:deleteFun}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            store : store
        },
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
   
    
    // 将当前panel放到desktop中并激活
    return grid;
}


