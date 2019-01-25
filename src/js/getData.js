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
    let sendTopic = (obj) => {
        var url = obj.url
        var data = obj.data
        var type = obj.type
        console.log(obj)
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            error: error,
            success: function (res) {
                success(res, type)
            }
        })
    }
    root.sendTopic = sendTopic

    function success(res, type) {
        // console.log(res)
        if (type === 'reSend') {
            console.log(res)
            if (res.data.code === 1) {
                // 请求成功
                // 无报错
                layer.msg(res.data.msg);
            } else {
                // 请求成功
                // 报错
                layer.confirm('发送失败~' + res.data.msg, {
                    btn: ['确定'],
                    cancel: function () {
                        return false;
                    }
                });
            }
        }
    }

    let sentAjaxDel = (url, comId, ele) => {
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
                var curNum = Number($("#comTag").text().split('：')[1]) - 1
                console.log(curNum)
                var num = '评论：' + curNum
                $("#comTag").text(num)
                // 页面删除
                ele.remove()
            },
            error: function () {
                layer.msg('删除失败！');
            }

        })
    }

    // 删除话题 发送后台
    let sendDelet = (id, ele) => {
        let url = "http://www.mamawozaizhe.com/mobile2/jielong/deleteAjax"
        console.log(url)
        console.log(id)
        $.ajax({
            url: url, 
            data: {
                "tid": id
            },
            dataType: 'json',
            type: "POST",  
            success: function (data) {
                console.log(data)
                if (data.msg == 'success') {
                    ele.remove()

                    // 话题总数减少1
                    var topicSum = Number($('.r-comment-sum').eq(0).text().split("：")[1]) - 1
                    $('.r-comment-sum').eq(0).text('主题总数：' + topicSum)
                    // 回复总数减少x
                    var reNum =  Number($('.r-comment-sum').eq(1).text().split("：")[1]) - Number(ele.find('.com-num .com-text').text())
                    $('.r-comment-sum').eq(1).text('回复总数：' + reNum)

                    layer.msg('删除成功！');
                } else {
                    layer.msg('删除失败！');
                }

            },
            error: function () {
                layer.msg('删除失败！');

            }
        })
    }

    root.sendDelet = sendDelet
    root.sentAjaxDel = sentAjaxDel

}(window.Zepto, window.topic || (window.topic = {})))