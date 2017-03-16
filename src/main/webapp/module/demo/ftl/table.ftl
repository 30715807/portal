<#--
extservice: /ext/s/extjs/getExtTree?args=['svcmgr.svcTree',{}]
extgrid: /ext/g?SQL_ID=svcmgr_msgstruct&msgCd=CBS.000021220.01
ҳ����ʷ�ʽ: /p/demo/table?BATCH_SQL=common_retcode
/p/demo/table?BATCH_SQL=common_retcode&VIEW=word
/p/demo/table?BATCH_SQL=common_retcode&VIEW=excel&FILE_NAME=表格
/p/demo/table?BATCH_SQL=common_retcode&VIEW=pdf
-->
<#assign SQLID=_stringx.replaceAll(BATCH_SQL,".", "_")>
${SQLID}
<table align='center' border='1'>
<tr><td>
<#list _root['_CLM_${SQLID}'] as row><td>${row}</#list>
<#list _root['${SQLID}'] as row>
<tr><td>${row_index+1}<#list row as cell><td>${cell?default('')}</#list>
</#list> 
</table>
<#-- 
<tr><td>${row_index+1}<#list row?keys as key>${row[key]?default('')}</#list> 


<tr><td>${row_index+1}<#list row as cell><td>${cell?default('')}</#list>

-->