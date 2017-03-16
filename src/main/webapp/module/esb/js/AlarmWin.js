/**
* esb_alarm
* version:1.0
* date:2017-01-11
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.AlarmWin=function(winId,winName,desk) {
	Ext.define('esb_alarm',{
        extend: 'Ext.data.Model',
        fields: [
            'msgsn','logpoint',
            'msgcd','sndappcd','snddt','sndtm',
            'refsndappcd','refsnddt','refseqnb','refmsgcd',
            'retcd','retdesc','location','ip','traceno'
        ]
    });
    var store = util.grid.store('esb_alarm','SQL_ID=esb_alarm&SIZE_SQL_ID=esb_alarmtotal');
    var grid = Ext.create('Ext.grid.Panel', {
    	id:winId,title:winName,closable:true,
        forceFit:true,
        region:'center',
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "报文流水", flex:1, dataIndex: 'msgsn'},
            {text: "参考发送系统", width: 100, dataIndex: 'refsndappcd'},
            {text: "参考发送日期", width: 100, dataIndex: 'refsnddt'},
            {text: "参考流水号", width: 180,dataIndex: 'refseqnb'},
            {text: "参考报文", width: 150, dataIndex: 'refmsgcd'},
            {text: "返回码", width: 150, dataIndex: 'retcd'},
            {text: "报文编号", width:150, dataIndex: 'msgcd'},
            {text: "发送系统", hidden:true,width: 80, dataIndex: 'sndappcd'},
            {text: "发送日期", hidden:true,width: 100, dataIndex: 'snddt'},
            {text: "发送时间", hidden:true,width: 100, dataIndex: 'sndtm'}
        ],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store,
            items:['-',
                   sn=Ext.create({xtype:'textfield',fieldLabel:'流水号',name:'sn',labelWidth:60}),
                   '-',
                   {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                       this.disable();
                       store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sn));
                       store.reload({scope:this,callback:function(){this.enable()}});
                   }}
             ]
        },
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '错误描述: <b>{retdesc}</b><br/>',
                '错误位置: <b>{location}</b><br/>',
                '错误IP: <b>{ip}</b><br/>',
                '跟踪号: <b>{traceno}</b><br/>'
            ])
        }],
        listeners:{
            afterrender:function(){store.load()}
        }
    });
    return grid;
}
