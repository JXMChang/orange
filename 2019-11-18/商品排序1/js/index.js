//获取data，a li 元素 
var data;
var list = document.getElementById("list");
var  navs = document.getElementsByTagName("a");
var oLis = document.getElementsByTagName("li");

//利用ajax数据
//首先创建一个ajax的实例
 var xhr = new XMLHttpRequest();
//打开ajax的一个路径
xhr.open("get","json/product.json",false);//false 是为了获取数据进行同步内容
//监听数据的状态
xhr.onreadystatechange = function(){
    console.log(xhr.readyState)
    if(xhr.readyState === 4){
        data = JSON.parse(xhr.responseText)
        //把数据转成字符串的格式用data来接收，并放到xhr.responseText的属性上
    }
}
//发送数据请求
xhr.send();
console.log(data)

//用数据来渲染页面
function fn(){
    var str ="";

    for(var i=0;i<data.length;i++){
        var cur = data[i];
        str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>${cur.time}</span>
            <span>${cur.hot}</span>
            <span>${cur.price}</span>
        `
    }
    list.innerHTML = str;
}
fn();

//给 a标签绑定onclick事件
for(var i=0;i<navs.length;i++){
    navs[i].index = i;
    navs[i].falg = -1;
    navs[i].onclick = function(){
        this.flag*= -1;
        sortList.call(this);
        addArrow.call(this);

        removeArrow.call(this);

    }
}
// 首先把this指向公共调用方法，然后在进行调用，然后建立一个新的属性
   function sortList(){
       var ary = utils.toArry(Olis)
       var that = this;
       var today = ["data-time","data-hot","data-price"]
       ary.sort(function(a,b){
           var cur = a.getAttribute(today[that.index])
           var next = b.getAttribute(today[that.index])
           if(that.index ===0){
               cur = cur.replace("-","").replace("-","")
               next = next.replace("-","").replace("-","")
           }
           return (cur-next)*that.flag;
       }) 

       //把排好的DoM数组放在list这个元素中
       var frg = document.createDocumentFragment();
       for(var i=0;i<ary.length;i++){
           frg.appendChild(ary[i]);
       }
       list.appendChild(frg)
   }

   //点击的高亮显示
   function addArrow(){
       var up = this.children[0];
       var down = this.children[1];

       //进行判断升降序问题
    if(this.flag>0){
        up.classList.add("bg")
        down.classList.add("bg")
    }else{
        down.classList.add("bg")
        up.classList.add("bg")
    }

    //清除所有的li的 class
    function removeArrow(){
        for(var i=0;i<navs.length;i++){
            if(this!= navs[i]){
            navs[i].children[0].classList.remove("bg");
            navs[i].children[1].classList.remove("bg");
            navs[i].flag = -1;
            }
        }
    }
   }