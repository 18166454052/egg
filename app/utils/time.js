module.exports= {
    getDate(dayCount){
        if(null == dayCount){
            dayCount = 0;
        }
         var dd = new Date();
         dd.setDate(dd.getDate()+dayCount);//设置日期
         var y = dd.getFullYear();
         var m = dd.getMonth()+1;//获取当前月份的日期
         var d = dd.getDate();
         var h = dd.getHours();
         var M = dd.getMinutes();
         var s = dd.getSeconds();
         return y+"-"+m+"-"+d +' '+h+':'+M+':'+s;
    }
}
