var $ = window.Zepto
var $scope = $(window.document)
var root = window.topic

$scope.on("click", "#fabuSubmit", function () {
    layer.alert('发布失败，请完善接龙信息！', {
        skin: 'layui-layer-blue',
        closeBtn: 0
    });
})

var textaraeEle = document.getElementsByTagName("textarea")
root.autoTextarea(textaraeEle[0])