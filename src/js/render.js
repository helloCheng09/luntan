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

    // 渲染话题大图
    function maxDivShow(url) {
        let urlImg = "background-image:" + url
        console.log(urlImg)
        let html = `
            <div class="main-img-max swiper-slide">
                <div class="show-img" style=${urlImg}></div>
            </div>
            `
        $("#showConMax").append(html)
    }

    // 渲染 上传图
    // function renderComImg(url) {
    //     let img_num = $("#imgInput").find(".img-input-item").length + 1
    //     console.log(img_num)
    //     let html =
    //         `
    //             <li class="img-input-item" img-id="${img_num}">
    //                 <em class="delet" style="background-image:url(/public/yz/jl_img/deletimg.png)"></em>
    //                 <div class="img-con" style="background-image:url(${url})"></div>
    //                 <div class="img-max-box">
    //                     <img class="show-max" src="${url}">
    //                 </div>
    //             </li>
    //         `
    //     $("#imgInput").append(html)
    //     // 删除
    //     root.deletImg()
    //     // 放大
    //     root.maxImg()
    //     // 判断图片数量
    //     root.showUpload()
    // }
    function renderComImg(url) {
        let urlSelf = root.urlSelf
        console.log(root)
        let img_num = $("#imgInput").find(".img-input-item").length + 1
        console.log(img_num)
        let html =
            `
                <li class="img-input-item" img-id="${img_num}">
                    <em class="delet" style="background-image:url(/public/yz/jl_img/deletimg.png)"></em>
                    <div class="img-con" style="background-image:url(${urlSelf})"></div>
                    <input name="imgUpload[]" style=" display:none;" value= "${url}">
                    <div class="img-max-box">
                        <img class="show-max" src="${url}">
                    </div>
                </li>
            `
        $("#imgInput").append(html)
        // 删除
        root.deletImg()
        // 放大
        root.maxImg()
        // 判断图片数量
        root.showUpload()
    }

    // 查看上传图片数量，如果超过四张
    function showUpload() {
        let len = Number($("#imgInput").find(".img-input-item").length)
        console.log(len)
        if (len > 3) {
            $(".add-input-img").css("display", "none")
            console.log("还不关？？")
        } else {
            $(".add-input-img").css("display", "block")
        }
    }


    // 判断手机类型
    let phoneType = () => {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > - 1 || u.indexOf('Linux') > - 1) { //安卓手机
            return "Android"
            // window.location.href = "mobile/index.html";
        } else if (u.indexOf('iPhone') > - 1) { //苹果手机
            // window.location.href = "mobile/index.html";
            return "ios"
        } else if (u.indexOf('Windows Phone') > - 1) { //winphone手机
            return "windows"
            // window.location.href = "mobile/index.html";
        }
    }

    // 初始化 当前用户对评论的点赞情况
    let initComLike = () => {
        let likeStatus = $("#likeTag").attr("like-status")
        if (likeStatus === "1") {
            $(".r-t-right .com-like").addClass("hadzan")
            $(".dianzan_topic").css("color", "#ccc")
        }
    }

    root.initComLike = initComLike
    root.phoneType = phoneType
    root.maxDivShow = maxDivShow
    // 模糊背景
    root.renderImg = renderImg
    // 渲染话题大图
    root.maxImgShow = maxImgShow
    // 渲染后台地址 上传图
    root.renderComImg = renderComImg
    root.showUpload = showUpload

}(window.Zepto, window.topic || (window.topic = {})))