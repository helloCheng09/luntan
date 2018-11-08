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
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
            return "Android"
            // window.location.href = "mobile/index.html";
        } else if (u.indexOf('iPhone') > -1) { //苹果手机
            // window.location.href = "mobile/index.html";
            return "ios"
        } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
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

    // 解决IOS图片上传旋转
    let roateImgIos = (fileObj, formData) => {
        var file = fileObj.files['0'];
        //图片方向角 added by lzk
        var Orientation = null;

        if (file) {
            console.log("正在上传,请稍后...");
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
            if (!rFilter.test(file.type)) {
                //showMyTips("请选择jpeg、png格式的图片", false);
                return;
            }
            // var URL = URL || webkitURL;
            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function () {
                // alert(EXIF.pretty(this));
                EXIF.getAllTags(this);
                //alert(EXIF.getTag(this, 'Orientation')); 
                Orientation = EXIF.getTag(this, 'Orientation');
                //return;
            });

            var oReader = new FileReader();
            oReader.onload = function (e) {
                //var blob = URL.createObjectURL(file);
                //_compress(blob, file, basePath);
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    var expectWidth = this.naturalWidth;
                    var expectHeight = this.naturalHeight;

                    if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                        expectWidth = 800;
                        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                    } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                        expectHeight = 1200;
                        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                    }
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;
                    ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                    var base64 = null;
                    //修复ios
                    if (navigator.userAgent.match(/iphone/i)) {
                        console.log('iphone');
                        //alert(expectWidth + ',' + expectHeight);
                        //如果方向角不为1，都需要进行旋转 added by lzk
                        if (Orientation != "" && Orientation != 1) {
                            switch (Orientation) {
                                case 6: //需要顺时针（向左）90度旋转
                                    alert('需要顺时针（向左）90度旋转');
                                    // $(".img-con").css("transform","rotateZ(90deg)")

                                    rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //需要逆时针（向右）90度旋转
                                    alert('需要顺时针（向右）90度旋转');
                                    rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //需要180度旋转
                                    alert('需要180度旋转');
                                    rotateImg(this, 'right', canvas); //转两次
                                    rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }

                        /*var mpImg = new MegaPixImage(image);
                        mpImg.render(canvas, {
                            maxWidth: 800,
                            maxHeight: 1200,
                            quality: 0.8,
                            orientation: 8
                        });*/
                        base64 = canvas.toDataURL("image/jpeg", 0.8);
                    } else if (navigator.userAgent.match(/Android/i)) { // 修复android
                        var encoder = new JPEGEncoder();
                        base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    } else {
                        //alert(Orientation);
                        if (Orientation != "" && Orientation != 1) {
                            //alert('旋转处理');
                            switch (Orientation) {
                                case 6: //需要顺时针（向左）90度旋转
                                    alert('需要顺时针（向左）90度旋转');
                                    rotateImg(this, 'left', canvas);
                                    break;
                                case 8: //需要逆时针（向右）90度旋转
                                    alert('需要顺时针（向右）90度旋转');
                                    rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //需要180度旋转
                                    alert('需要180度旋转');
                                    rotateImg(this, 'right', canvas); //转两次
                                    rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }

                        base64 = canvas.toDataURL("image/jpeg", 0.8);
                    }
                    //uploadImage(base64);
                    $("#myImage").attr("src", base64);

                    // let urlSelf = base64
                    // root.urlSelf = urlSelf
                    // // let url = "http://www.mamawozaizhe.com/yz/mobile2/jielong/base64_upload"
                    // // root.pushImg(url, urlSelf)

                    // // ************************************************************************************
                    // var formData = new FormData();
                    // console.log(convertBase64Url(base64))
                    // formData.append('userfile', convertBase64Url(base64));
                    // console.log(formData)
                    // // let  url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/do_upload'
                    // // root.pushImg(url, formData)
                    // let url = "http://www.mamawozaizhe.com/yz/mobile2/jielong/base64_upload"
                    // root.pushImg(url, formData)
                    // ***********************************************
                    let  url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/do_upload'
                    root.pushImg(url, formData)
                };
            };
            oReader.readAsDataURL(file);
        }
    }


    //此函数是为了转化base64的值，用于传给后台
    function convertBase64Url(urlData) {

        var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte

        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: 'image/jpeg'
        });
    }




    //对图片旋转处理 added by lzk
    function rotateImg(img, direction, canvas) {
        //alert(img);
        //最小与最大旋转方向，图片旋转4次后回到原方向  
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);  
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');  
        var step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值  
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        //img.setAttribute('step', step);  
        /*var canvas = document.getElementById('pic_' + pid);  
        if (canvas == null) {  
            img.style.display = 'none';  
            canvas = document.createElement('canvas');  
            canvas.setAttribute('id', 'pic_' + pid);  
            img.parentNode.appendChild(canvas);  
        }  */
        //旋转角度以弧度值为参数  
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
    }


    root.roateImgIos = roateImgIos
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