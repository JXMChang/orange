~ function () {
    let _Data = null;
    //第一步 数据获取
    let xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            _Data = xhr.responseText;
        }
    }
    xhr.send();
    _Data = JSON.parse(_Data);

    //第二步 数据绑定 
    let htmlStr = ``;
    _Data.forEach(item => {
        let {
            id,
            title,
            price,
            time,
            hot,
            img
        } = item;
        htmlStr += `<div class="card" data-price="${price}" data-time="${time}" data-hot="${hot}">
                        <img class="card-img-top" src="${img}" alt="">
                        <div class="card-body">
                            <h6 class="card-title">${title}</h6>
                            <p class="card-text">价格：￥${price}</p>
                            <p class="card-text">好评：${hot}</p>
                            <p class="card-text"><small class="text-muted">上架时间：${time}</small></p>
                        </div>
                    </div>`;
    });
    let cardDeck = document.querySelector('.card-deck');
    cardDeck.innerHTML = htmlStr;

    //第三步 点击实现升降序
    let navList = document.querySelectorAll('.navbar-nav li'),
        cardList = document.querySelectorAll('.card');


    for (let i = 0; i < navList.length; i++) {
        let item = navList[i];
        item['data-sort'] = -1;
        item.onclick = function () {
            //点击当前的item，就需要把另外的navItem的data-sort重置
            [].forEach.call(navList, item => (item === this ? this['data-sort'] *= -1 : item['data-sort'] *= -1));

            cardList = [].slice.call(cardList); //类数组转为数组调用数组方法
            cardList.sort((next, cur) => {
                let type = this.getAttribute('data-type');  //得到当前是排序的类型
                next = next.getAttribute(type), //得到比较的值
                cur = cur.getAttribute(type);

                if (type == 'data-time') {
                    next = next.replace(/-/g, '');
                    cur = cur.replace(/-/g, '');
                }
                return (next - cur) * this['data-sort'];
            });

            //将排好序的card 插入页面
            cardList.forEach(item => cardDeck.appendChild(item));
        }
    }
}();