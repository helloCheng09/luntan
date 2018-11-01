let $ = window.Zepto
let $scope = $(window.document)
let root = window.topic


/***************************************************************************** */
/**
 * 提交页面 入口
 */

if ($("#fqWrap").length) {

    $scope.on("click", "#fabuSubmit", function () {
        layer.alert('发布失败，请完善接龙信息！', {
            skin: 'layui-layer-blue',
            closeBtn: 0
        });
    })

    // 文本框自适应
    let textaraeEle = document.getElementsByTagName("textarea")
    root.autoTextarea(textaraeEle[0])

    // 选择班级、学生
    root.multiSelect($(".teacher-item"), "selected")
    root.selectAllBtn($("#selAll"), "btn_selected")
    root.singleSel($(".student-item"), "selected")
}

/***************************************************************************** */
/**
 * 接龙话题列表 入口
 */
if ($("#tListWra").length) {
    // let src = "../img/jielonglogo.png"
    let src = "/public/yz/jl_img/jielonglogo.png"
    root.renderImg(src)

    console.log(root)
}

/***************************************************************************** */
/**
 * 接龙话题详情 入口
 */

if ($("#tDetWrap").length) {
    //  评论和点赞 列表展示切换
    $(".top-tags .com-tag").on("click", function () {
        let flag = $(this).hasClass("checked")
        if (!flag) {
            $(".like-tag").removeClass("checked")
            $(".like-list").css("display", "none")
            $(this).addClass("checked")
            $(".com-list").css("display", "block")
            console.log("评论列表")
        }
    })
    $(".top-tags .like-tag").on("click", function () {
        let flag = $(this).hasClass("checked")
        if (!flag) {
            $(".com-tag").removeClass("checked")
            $(".like-list").css("display", "block")
            $(this).addClass("checked")
            $(".com-list").css("display", "none")
            console.log("点赞列表")
        }
    })

    // 判断是否点赞 话题
    let isTopicLike = $("#likeTag").attr("like-status")
    if(isTopicLike == 1){
        $("#topicLike").css("display","inline-block")
    }
    // 判断是否点赞 评论
    $(".com-like").each(function () {
        let islike = $(this).attr("like-status")
        console.log(islike)
        if (islike != 0) {
            $(this).removeClass("nozan")
            $(this).addClass("hadzan")
            // $(this).css("backgroundPosition","100% 100%")
        } else {
            $(this).addClass("nozan")
            $(this).removeClass("hadzan")
            // 点赞效果
            root.clickLike()
            // $(this).css("backgroundPosition","0% 100%")
        }
    })
    // 回复接龙主题
    $("#comThis").on("click", function () {
        $("#subForm_1").css("display", "flex")
        // let huiObj = "写回复 " +  $("#tDetWrap").find(".xz-text").text()
        let huiObj = "写回复 "
        $("#subForm_1").find("textarea").attr("placeholder", huiObj)
    })
    $("#subForm_1 .blank-close").on("click", function () {
        $("#subForm_1").css("display", "none")
    })

    // 回复评论
    $(".com-item").each(function () {
        let ele = $(this)
        $(this).find(".com-text").on("click", function () {
            console.log("回复评论")
            let huiObj = "回复 " + ele.find(".nick").text() + " 的接龙内容"
            $("#subForm_2").css("display", "flex")
            console.log(huiObj)
            $("#subForm_2").find("textarea").attr("placeholder", huiObj)
        })
    })
    $("#subForm_2 .blank-close").on("click", function () {
        $("#subForm_2").css("display", "none")
    })

    // 文本框自适应
    let textaraeEle = document.getElementsByTagName("textarea")
    root.autoTextarea(textaraeEle[0])

    // 实例化图片放大轮播
    root.getImgSrc()

    $(".topic-contain p img").on("click", function () {
        let index = $(this).index()
        $(".main-max-list").css("display", "block").on("click", function () {
            $(this).css("display", "none")
        })
        let myMaxImg = new Swiper('#showPanel', {
            initialSlide: index,
        })
    })

    // 上传图片
    $('#image').on('change', function (e) {
        var file = this.files[0]
        var formData = new FormData();
        formData.append('userfile', file);
        console.log(formData)
        root.pushImg(formData)
    });

    // 最大化评论图片
    root.comMaxImg()
    // 点赞话题
    root.likeTopic()



















}