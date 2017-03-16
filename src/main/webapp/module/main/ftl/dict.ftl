<#macro dict dd><#list dd.dict?keys as key>['${key}','${stringx.str2utf8(dd.dict[key])}']<#if key_has_next>,<#else>]</#if></#list></#macro>
<#macro treeDict dd><#list dd.dict?keys as key>{text:'${dd.dict[key].name}',code:'${key}',leaf:<#if dd.dict[key].dict?exists>false,children:[<@treeDict dd.dict[key]/>]<#else>true</#if>}<#if key_has_next>,<#else></#if></#list></#macro>
<#macro dictArray data><#list data as row>['${row[0]}','${stringx.str2utf8(row[1])}']<#if row_has_next>,</#if></#list></#macro>
<#macro sysWinMsg data><#list data as row>['${row[0]}','${stringx.str2utf8(row[1])}','${stringx.str2utf8(row[2])}']<#if row_has_next>,</#if></#list></#macro>
<#function contains list item><#list list as nextInList><#if nextInList==item><#return true></#if></#list><#return false></#function>

Ext.apply(DICT.data,{webos:[['email','sturdypine@icloud.com'],['name','sturdypine.chen']]
,status:[['1','\u6709\u6548'],['0','\u65E0\u6548']]
,yesorno:[['1','\u662F'],['0','\u5426']]

<#list _dict?keys as key><#assign dd=_dict[key]>
<#if !(dd.tree)>,${dd.toJsonDict()}</#if>
</#list>
})

Ext.apply(DICT.tree,{x:{}
<#-- <#if (dd.tree)>${key}:{text:'${stringx.str2utf8(dd.name)}',id:'${key}',leaf:false,children:[<@treeDict dd/>]},</#if> -->
<#list _dict?keys as key><#assign dd=_dict[key]>
<#if (dd.tree)>,${dd.toJsonDict()}</#if>
</#list>
})
