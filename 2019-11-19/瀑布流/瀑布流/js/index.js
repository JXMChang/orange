$(function (){
    //1.获取数据
    let page = 0;
    imgData = null;
    isRun = false;
    let queryData = () =>{
        page++;
        $.ajax({
            url:`json/page.json`,
            method:'get',
            async:false,
            dataType:'json',
            success: result =>{
             imgData = result;
            }
        });
    };
    queryData();
    //绑定数据
    let bindHTML = () => {
        let $boxList = $('.flowBox > li');
        for (let i = 0; i < imgData.length; i += 4) {
            $boxList.sort((a, b) => {
                return $(a).outerHeight() - $(b).outerHeight();
            }).each((index, curLi) => {
                let item = imgData[i + index];
                if (!item) return;
                let {
                    pic,
                    link,
                    title,
                    height
                } = item;
                $(`<a href="${link}">
                    <div><img src="${pic}" height="${height}px"></div>
                    <span>${title}</span>
                </a>`).appendTo($(curLi));
            });
        }
        isRun = false;
    };
    bindHTML();

    //3.当滚动到页面底部的时候，加载下一页的更多数据
    $(window).on('scroll', () => {
        let winH = $(window).outerHeight(),
            pageH = document.documentElement.scrollHeight || document.body.scrollHeight,
            scrollT = $(window).scrollTop();
        if ((scrollT + 100) >= (pageH - winH)) {
            if (isRun) return;
            isRun = true;
            if (page > 5) {
                alert('没有更多数据了');
                return;
            }
            queryData();
            bindHTML();
        }
    });
});
