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


    // 模糊背景
    root.renderImg = renderImg

    // 点赞
    root.clickLike = clickLike

}(window.Zepto, window.topic || (window.topic = {})))