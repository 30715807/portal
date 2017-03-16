<#--
extservice: /ext/s/extjs/getExtTree?args=['svcmgr.svcTree']
extgrid: /ext/g?SQL_ID=svcmgr_msgstruct&msgCd=CBS.000021220.01
页面访问方式: /p/main/table?BATCH_SQL=common_retcode
/p/main/table?BATCH_SQL=common_retcode&VIEW=word
/p/main/table?BATCH_SQL=common_retcode&VIEW=excel
/p/main/table?BATCH_SQL=common_retcode&VIEW=pdf
-->
<style>
	{mso-displayed-decimal-separator:"\.";
	mso-displayed-thousand-separator:"\,";}
@page
	{margin:.75in .7in .75in .7in;
	mso-header-margin:.3in;
	mso-footer-margin:.3in;}
.style0
	{mso-number-format:General;
	text-align:general;
	vertical-align:middle;
	white-space:nowrap;
	mso-rotate:0;
	mso-background-source:auto;
	mso-pattern:auto;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体, sans-serif;
	mso-font-charset:134;
	border:none;
	mso-protection:locked visible;
	mso-style-name:普通;
	mso-style-id:0;}
td
	{mso-style-parent:style0;
	padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体, sans-serif;
	mso-font-charset:134;
	mso-number-format:General;
	text-align:general;
	vertical-align:middle;
	border:none;
	mso-background-source:auto;
	mso-pattern:auto;
	mso-protection:locked visible;
	white-space:nowrap;
	mso-rotate:0;}
.xl65
	{mso-style-parent:style0;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;}
.xl66
	{mso-style-parent:style0;
	font-weight:700;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	border:.5pt solid windowtext;
	background:#D9D9D9;
	mso-pattern:black none;}
.xl67
	{mso-style-parent:style0;
	font-weight:700;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;}
.xl68
	{mso-style-parent:style0;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	mso-number-format:"Short Date";
	border:.5pt solid windowtext;}
.xl69
	{mso-style-parent:style0;
	color:red;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	border:.5pt solid windowtext;}
.xl70
	{mso-style-parent:style0;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	border:.5pt solid windowtext;}
.xl71
	{mso-style-parent:style0;
	font-weight:700;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	text-align:center;
	border:.5pt solid windowtext;
	background:#9BC2E6;
	mso-pattern:black none;}
ruby
	{ruby-align:left;}
rt
	{color:windowtext;
	font-size:9.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:宋体, sans-serif;
	mso-font-charset:134;
	mso-char-type:none;
	display:none;}
</style>

<body link="#0563C1" vlink="#954F72" class=xl65>

<table border=0 cellpadding=0 cellspacing=0 width=762 style='border-collapse:collapse;table-layout:fixed;width:762pt'>
 <col class=xl65 width=73 style='mso-width-source:userset;mso-width-alt:3114;width:73pt'>
 <col class=xl65 width=73 style='mso-width-source:userset;mso-width-alt:3114;width:73pt'>
 <col class=xl65 width=97 style='mso-width-source:userset;mso-width-alt:4138;width:97pt'>
 <col class=xl65 width=94 style='mso-width-source:userset;mso-width-alt:4010;width:94pt'>
 <col class=xl65 width=74 style='mso-width-source:userset;mso-width-alt:3157;width:74pt'>
 <col class=xl65 width=74 style='mso-width-source:userset;mso-width-alt:3157;width:74pt'>
 <col class=xl65 width=137 style='mso-width-source:userset;mso-width-alt:5845;width:137pt'>
 <col class=xl65 width=117 style='mso-width-source:userset;mso-width-alt:4992;width:117pt'>
 <col class=xl65 width=99 style='mso-width-source:userset;mso-width-alt:4224;width:99pt'>
 <col class=xl65 width=99 style='mso-width-source:userset;mso-width-alt:4224;width:99pt'>
 <tr height=27 style='mso-height-source:userset;height:27.0pt'>
  <td colspan=8 height=27 class=xl71 width=762 style='height:27.0pt;width:762pt'>
          邦融汇<#if (direction?exists && direction='R')>收入<#else>支出</#if>对账汇总记录
  </td>
 </tr>
 <tr class=xl67 height=27 style='mso-height-source:userset;height:27.0pt'>
  <td height=27 class=xl66 style='height:27.0pt;border-top:none'>对账日期</td>
  <td class=xl66 style='border-top:none;border-left:none'>状态</td>
  <td class=xl66 style='border-top:none;border-left:none'>平台<#if (direction?exists && direction='R')>收入<#else>支出</#if>笔数</td>
  <td class=xl66 style='border-top:none;border-left:none'>未匹配笔数</td>
  <td class=xl66 style='border-top:none;border-left:none'>匹配笔数</td>
  <td class=xl66 style='border-top:none;border-left:none'>处理笔数</td>
  <td class=xl66 style='border-top:none;border-left:none'>平台<#if (direction?exists && direction='R')>收入<#else>支出</#if>发生额（元）</td>
  <td class=xl66 style='border-top:none;border-left:none'>未匹配金额（元）</td>
  <td class=xl66 style='border-top:none;border-left:none'>匹配金额（元）</td>
  <td class=xl66 style='border-top:none;border-left:none'>处理金额（元）</td>
 </tr>
<#if beacactcheck_querycheckbillrstall?exists>
	<#list beacactcheck_querycheckbillrstall as row>
		 <tr height=16 style='height:16.0pt'>
		      <td height=16 class=xl68 align=right style='height:16.0pt;border-top:none'>${row.actcheckdate}</td>
		 
			  <#if row.actcheckresult=='0'>
			      <td class=xl69 style='border-top:none;border-left:none'>差异</td>
			  <#else>
			      <td class=xl70 style='border-top:none;border-left:none'>正常</td>
			  </#if>
			  
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.sumnum}</td>
			  
			  <#if row.actcheckresult=='0'>
			      <td class=xl69 align=right style='border-top:none;border-left:none'>${row.notmatchnum}</td>
			  <#else>
			      <td class=xl70 align=right style='border-top:none;border-left:none'>${row.notmatchnum}</td>
			  </#if>
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.matchnum}</td>
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.handlenum}</td>
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.sumamt}</td>
			  
			  <#if row.actcheckresult=='0'>
			      <td class=xl69 align=right style='border-top:none;border-left:none'>${row.notmatchamt}</td>
			  <#else>
			      <td class=xl70 align=right style='border-top:none;border-left:none'>${row.notmatchnum}</td>
			  </#if>
			  
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.matchamt}</td>
			  <td class=xl70 align=right style='border-top:none;border-left:none'>${row.handleamt}</td>
	  
		</tr>
	</#list>
</#if>
</table>
</body>