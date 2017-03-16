/**
* 管理系统配置信息
* version:1.0
* date:2016-08-30
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.ConfigWin=function(winId,winName,desk) {
	Ext.define('sso_config',{
        extend: 'Ext.data.Model',
        fields: [
            {name:'primary',mapping:'code'},
            {name:'mdl',mapping:'code',convert:function(v){return v.substring(0,v.indexOf('.'))}},
            'code',
            'val',
            'dtype',
            'status',
            'model',
            'remark'
        ]
    });

    var store=util.grid.store({
    	model: 'sso_config',pageSize:100,
    	groupField: 'mdl',
    	sorters: [{
	        property: 'code',
	        direction: 'ASC' // DESC
    	}]},
    	'sid=sso_config&ssid=sso_configtotal');

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
                    util.notify('主键不能修改','配置项:'+c.record.data['primary']+'!='+c.record.data['code']);
                    rowEditing.cancelEdit();
                    return false;
                }
                //util.notify(Ext.util.JSON.encode(c.record.data))
                util.ajax.async('persistence.'+(c.record.data['primary']?'update':'insert'))('Config',c.record.data);
            },
            'canceledit':function(e,c,opt){
                if(!c.record.data['primary'])store.remove(c.record); // 表格新增记录直接从数据源直接删除
            },
            'validateedit':function(e,c,opt){
                if(c.record.data['primary']&&c.record.data['primary']!=c.record.data['code']){
                    util.notify('主键不能修改','配置项:'+c.record.data['primary']+' 不等于 '+c.record.data['code']);
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
            store.insert(0, Ext.create('sso_config', {
                val: d['val'],
                dtype: d['dtype'],
                status: d['status'],
                model: d['model'],
                remark:d['remark']
            }));
        }else{ // 直接使用默认数据增加
            store.insert(0, Ext.create('sso_config', {
                dtype: 'string',
                status: '1',
                model: 'simple'
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
        if(data['primary'])
            util.ajax.async('persistence.delete',function(r){util.notify('成功删除:'+data['primary'])})('Config',{code:data['primary']});
        
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
            {text: "模块", hidden:true,dataIndex:'mdl'},
            {text: "配置项", width: 250, dataIndex: 'code',editor:{
                allowBlank: false
            }},
            {text: "配置值", flex: 1, dataIndex: 'val',editor:{
                xtype:'textareafield',
                height:120,
                allowBlank: false
            }},
            {text: "数据类型", width:80, dataIndex: 'dtype',editor:{
                xtype:'combo',
                queryMode:'local',
                store: DICT.store('sso_cfgType'),
                valueField: 'value',
                emptyText: '选择一个类型...',
                allowBlank:false,
                selectOnFocus: true
            },renderer:DICT.renderer('sso_cfgType')},
            {text: "数据模型", width:80, dataIndex: 'model',editor:{
                xtype:'combo',
                queryMode:'local',
                store: DICT.store('sso_cfgMdl'),
                valueField: 'value',
                emptyText: '选择一个类型...',
                allowBlank:false,
                selectOnFocus: true
            },renderer:DICT.renderer('sso_cfgMdl')},
            {text: "状态", width: 60, dataIndex: 'status',editor:{
                xtype:'combo',
                queryMode:'local',
                store: DICT.store('status'),
                valueField: 'value',
                emptyText: '选择一个类型...',
                allowBlank:false,
                selectOnFocus: true
            },renderer:DICT.renderer('status')},
            {text: "备注", width: 150, dataIndex: 'remark',
                editor:{
                    xtype:'textareafield',
                },
                renderer:function (v,m,r,ri,ci,s){  
                    m.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(v) + '"';  
                    return v;  
            }},
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                        icon   : util.iconPath+'refresh.gif',
                        tooltip: '更新数据状态',
                        getClass: function(v, meta, r) {
                            if (!r.data.code.startsWith('status.refresh.')) return this.disabledCls;
                        },
                        handler: function(g,ri,ci){
                            var code=store.getAt(ri).data.code;
                            util.ajax.async('persistence.update',function(r){
                                util.notify('更新数据状态:<b>'+code+'</b>, 影响记录数:<b>'+r+'</b>');
                                store.reload();
                            })
                            ('Config',{code:code,val:Ext.util.Format.date(new Date(), "YmdHis")});
                        }
                    }]
            }
        ],
        plugins: rowEditing,
        tbar:[
            code=Ext.create({xtype:'textfield',fieldLabel:'配置项',name:'code',labelWidth:50}),
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
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '模块:{name}',
            //hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
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


