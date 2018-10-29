(function ($, root) {
    function renderImg(src) {
        let $scope = $(document).find(".t-head")
        var img = new Image()
        img.src = src
        img.onload = function () {
            root.blurImg(img, $scope)
            $scope.find(".img-head").css("backgroundImage", "url(" + src + ")")
        }
    }

    function clickLike() {
        $(".com-like").on("click", function () {
            let islike = $(this).attr("like-status")
            if (islike == 0) {
                let num = Number($(this).next(".like-num").text()) + 1
                console.log(num)
                $(this).attr("like-status", "1")
                $(this).addClass("addlike")
                $(this).next(".like-num").text(num)
            }

        })
    }

    // 渲染话题大图
    function maxImgShow(src) {
        let srcImg = src
        let html = `
            <div class="main-img-max swiper-slide">
                 <img src="${srcImg}">
            </div>
            `
        $("#showConMax").append(html)
    }

    // 渲染 上传图
    function renderComImg(url) {
        let img_num = $("#imgInput").find(".img-input-item").length + 1
        console.log(img_num)
        let html =
            `
                <li class="img-input-item" img-id="${img_num}">
                    <em class="delet" style="background-image:url(/public/yz/jl_img/deletimg.png)"></em>
                    <div class="img-con" style="background-image:url(${url})"></div>
                    <div class="img-max-box">
                        <img class="show-max" src="${url}">
                    </div>
                </li>
            `
        $("#imgInput").append(html)
        // 删除
        deletImg()
        // 放大
        maxImg()
    }

    //  删除预览图片
    function deletImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).find(".delet").on("click", function () {
                ele.remove()
                console.log("删除图片")
            })
        })
    }

    // 最大话上传图片
    function maxImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).on("click", function () {
                ele.find(".img-max-box").css("display", "flex")
                closeScan()

            })
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

    // 模糊背景
    root.renderImg = renderImg

    // 点赞
    root.clickLike = clickLike

    // 渲染话题大图
    root.maxImgShow = maxImgShow

    // 渲染后台地址 上传图
    root.renderComImg = renderComImg
    // 上传图片删除 放大
    root.maxImg = maxImg
    root.deletImg = deletImg

}(window.Zepto, window.topic || (window.topic = {})))