(function ($, root) {
  wx.config({
    debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
  });

  let choose = $("#chooseImage")
  /*定义images用来保存选择的本地图片ID 和上传的服务器图片ID*/
  var images = {
    localId: [],
    serverId: [],
  }
  wx.ready(function () {
    // var total = 4; /*限制上传的数量*/
    // var sum = 0; /*每次上传的数量*/
    var upsum = 0; /*已上传的总数*/
    // alert("启动choose")
    choose.on("click", () => {
      // 获取当天页面有多少张图被上传
      var sum = $(".img-input-item").length
      var count = 4 - sum
      wx.chooseImage({
        count: count,
        /*默认为9*/
        success: function (res) {
          images.localId = res.localIds; /*保存到images*/
          sum = images.localId.length;
          /*相应位置预览*/
          var count = res.localIds.length + upsum;
          let j
          for ( j = upsum; j < count; j++) {
            insertImg(res.localIds[j - upsum])
          }

          root.deletImg()
          root.showUpload()

          upsum = upsum + sum;
          /*上传图片到微信服务器*/
          var i = 0;
          let len = images.localId.length;
          wxupload();

          function wxupload() {
            wx.uploadImage({
              localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 4, // 默认为1，显示进度提示
              success: function (res) {
                i++;
                //将上传成功后的serverId保存到serverid 
                // alert('已上传：' + i + '/' + len);
                images.serverId.push(res.serverId);
                insertValue(res.serverId);
                if (i < len) {
                  wxupload();
                }
                setImg()
              },
              fail: function (res) {
                alert(JSON.stringify(res));
              }
            });
          }
          /*上传图片*/
        }
      });
    })
  });

  /*验证失败时执行的函数*/
  wx.error(function (res) {
    alert(res.errMsg);
  });

  function insertValue(value) {
    $('#imgInput').prepend("<input type='hidden' name='img_value[]' value='" + value + "' >");
  }
  //  插入小图
  let insertImg = (img_src) => {
    var html = `
        <li class="img-input-item" style="opcity:0;" img-id="">
          <em class="delet" style="background-image:url(/public/yz/jl_img/deletimg.png)"></em>
          <div class="mini-b">
            <img class="img-mini" src="${img_src}" id="portrait1_src"> 
          </div>
        </li>
     `
    $('#imgInput').prepend(html);
    $(".img-mini").unbind()
    // preImage()
    preImage(".img-input-item", ".img-input-item .img-mini")
  }

  /* 判断图片比例 *
   *正方形显示
   *长的with 100%
   *宽的 height 100%
   *判断溢出 移动1/8溢出 图片居中位置显示
   */

  let setImg = () => {
    let realWidth; //真实的宽度
    let realHeight; //真实的高度
    $(".img-input-item").each(function () {
      let imgEle = $(this).find(".img-mini")
      let src = imgEle.attr('src')
      realWidth = imgEle.width();
      realHeight = imgEle.height();
      if (realWidth >= realHeight) {
        imgEle.css("height", "100%").css("width", "auto");
      } else {
        imgEle.css("width", "100%").css("height", "auto");
      }
    })
  }

  // 预览大图
  // 5.2 图片预览
  /**
   * @param {".img-input-item"} imgBox 
   * @param {".img-input-item .img-mini"} imgEle 
   */
  let preImage = (imgBox, img) => {
    $(img).on("click", function () {
      let urls = []
      let curUrl
      // 如果展示是img标签
      if ($(img).attr("src")) {
        curUrl = $(this).attr("src")
        // 获取所有预览图片地址
        $(imgBox).each(function () {
          let imgEle = $(this).find(img)
          urls.push(imgEle.attr("src"))
        })
      } else if ($(img).css("backgroundImage")) {
        // 如果是背景展示
        let url = $(img).css("backgroundImage")
        curUrl = toSrc(url)
        $(imgBox).each(function () {
          let imgEle = $(this).find(img)
          let itemSrc = toSrc(imgEle.css("backgroundImage"))
          urls.push(itemSrc)
        })
      } else {
        alert("无法浏览大图！")
      }
      wx.previewImage({
        current: curUrl,
        urls: urls
      })
    })
  }

  // let preListImg = () => {
  //   $(".comment-img-box").on("click", function () {
  //     let imgB = $(this)
  //     let url = (imgB.find(".show-img")).css("backgroundImage")
  //     let curUrl = toSrc(url)
  //     console.log(curUrl)
  //     let urls = []
  //     let imgP = imgB.parent(".img-list")
  //     imgP.find(".comment-img-box").each(function () {
  //       urls.push(toSrc($(this).find(".show-img").css("backgroundImage")))
  //       console.log(urls)
  //     })
  //     wx.previewImage({
  //       current: curUrl,
  //       urls: urls
  //     })
  //   })
  // }

  // // 处理 url 为 src
  // let toSrc = (url) => {
  //   return src = url.split('"')[1]
  // }

  // root.preListImg = preListImg
  root.preImage = preImage
}(window.Zepto, window.topic || (window.topic = {})))
(function ($, root) {
    //  删除预览图片
    function deletImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).find(".delet").on("click", function () {
                ele.remove()
                console.log("删除图片")
                // 超过4张不显示
                root.showUpload()
            })
        })
    }

    // 最大话上传图片
    function maxImg() {
        $(".img-input-item").each(function () {
            let ele = $(this)
            $(this).on("click", function () {
                ele.find(".img-max-box").css("display", "flex")
                root.closeScan($(".img-max-box"))
            })
        })
    }
    // 关闭最大化 
    function closeScan(ele) {
        ele.on("click", function () {
            $(".img-max-box").css("display", "none")
            console.log(12314)
            return false
        })
    }

    // 点赞评论
    function clickLike() {
        $(".com-item").each(function () {
            let comId = $(this).attr("data-id")
            // console.log("topicId:" + comId)
            $(this).find(".com-like").on("click", function () {
                let islike = $(this).attr("like-status")
                if (islike == 0) {
                    let num = Number($(this).next(".like-num").text()) + 1
                    console.log(num)
                    $(this).attr("like-status", "1")
                    $(this).addClass("addlike")
                    $(this).next(".like-num").text(num)
                    // 发送后台点赞请求
                    console.log("点赞")
                    let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                    let likeArr = {
                        "comid": comId,
                        "act": "1"
                    }
                    root.sentLike(url, likeArr)
                }
            })
        })
    }
    // 最大话评论图片
    function comMaxImg() {
        $(".comment-img-box").on("click", function () {
            $(this).find(".img-max-box").css("display", "flex")
            root.closeScan($(".img-max-box"))
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

    // 下面点赞话题
    function likeTopic() {
        $(".dianzan_topic").on("click", function () {
            let topicId = $(".topic-det").attr("topic-id")
            console.log(topicId)
            if ($("#likeTag").attr("like-status") == 0) {
                let html = `
                    <img src="https://ww4.sinaimg.cn/orj480/0062Mr4Vjw8epo890ks01j30f00f00tt.jpg" alt="" class="liked-avatar">
                `
                let likeNum = (Number($(".like-topic-sum").text()) + 1)
                $(".like-topic-sum").text(likeNum)
                $("#topicLike").css("display", "inline-block")
                // $("#likeTag").prepend(html)
                $("#likeTag").attr("like-status", "1")
                $(".like-btn-show").css("color", "#ccc")
                let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                let likeArr = {
                    "comid": topicId,
                    "act": "0"
                }
                root.sentLike(url, likeArr)
            }
        })
    }

    // 回复子评论

    let showZiForm = () => {
        $(".footer-btn").eq(0).on("click", function () {
            let auth = $(".right-container .nick").text()
            let text = "回复 " + auth + " 内容"

            $("#subForm_2").find("textarea").attr("placeholder", text)
            $("#subForm_2").show()
            root.closeZiForm()
        })
    }


    // 回复子评论

    let showComForm = () => {
        $(".coment_b").each(function () {
            let thisEle = $(this)
            thisEle.find(".comment-p .com-text").on("click", function () {
                let comId = thisEle.attr("data-id")
                console.log(comId)

                let auth = thisEle.find(".comment-p .nick").text()
                console.log(auth)
                let text = "回复 " + auth + " 内容"
                $("#subForm_1").find("textarea").attr("placeholder", text)
                $("#subForm_1").show()
                $("#reCommenId").val(comId)
                console.log($("#reCommenId").val())
                root.closeZiForm()
            })
        })
    }

    // 关闭子评论回复框
    let closeZiForm = () => {
        $(".blank-close").on("click", () => {
            $("#subForm_2").hide()
            $("#subForm_1").hide()
            console.log("关闭表单")
        })
    }

    // 子评论页面 点赞评论
    let likeComment = () => {
        $(".footer-btn").eq(1).on("click", function () {
            let topicId = $(".right-container").attr("topic-id")
            console.log(topicId)
            if ($("#likeTag").attr("like-status") == 0) {
                $("#likeTag").removeClass("nozan").addClass("addlike")
                let likeNum = (Number($(".like-num").text()) + 1)
                $(".like-num").text(likeNum)
                $("#topicLike").css("display", "inline-block")
                // $("#likeTag").prepend(html)
                $("#likeTag").attr("like-status", "1")
                $(".dianzan_topic .like-btn-show").css("color", "#ccc")
                let url = 'http://www.mamawozaizhe.com/yz/mobile2/jielong/zanAjax'
                let likeArr = {
                    "comid": topicId,
                    "act": "1   "
                }
                root.sentLike(url, likeArr)
            }
        })
    }

    // 最大化topic图片
    let maxTopImg = () => {
        $(".topic-contain p img").on("click", function () {
            let index = $(this).index()
            let myMaxImg = new Swiper('#showPanel', {
                initialSlide: index,
            })
            $(".main-max-list").css("display", "block").on("click", function () {
                myMaxImg.destroy(false)
                $(this).css("display", "none")
            })
        })
    }

    // 最大化评论图片

    // let preListImg = () => {
    //     $(".comment-img-box").on("click", function () {
    //         let imgB = $(this)

    //         $("#showTopPanel").css("display", "flex")
    //         let myMaxTop = new Swiper('#showTopPanel', {
    //             initialSlide: index
    //         })
    //         root.closePreList()
    //     })
    // }
    let preListImg = () => {
        $(".comment-img-box").on("click", function () {
            let imgB = $(this)
            let url = (imgB.find(".show-img")).css("backgroundImage")
            let curUrl = toSrc(url)
            console.log(curUrl)
            let index
            let urls = []
            let imgP = imgB.parent(".img-list")
            imgP.find(".comment-img-box").each(function () {
                urls.push(toSrc($(this).find(".show-img").css("backgroundImage")))
            })
            // 动态出入所有图片
            $("#showTopPanel .swiper-wrapper").empty()
            $.each(urls, function (index2, item) {
                if (item == curUrl) {
                    index = index2
                }
                console.log(item)
                var html = `
                    <div class="swiper-slide">
                        <img class="topic-img-max" src="${item}">
                    </div>
                 `
                $("#showTopPanel .swiper-wrapper").append(html)
            })
            // console.log("第几张：" + index)
            $("#showTopPanel").css("display", "flex")
            let myMaxTop = new Swiper('#showTopPanel', {
                initialSlide: index
            })
            root.closePreList(myMaxTop)
        })
    }
    // 处理 url 为 src
    let toSrc = (url) => {
        return src = url.split('"')[1]
    }

    // 关闭最大图
    let closePreList = (myMaxTop) => {
        $(".swiper-slide").on("click", function () {
            myMaxTop.destroy(false)
            $("#showTopPanel").css("display", "none")
        })
        console.log('管')
    }

    // 话题详情最大化图片
    let maxComTop = () => {
        $(".comment-img-box").on("click", function () {
            let index = $(this).index()
            $(".main-max-list").css("display", "block")
            let myMaxImg = new Swiper('#showPanel', {
                initialSlide: index,
            })
            $(".main-max-list").on("click", function () {
                myMaxImg.destroy(false)
                $(this).css("display", "none")
            })
        })
    }

    // root.doSubmit = doSubmit
    root.maxComTop = maxComTop
    root.closePreList = closePreList
    root.preListImg = preListImg
    root.maxTopImg = maxTopImg
    root.showComForm = showComForm
    root.likeComment = likeComment
    root.showZiForm = showZiForm
    root.closeZiForm = closeZiForm
    root.likeTopic = likeTopic
    root.comMaxImg = comMaxImg
    // 上传图片删除 放大
    root.maxImg = maxImg
    root.deletImg = deletImg
    root.closeScan = closeScan
    // 点赞
    root.clickLike = clickLike

}(window.Zepto, window.topic || (window.topic = {})))
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
(function ($, root) {

    root.getDivSrc = getDivSrc
    root.sentLike = sentLike
    // 获取话题内容图片地址
    root.getImgSrc = getImgSrc
    // 图片传后台
    root.pushImg = pushImg
    root.getNowFormatDate = getNowFormatDate

    // 获取所有百度编辑器编辑后的图片地址
    function getImgSrc() {
        $(".topic-contain  p img").each(function () {
            console.log($(this).attr("src"));
            let src = $(this).attr("src")
            // 生成放大器
            root.maxImgShow(src)
        });
    }

    function getDivSrc() {
        $(".img-conten  .show-img").each(function () {
            let url = $(this).css("backgroundImage")
            console.log(url)
            // // 生成放大器
            root.maxDivShow(url)
        });
    }

    // 图片传给后台 
    // 获取后台图片地址
    function pushImg(url, dataArr) {
        $.ajax({
            url: url,
            type: 'POST',
            data: dataArr,
            contentType: false,
            processData: false,
            dataType: 'JSON',
            success: getPicUrl,
        })
    }

    function getPicUrl(data) {
        // data = JSON.parse(data)
        console.log(data)
        let curDay = getNowFormatDate()
        console.log(curDay)
        var url = "/public/yz/upload/" + curDay + '/' + data["upload_data"]["file_name"]
        // var url =  data["upload_data"]["full_path"]
        console.log(url)
        root.renderComImg(url)
    }

    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        // var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = String(date.getFullYear()) + String(month) + String(strDate);
        return currentdate;
    }

    // 发送点赞事件给后台
    function sentLike(url, likeArr) {
        console.log(likeArr)
        console.log('请求地址：' + url)
        $.ajax({
            url: url,
            type: 'POST',
            // dataType: 'json',
            data: likeArr,
            error: error,
            success: success
        })
    }

    function error(data, status) {
        console.log(data)
        console.log(status)
        alert("哎呀~网络出错了！")
    }

    function success(data, status) {
        console.log(data)
        console.log(status)
    }


}(window.Zepto, window.topic || (window.topic = {})))
let $ = window.Zepto
let $scope = $(window.document)
let root = window.topic

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
} else if ($("#tListWra").length) {
    /**
     * 接龙话题列表 入口
     */

    // let src = "../img/jielonglogo.png"
    let src = "/public/yz/jl_img/jielonglogo.png"
    root.renderImg(src)

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

    // topickDetail防重复提交
    var issubmit = false

    function doSubmit() {
        if (issubmit == false) {
            issubmit = true;
            return true;
        } else {
            return false;
        }
    }


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
    root.maxComTop ()
    // root.preImage(".comment-img-box", ".comment-img-box .show-img")

}