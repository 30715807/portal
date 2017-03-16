/**
* 集群job状态
* version:1.0
* date:2017-01-15
* author:chenjs
* modify:
*/
var main=main||{};
main.JobWin=function(winId,winName,desk) {
	Ext.define('main_job',{
        extend: 'Ext.data.Model',
        fields: [
            'app','jvm','name',
            'startTm','endTm','redo',
            {name:'zkPath',convert:function(v){return v?v.substring(0,v.lastIndexOf('/')):''}},
            'concurrent','minIntervalSec','status','remark','ex']
    });
    var store=util.grid.sstore({model:'main_job',groupField:'zkPath'})('appRegister.getNodeValue')('/Job/LL');
    var grid = Ext.create('Ext.grid.Panel', {
        id:winId,title:winName,closable:true,

        forceFit:true,
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        columns:[
            {xtype:'rownumberer',width:30},
            {text: "name", width: 220, dataIndex: 'name'},
            {text: "app", width: 80, dataIndex: 'app'},
            {text: "jvm", width: 60, dataIndex: 'jvm'},
            {text: "开始时间", width: 150, dataIndex: 'startTm'},
            {text: "结束时间", width: 150, dataIndex: 'endTm'},
            {text: "手动重跑", width: 80, dataIndex: 'redo'},
            {text: "并发", hidden:true,width: 50, dataIndex: 'concurrent'},
            {text: "最小间隔(秒)", width: 100, dataIndex: 'minIntervalSec'},
            {text: "状态", width: 50, dataIndex: 'status'},
            {text: "zkPath", hidden:true,width: 120, dataIndex: 'zkPath'},
            {text: "描述", flex: 1, dataIndex: 'remark'},
            {text: "异常信息", hidden:true,width:150,dataIndex: 'ex'},
            {
                menuDisabled: true,
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                items: [{
                        icon   : util.iconPath+'redo.png',
                        tooltip: '重新执行',
                        getClass: function(v, meta, r) {
		                    if (r.data.redo==false) return this.disabledCls;
		                },
                        handler: function(g,ri,ci){
                        	var name = store.getAt(ri).get('name'),app = store.getAt(ri).get('app');
                        	Ext.MessageBox.confirm('任务执行确认',
                    			'向('+app+')发起任务('+name+')执行!!!',
                				function(btn){
                					if(btn!='yes')return;
                					util.ajax.async('mq.notice',function(msg){
                                		util.notify('发起任务成功',app+':'+name+'将实时执行, 请查询执行结果!!')
                                	})('REQ_'+app,name+'.leader',null);
                			})
                        }
                    }]
            }
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
            	'描述: <b>{remark}</b><br/>',
                '异常: <b>{ex}</b><br/>'
            ])
        }],
        features:[{
            ftype: 'groupingsummary',
            groupHeaderTpl: '模块:{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
        listeners:{
        	rowcontextmenu:function(g,r,t,i,e,o){ // 表格中右键菜单
                e.preventDefault();
                new Ext.menu.Menu({items:[
                    {text:'重新执行',icon:util.iconPath+'plugin.gif',handler:function(){
                        if(grid.getSelection().length){
                        	var d=grid.getSelection()[0].data;
                        	var name = d['name'],app = d['app'];
                        	Ext.MessageBox.confirm('任务执行确认',
                        			'向('+app+')发起任务('+name+')执行!!!',
                    				function(btn){
                    					if(btn!='yes')return;
                    					util.ajax.async('mq.notice',function(msg){
                                    		util.notify('发起任务成功',app+':'+name+'将实时执行, 请查询执行结果!!')
                                    	})('REQ_'+app,name+'.leader',null);
                    			})
                        }
                    }}
                ]}).showAt(e.getXY());
            },
            afterrender:function(){store.load()} // 表格组件渲染成功后异步加载数据
        }
    });
   
    return grid;
}


