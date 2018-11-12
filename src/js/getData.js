(function ($, root) {

    root.getDivSrc = getDivSrc
    root.sentLike = sentLike
    // 获取话题内容图片地址
    root.getImgSrc = getImgSrc
    // 图片传后台
    root.pushImg = pushImg
    root.getNowFormatDate = getNowFormatDate

    // 获取所有百度编辑器编辑后的图片地址
    function getImgSrc() {
        $(".topic-contain  p img").each(function () {
            console.log($(this).attr("src"));
            let src = $(this).attr("src")
            // 生成放大器
            root.maxImgShow(src)
        });
    }

    function getDivSrc() {
        $(".img-conten  .show-img").each(function () {
            let url = $(this).css("backgroundImage")
            console.log(url)
            // // 生成放大器
            root.maxDivShow(url)
        });
    }

    // 图片传给后台 
    // 获取后台图片地址
    function pushImg(url, dataArr) {
        $.ajax({
            url: url,
            type: 'POST',
            data: dataArr,
            contentType: false,
            processData: false,
            dataType: 'JSON',
            success: getPicUrl,
        })
    }

    function getPicUrl(data) {
        // data = JSON.parse(data)
        console.log(data)
        let curDay = getNowFormatDate()
        console.log(curDay)
        var url = "/public/yz/upload/" + curDay + '/' + data["upload_data"]["file_name"]
        // var url =  data["upload_data"]["full_path"]
        console.log(url)
        root.renderComImg(url)
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        // var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = String(date.getFullYear()) + String(month) + String(strDate);
        return currentdate;
    }

    // 发送点赞事件给后台
    function sentLike(url, likeArr) {
        console.log(likeArr)
        console.log('请求地址：' + url)
        $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: likeArr,
            error: error,
            success: success
        })
    }

    function error(data, status) {
        console.log(data)
        console.log(status)
        alert("哎呀~网络出错了！")
    }

    function success(data, status) {
        console.log(data)
        console.log(status)
    }

    let sentAjaxDel = (url, comId) => {
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                reply_id: comId
            },
            beforeSend: function () {

            },
            success: function () {
                layer.msg('删除成功！');
            },
            error: function () {
                layer.msg('删除失败！');
            }

        })
    }


    root.sentAjaxDel = sentAjaxDel

}(window.Zepto, window.topic || (window.topic = {})))