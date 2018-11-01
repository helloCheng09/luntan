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

    // 模糊背景
    root.renderImg = renderImg
    // 渲染话题大图
    root.maxImgShow = maxImgShow
    // 渲染后台地址 上传图
    root.renderComImg = renderComImg
    root.showUpload = showUpload

}(window.Zepto, window.topic || (window.topic = {})))