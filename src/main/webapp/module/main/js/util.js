/**
author:chenjs
version:1.8.0
version date:2017-03-27
*/
Ext.define('form_combo',{extend:'Ext.data.Model',fields:['value','text']});
var _eval=eval;
var constant=constant||{};
var util=constant;
Ext.applyIf(util,{debug:false,
	emptyFn:function(){},
	grid:{
		paging:{start:'EXT_START',page:'EXT_PAGE',limit:'EXT_LIMIT'},
		reader:{type:'json',rootProperty:'data',totalProperty:'total'},
		sproxy:function(s,c,store){return function(){
			var p=[];for(var i=0;i<arguments.length;i++)p.push(arguments[i]);
			var url=constant.appPath+'d/g/'+s.replaceAll('\\.','/')+(p.length==0?'?_extds=true&':'?_extds=true&args='+Ext.util.JSON.encode(p));
			url+=c?'&COLUMN='+c:'';
			if(store){
				store.proxy={type:'ajax',url:url,reader:util.grid.reader};
				return Ext.create('Ext.data.Store',store);
			} 
			return {type:'ajax',url:url,reader:util.grid.reader};
		}},
		proxy:function(p){var u=constant.appPath+'d/g?_extds=true&'+p+'&';return {type:'ajax',url:u,_url:u,reader:util.grid.reader}},
		load:function(s,r,suc,o,e){if(!suc)util.ajax.failure(o.getResponse())},
		store:function(m,p){
			if(typeof m=='string')return Ext.create('Ext.data.Store',{model:m,proxy:util.grid.proxy(p),listeners:{load:util.grid.load}})
			Ext.apply(m.listeners=m.listeners||{},{load:util.grid.load});
			Ext.apply(m,{proxy:util.grid.proxy(p)});
			return Ext.create('Ext.data.Store',m);
		},
		sstore:function(m){
			if(typeof m=='string')return function(s,c){return util.grid.sproxy(s,c,{model:m,listeners:{load:util.grid.load}})}
			Ext.apply(m.listeners=m.listeners||{},{load:util.grid.load});
			return function(s,c){return util.grid.sproxy(s,c,m)}
		}
	},
	form:{
		getFields:function(f){var fs={},fields=f.getFields().map;for(id in fields)fs[fields[id].name]=fields[id];return fs;},
		setValues:function(f,d){if(!d)return;
			var nd={};for(n in d)nd[n.toLowerCase()]=d[n];
			var fs=util.form.getFields(f);
			for(fn in fs){var n=fn.toLowerCase();if(nd[n]&&fs[n].setValue)fs[n].setValue(nd[n]);}
		},
		getValues:function(){var p={};for (var i=0;i<arguments.length;i++){
			var f=arguments[i];
			if(f.getValue()&&f.getValue()!='')p[f.name]=f.getValue().toUTF8();
		}return p;},
		combo:{
			store:function(p,cfg){
				var s=util.grid.store('form_combo',p);
				cfg=cfg||{};
				if(!cfg.dict&&cfg.load==false)return;
				if(cfg.dict){
					cfg.callback=function(){
						DICT.data[cfg.dict]=[];
                		s.each(function(r){DICT.data[cfg.dict].push([r.data['value'],r.data['text']])});
					};
				}
				s.load(cfg);
				return s
			},
			beforequery:function(e){
				if (e.forceAll)return;
	            if(e.query.length==1||e.query.isContainCN()){e.combo.store.clearFilter();return}
	            var reg=new RegExp("^"+e.query+".*","i");
	            e.combo.store.filterBy(function(r,i){var t=r.data['text'];if(t)return reg.test(t.getJpy())|reg.test(t);return 0});
			}
		}
	},
	tree:{
		store:function(s,cfg){return function(){
			var p=[];for(var i=0;i<arguments.length;i++)p.push(arguments[i])
			s=s||'extjs.getExtTree';
			var url=constant.appPath+'d/s/'+s.replaceAll('\\.','/')+(p.length==0?'_extds=true&':'?_extds=true&args='+Ext.util.JSON.encode(p));
			Ext.apply(cfg=cfg||{},{proxy:{type:'ajax',method:'GET',url:url},listeners:{load:function(s,r,suc,o,n,e){if(!suc)util.ajax.failure(o.getResponse())}}});
			return Ext.create('Ext.data.TreeStore',cfg);
		}}
	},

	ajax:{
		status:{json:[222,555]},
		console:{
			maxSize:100,
			store:null,
			cStore:function(){
				Ext.define('main_ajax_console',{
			        extend: 'Ext.data.Model',
			        fields: ['date','code','message','traceNo','uri','queryString','location']
			    });
			    return Ext.create('Ext.data.Store', {model: 'main_ajax_console'});
			},
			add:function(res){
				var s=util.ajax.console.store;
				if(s==null)return;
				res.date=Ext.util.Format.date(new Date(),"Y-m-d H:i:s");
				if(s.getCount()>util.ajax.console.maxSize)s.removeAt(s.getCount()-1);
				s.insert(0, Ext.create('main_ajax_console',res));
			}
		},
		getErrMsg:function(r){
			if(util.ajax.status.json.contains(r.status))try{
				var res=Ext.util.JSON.decode(r.responseText);
				util.ajax.console.add(res);
				var msg=res.message;
				if(constant.debug){
					msg='<br>\u8FD4\u56DE\u7801:<font color="red">'+res.code+'</font>';
					msg+='<br>\u9519\u8BEF\u4FE1\u606F:<font color="red">'+res.message+'</font>';
					msg+='<br>\u8FFD\u8E2A\u53F7:'+res.traceNo;
					msg+='<br>uri:'+res.uri;
					msg+='<br>location:'+res.location;
				}
				return msg;
			}catch(e){}
			return 'Http status:'+r.status+'<br>'+r.responseText.substring(0,200);
		},
		args:function(){if(arguments.length==0)return '';var p=[];for(var i=0;i<arguments.length;i++){p.push(arguments[i]);}return Ext.util.JSON.encode(p);},
		sync:function(s,f){return util.ajax.syncall(s,f||util.ajax.failure)},
		syncall:function(s,f){return function(){
			var ret,res,p=[];
			for(var i=0;i<arguments.length;i++){p.push(arguments[i])}
			Ext.Ajax.request({method:'POST',async:false,
	            url:constant.appPath+'js/'+s.replaceAll('\\.','/'),
	            params:p.length==0?'':Ext.util.JSON.encode(p),
	            failure:f||function(r,o){res=r},
	            success:function(r,o){if(r.responseText&&r.responseText!='')ret=Ext.util.JSON.decode(r.responseText);}
	        });
			if(res)throw res;
			return ret;
        }},
        async:function(s,cb,f){return function(){
			var p=[];
			for(var i=0;i<arguments.length;i++){p.push(arguments[i])}
			var url=constant.appPath+'js/'+s.replaceAll('\\.','/');
			var params=p.length==0?'':Ext.util.JSON.encode(p);
			if(cb)
				Ext.Ajax.request({method:'POST',async:true,url:url,params:params,
		            failure:f||util.ajax.failure,
		            success:function(r,o){cb(r.responseText&&r.responseText!=''?Ext.util.JSON.decode(r.responseText):null);}
		        });
			else 
				return new Promise(function(suc,fail){
		        	Ext.Ajax.request({method:'POST',async:true,url:url,params:params,
			            failure:fail,
			            success:function(r,o){suc(r.responseText&&r.responseText!=''?Ext.util.JSON.decode(r.responseText):null);}
		        	});
		        })
        }},

        find:function(po,p){p=p||{};return util.ajax.sync('persistence.find')(po,p);},
        afind:function(cb,f){return util.ajax.async('persistence.find',cb,f);},
        get:function(po,p){p=p||{};return util.ajax.sync('persistence.get')(po,p);},
        aget:function(cb,f){return util.ajax.async('persistence.get',cb,f);},

        delete:function(po,p){p=p||{};return util.ajax.sync('persistence.delete')(po,p);},
        adelete:function(cb,f){return util.ajax.async('persistence.delete',cb,f);},
        update:function(po,p){p=p||{};return util.ajax.sync('persistence.update')(po,p);},
        aupdate:function(cb,f){return util.ajax.async('persistence.update',cb,f);},
        insert:function(po,p){p=p||{};return util.ajax.sync('persistence.insert')(po,p);},
        ainsert:function(cb,f){return util.ajax.async('persistence.insert',cb,f);},

        query:function(sid,p){p=p||{};return util.ajax.sync('persistence.query')(sid,p);},
        aquery:function(cb,f){return util.ajax.async('persistence.query',cb,f);},
        queryPage:function(sid,ssid,p){p=p||{};return util.ajax.sync('persistence.queryPage')(sid,ssid,p);},
        aqueryPage:function(cb,f){return util.ajax.async('persistence.queryPage',cb,f);},
        queryBatch:function(s,p){p=p||{};return util.ajax.sync('persistence.queryBatch')(s,p);},
        aqueryBatch:function(cb,f){return util.ajax.async('persistence.queryBatch',cb,f);},

		failure:function(r,o){Ext.create('widget.uxNotification',{title:'\u64CD\u4F5C\u5931\u8D25',minWidth:250,autoCloseDelay:10000,html:'<b>'+util.ajax.getErrMsg(r)+'</b>',paddingX:75,paddingY:50}).show()}
	},

	notify:function(){
		var args=arguments;
		var t=args.length>1?args[0]:'\u63D0\u793A',h=args[args.length==1?0:1],p=args.length>2?args[2]:'br';
		Ext.create('widget.uxNotification',{title:t,minWidth:250,autoCloseDelay:10000,html:h,position:p}).show();
	},

	jsfun:{},
	call:function(f,js){util.import(js?(typeof(js)=='string'?js:js[f]):util.jsfun[f]);var fn;eval("fn="+f);return fn;},
	
	jscache:true,
	import_js:[],
	import:function(){for (var i=0;i<arguments.length;i++){
		var js=arguments[i];
		if(util.import_js.contains(js))continue;
		if(!constant.debug)util.import_js.push(js);
		if(constant.debug&&!js.endsWith('.js')){util.notify('Import JS','loading:'+js)}
		var url=js.endsWith('.js')?(constant.modulePath+js+'?'+constant.version):(constant.appPath+'d/s/extjs/js?args=["'+js+'"]&'+constant.version);
		Ext.Ajax.request({method:'GET',disableCaching:constant.debug||!constant.jscache,async:false,url:url,
			success:function(o){try{_eval(o.responseText)}catch(e){util.notify('JS Error','JS:'+js+'<br>'+e)}},
			failure:function(){util.notify('\u4E0B\u8F7DJS\u5931\u8D25','\u52A0\u8F7D\u811A\u672C\u5931\u8D25:'+js)}
		});
	}},

	session:{
		interval:120,
		maxInactiveInterval:1800,
		logout:function(){window.self.location=constant.appPath},
		check:function(){
			var timeout=function(){Ext.MessageBox.confirm('\u8D85\u65F6\u8B66\u544A',
				'\u670D\u52A1\u5668\u4F1A\u8BDD\u5DF2\u7ECF\u8D85\u65F6, \u662F\u5426\u91CD\u65B0\u767B\u9646!!!',
				function(btn){
					if(btn=='yes')util.session.logout();
					else setTimeout("util.session.check()",util.session.interval*1000);
			})};
			util.ajax.async('login.session',
				function(ret){
					if(ret)setTimeout("util.session.check()",(util.session.interval+util.session.maxInactiveInterval)*1000);
					else timeout();
				},timeout)();
	}},

	callWin:function(c,id,n,d){
		var w=d.getComponent(id);
		if(w){d.setActiveTab(w);return}
		eval('try{w='+c+'("'+id+'","'+n+'",d);}catch(e){}');
		if(d.getComponent(id))d.setActiveTab(d.getComponent(id));
		else if(w)d.setActiveTab(d.add(w));
		return w;
	},
	main:function(){
		var toolbar=Ext.create("Ext.toolbar.Toolbar",{region:'north',items:constant.user.menus});
		toolbar.add('->', {
		    icon: constant.iconPath+'wrench_orange.png',
		    text:constant.user.name,
		    arrowVisible:false,
		    menu:[{
		    		text:'\u4FEE\u6539\u5BC6\u7801',
			    	icon: constant.iconPath+'pwd.png',
				    handler: util.call('main.PwdResetWin','main/js/PwdResetWin.js')
			    },{
			    	text:'\u63A7\u5236\u53F0',
			    	handler: function(){openWin({mid:'main.ConsoleWin',text:'\u63A7\u5236\u53F0'},'main.ConsoleWin','main/js/ConsoleWin.js',desktop)}
			    },'-',{
		    		text:'\u9000\u51FA\u7CFB\u7EDF',
			    	icon: constant.iconPath+'logout.gif',
				    handler: function(){util.ajax.async('login.logout',util.session.logout,util.session.logout)();}
			    }
		]});
		Ext.QuickTips.init();
		var viewport = new Ext.Viewport({
			layout : 'border',
			items : [
				//{region:'north',html:'<div style="background-color:white;"><div style="float:left;"><img style="height:30px;width:178px" src="'+constant.appPath+'module/main/images/logo/logo.gif"/></div><div style="text-align:right;padding:5 10 2 5;"><b>'+constant.user.name+'</b>&nbsp;&nbsp;</div></div>'},
				{
					region:'center', layout:'border', 
					//style:{border:'2px solid #c3daf9;'},
					items:[toolbar,desktop]
				}
			]
		});
		constant.user.autoruns.forEach(function(m){openWin(m[0],m[1],m[2])});
		var div=document.createElement("div");
		div.innerHTML='<IFRAME id="main_hiddenFrame" frameborder=0 height=0 width=0></IFRAME>';
		document.body.appendChild(div);
		util.ajax.console.store=util.ajax.console.cStore();
		setTimeout("util.session.check()",(util.session.interval+util.session.maxInactiveInterval)*1000);
	},
	login:function(){
		Ext.QuickTips.init();
		var form,pMask,user,pwd,verify;
		var logoPanel=new Ext.Panel({baseCls:'x-plain',region:'center',bodyStyle:'background:#f9f9f9 url('+util.appPath+'module/main/images/logo/logo.gif) no-repeat left;'});
		user=Ext.create({xtype:'textfield',fieldLabel:'\u7528\u6237\u540d',width:300});
		pwd=Ext.create({xtype:'textfield',fieldLabel:'\u5bc6\u7801',inputType:'password',width:300});
		if(constant.verify!=false)verify=Ext.create({xtype:'textfield',fieldLabel:'\u9a8c\u8bc1\u7801',allowBlank:false,maxLength:6,width:180,msgTarget:'side',
			listeners:{specialKey:function(f,e,o){if(e.getKey()==13){
				if(!form.isValid())return;
				util.ajax.async('login.login',
					function(){self.location=util.appPath+'p/main/main'},
					util.ajax.failure)
				({code:user.getValue(),password:pwd.getValue(),verify:verify?verify.getValue():''});
		}}}});
		form=Ext.create("Ext.form.Panel",{baseCls:'x-plain',bodyStyle:'background:#f9f9f9 none;color:#222;padding:5px 35px;',defaults:{width:200,msgTarget:'side',allowBlank:false},frame:false,height:verify?130:90,labelWidth:120,region:'south',
			items:verify?[
			    user,pwd,
			    {xtype: "container",layout: "hbox",width:300,items:[
			    	verify,
	            	{xtype:'tbtext',width:200,text:'&nbsp;&nbsp;&nbsp;<img src="'+util.appPath+'v?h=30" data-qtip="<ul><li>\u70B9\u51FB\u56FE\u7247\u66F4\u65B0\u9A8C\u8BC1\u7801</li><li>\u9A8C\u8BC1\u7801\u6709\u6548\u65F6\u95F4\u4E3A2\u5206\u949F</li><li>\u9A8C\u8BC1\u7801\u53EA\u80FD\u4F7F\u7528\u4E00\u6B21\uFF0C\u9A8C\u8BC1\u4E0D\u901A\u8FC7\u9700\u8981\u70B9\u51FB\u91CD\u65B0\u751F\u6210</li></ul>" data-qtitle="\u9A8C\u8BC1\u7801\u63D0\u793A" onclick="this.src=\''+util.appPath+'v?h=30&dc=\'+new Date().getTime()"></img>'}
	            ]}
			]:[user,pwd]
		});
		var win=new Ext.Window({title:'\u4E1A\u52A1\u8FD0\u8425\u7CFB\u7EDF\u767B\u5F55',bodyBorder:false,resizable:false,layout:'border',plain:true,buttonAlign:'right',modal:true,closable:false,
			height:verify?280:250,width:550,
			items:[logoPanel,form],
			listeners:{show:function(){user.focus(true,true);}},
			buttons:[{text:'\u767b\u5f55',handler:function(){
				if(!form.isValid())return;
				var btn=this;
				this.disable();
				//var pMask=new Ext.LoadMask(win.body,{msg:'Please wait...'});
				//pMask.show();
				util.ajax.async('login.login',
					function(){btn.enable();self.location=util.appPath+'p/main/main'},
					function(r){btn.enable();util.ajax.failure(r)})
				({code:user.getValue(),password:pwd.getValue(),verify:verify?verify.getValue():''});
			}}]
		});
		win.show();
	}
});


var desktop=Ext.create('Ext.tab.Panel',{region:'center',bodyCls:'main-body'});
function openWin(m,c,js,d){
	if(!d)d=desktop;
	var id='desk.'+m.mid?m.mid:c;
    var w=d.getComponent(id);
    if(w){d.setActiveTab(w);return}
	if(!constant.debug&&util.callWin(c,id,m.text,d))return;
	if(constant.debug&&!js.endsWith('.js')){util.notify('OpenWin JS','loading:'+js)}
	var url=js.endsWith('.js')?(constant.modulePath+js+'?'+constant.version):(constant.appPath+'d/s/extjs/js?args=["'+js+'"]&'+constant.version);
	Ext.Ajax.request({method:'GET',disableCaching:constant.debug||!constant.jscache,url:url,
		success:function(o){try{_eval(o.responseText);util.callWin(c,id,m.text,d)}catch(e){util.notify('JS Error','JS:'+js+'<br>'+e)}},
		failure:function(){util.notify('\u4E0B\u8F7D\u811A\u672C\u5931\u8D25','\u811A\u672C:<font color="red">'+js+'</font>')}
	});
}

var DICT=DICT||{};
Ext.applyIf(DICT,{tree:{},treeNode:{},data:{},
	store:function(p,c){return Ext.create('Ext.data.ArrayStore',{fields:['value','text'],data:DICT.data[p]})},
	renderer:function(d){return function(v){return DICT.getText(v,d)}},
	getText:function(value,d,index){
		if(!value)return'';
		if(typeof(d)=='string')d=DICT.data[d];
		if(!d)return value;
		if(typeof(value)=='string'&&value.indexOf(',')<0){
			var r=d.find(function(r){return r[0]==value});
			if(r!=null){return index==null?r[1]:r[index]};return value;
		}
		if(typeof(value)=='string')value=value.split(',');var v='';
		value.each(function(i){if(v=='')v=DICT.getText(i,d);else v+=','+DICT.getText(i,d);});return v
	}
});

// vtypes...
Ext.apply(Ext.form.field.VTypes,{
	ench:function(v,f){return !v.isContainCN()},
	enchText:"\u4e0d\u80fd\u542b\u6709\u4e2d\u6587\u5b57\u7b26",
	enchMask:/^[-_.a-zA-Z0-9]$/
});
// vtypes end....


