(function ($, root) {
    //  删除预览图片
    function deletImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).find(".delet").on("click", function () {
                ele.remove()
                console.log("删除图片")
                // 超过4张不显示
                root.showUpload()
            })
        })
    }

    // 最大话上传图片
    function maxImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).on("click", function () {
                ele.find(".img-max-box").css("display", "flex")
                root.closeScan($(".img-max-box"))
            })
        })
    }
    // 关闭最大化 
    function closeScan(ele) {
        ele.on("click", function () {
            $(".img-max-box").css("display", "none")
            console.log(12314)
            return false
        })
    }

    // 点赞评论
    function clickLike() {
        $(".com-item").each(function () {
            let comId = $(this).attr("data-id")
            // console.log("topicId:" + comId)
            $(this).find(".com-like").on("click", function () {
                let islike = $(this).attr("like-status")
                if (islike == 0) {
                    let num = Number($(this).next(".like-num").text()) + 1
                    console.log(num)
                    $(this).attr("like-status", "1")
                    $(this).addClass("addlike")
                    $(this).next(".like-num").text(num)
                    // 发送后台点赞请求
                    console.log("点赞")
                    let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                    let likeArr = {
                        "comid": comId,
                        "act": "1"
                    }
                    root.sentLike(url, likeArr)
                }
            })
        })
    }
    // 最大话评论图片
    function comMaxImg() {
        $(".comment-img-box").on("click", function () {
            $(this).find(".img-max-box").css("display", "flex")
            root.closeScan($(".img-max-box"))
        })
    }

    // 关闭最大化
    function closeScan() {
        $(".show-max").on("click", function () {
            $(".img-max-box").css("display", "none")
            console.log(12314)
            return false
        })
    }

    // 下面点赞话题
    function likeTopic() {
        $(".dianzan_topic").on("click", function () {
            let topicId = $(".topic-det").attr("topic-id")
            console.log(topicId)
            if ($("#likeTag").attr("like-status") == 0) {
                let html = `
                    <img src="https://ww4.sinaimg.cn/orj480/0062Mr4Vjw8epo890ks01j30f00f00tt.jpg" alt="" class="liked-avatar">
                `
                let likeNum = (Number($(".like-topic-sum").text()) + 1)
                $(".like-topic-sum").text(likeNum)
                $("#topicLike").css("display", "inline-block")
                // $("#likeTag").prepend(html)
                $("#likeTag").attr("like-status", "1")
                $(".like-btn-show").css("color", "#ccc")
                let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                let likeArr = {
                    "comid": topicId,
                    "act": "0"
                }
                root.sentLike(url, likeArr)
            }
        })
    }

    // 回复子评论

    let showZiForm = () => {
        $(".footer-btn").eq(0).on("click", function () {
            let auth = $(".right-container .nick").text()
            let text = "回复 " + auth + " 内容"

            $("#subForm_2").find("textarea").attr("placeholder", text)
            $("#subForm_2").show()
            root.closeZiForm()
        })
    }


    // 回复子评论

    let showComForm = () => {
        $(".coment_b").each(function () {
            let thisEle = $(this)
            thisEle.find(".comment-p .com-text").on("click", function () {
                let comId = thisEle.attr("data-id")
                console.log(comId)

                let auth = thisEle.find(".comment-p .nick").text()
                console.log(auth)
                let text = "回复 " + auth + " 内容"
                $("#subForm_1").find("textarea").attr("placeholder", text)
                $("#subForm_1").show()
                $("#reCommenId").val(comId)
                console.log($("#reCommenId").val())
                root.closeZiForm()
            })
        })
    }

    // 关闭子评论回复框
    let closeZiForm = () => {
        $(".blank-close").on("click", () => {
            $("#subForm_2").hide()
            $("#subForm_1").hide()
            console.log("关闭表单")
        })
    }

    // 子评论页面 点赞评论
    let likeComment = () => {
        $(".footer-btn").eq(1).on("click", function () {
            let topicId = $(".right-container").attr("topic-id")
            console.log(topicId)
            if ($("#likeTag").attr("like-status") == 0) {
                $("#likeTag").removeClass("nozan").addClass("addlike")
                let likeNum = (Number($(".like-num").text()) + 1)
                $(".like-num").text(likeNum)
                $("#topicLike").css("display", "inline-block")
                // $("#likeTag").prepend(html)
                $("#likeTag").attr("like-status", "1")
                $(".dianzan_topic .like-btn-show").css("color", "#ccc")
                let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                let likeArr = {
                    "comid": topicId,
                    "act": "1   "
                }
                root.sentLike(url, likeArr)
            }
        })
    }

    // 最大化topic图片
    let maxTopImg = () => {
        $(".topic-contain p img").on("click", function () {
            let index = $(this).index()
            let myMaxImg = new Swiper('#showPanel', {
                initialSlide: index,
            })
            $(".main-max-list").css("display", "block").on("click", function () {
                myMaxImg.destroy(false)
                $(this).css("display", "none")
            })
        })
    }

    // 最大化评论图片

    // let preListImg = () => {
    //     $(".comment-img-box").on("click", function () {
    //         let imgB = $(this)

    //         $("#showTopPanel").css("display", "flex")
    //         let myMaxTop = new Swiper('#showTopPanel', {
    //             initialSlide: index
    //         })
    //         root.closePreList()
    //     })
    // }
    let preListImg = () => {
        $(".comment-img-box").on("click", function () {
            let imgB = $(this)
            let url = (imgB.find(".show-img")).css("backgroundImage")
            let curUrl = toSrc(url)
            console.log(curUrl)
            let index
            let urls = []
            let imgP = imgB.parent(".img-list")
            imgP.find(".comment-img-box").each(function () {
                urls.push(toSrc($(this).find(".show-img").css("backgroundImage")))
            })
            // 动态出入所有图片
            $("#showTopPanel .swiper-wrapper").empty()
            $.each(urls, function (index2, item) {
                if (item == curUrl) {
                    index = index2
                }
                console.log(item)
                var html = `
                    <div class="swiper-slide">
                        <img class="topic-img-max" src="${item}">
                    </div>
                 `
                $("#showTopPanel .swiper-wrapper").append(html)
            })
            // console.log("第几张：" + index)
            $("#showTopPanel").css("display", "flex")
            let myMaxTop = new Swiper('#showTopPanel', {
                initialSlide: index
            })
            root.closePreList(myMaxTop)
        })
    }
    // 处理 url 为 src
    let toSrc = (url) => {
        return src = url.split('"')[1]
    }

    // 关闭最大图
    let closePreList = (myMaxTop) => {
        $(".swiper-slide").on("click", function () {
            myMaxTop.destroy(false)
            $("#showTopPanel").css("display", "none")
        })
        console.log('管')
    }

    // 话题详情最大化图片
    let maxComTop = () => {
        $(".comment-img-box").on("click", function () {
            let index = $(this).index()
            $(".main-max-list").css("display", "block")
            let myMaxImg = new Swiper('#showPanel', {
                initialSlide: index,
            })
            $(".main-max-list").on("click", function () {
                myMaxImg.destroy(false)
                $(this).css("display", "none")
            })
        })
    }

    // 删除评论
    let deletCom = () => {
        $(".com-list .com-item").each(function () {
            let ele = $(this)
            $(this).find(".delet-bt").on("click", function () {

                layer.confirm('是否要删除此评论？', {
                    btn: ['确定', '取消'] //可以无限个按钮
                        ,
                    yes: function (index, layero) {
                        //按钮【按钮一】的回调
                        let comId = ele.attr("data-id")
                        // 页面删除
                        ele.remove()
                        // 发送后台删除
                        let url = "http://www.mamawozaizhe.com/yz/mobile2/jielong/deleteReply"
                        root.sentAjaxDel(url, comId)
                        layero.hide()
                        $("#layui-layer-shade1").hide()
                    }
                });
            })
        })
    }


    root.deletCom = deletCom
    // root.doSubmit = doSubmit
    root.maxComTop = maxComTop
    root.closePreList = closePreList
    root.preListImg = preListImg
    root.maxTopImg = maxTopImg
    root.showComForm = showComForm
    root.likeComment = likeComment
    root.showZiForm = showZiForm
    root.closeZiForm = closeZiForm
    root.likeTopic = likeTopic
    root.comMaxImg = comMaxImg
    // 上传图片删除 放大
    root.maxImg = maxImg
    root.deletImg = deletImg
    root.closeScan = closeScan
    // 点赞
    root.clickLike = clickLike

}(window.Zepto, window.topic || (window.topic = {})))