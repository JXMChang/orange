//获取元素
let oLis = document.querySelectorAll(".body li");
let box = document.getElementsByClassName("body")[0];
let OImgs = box.getElementsByTagName("img");
let flag = false;//代表新数据渲染完成；什么时候flag是true，新的数据发送的请求
let n = 0;//记录加载数据的次数

//获取后台的数据
function getData(){
    flag = true;
    n++;
    let xhr = new XMLHttpRequest();
    xhr.open('get','./data.json',true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState ==4 &&/200|304/.test(xhr.status)){
            //请求数据成功
            //console.log(xhr.response)
            //用data来接收所发送过来的json数据
            let data = JSON.parse(xhr.response);
            render(data);//获取数据成功后，并对数据进行渲染
            flag = false;//代表新数据渲染完成之后的操作
            loadAll();
        }
    }
    xhr.send();
}
getData()

//渲染数据
  function render(ary){
      let str ="";
      ary.forEach((item,index) => {
          let {desc,pic,height,author} = item;

          str =`
          <img realSrc="${pic}" src="./img/1.jpg" alt="" style="height:${height}px">
          <p class="desc">${desc}</p>
          <p class="author">${author}</p>
          `
          let temp = getMinLi();//找出最小图片的高度
          let div = document.createElement("div")
          div.className = "img_box";//让div等于img_box
          div.innerHTML = str;
          temp.appendChild(div)//给li末尾新添加一个div
      });
  }

  //找最低的li
  function getMinLi(){
      //找出最短的那个li
      let ary = [...oLis].sort((a,b)=>{
          return a.clientHeight - b.clientHeight
      })
      return ary[0]
  }

  //滚动加载更多
  window.onscroll = function(){
      //if(n>=3)return;
      loadMore();
      loadAll();
  }

  function loadMore(){
      //最短的图片的那个li，露出底部的时候，给他加载新的数据；
      let li = getMinLi();
      if(utils.offset(li).t+li.clientHeight<= document.documentElement.scrollTop+utils.winH().h){
        if(!flag){
            console.log(666)
            getData();
        } 
      }
  }

  function loadImg(ele){
      if(ele.MyLoad)return;
      //图片加载
      if(utils.offset(ele).t+ele.clientHeight/2 <= document.document.scrollTop+utils.winH().h){
          //图片露出了一半；
        let realSrc = ele.getAttribute("realSrc");
        //ele.src = realsrc;
        let temp = new Image();
        temp.onload = function(){
            //图片已经从远程拿到了本地;
            ele.src = realSrc;
            ele.MyLoad = true;//加载过之后的图片就不需要再去加载了；
            fadeIn(ele);
        }
        temp = null;
      }
      function fadeIn(ele){
          ele.style.opacity = 0;
          let n = 0;
          ele.timer = setInterval(()=>{
              n+= 0.05;
              if(n>=1){
                  n=1;
                  clearInterval(ele.timer)
              }
              ele.style.opacity = n;
          },10)
      }
  }