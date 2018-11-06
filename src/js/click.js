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
            console.log("topicId:" + comId)
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


    // 关闭子评论回复框
    let closeZiForm = () => {
        $(".blank-close").on("click", () => {
            $("#subForm_2").hide()
        })
    }

    // 子评论页面 点赞评论
    let likeComment = () => {
        $(".footer-btn").eq(1).on("click", function () {
            let topicId = $(".right-container").attr("topic-id")
            console.log(topicId)
            if ($("#likeTag").attr("like-status") == 0) {
                // let html = `
                //     <img src="https://ww4.sinaimg.cn/orj480/0062Mr4Vjw8epo890ks01j30f00f00tt.jpg" alt="" class="liked-avatar">
                // `
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
                    "act": "0"
                }
                root.sentLike(url, likeArr)
            }
        })
    }

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