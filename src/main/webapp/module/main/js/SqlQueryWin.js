/**
* 用于查询数据库信息并展现
* version:1.0
* date:2017-01-05
* author:chenjs
* modify:
*/
var main=main||{};
main.SqlQueryWin=function(winId,winName) {
	var resultPanelId='main_SQWresultP';
	var htmlstart = '<iframe src="'+constant.page+'main/table?BATCH_SQL=common.sql&SQL=';
	var htmlend='" width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>';
	var sql='';

	function sqlfn(textarea){
		var html = textarea.getValue()+"\n";
		//过滤注释"/**/"
		for(var i=0,j=-1;i<5;i++){
			j = html.indexOf("/*");
			if(j<0) break;
			var temp = html.substring(j);
			temp = temp.substring(0,temp.indexOf("*/")+2);
			html=html.replace(temp," ");
		}
		//过滤注释"//"
		for(var i=0,j=-1;i<5;i++){
			j = html.indexOf("//");
			if(j<0) break;
			var temp = html.substring(j);
			temp = temp.substring(0,temp.indexOf("\n")+1);
			html=html.replace(temp," ");
		}
		//过滤注释"--"
		for(var i=0,j=-1;i<5;i++){
			j = html.indexOf("--");
			if(j<0) break;
			var temp = html.substring(j);
			temp = temp.substring(0,temp.indexOf("\n")+1);
			html=html.replace(temp," ");
		}
    	//以空格替换所有换行
    	html=html.replace(new RegExp("\n", 'g')," ");
    	html=html.replace(";"," ");
    	sql=encodeURI(html);
      	html = htmlstart + sql
      	var ds=Ext.getCmp('main.sqlds').getValue()
      	if(ds!='') html +='&_JT_='+ds;
      	html+='&_dc='+new Date().getTime();
      	html+=htmlend;
      	Ext.getCmp(resultPanelId).body.update(html); 
	}
		
	var sqlPanel=Ext.create("Ext.form.Panel",{
		region:'north',
		height:160,
		items:[
		    {xtype:'textfield',id:'main.sqlds',fieldLabel:'<b>数据源</b>'},
		    {
				xtype:"textarea",
				fieldLabel:"<b>SQL语句<br>(Ctrl+Enter<br>查询)</b>",
				region:'center',
				layout:'fit',
				height:100,
				width:window.screen.availWidth-50,
				listeners: {
					specialkey: function (t, e) {
						if (e.getKey() == Ext.EventObject.ENTER) sqlfn(t);
			    	}
		  }
		}]
	});
		
	var resultPanel=new Ext.Panel({
		tbar:[
			{icon:constant.iconPath+'pdf.png',tooltip:'下载PDF',handler:function(){
				if(sql=='')return;
				window.open(constant.page+'main/table?VIEW=pdf&BATCH_SQL=common.sql&SQL='+sql,'PDF',"fullscreen=1");
				//document.getElementById('main_hiddenFrame').src=constant.page.uri+'main/table?VIEW=pdf&BATCH_SQL=common.sql&SQL='+sql;
			}},
			{icon:constant.iconPath+'word.png',tooltip:'下载Word',handler:function(){
				if(sql=='')return;
				document.getElementById('main_hiddenFrame').src=constant.page+'main/table?VIEW=word&BATCH_SQL=common.sql&SQL='+sql;
			}},
			{icon:constant.iconPath+'excel.png',tooltip:'下载Excel',handler:function(){
				if(sql=='')return;
				document.getElementById('main_hiddenFrame').src=constant.page+'main/table?VIEW=excel&BATCH_SQL=common.sql&SQL='+sql;
			}}
		],
		id:resultPanelId,
		region:'center',
		layout:'fit',
		split:true
	});

	return {id:winId,title:winName,closable:true, // 每个tabpanel标准配置
		layout:'border',items:[sqlPanel,resultPanel]};
}


