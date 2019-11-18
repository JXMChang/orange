var utils = {
    toArry : function (likeAry){
        var ary = [];
        try{
            ary = Arry.prototype.slice.call(likeAry);
        }catch(e){
            for(var i=0;i<likeAry.length;i++){
                ary[ary.length]= linkeAry[i];
            }
        };
        return ary;
        
    }
}