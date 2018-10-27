let $ = window.Zepto
let $scope = $(window.document)
let root = window.topic

$scope.on("click", "#fabuSubmit", function () {
    layer.alert('发布失败，请完善接龙信息！', {
        skin: 'layui-layer-blue',
        closeBtn: 0
    });
})
// 文本框自适应
if (document.getElementsByTagName("textarea").length) {
    let textaraeEle = document.getElementsByTagName("textarea")
    root.autoTextarea(textaraeEle[0])
}

if ($(".teacher-item").length) {
    // 选择班级、学生
    root.multiSelect($(".teacher-item"), "selected")
    root.selectAllBtn($("#selAll"), "btn_selected")
    root.singleSel($(".student-item"), "selected")
}

if ($("#tListWra").length) {
    let src = "../img/jielonglogo.png"
    // let src="/public/yz/jl_img/jielonglogo.png"
    root.renderImg(src)

    console.log(root)
}