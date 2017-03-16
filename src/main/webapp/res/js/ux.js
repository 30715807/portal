/**
 * version:1.1
 * date:2017-01-17
 * author:chenjs
 * 
 */
var XStr=String.prototype;
XStr.removeLineEnd=function(){return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g,'$1 $2');}
XStr.getJpy=function(){var r="";for(i=0;i<this.length;i++){var c=this.substr(i,1);var t=JPY?JPY[c]:c;r+=t?t:c;}return r.toLowerCase();}
XStr.toHTML=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\'/g,"&apos;").replace(/\"/g,"&quot;").replace(/\n/g,"<br>").replace(/\ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")};
XStr.replaceAll=function(s,t){return this.replace(new RegExp(s,"gm"),t)};
XStr.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};
XStr.ltrim=function(){return this.replace(/(^\s*)/g,"")};
XStr.rtrim=function(){return this.replace(/(\s*$)/g,"")};
XStr.toUTF8=function(){return this.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replaceAll('%','\\')})};
XStr.toCN=function(){eval("var _V='"+this+"'");return _V;};
XStr.isInt=function(){return(this.isEmpty()||/^(\-?)(\d+)$/.test(this))};
XStr.isDouble=function(){return (this.isEmpty()||this.isInteger()||(/^(\-?)(\d+)(.{1})(\d+)$/g.test(this)))};
XStr.isValidDate=function(){if(this.isEmpty())return true;var pattern=/^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g;if(!pattern.test(this))return false;var arrDate=this.split("-");if(parseInt(arrDate[0],10)<100)arrDate[0]=2000+parseInt(arrDate[0],10)+"";var date=new Date(arrDate[0],(parseInt(arrDate[1],10)-1)+"",arrDate[2]);if(date.getYear()==arrDate[0]&&date.getMonth()==(parseInt(arrDate[1],10)-1)+""&&date.getDate()==arrDate[2])return true;return false;}
XStr.isAllCN=function(){return /^([\u4E00-\u9FA5])*$/g.test(this)};
XStr.isContainCN=function(){return /[\u4e00-\u9fa5\uf900-\ufa2d]/.test(this)};
XStr.byteLength=function(){return this.replace(/[^\\x00-\\xff]/g,"**").length;}
XStr.isMaskReg=function(pat){if (this.isEmpty())return true;return new RegExp(pat,"gi").test(this)};
XStr.endsWith=function(sEnd){return(this.substr(this.length-sEnd.length)==sEnd)};
XStr.startsWith=function(s){return(this.indexOf(s)==0)};
XStr.fmtWithZero=function(isFmtWithZero){return(isFmtWithZero && /^\d$/.test(this))?"0"+this:this;};
XStr.fmtWithZeroD=function(isFmtWithZero){return(isFmtWithZero && /^\d{2}$/.test(this))?"00"+this:((isFmtWithZero && /^\d$/.test(this))?"0"+this:this)};
XStr.removeSpaces=function(){return this.replace(/ /gi,'')};
XStr.removeExtraSpaces=function(){return(this.replace(new RegExp("\\s+","g")," "))};
XStr.removeSpaceDelimitedStr=function(r){var s=" "+this.trim()+" ";return s.replace(" "+r,"").rTrim()};
XStr.isEmpty=function(){return this.length==0;};
XStr.validateURL=function(){return sURL.match(/[^a-zA-Z0-9-]/g,"")};
XStr.isEmail=function(){return /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this)};
XStr.isAlphaNumeric=function(){return !/[^a-zA-Z0-9]/g.test(this)};
XStr.encodeURI=function(){var v=escape(this);v=v.replace(/\+/g,"%2B");return v;}
XStr.decodeURI=function(){return unescape(this)};
XStr.cutHead=function(n){var strTmp="";for(var i=0,l=this.length,k=0;i<n;k++){var ch=this.charAt(k);if(ch.match(/[\x00-\x80]/))i++;else i+=2;strTmp+=ch;}return strTmp;}
XStr.format2money=function(){var s=this.toString();if(s.startsWith("-"))s=s.substring(1);l=s.match(/^\d*/)[0].length,m=l%3?l%3:3;s=s.slice(0,m)+s.slice(m,l).replace(/(\d{3})/g,",$1")+s.slice(l);if(this.toString().startsWith("-")) return "-"+s;return s;}
var RMB={digits:new Array('\u96f6','\u58f9','\u8d30','\u53c1','\u8086','\u4f0d','\u9646','\u67d2','\u634c','\u7396'),radices:new Array("",'\u62fe','\u4f70','\u4edf'),bigRadices:new Array("",'\u4e07','\u4ebf'),decimals:new Array('\u89d2','\u5206')}
XStr.rmb=function(){var MAXIMUM_NUMBER=99999999999.99,integral,decimal,outputCharacters,parts,zeroCount,i,p,d,quotient,modulus;if(this==""){alert("Empty input!");return "";}if(this.match(/[^,.\d]/)!=null){alert("Invalid characters in the input string!");return "";}if((this).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/)==null){alert("Illegal format of digit number!");return "";}if(parseFloat(this)>MAXIMUM_NUMBER){alert("Too large a number to convert!");return "";}parts=this.split(".");if(parts.length>1){integral=parts[0];decimal=parts[1];decimal=decimal.substr(0,2);}else{integral=parts[0];decimal="";}outputCharacters="";if(Number(integral)>0){zeroCount=0;for(i=0;i<integral.length;i++){p=integral.length-i-1;d=integral.substr(i,1);quotient=p/4;modulus=p%4;if(d=="0"){zeroCount++;}else{if(zeroCount>0){outputCharacters+=RMB.digits[0];}zeroCount=0;outputCharacters+=RMB.digits[Number(d)]+RMB.radices[modulus];}if(modulus==0&&zeroCount<4)outputCharacters+=RMB.bigRadices[quotient];}outputCharacters+='\u5706';}if(decimal!=""){for(i=0;i<decimal.length;i++){d=decimal.substr(i,1);if(d!="0")outputCharacters+=RMB.digits[Number(d)]+RMB.decimals[i]}}if(outputCharacters=="")outputCharacters='\u96f6\u5706';if(decimal=="")outputCharacters+='\u6574';outputCharacters=outputCharacters;return outputCharacters;};
XStr.formatJson=function(compress){
	var txt=this;
    var indentChar = '    ';   
    if(/^\s*$/.test(txt))return;
    try{var data=eval('('+txt+')');}   
    catch(e){return;};
    var draw=[],last=false,This=this,line=compress?'':'\n',nodeCount=0,maxDepth=0;   
    var notify=function(name,value,isLast,indent,formObj){   
        nodeCount++;
        for (var i=0,tab='';i<indent;i++ )tab+=indentChar;  
        tab=compress?'':tab;  
        maxDepth=++indent;  
        if(value&&value.constructor==Array){  
            draw.push(tab+(formObj?('"'+name+'":'):'')+'['+line);  
            for (var i=0;i<value.length;i++)   
                notify(i,value[i],i==value.length-1,indent,false);   
            draw.push(tab+']'+(isLast?line:(','+line)));  
        }else   if(value&&typeof value=='object'){  
                draw.push(tab+(formObj?('"'+name+'":'):'')+'{'+line);  
                var len=0,i=0;   
                for(var key in value)len++;   
                for(var key in value)notify(key,value[key],++i==len,indent,true);   
                draw.push(tab+'}'+(isLast?line:(','+line)));  
            }else{   
                    if(typeof value=='string')value='"'+value+'"';   
                    draw.push(tab+(formObj?('"'+name+'":'):'')+value+(isLast?'':',')+line);   
            };   
    };   
    var isLast=true,indent=0;   
    notify('',data,isLast,indent,false);   
    return draw.join('');   
}
String.prototype.formatXml=function()
{ 
	var getPrefix=function(prefixIndex)
	{
		var span = '    ';
		var output = [];
		for(var i = 0 ; i < prefixIndex; ++i)	output.push(span);
		return output.join('');
	}

	var text=this.toString();
	text = '\n' + text.replace(/(<\w+)(\s.*?>)/g,function($0, name, props)
	{
		return name + ' ' + props.replace(/\s+(\w+=)/g," $1");
	}).replace(/>\s*?</g,">\n<");
	
	text = text.replace(/\n/g,'\r').replace(/<!--(.+?)-->/g,function($0, text)
	{
		var ret = '<!--' + escape(text) + '-->';
		//alert(ret);
		return ret;
	}).replace(/\r/g,'\n');
	
	var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
	var nodeStack = [];
	var output = text.replace(rgx,function($0,all,name,isBegin,isCloseFull1,isCloseFull2 ,isFull1,isFull2){
		var isClosed = (isCloseFull1 == '/') || (isCloseFull2 == '/' ) || (isFull1 == '/') || (isFull2 == '/');
		var prefix = '';
		if(isBegin == '!')prefix = getPrefix(nodeStack.length);
		else 
		{
			if(isBegin != '/')
			{
				prefix = getPrefix(nodeStack.length);
				if(!isClosed)nodeStack.push(name);
			}
			else
			{
				nodeStack.pop();
				prefix = getPrefix(nodeStack.length);
			}
		}
			var ret =  '\n' + prefix + all;
			return ret;
	});
	
	var prefixSpace = -1;
	var outputText = output.substring(1);
	outputText = outputText.replace(/\n/g,'\r').replace(/(\s*)<!--(.+?)-->/g,function($0, prefix,  text)
	{
		if(prefix.charAt(0) == '\r')
			prefix = prefix.substring(1);
		text = unescape(text).replace(/\r/g,'\n');
		var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix ) + '-->';
		return ret;
	});
	
	return outputText.replace(/\s+$/g,'').replace(/\r/g,'\r\n');
}

if(!Array.prototype.find){Array.prototype.find=function(predicate){'use strict';if(this==null){throw new TypeError('Array.prototype.find called on null or undefined');}if(typeof predicate!=='function'){throw new TypeError('predicate must be a function');}var list=Object(this);var length=list.length>>>0;var thisArg=arguments[1];var value;for(var i=0;i<length;i++){value=list[i];if(predicate.call(thisArg,value,i,list)){return value;}}return undefined;};}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null){throw new TypeError('"this" is null or not defined');}var o=Object(this);var len=o.length>>>0;if(len===0){return-1;}var n=+fromIndex||0;if(Math.abs(n)===Infinity){n=0;}if(n>=len){return-1;}k=Math.max(n>=0?n:len-Math.abs(n),0);while(k<len){if(k in o&&o[k]===searchElement){return k;}k++;}return-1;};}
if(!Array.prototype.forEach){Array.prototype.forEach=function(callback,thisArg){var T,k;if(this===null){throw new TypeError(' this is null or not defined');}var O=Object(this);var len=O.length>>>0;if(typeof callback!=="function"){throw new TypeError(callback+' is not a function');}if(arguments.length>1){T=thisArg;}k=0;while(k<len){var kValue;if(k in O){kValue=O[k];callback.call(T,kValue,k,O);}k++;}};}
Array.prototype.filter=Array.prototype.filter||function(func){var arr=this;var r=[];for(var i=0;i<arr.length;i++){if(func(arr[i])){r.push(arr[i]);}}return r;}
if(!Array.prototype.contains)Array.prototype.contains=function(obj){var index=this.length;while (index--){if(this[index]===obj)return true;}return false;}

Ext.define("Ext.ux.window.Notification",{extend:"Ext.window.Window",alias:"widget.uxNotification",cls:"ux-notification-window",autoClose:true,autoHeight:true,plain:false,draggable:false,shadow:false,focus:Ext.emptyFn,manager:null,useXAxis:false,position:"br",spacing:6,paddingX:30,paddingY:10,slideInAnimation:"easeIn",slideBackAnimation:"bounceOut",slideInDuration:200,slideBackDuration:1000,hideDuration:500,autoCloseDelay:5000,stickOnClick:true,stickWhileHover:true,isHiding:false,isFading:false,destroyAfterHide:false,closeOnMouseOut:false,xPos:0,yPos:0,statics:{defaultManager:{el:null}},initComponent:function(){var a=this;if(Ext.isDefined(a.corner)){a.position=a.corner}if(Ext.isDefined(a.slideDownAnimation)){a.slideBackAnimation=a.slideDownAnimation}if(Ext.isDefined(a.autoDestroyDelay)){a.autoCloseDelay=a.autoDestroyDelay}if(Ext.isDefined(a.autoHideDelay)){a.autoCloseDelay=a.autoHideDelay}if(Ext.isDefined(a.autoHide)){a.autoClose=a.autoHide}if(Ext.isDefined(a.slideInDelay)){a.slideInDuration=a.slideInDelay}if(Ext.isDefined(a.slideDownDelay)){a.slideBackDuration=a.slideDownDelay}if(Ext.isDefined(a.fadeDelay)){a.hideDuration=a.fadeDelay}a.position=a.position.replace(/c/,"");a.updateAlignment(a.position);a.setManager(a.manager);a.callParent(arguments)},onRender:function(){var a=this;a.callParent(arguments);a.el.hover(function(){a.mouseIsOver=true},function(){a.mouseIsOver=false;if(a.closeOnMouseOut){a.closeOnMouseOut=false;a.close()}},a)},updateAlignment:function(a){var b=this;switch(a){case"br":b.paddingFactorX=-1;b.paddingFactorY=-1;b.siblingAlignment="br-br";if(b.useXAxis){b.managerAlignment="bl-br"}else{b.managerAlignment="tr-br"}break;case"bl":b.paddingFactorX=1;b.paddingFactorY=-1;b.siblingAlignment="bl-bl";if(b.useXAxis){b.managerAlignment="br-bl"}else{b.managerAlignment="tl-bl"}break;case"tr":b.paddingFactorX=-1;b.paddingFactorY=1;b.siblingAlignment="tr-tr";if(b.useXAxis){b.managerAlignment="tl-tr"}else{b.managerAlignment="br-tr"}break;case"tl":b.paddingFactorX=1;b.paddingFactorY=1;b.siblingAlignment="tl-tl";if(b.useXAxis){b.managerAlignment="tr-tl"}else{b.managerAlignment="bl-tl"}break;case"b":b.paddingFactorX=0;b.paddingFactorY=-1;b.siblingAlignment="b-b";b.useXAxis=0;b.managerAlignment="t-b";break;case"t":b.paddingFactorX=0;b.paddingFactorY=1;b.siblingAlignment="t-t";b.useXAxis=0;b.managerAlignment="b-t";break;case"l":b.paddingFactorX=1;b.paddingFactorY=0;b.siblingAlignment="l-l";b.useXAxis=1;b.managerAlignment="r-l";break;case"r":b.paddingFactorX=-1;b.paddingFactorY=0;b.siblingAlignment="r-r";b.useXAxis=1;b.managerAlignment="l-r";break}},getXposAlignedToManager:function(){var a=this;var b=0;if(a.manager&&a.manager.el&&a.manager.el.dom){if(!a.useXAxis){return a.el.getLeft()}else{if(a.position=="br"||a.position=="tr"||a.position=="r"){b+=a.manager.el.getAnchorXY("r")[0];b-=(a.el.getWidth()+a.paddingX)}else{b+=a.manager.el.getAnchorXY("l")[0];b+=a.paddingX}}}return b},getYposAlignedToManager:function(){var b=this;var a=0;if(b.manager&&b.manager.el&&b.manager.el.dom){if(b.useXAxis){return b.el.getTop()}else{if(b.position=="br"||b.position=="bl"||b.position=="b"){a+=b.manager.el.getAnchorXY("b")[1];a-=(b.el.getHeight()+b.paddingY)}else{a+=b.manager.el.getAnchorXY("t")[1];a+=b.paddingY}}}return a},getXposAlignedToSibling:function(a){var b=this;if(b.useXAxis){if(b.position=="tl"||b.position=="bl"||b.position=="l"){return(a.xPos+a.el.getWidth()+a.spacing)}else{return(a.xPos-b.el.getWidth()-b.spacing)}}else{return b.el.getLeft()}},getYposAlignedToSibling:function(a){var b=this;if(b.useXAxis){return b.el.getTop()}else{if(b.position=="tr"||b.position=="tl"||b.position=="t"){return(a.yPos+a.el.getHeight()+a.spacing)}else{return(a.yPos-b.el.getHeight()-a.spacing)}}},getNotifications:function(b){var a=this;if(!a.manager.notifications[b]){a.manager.notifications[b]=[]}return a.manager.notifications[b]},setManager:function(a){var b=this;b.manager=a;if(typeof b.manager=="string"){b.manager=Ext.getCmp(b.manager)}if(!b.manager){b.manager=b.statics().defaultManager;if(!b.manager.el){b.manager.el=Ext.getBody()}}if(typeof b.manager.notifications=="undefined"){b.manager.notifications={}}},beforeShow:function(){var a=this;if(a.stickOnClick){if(a.body&&a.body.dom){Ext.fly(a.body.dom).on("click",function(){a.cancelAutoClose();a.addCls("notification-fixed")},a)}}if(a.autoClose){a.task=new Ext.util.DelayedTask(a.doAutoClose,a);a.task.delay(a.autoCloseDelay)}a.el.setX(-10000);a.el.setOpacity(1)},afterShow:function(){var b=this;b.callParent(arguments);var a=b.getNotifications(b.managerAlignment);if(a.length){b.el.alignTo(a[a.length-1].el,b.siblingAlignment,[0,0]);b.xPos=b.getXposAlignedToSibling(a[a.length-1]);b.yPos=b.getYposAlignedToSibling(a[a.length-1])}else{b.el.alignTo(b.manager.el,b.managerAlignment,[(b.paddingX*b.paddingFactorX),(b.paddingY*b.paddingFactorY)],false);b.xPos=b.getXposAlignedToManager();b.yPos=b.getYposAlignedToManager()}Ext.Array.include(a,b);b.el.animate({from:{x:b.el.getX(),y:b.el.getY()},to:{x:b.xPos,y:b.yPos,opacity:1},easing:b.slideInAnimation,duration:b.slideInDuration,dynamic:true})},slideBack:function(){var c=this;var b=c.getNotifications(c.managerAlignment);var a=Ext.Array.indexOf(b,c);if(!c.isHiding&&c.el&&c.manager&&c.manager.el&&c.manager.el.dom&&c.manager.el.isVisible()){if(a){c.xPos=c.getXposAlignedToSibling(b[a-1]);c.yPos=c.getYposAlignedToSibling(b[a-1])}else{c.xPos=c.getXposAlignedToManager();c.yPos=c.getYposAlignedToManager()}c.stopAnimation();c.el.animate({to:{x:c.xPos,y:c.yPos},easing:c.slideBackAnimation,duration:c.slideBackDuration,dynamic:true})}},cancelAutoClose:function(){var a=this;if(a.autoClose){a.task.cancel()}},doAutoClose:function(){var a=this;if(!(a.stickWhileHover&&a.mouseIsOver)){a.close()}else{a.closeOnMouseOut=true}},removeFromManager:function(){var c=this;if(c.manager){var b=c.getNotifications(c.managerAlignment);var a=Ext.Array.indexOf(b,c);if(a!=-1){Ext.Array.erase(b,a,1);for(;a<b.length;a++){b[a].slideBack()}}}},hide:function(){var a=this;if(a.isHiding){if(!a.isFading){a.callParent(arguments);a.isHiding=false}}else{a.isHiding=true;a.isFading=true;a.cancelAutoClose();if(a.el){a.el.fadeOut({opacity:0,easing:"easeIn",duration:a.hideDuration,remove:a.destroyAfterHide,listeners:{afteranimate:function(){a.isFading=false;a.removeCls("notification-fixed");a.removeFromManager();a.hide(a.animateTarget,a.doClose,a)}}})}}return a},destroy:function(){var a=this;if(!a.hidden){a.destroyAfterHide=true;a.hide(a.animateTarget,a.doClose,a)}else{a.callParent(arguments)}}});
