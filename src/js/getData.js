(function ($, root) {
    // 获取所有百度编辑器编辑后的图片地址
    function getImgSrc() {
        $(".topic-contain img").each(function () {
            console.log($(this).attr("src"));
            let src = $(this).attr("src")
            // 生成放大器
            root.maxImgShow(src)
        });
    }

    // 图片传给后台 
    // 获取后台图片地址
    function pushImg(formData) {
        $.ajax({
            url: 'http://www.mamawozaizhe.com/yz/mobile2/jielong/do_upload',
            type: 'POST',
            data: formData,
            contentType:false,
            processData:false,
            dataType: 'JSON',
            success: getPicUrl,
        })
    }

    function getPicUrl(data) {
        data = JSON.parse(data)
        console.log(data)
        var url = "/public/yz/upload/" + data["upload_data"]["file_name"]
        console.log(url)
        root.renderComImg(url)
    }


    // 获取话题内容图片地址
    root.getImgSrc = getImgSrc

    // 图片传后台
    root.pushImg = pushImg
}(window.Zepto, window.topic || (window.topic = {})))