/**
* dc对账模块常量定义
*/
var dc=dc||{};
dc.constant={
	persistence:{insert:constant.appPath+'js/dcPersistence/insert',update:constant.appPath+'js/dcPersistence/update',
		find:constant.appPath+'js/dcPersistence/find',exe:constant.appPath+'js/dcPersistence/execute'}
};

dc.fun={
	getVal:function(val){if(val == undefined || val == null)return "";return val;},//将undefined、null的值转化为""
	getRedColor:function(flag,val){//根据条件设置为红色字体
		if (flag) {
	        return '<span class="red">' + val + '</span>';  
	    }else{
	    	return val;
	    }
	}
}


