/**
* eac对账模块常量定义
* version:1.0
* date:2016-08-30
* author:chenjs
* modify:
*/
var eac=eac||{};
eac.constant={
	persistence:{insert:constant.appPath+'js/eacPersistence/insert',update:constant.appPath+'js/eacPersistence/update',
		find:constant.appPath+'js/eacPersistence/find',exe:constant.appPath+'js/eacPersistence/execute'}
};

Ext.apply(constant.jsfun,{
	'eac.voucher.AddForm':'eac/js/voucher/AddForm.js',
	'eac.voucher.SummaryDetail':'eac/js/voucher/SummaryDetail.js',
	'eac.voucher.TransationDetail':'eac/js/voucher/TransationDetail.js',
	'eac.actcheck.ViewDetail':'eac/js/actcheck/ViewDetail.js',
	'eac.actcheck.DifferenceDisposal':'eac/js/actcheck/DifferenceDisposal.js',
	'eac.actcheck.ToDisposal':'eac/js/actcheck/ToDisposal.js',
	'eac.actcheck.QueryUserList':'eac/js/actcheck/QueryUserList.js',
	'eac.check.ActCheckDetail':'eac/js/check/ActCheckDetail.js',
	'eac.manvoucher.AddManVoucher':'eac/js/manvoucher/AddVoucherDetail.js',
	'eac.manvoucher.SummaryDetail':'eac/js/manvoucher/SummaryDetail.js'
    
});

Ext.applyIf(DICT.data,{
	eac_actCheckResult:[['0','差异'],['1','正常']],
	eac_actcheckstatus:[['0','未对账'],['1','对账成功'],['2','对账失败'],['3','差异处理成功']],
	eac_bfbtranstype:[['02S','充值'],['01S','提现'],['01J','退票'],['1','网银充值']],
	eac_dataOrigin:[['1','邦融汇'],['2','邦付宝']],
	eac_brhUserType:[['01','个人'],['02','企业']],
	eac_checkStatus:[['0','待审批'],['1','审批通过'],['2','驳回']],
	eac_direction:[['P','支出'],['R','收入']],
	eac_handleStyle:[['1','免审核'],['2','审核']],
	eac_handleStatus:[['0','未处理'],['1','已处理']],
	eac_serviceType:[['01','差异处理'],['02','人工调账']],
	eac_voucherStatus:[['0','未上传'],['1','已上传'],['2','oracle已接收'],['3','无效']]
	
});

eac.fun={
	getVal:function(val){if(val == undefined || val == null)return "";return val;},//将undefined、null的值转化为""
	getRedColor:function(flag,val){//根据条件设置为红色字体
		if (flag) {
	        return '<span class="red">' + val + '</span>';  
	    }else{
	    	return val;
	    }
	}
}


