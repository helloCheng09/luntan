   (function (root) {

       /**
        * 多选函数
        * @param {jq选择的dom数组} doms 
        * @param {选中后添加的类名} className 
        */

       function multiSelect(doms, className) {
           doms.each(function () {
               $(this).on("click", function () {
                   var mIndex = $(this).index()
                   if ($(this).hasClass(className)) {
                       $(this).removeClass(className)
                       if (mIndex != 0) {
                           doms.eq(0).removeClass(className)
                       }
                       // 调用模块隐藏
                       hidModel($(".student-list"), mIndex)
                   } else {
                       $(this).addClass(className)
                       // 调用模块展示
                       showModel($(".student-list"), mIndex)
                       // 触发全选按钮
                       // if (mIndex == 0) {
                       //     $("#selAll").addClass("btn_selected")
                       // }
                   }
               })
           })
       }
       /**
        * 展示学生
        * @param {jq选择的dom数组} doms 
        * @param {选择的index} mIndex 
        */
       function showModel(doms, mIndex) {
           if (mIndex == 0) {
               doms.css("display", "block")
               // 选中所有班级标签
               $(".teacher-box").find(".teacher-item").addClass("selected")
               // 选中所有学生
               doms.each(function () {
                   sBeSelect($(this), "selected")
               })
           } else {
               var index = mIndex - 1
               doms.eq(index).css("display", "block")
               var dom = doms.eq(index)
               sBeSelect(dom, "selected")
           }
       }

       function hidModel(doms, mIndex) {
           if (mIndex == 0) {
               // 取消选中所有班级标签
               $(".teacher-box").find(".teacher-item").removeClass("selected")
               // 取消选中所有学生
               doms.each(function () {
                   sCancelSel($(this), "selected")
               })
               doms.css("display", "none")
           } else {
               var index = mIndex - 1
               // 取消选中学生
               var dom = doms.eq(index)
               sCancelSel(dom, "selected")
               dom.css("display", "none")
           }
       }

       /**
        * 全选学生 取消全选
        * @param {jq选中的dom} dom 
        * @param {学生被选中添加的类名} className 
        */
       function sBeSelect(dom, className) {
           dom.find(".student-item").find("label").addClass(className)
           dom.find(".student-item").find("input").attr("checked", "checked")
       }

       function sCancelSel(dom, className) {
           dom.find(".student-item").find("label").removeClass(className)
           dom.find(".student-item").find("input").removeAttr("checked")
       }
       /**
        * 
        * @param {jq全选按钮} btnEle 
        * @param {全选按钮添加类名} className 
        */
       function selectAllBtn(btnEle, className) {
           btnEle.on("click", function () {
               var btnEle = $(this)
               if (btnEle.hasClass(className)) {
                   // 取消当前所有选中的学生
                   $(".student-list").each(function () {
                       if ($(this).css("display") == "block") {
                           $(this).find(".student-item").find("label").removeClass("selected")
                           $(this).find(".student-item").find("input").removeAttr("checked")
                       }
                   })
                   $(this).removeClass(className)
               } else {
                   // 当前所有选中的学生
                   $(".student-list").each(function () {
                       if ($(this).css("display") == "block") {
                           $(this).find(".student-item").find("label").addClass("selected")
                           $(this).find(".student-item").find("input").attr("checked", "checked")
                       }
                   })
                   $(this).addClass(className)
               }
           })
       }

       /**
        * 
        * @param {jq选中学生dom数组} sDoms 
        * @param {开关类名} className 
        */
       function singleSel(sDoms, className) {
           sDoms.each(function () {
               $(this).on("click", function () {
                   var flag = $(this).find("label").hasClass(className)
                   $(this).find("label").toggleClass(className)
                   if (!flag) {
                       $(this).find("input").attr("checked", "checked")
                   } else {
                       $(this).find("input").removeAttr("checked")
                   }

               })
           })
       }

       root.multiSelect = multiSelect
       root.selectAllBtn =selectAllBtn
       root.singleSel = singleSel

   }(window.topic || (window.topic = {})))