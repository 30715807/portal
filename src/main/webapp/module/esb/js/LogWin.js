/**
* esb_log
* version:1.0
* date:2017-01-11
* author:chenjs
* modify:
*/
var esb=esb||{};
esb.LogWin=function(winId,winName,desk) {
	Ext.define('esb_log',{
        extend: 'Ext.data.Model',
        fields: [
            'msgsn','logpoint','seq',
            'msgcd','sndappcd','snddt','sndtm',
            'refsndappcd','refsnddt','refseqnb',
            'biz1','biz2','biz3','biz4','biz5','biz6','biz7','biz8','biz9'
        ]
    });
	var sn;
    var store = util.grid.store('esb_log','SQL_ID=esb_log&SIZE_SQL_ID=esb_logtotal');
    var grid = Ext.create('Ext.grid.Panel', {
        forceFit:true,
        region:'center',
        store:store,
        viewConfig:{enableTextSelection:true},
        stripeRows:true,
        selModel:{mode:'MULTI'},//,selType:'checkboxmodel'
        columns:[
            {xtype:'rownumberer',width:40},
            {text: "报文流水", flex:1, dataIndex: 'msgsn'},
            {text: "日志点", width:80, dataIndex: 'logpoint'},
            {text: "报文编号", width:150, dataIndex: 'msgcd'},
            {text: "发送系统", width: 100, dataIndex: 'sndappcd'},
            {text: "发送日期", width: 100, dataIndex: 'snddt'},
            {text: "发送时间", width: 100, dataIndex: 'sndtm'},
            {text: "参考发送系统", width: 100, dataIndex: 'refsndappcd'},
            {text: "参考发送日期", width: 100, dataIndex: 'refsnddt'},
            {text: "业务信息1", width: 100,hidden:true,dataIndex: 'biz1'},
            {text: "业务信息2", width: 100,hidden:true,dataIndex: 'biz2'},
            {text: "业务信息3", width: 100,hidden:true,dataIndex: 'biz3'},
            {text: "业务信息4", width: 100,hidden:true,dataIndex: 'biz4'},
            {text: "业务信息5", width: 100,hidden:true,dataIndex: 'biz5'},
            {text: "业务信息6", width: 100,hidden:true,dataIndex: 'biz6'},
            {text: "业务信息7", width: 100,hidden:true,dataIndex: 'biz7'},
            {text: "业务信息8", width: 100,hidden:true,dataIndex: 'biz8'},
            {text: "业务信息9", width: 100,hidden:true,dataIndex: 'biz9'}
        ],
        plugins:[{
            ptype:'rowexpander',
            rowBodyTpl:new Ext.XTemplate([
                '业务信息1: <b>{biz1}</b><br/>',
                '业务信息2: <b>{biz2}</b><br/>',
                '业务信息3: <b>{biz3}</b><br/>',
                '业务信息4: <b>{biz4}</b><br/>',
                '业务信息5: <b>{biz5}</b><br/>',
                '业务信息6: <b>{biz6}</b><br/>',
                '业务信息7: <b>{biz7}</b><br/>',
                '业务信息8: <b>{biz8}</b><br/>',
                '业务信息9: <b>{biz9}</b><br/>'
            ])
        }],
        bbar:{
            xtype : 'pagingtoolbar',
            displayInfo : true,
            inputItemWidth:50,
            store : store,
            items:['-',
                   sn=Ext.create({xtype:'textfield',fieldLabel:'报文流水',name:'sn',labelWidth:60}),
                   '-',
                   {icon:util.iconPath+'filter.gif', tooltip:'过滤',handler:function(){
                       this.disable();
                       store.proxy.url=store.proxy._url+Ext.urlEncode(util.form.getValues(sn));
                       store.reload({scope:this,callback:function(){this.enable()}});
                   }}
             ]
        },
        listeners:{
            afterrender:function(){store.load()},
            selectionchange:function(sm,r){
                if (r.length){
                	util.ajax.async('persistence.query',function(log){
                		if(log){
                			Ext.getCmp('esb_log_xml').setTitle('ESB XML('+r[0].data['msgsn']+')');
	                		Ext.getCmp('esb_log_xml').setHtml('<b>'+Ext.util.Base64.decode(log.esbXML).formatXml().toHTML()+'</b>');
	                		Ext.getCmp('esb_log_sig').setHtml(log.signature?log.signature:'');
	                		Ext.getCmp('esb_log_orig').setHtml('<table><tr><td style="word-break:break-all">'+(log.origBytes?log.origBytes:'')+'</td></tr></table>');
                		}else util.notify('找不到流水信息, seq:'+r[0].data['seq']);
                	})
                	('esb.logdetail',{seq:r[0].data['seq']});
                }
            }
        }
    });
    return {id:winId,title:winName,closable:true,layout:'border',
    	items:[
    	       grid,
    	       {region:'south',height:300,layout:'border',items:[
    	           {id:'esb_log_orig',region:'west',width:300,bodyStyle:'overflow-y:auto;overflow-x:hidden',title:{text:'原始报文(base64)',height:12},padding:5,html:''},
    	           {id:'esb_log_xml',region:'center',bodyStyle:'overflow-y:auto;overflow-x:hidden',title:{text:'ESB XML',height:12},padding:5,html:''},
    	           {id:'esb_log_sig',region:'east',width:300,bodyStyle:'overflow-y:auto;overflow-x:hidden',title:{text:'签名信息',height:12},padding:5,html:''}
	   ]}]};
}


