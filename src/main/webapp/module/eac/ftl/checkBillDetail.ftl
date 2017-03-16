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
	mso-number-format:"\@";
	border:.5pt solid windowtext;}
.xl69
	{mso-style-parent:style0;
	color:windowtext;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	mso-number-format:"\@";
	border:.5pt solid windowtext;}
.xl70
	{mso-style-parent:style0;
	color:red;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	mso-number-format:"\@";
	border:.5pt solid windowtext;}
.xl71
	{mso-style-parent:style0;
	font-weight:700;
	font-family:微软雅黑, sans-serif;
	mso-font-charset:134;
	text-align:left;
	border:.5pt solid windowtext;
	background:#D9D9D9;
	mso-pattern:black none;}
.xl72
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

<table border=0 cellpadding=0 cellspacing=0 width=1250 style='border-collapse:collapse;table-layout:fixed;width:1250pt'>
 <col class=xl65 width=71 style='mso-width-source:userset;mso-width-alt:3029;width:71pt'>
 <col class=xl65 width=134 style='mso-width-source:userset;mso-width-alt:5717;width:134pt'>
 <col class=xl65 width=97 style='mso-width-source:userset;mso-width-alt:4138;width:97pt'>
 <col class=xl65 width=145 style='mso-width-source:userset;mso-width-alt:5860;width:145pt'>
 <col class=xl65 width=135 style='mso-width-source:userset;mso-width-alt:5760;width:135pt'>
 <col class=xl65 width=141 style='mso-width-source:userset;mso-width-alt:6016;width:141pt'>
 <col class=xl65 width=125 style='mso-width-source:userset;mso-width-alt:5100;width:125pt'>
 <col class=xl65 width=90 style='mso-width-source:userset;mso-width-alt:4224;width:90pt'>
 <col class=xl65 width=135 style='mso-width-source:userset;mso-width-alt:5760;width:135pt'>
 <tr height=27 style='mso-height-source:userset;height:27.0pt'>
  <td colspan=9 height=27 class=xl72 width=1250 style='height:27.0pt;width:1250pt'>
              邦融汇<#if (direction?exists && direction='R')>收入<#else>支出</#if>对账明细记录
  </td>
 </tr>
 <tr class=xl67 height=27 style='mso-height-source:userset;height:27.0pt'>
  <td height=27 class=xl66 style='height:27.0pt;border-top:none'>状态</td>
  <td class=xl66 style='border-top:none;border-left:none'>订单号</td>
  <td class=xl66 style='border-top:none;border-left:none'>交易金额（元）</td>
  <td class=xl66 style='border-top:none;border-left:none'>交易类型</td>
  <td class=xl66 style='border-top:none;border-left:none'>交易时间</td>
  <td class=xl66 style='border-top:none;border-left:none'>邦付宝订单号</td>
  <td class=xl66 style='border-top:none;border-left:none'>邦付宝交易金额（元）</td>
  <td class=xl66 style='border-top:none;border-left:none'>邦付宝交易类型</td>
  <td class=xl66 style='border-top:none;border-left:none'>邦付宝交易时间</td>
 </tr>
 
 <#if beacactcheck_querycheckbilldetailrstall?exists>
  <#list beacactcheck_querycheckbilldetailrstall as row>
	 <tr height=16 style='height:16.0pt'>
	  <#if row.actcheckstatus=='2'>
	      <td height=16 class=xl70 style='height:16.0pt;border-top:none'>对账失败</td>
	  <#elseif row.actcheckstatus=='1' && row.status == '4'>
	      <td height=16 class=xl68 style='height:16.0pt;border-top:none'>差异处理成功</td>
	  <#else>
	      <td height=16 class=xl68 style='height:16.0pt;border-top:none'>对账成功</td>
	  </#if>
	  
	  <td class=xl69 style='border-top:none;border-left:none'>${row.orderno}</td>
	  
	  <td class=xl68 style='border-top:none;border-left:none'>
		  <#assign transamt=_stringx.null2emptystr(row.transamt)>
		  <#if transamt!=''><#if direction=='R'>+<#else>-</#if>${transamt}</#if>
	  </td>
	  
	  <td class=xl69 style='border-top:none;border-left:none'>${_ms.getMessage('DICT/brh_transtype/'+row.transtype,'')}</td>
	  <td class=xl68 style='border-top:none;border-left:none'>${row.transdate} ${row.transtime}</td>
	  <td class=xl68 style='border-top:none;border-left:none'>${row.bfborderno}</td>
	  
	  <td class=xl69 style='border-top:none;border-left:none'>
	      <#assign bfbtransamt=_stringx.null2emptystr(row.bfbtransamt)>
		  <#if bfbtransamt == ''>
		  <#elseif direction=='R'>+
		  <#elseif direction=='P' && row.bfbtranstype == '01J'>+
		  <#else>-
		  </#if>
		  ${row.bfbtransamt}
	  </td>
	  
	  <td class=xl68 style='border-top:none;border-left:none'>
	    <#if row.bfbtranstype == '02S'>充值
	    <#elseif row.bfbtranstype == '01S'>提现
	    <#elseif row.bfbtranstype == '01J'>退票
	    <#elseif row.bfbtranstype == '1'>网银充值
	    </#if>
	  </td>
	  
	  <td class=xl68 style='border-top:none;border-left:none'>${row.bfbtransdate} ${row.bfbtranstime}</td>
	 </tr>
  </#list>
</#if>

 <tr height=19 style='mso-height-source:userset;height:19.5pt'>
  <td height=19 class=xl66 style='height:19.5pt;border-top:none'>汇总</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
  <td class=xl71 style='border-top:none;border-left:none'>${beacactcheck_statcheckbilltransamt.transamt}</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
  <td class=xl71 style='border-top:none;border-left:none'>${beacactcheck_statcheckbilltransamt.bfbtransamt}</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
  <td class=xl66 style='border-top:none;border-left:none'>　</td>
 </tr>
</table>

</body>
