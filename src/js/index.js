let $ = window.Zepto
let $scope = $(window.document)
let root = window.topic
root.url = {}
root.url.reSendUrl = 'https://www.easy-mock.com/mock/5b9c69299c53ef2876d29227/list/resend'
root.url.reSendUrl = 'http://www.mamawozaizhe.com/mobile2/jielong/re_send_msg'
/***************************************************************************** */
/**
 * 提交页面 入口
 */

if ($("#fqWrap").length) {

    // $scope.on("click", "#fabuSubmit", function () {
    //     layer.alert('发布失败，请完善接龙信息！', {
    //         skin: 'layui-layer-blue',
    //         closeBtn: 0
    //     });
    // })

    // 文本框自适应
    let textaraeEle = document.getElementsByTagName("textarea")
    root.autoTextarea(textaraeEle[0])

    // 选择班级、学生
    root.multiSelect($(".teacher-item"), "selected")
    root.selectAllBtn($("#selAll"), "btn_selected")
    root.singleSel($(".student-item"), "selected")

    console.log(555)
    // 提交表单
    var commitStatus = false
    $("#fabuSubmit").on("click", function () {
        if (!commitStatus) {
            $(".fabu-form").submit(function () {
                commitStatus = true
            })
        } else {
            // 方重复
            return false
        }
    })

    root.onceSubmit("#fabuSubmit", ".fabu-form")

} else if ($("#tListWra").length) {
    /**
     * 接龙话题列表 入口
     */
    // 删除话题
    root.deletArticle()
    // let src = "../img/jielonglogo.png"
    let src = "/public/yz/jl_img/jielonglogo1.png"
    root.renderImg(src)
    // 重新发送主题
    root.reSend()
    console.log(root)
} else if ($("#tDetWrap").length) {
    /**
     * 接龙话题详情 入口
     */
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
    if (isTopicLike == 1) {
        $("#topicLike").css("display", "inline-block")
        $(".like-btn-show").css("color", "#ccc")
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
        // 安卓手机，输入的时候，隐藏发送回复按钮
        let type = root.phoneType()
        // if (type !== "ios") {
        //     $("#subForm_1 .text-box").find("textarea").focus(function () {
        //         $("#submitBtn").hide()
        //     })
        // }
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
    // let textaraeEle = document.getElementsByTagName("textarea")
    // root.autoTextarea(textaraeEle[0])

    // 实例化图片放大轮播
    root.getImgSrc()
    root.maxTopImg()

    let urlSelf
    let file
    // 上传图片
    // $('#file').on('change', function (e) {

    //     let type = root.phoneType()
    //     if (type !== "ios") {
    //         var file = this.files[0]
    //         let formData = new FormData();
    //         // formData.append('userfile', file);
    //         formData.append('userfile', file);
    //         console.log("bushipingguo ")
    //         // 获取图片本地base64
    //         let reads = new FileReader();
    //         let f = document.getElementById('file').files[0];
    //         reads.readAsDataURL(f);
    //         reads.onload = function (e) {
    //             urlSelf = this.result
    //             root.urlSelf = urlSelf
    //             root.pushImg(formData)
    //         }
    //     } else {
    //         var file = this.files[0]
    //         console.log(file)
    //         let formData = new FormData();
    //         formData.append('userfile', file);
    //         root.roateImgIos(this, formData)
    //         // *******************************************
    //         // root.roateImgIos(this)
    //     }
    // })

    // 最大化评论图片
    root.preListImg()
    // root.comMaxImg()
    // root.preImage(".coment_b .comment-img-box", ".coment_b  .show-img" )
    // 点赞话题
    root.likeTopic()

    console.log("444")
    // 提交表单
    $("#submitBtn").on("touchstart", function () {
        $("form").submit(function () {
            $("#submitBtn").attr("type", "button")
        })
    })

    // var issubmit = false
    // function doSubmit() {
    //     if (issubmit == false) {
    //         issubmit = true;
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // 删除评论
    root.deletCom()


} else if (document.getElementById("comDetWrap")) {
    console.log("评论详情")
    // 实例化图片放大轮播
    // root.getDivSrc()
    // 初始化 当前用户对评论的点赞情况
    root.initComLike()
    root.showComForm()
    root.showZiForm()
    root.likeComment()
    // 最大化主评论图片
    root.maxComTop()
    // root.preImage(".comment-img-box", ".comment-img-box .show-img")
    // 删除评论
    root.deletCom()

}