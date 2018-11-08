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

          for (j = upsum; j < count; j++) {
            insertImg(res.localIds[j - upsum])
          }

          root.deletImg()
          root.showUpload()

          upsum = upsum + sum;
          /*上传图片到微信服务器*/
          var i = 0;
          len = images.localId.length;
          wxupload();

          function wxupload() {
            wx.uploadImage({
              localId: images.localId[i], // 需要上传的图片的本地ID，由chooseImage接口获得
              //isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function (res) {
                i++;
                //将上传成功后的serverId保存到serverid  
                images.serverId.push(res.serverId);
                if (i < len) {
                  wxupload();
                }
                setImg()
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

  //  插入小图
  let insertImg = (img_src) => {
    // <div class="img-con" style="background-image:url(${img_src})"></div>
    // <img class="img-mini" src="${img_src}" id="portrait1_src">  
    var html = `
        <li class="img-input-item" style="opcity:0;" img-id="">
          <em class="delet" style="background-image:url(/public/yz/jl_img/deletimg.png)"></em>
          <div class="mini-b">
            <img class="img-mini" src="${img_src}" id="portrait1_src"> 
          </div>
          <input name="imgUpload[]" style=" display:none;" value="${img_src}">
        </li>
     `
    $('#imgInput').prepend(html);
    $(".img-mini").unbind()
    preImage()
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
  let preImage = () => {
    $(".img-input-item .img-mini").on("click", function () {
      let urls = []
      let curUrl = $(this).attr("src")
      // 获取所有预览图片地址
      $(".img-input-item").each(function () {
        let imgEle = $(this).find(".img-mini")
        urls.push(imgEle.attr("src"))
      })
      wx.previewImage({
        current: curUrl,
        urls: urls
      })
    })
  }

}(window.Zepto, window.topic || (window.topic = {})))