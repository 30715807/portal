<#--
extservice: /ext/s/extjs/getExtTree?args=['svcmgr.svcTree']
extgrid: /ext/g?SQL_ID=svcmgr_msgstruct&msgCd=CBS.000021220.01
页面访问方式: /p/main/table?BATCH_SQL=common_retcode
/p/main/table?BATCH_SQL=common_retcode&VIEW=word
/p/main/table?BATCH_SQL=common_retcode&VIEW=excel
/p/main/table?BATCH_SQL=common_retcode&VIEW=pdf
-->
<#assign SQLID=_stringx.replaceAll(BATCH_SQL,".", "_")>
<#if !(VIEW?exists)>
<style type="text/css">
*{
    margin:0px;
    padding:0px;
}
.td{
    line-height:30px;
    border:.1pt solid windowtext;
    font-size:15;
    pxpadding:3px;
    font-family:微软雅黑;
}
table{
		width:100%;
    margin:0px;
    padding:0px;
}
#th{
    background-color:#D2DFF2;
    position:relative;
    border:.1pt solid windowtext;
    border-bottom:.01pt solid windowtext;
    height:30px;
    top:0;
    left:0;
}
.th2{
		background-color:#D2DFF2;
    width:40px;
    position:relative;
    
    left:0px;
    
}
#wrap{
    position:relative;
    padding-top:0px;
}
</style>
<script type="text/javascript">
var pre_scrollTop=0;//滚动条事件之前文档滚动高度
var pre_scrollLeft=0;//滚动条事件之前文档滚动宽度
var obj_th,obj_th2;
// 兼容IE FF的ByName方法  
var getElementsByName = function(tag, name){  
    var returns = document.getElementsByName(name);  
    if(returns.length > 0) return returns;  
    returns = new Array();  
    var e = document.getElementsByTagName(tag);  
    for(var i = 0; i < e.length; i++){  
        if(e[i].getAttribute("name") == name){  
            returns[returns.length] = e[i];  
        }  
    }  
    return returns;  
} 
window.onload =function () {
	pre_scrollTop=(document.documentElement.scrollTop || document.body.scrollTop);
	pre_scrollLeft=(document.documentElement.scrollLeft || document.body.scrollTop);
	obj_th=document.getElementById("th");
	obj_th2=getElementsByName("td","th2");
};
window.onscroll = function(){
    if(pre_scrollTop != (document.documentElement.scrollTop || document.body.scrollTop)){
        //滚动了竖直滚动条
        pre_scrollTop=(document.documentElement.scrollTop || document.body.scrollTop);   
        obj_th.style.top=pre_scrollTop+"px";
       
    }
    else if(pre_scrollLeft != (document.documentElement.scrollLeft || document.body.scrollLeft)){
        //滚动了水平滚动条
        pre_scrollLeft=(document.documentElement.scrollLeft || document.body.scrollLeft);
        //debugger;
       for(var i=0; i< obj_th2.length; i++){
       	//obj_th2[i].offSetHeight="30px";
       	//obj_th2[i].offsetHeight = (obj_th2[i].offsetHeight-30)+"px";
       	obj_th2[i].style.left=pre_scrollLeft+"px";
       }
    }
};
</script>
</#if>

<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0;heigth:300px;font-family:微软雅黑;overflow-x:hidden;overflow-y:hidden" align="center">

<tr id="th"><td>&nbsp;&nbsp;&nbsp;</td>
<#list _root['_CLM_${SQLID}'] as row>
	<td align="center" >&nbsp;${row}&nbsp;</td>
</#list>
</tr> 
<#assign size = _root['${SQLID}']?size>
<#list _root['${SQLID}'] as row>
	<tr>
		<td name="th2" class="th2" width="20" align="center">
			&nbsp;${row_index+1}&nbsp;
		</td>
		<#list row as cell>
			<#if (row_index % 2 == 0)> 
			 <td class="td">&nbsp;<#if !(cell?exists)><#elseif cell?is_string>${_stringx.toHTML(cell)}<#else>${cell}</#if>&nbsp;</td>
			<#else>
				<td class="td" style="background-color:#F0F0F0;">&nbsp;<#if !(cell?exists)><#elseif cell?is_string>${_stringx.toHTML(cell)}<#else>${cell}</#if>&nbsp;</td>
			</#if>
		</#list>
	</tr>
</#list>
</table>