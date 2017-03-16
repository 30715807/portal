/**
* 管理返回码
* version:1.0
* date:2016-08-30
* author:chenjs
* modify:
*/
util.import('sso/js/sso.js');
var sso=sso||{};
sso.RetCodeWin=function(winId,winName,desk) {
    
	Ext.define('sso_retcd',{
        extend: 'Ext.data.Model',
        fields: [
            'retcd',
            'text',
            'lastupdtm',
            'actionnm',
            {name:'verdt',type:'date',dateFormat:'Ymd'},
            'verstatus'
        ]
    });
    
    //alert("1中".byteLength())
    //var ret = util.ajax.queryPage('sso_retcd','sso_retcdtotal',{start:'0',limit:'1'});
    //alert(ret.data[0].text)
    //alert(Ext.util.JSON.encode(ret))
    /*
    Ext.Ajax.request({method:'post',url:constant.appPath+'ext/g',
        headers: {'Content-Type':'application/json'},
        params:Ext.util.JSON.encode({sid:'sso_retcd',ssid:'sso_retcdtotal',start:'20',limit:'5'}),
        success:function(o){alert(o.responseText)},
        failure:function(){util.notify('\u4E0B\u8F7DJS\u5931\u8D25','\u52A0\u8F7D\u811A\u672C\u5931\u8D25:'+js)}
    });
    
    /*
    Ext.Ajax.request({method:'get',url:constant.appPath+'ext/g/sid/sso_retcd/ssid/sso_retcdtotal/start/10/limit/5',
        success:function(o){alert(o.responseText)},
        failure:function(){util.notify('\u4E0B\u8F7DJS\u5931\u8D25','\u52A0\u8F7D\u811A\u672C\u5931\u8D25:'+js)}
    });*/
    

    //var ret=util.ajax.queryBatch(['sso_retcdtotal','sso_sqltotal']);
    //for(p in ret)alert(p+'='+ret[p])
    
    //alert(util.ajax.query('sso_retcdtotal',{}));
    //util.ajax.aquery(function(r){alert('r:'+r)})('sso_retcdtotal',{})
    //util.notify(util.ajax.sync('persistence.execute')('sso_retcdtotal',{}));
    //var token=util.ajax.sync('token.generate')('PTL',{code:'public',realCode:'chenjs',name:'陈劲松'},60);
    //alert(token);
    //var token="6e7zyA5uHL1PFrpcufXo7FGmJg35cemArzLZSFPk8ybYsLkptbP5HtCSwTO-wgyAUU5YNTHBhjOsD_iD3_tCN4qJIK3rc2GK8FrwQQyJ3ZJLweBQ_kWcfe9EjdtMYYdA";
    //alert(Ext.util.JSON.encode(util.ajax.sync('token.validate')('PTL',token)))
    /*
    util.ajax.async('persistence.execute',function(ret){util.notify('Tips',ret)})('sso_retcdtotal',{})
    util.ajax.async('persistence.execute')('sso_retcdtotal',{})
        .then(function(ret){util.notify('Tips Then',ret);return util.ajax.async('persistence.execute')('sso_retcdtotal',{})},util.ajax.failure)
        .then(function(ret){util.notify('Tips Then',ret)},util.ajax.failure);
    */

    // 删除一个行记录的函数
    var deleteFn=function(r){
        util.call('sso.UploadForm')();
        //alert("delete " + r.get('retcd'));
        //alert(util.ajax.args('common_retcdtotal',{}))
        // Ext.create('widget.uxNotification',{title:'tips',position:'t',minWidth:250,autoCloseDelay:10000,html:'html'}).show();
        //util.notify('tips','hello','b');
        // alert(util.ajax.sync('persistence.execute')('common_retcdtotal',{}));

    }

    var store = Ext.create('Ext.data.Store', {
        model: 'sso_retcd',
        groupField: 'verstatus', // 如果表格数据需要分组显示则需要配置
        pageSize:8,
        // proxy:util.grid.sproxy('system/getMenu')()
        proxy:util.grid.proxy('sid=sso_retcd&ssid=sso_retcdtotal'),
        sorters: [{
            property: 'retcd',
            direction: 'ASC' // DESC
        }],
        listeners:{load:util.grid.load}
    });
    var timer=window.setInterval(function(){store.reload()},120000); // 表格定时刷新

    var retcd,verstatus; // filter condition
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true, // 每个tabpanel标准配置

        forceFit:true,
        //region:'north',
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "返回码", width: 120, dataIndex: 'retcd'},//,xtype:'templatecolumn', tpl: '{retcd} {text}'
            {text: "名称", flex: 1, dataIndex: 'text'},
            {text: "修改时间", width: 200, dataIndex: 'lastupdtm',hidden:true},
            {text: "版本日期", width: 200, dataIndex: 'verdt',renderer:Ext.util.Format.dateRenderer('Y-m-d')},
            {text: "版本状态", width: 100, dataIndex: 'verstatus',renderer:DICT.renderer('status')},
            {text: "处理动作", width: 125, dataIndex: 'actionnm',renderer:DICT.renderer('status')}, //function(v,m,r,ri,ci,s,view){return v+' xx'}
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                        icon   : util.iconPath+'delete.gif',
                        tooltip: '删除',
                        getClass: function(v, meta, r) {
		                    if (r.data.verstatus== '1') return this.disabledCls;
		                },
                        handler: function(g,ri,ci){deleteFn(store.getAt(ri));}
                    },{
                        icon   : util.iconPath+'add.gif',
                        tooltip: '增加',
                        handler: function(g,ri,ci) {
                            var r = store.getAt(ri);
                            alert("add " + r.get('retcd'));
                        }
                    }]
            }
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                'Title: <a href="{lastupdtm}" target="_blank">{retcd}</a><br/>',
                '返回码: {retcd}<br/>',
                '名称: {text}<br/>',
                '处理动作: {actionnm}<br/>'
            ])
        }],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '版本状态:{name}',
            //hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        tbar:[
            retcd=Ext.create({xtype:'textfield',fieldLabel:'返回码',name:'retcd',labelWidth:50}),
            verstatus=Ext.create({xtype:'combo',
                fieldLabel: '版本状态',
                name:'verstatus',
                labelWidth: 60,
                store: DICT.store('status'),
                valueField: 'value',
                displayField: 'text',
                emptyText: '选择一个状态...',
                selectOnFocus: true }),
            '-',
            {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                this.disable(); // 防止重复点击，在数据没加载完前disable按钮
                store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(retcd,verstatus));
                store.reload({scope:this,callback:function(){this.enable()}});
                //store.reload({params:util.form.getValues(retcd,verstatus),scope:this,callback:function(){this.enable()}});
            }}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store,
            items:['-',
                {text:'增加',icon:util.iconPath+'add.gif',handler:function(){
                    util.call('sso.RetCodeForm')(grid,0,{
                        retcd: "Tom",
                        AGE: 25,
                        phone: "123456"
                    });
                }},
                {text:'修改',icon:util.iconPath+'edit.gif',handler:function(){
                    if(!grid.getSelection().length)return;
                    var r=grid.getSelection()[0];
                    util.call('sso.RetCodeForm')(grid,1,r.data);
                }},
                {text:'删除',icon:util.iconPath+'delete.gif',handler:function(){
                    if(grid.getSelection().length) deleteFn(grid.getSelection()[0]);
                }}
            ]
        },
        listeners:{
            rowdblclick:function(g,r,t,i,e,o){ // 双击直接修改
                if(grid.getSelection().length) util.call('sso.RetCodeForm')(grid,1,grid.getSelection()[0].data);
            },
            rowcontextmenu:function(g,r,t,i,e,o){ // 表格中右键菜单
                e.preventDefault();
                new Ext.menu.Menu({items:[
                    {text:'修改',icon:util.iconPath+'edit.gif',handler:function(){
                        if(grid.getSelection().length) util.call('sso.RetCodeForm')(grid,1,grid.getSelection()[0].data);
                    }},
                    {text:'删除',icon:util.iconPath+'delete.gif',handler:function(){
                        if(grid.getSelection().length) deleteFn(grid.getSelection()[0]);
                    }}
                ]}).showAt(e.getXY());
            },
            selectionchange:function(sm,r){ // 鼠标点击选中某行事件
                //if (r.length) alert(r[0].data['retcd'])
            },
            close:function(){clearInterval(timer)}, // 关闭当前页面定时刷新器
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
   
    
    // 将当前panel放到desktop中并激活
    return grid;
}


