;
(function($, win, doc, noop) {
  var a = typeof(noop);
  if (typeof win.rs === a) {
    win.rs = {};
  }
  if (typeof win.rs.editor === a) {
    win.rs.editor = {};
  }
})(jQuery, window, document);;
(function($, win, doc, noop) {
  //selector指的是
  $.fn.Editor = function() {
    var rsMouse = {},
      option = {};
    win.rs.editor.instances = {};
    return this.each(function() {
      var _configStr = $(this).attr("data-config"),
        _ops = {},id=this.id?this.id:"instance"+(+new Date);
      try {
        ops = JSON.parse(_configStr);
      } catch (e) {
        console.log("配置config属性非法！");
        ops = {};
      }
      win.rs.editor.instances[id] = new Editor(this, $.extend(option,
        ops));
    });
  };


  //构造实例函数
  function Editor(dom, ops) {
    this.dom = $(dom);
    this.init(ops);
    return this;
  }
  Editor.prototype.updateStore=function(){
    var dom=this.dom;
    this.Store={
      wrapArticle:dom.find(".wrap-article"),
      wrapPostil:dom.find(".wrap-potil")
    }
  };
  Editor.prototype.init = function(ops) {
    this.createDom();
    this.getData({
      request: "init", //init  render
      data: {
        page: 0
      },
      url: "./assets/data/common.json"
    }, function(data) {
      this.render.call(this,data);
      this.regEvent.call(this);
    });

  };
  Editor.prototype.createDom=function(){
    this.createHeader("THIS IS A READER FOR EOFFCN");
    this.createBody(ops);
    this.createVideo();
    this.createArticle();
    this.createFooter();
  };
  Editor.prototype.createHeader = function(title) {
    title = title ? title : "I AM TITLE";
    var str = "";
    str += "<div class='header'>" + title + "</div>";
    this.header=$(str).appendTo(this.dom);
  };
  Editor.prototype.createFooter = function() {
    var str = "";
    str +=
      '<div class="footer"><div class="copyright">Copyright©1999-2010 中公教育 .All Rights Reserved</div>' +
      '<div><a style="color:#EFEEDB;" href="./icons.html">fontIcons</a> supported by <a style="color:#EFEEDB;" href="https://icomoon.io">icomoon</a></div></div>';
    this.footer=$(str).appendTo(this.dom);
  };
  Editor.prototype.createBody = function(ops) {
    var str="";
    str+='<div class="wrap-reality rs-editor-instance">'+
        '<section class="main">'+
            '<div class="main-body">'+
                '<div class="main-scroll">'+
                '</div>'+
            '</div>'+
        '</section>'+
        '<nav class="main-nav extra-main-left">'+
            '<div class="nav-boot btn-circle"><i class="rs rs-add"></i></div>'+
            '<ul class="list tool-list">'+
                '<li data-cmd="article-1" class="list-item btn-circle">'+
                    '<a title="第一节">'+
                        '<i class="rs rs-looks_one"></i>'+
                    '</a>'+
                '</li>'+
                '<li data-cmd="article-2" class="list-item btn-circle">'+
                    '<a title="第二节">'+
                        '<i class="rs rs-looks_two"></i>'+
                    '</a>'+
                '</li>'+
            '</ul>'+
        '</nav>'+
        '<svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
            '<defs>'+
                '<symbol id="icon-bubble2" viewBox="0 0 1024 1024">'+
                    '<path class="path1" d="M512 192c-54.932 0-107.988 8.662-157.694 25.742-46.712 16.054-88.306 38.744-123.628 67.444-66.214 53.798-102.678 122.984-102.678 194.814 0 40.298 11.188 79.378 33.252 116.152 22.752 37.92 56.982 72.586 98.988 100.252 30.356 19.992 50.78 51.948 56.176 87.894 1.8 11.984 2.928 24.088 3.37 36.124 7.47-6.194 14.75-12.846 21.88-19.976 24.154-24.152 56.78-37.49 90.502-37.49 5.368 0 10.762 0.336 16.156 1.024 20.974 2.666 42.398 4.020 63.676 4.020 54.934 0 107.988-8.66 157.694-25.742 46.712-16.054 88.306-38.744 123.628-67.444 66.214-53.796 102.678-122.984 102.678-194.814s-36.464-141.016-102.678-194.814c-35.322-28.698-76.916-51.39-123.628-67.444-49.706-17.080-102.76-25.742-157.694-25.742zM512 64v0c282.77 0 512 186.25 512 416 0 229.752-229.23 416-512 416-27.156 0-53.81-1.734-79.824-5.044-109.978 109.978-241.25 129.7-368.176 132.596v-26.916c68.536-33.578 128-94.74 128-164.636 0-9.754-0.758-19.33-2.164-28.696-115.796-76.264-189.836-192.754-189.836-323.304 0-229.75 229.23-416 512-416z"></path>'+
                '</symbol>'+
            '</defs>'+
        '</svg>'+
    '</div>';
    this.wrap=$(str).appendTo(this.dom);
  }
  Editor.prototype.createVideo=function(){
      var str="";
      str+='<div class="main-top video">'+
          '<div class="video-left">'+
              '<video id="VIDEO_MIAN_WINDOW" class="video-js vjs-default-skin" controls height="510" width="850" preload="auto" data-setup="{}" poster="assets/images/oceans-clip.png">'+
                  '<source src="assets/video/MY_VIDEO.mp4" type="video/mp4">'+
                  '<source src="assets/video/MY_VIDEO.webm" type="video/webm">'+
                  '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>'+
              '</video>'+
          '</div>'+
          '<div class="video-right">'+
              '<article>'+
                  '<h3>JAVASCRIPT实战开发教程</h3>'+
                  '<ul>'+
                      '<li>'+
                          '<span>主讲老师</span><a>希希老师</a>'+
                      '</li>'+
                      '<li>'+
                          '<span>目前就职</span><a>中公网络技术部</a>'+
                      '</li>'+
                      '<li>'+
                          '<span>工作年限</span><a>五年</a>'+
                      '</li>'+
                      '<li>'+
                          '<span>擅长技术</span><a>JAVASCRIPT</a>'+
                      '</li>'+
                  '</ul>'+
              '</article>'+
              '<div class="extra-line"></div>'+
          '</div>'+
      '</div>';
      this.wrapVeido=$(str).appendTo(this.dom.find(".main-scroll"));
  };
  Editor.prototype.createArticle=function(){
    var str="";
    str+='<div class="main-bottom editor">'+
        '<div class="wrap-article editor-left">'+
        '</div>'+
        '<div class="wrap-postil editor-right">'+
        '</div>'+
    '</div>';
    this.mainScroll=$(str).appendTo(this.dom.find(".main-scroll"));
    this.wrapArticle=this.mainScroll.find(".wrap-article");
    this.wrapPostil=this.mainScroll.find(".wrap-postil");
  };
  Editor.prototype.getData = function(ops, fn) {
    //数据处理
    var data = $.extend({}, ops.data),
      ths=this;
    if ("init" == data.request) {
      data.message = "初始化数据";
    }
    var load = $.load();

    $.ajax({
      data: $.extend({}, ops.data),
      url: ops.url,
      success: function(response) {
        load.remove();
        if (!response.code) { //0代表处理成功，其他代码，认为是异常，提示message给用户
          fn && fn.call(ths, response.data);
        } else {
          console.log("===获取文章数据===", response.message);
          ths.log(response.code);
        }
        $.alert(response.message + "成功！");
      },
      failure: function() {
        load.remove();
        $.alert(ops.message + "失败！！！")
          .find(".mask-msg-box")
          .css("color", "rgb(253, 135, 135)");
      }
    });
  };
  Editor.prototype.log = function(code) {
    switch (code) {
      case 1:
        console.error("错误代码1");
        break;
      case 2:
        console.error("错误代码2");
        break;
      case 3:
        console.error("错误代码3");
        break;
      case 4:
        console.error("错误代码4");
        break;
      case 5:
        console.error("错误代码5");
        break;
      case 6:
        console.error("错误代码6");
        break;
      default:
        console.error("错误代码" + code + "，请联系您的服务提供者解决此问题。");
    }
  };
  Editor.prototype.render = function(data) {
    var newarticle="<div class='page-"+data.page+"'>"+data.textbook+"</div>";
    $(newarticle).appendTo(this.mainScroll.find(".wrap-article"));
    var newpostil="<div class='page-"+data.page+"-postil'>";
    data.mPostil.forEach(function(elm,idx,ths){
      newpostil+="<div class='page-"+data.page+"-postil-"+idx+"'  parent_id='"+elm.postil_id+"' postil_createtime='"+elm.postil_createtime+"'><i class='rs rs-flag2' style='color:green;position: absolute;'></i><div class='text'>"+elm.postil_content+"</div></div>";
    });
    newpostil+="</div>";
    $(newpostil).appendTo(this.mainScroll.find(".wrap-postil"));
  };
  Editor.prototype.regEvent = function() {
    var ths=this;
    //pin 按钮
    this.pinNav=this.dom.find(".main-nav");
    this.pinNav.on("click",".nav-boot",function(){
      ths.pinNav.toggleClass("show");
    });
  };



})(jQuery, window, document);


;
(function($, win, doc, noop) {
  function Range() {
    this.range = null;
    this.saveRange();
  }
  Range.prototype.saveRange = function() {
    var sel = null,
      range = null;
    if (window.getSelection) {
      sel = window.getSelection();
      //console.log("选中对象个数:%o", sel.rangeCount);
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
      }
    } else if (document.selection) {
      range = document.selection.createRange();
    }
    this.range = range;
  };
  Range.prototype.getRange = function() {
    return this.range;
  };
  Range.prototype.restoreSelection = function() {
    var selection = window.getSelection();
    if (this.range) {
      try {
        selection.removeAllRanges();
      } catch (ex) {
        var textRange = document.body.createTextRange();
        textRange.select();
        document.selection.empty();
      }
      //将 selectedRange 存储的范围，添加到这个选取上
      selection.addRange(this.range);
    }
  };
  win.rs.Range = Range;
})(jQuery, window, document);


$(function() {

  //var rsSelectObject = function(elm, e) {
  //    var _select, _content = elm.innerHTML;
  //    if (null !== (_select = $.getSelectionObject())) {
  //        var _tPos = $(elm).position();
  //        console.log("==鼠标位置L:%o,T:%o=====编辑器框的L:%o,T:%o=====提示框的W:%o,H:%o==",
  //            rsMouse.targetPos.x, rsMouse.targetPos.y, curEditor.left, curEditor.top,
  //            tooltips.rect().width / 2, tooltips.rect().height);
  //        var pos = {
  //            x: rsMouse.targetPos.x - curEditor.left + _tPos.left - tooltips.rect().width / 2 -
  //                10,
  //            y: rsMouse.targetPos.y - curEditor.top - _tPos.top - tooltips.rect().height - 20 -
  //                10
  //        };
  //        var diffx = curEditor.width - tooltips.rect().width;
  //        var diffy = curEditor.height - tooltips.rect().height;
  //        pos.x = pos.x < 0 ? 0 : pos.x;
  //        pos.x = pos.x > diffx ? diffx : pos.x;
  //        pos.y = pos.y < 0 ? 0 : pos.y;
  //        //pos.y = pos.y > diffy ? diffy : pos.y;
  //        if (!_select.collapsed) { //起始和结束是否重合
  //            $(".tools").css({
  //                display: "block",
  //                left: pos.x + "px",
  //                top: pos.y + "px"
  //            });
  //
  //            //  console.log("被选文本%o的起始位置(起始偏移):%o,结束位置:%o,结束尾偏移:%o", _select.toString(), _select.startOffset,
  //            //  _select.endOffset, _content.length - _select.endOffset);
  //            saveSelection();
  //            insertSign(_select);
  //        } else {
  //            $(".tools").css({
  //                display: "none",
  //                left: pos.x + "px",
  //                top: pos.y + "px"
  //            });
  //            console.log("请插入内容", _select.startOffset);
  //        }
  //    } else {
  //        $.alert("选择器获取失败！！！").find(".mask-msg-box").css("color", "rgb(253, 135, 135)");
  //    }
  //};
  //
  //$.toolTips = function(ops) {
  //    var config = {
  //        direction: "top",
  //        theme: "default",
  //        container: $("body")
  //    };
  //    var options = $.extend(config, ops);
  //    var html =
  //        "<div class='tools'>\
  //      <ul>\
  //        <li data-cmd='Bold' class='cmd' data-ops=''   title='文字加粗'><i class='rs rs-bold'></i></li>" +
  //        "<li data-cmd='Italic'    class='cmd' data-ops=''   title='文字斜体'><i class='rs rs-italic' title='文字斜体'></i></li>" +
  //        "<li data-cmd='Underline' class='cmd' data-ops=''   title='字下划线'><i class='rs rs-underline'></i></li>" +
  //        "<li data-cmd='StrikeThrough' class='cmd' data-ops='' title='字删除线'><i class='rs rs-strikethrough'></i></li>" +
  //
  //        "<li data-cmd='ForeColor' class='cmd' data-ops='rgb(255, 255, 153)'   title='文字高亮'><i class='rs rs-font'></i></li>" +
  //        "<li data-cmd='ForeColor' class='colorpicker' data-ops=''   title='文字颜色'><i class='fortColor rs rs-font'></i><div class='rs-colorpicker'></div></li>" +
  //        "<li data-cmd='BackColor' class='cmd' data-ops='rgb(255, 255, 153)'   title='背景高亮'><i  style='font-size: 16px;' class='rs rs-now_wallpaper rs-color_lens'></i></li>" +
  //        "<li data-cmd='BackColor' class='colorpicker' data-ops=''   title='背景颜色'><i class='backColor rs rs-now_wallpaper rs-color_lens'></i><div class='rs-colorpicker'></div></li>" +
  //        "<li data-cmd='undo' class='cmd' data-ops=''   title='撤销命令'><i  style='font-size: 16px;' class=' rs rs-undo'></i></li>" +
  //        "<li data-cmd='Postil' class='postil' data-ops=''   title='添加批注'><i style='font-size: 16px;' class=' rs rs-note_add'></i></li>" +
  //        "</ul>\
  //    </div>";
  //    var tools = $(html).appendTo(options.container);
  //
  //    tools.find("li").each(function() {
  //        $(this).click(function() {
  //            restoreSelection();
  //            if ($(this).hasClass("colorpicker")) {
  //                config.current = $(this);
  //            } else if ($(this).hasClass("cmd")) {
  //                $(curEditor).focus();
  //                var cmd = $(this).attr("data-cmd"),
  //                    ops = $(this).attr("data-ops");
  //                document.execCommand(cmd, 0, ops);
  //                tools.hide();
  //            } else {
  //                tools.hide();
  //                $.prompt("输入批注", true, function(value) {
  //                    var range = editor.selectedRange;
  //                    var selected = range.extractContents().textContent;
  //                    var text = "[ins id='" + (new Date().getTime()) + "' comment='" + value + "']" + selected + "[/ins]";
  //                    var textNode = document.createTextNode(text);
  //                    range.insertNode(textNode);
  //                    var content = $(".content").html();
  //                    var reg = /\[ins id='(\d*)' comment='([\w\W]*)']([\w\W]*)\[\/ins]/gi;
  //                    reg.exec(content);
  //                    var id = RegExp.$1,
  //                        comment = RegExp.$2,
  //                        c = RegExp.$3;
  //                    var reHtml = "<ins id='" + id + "' comment='" + comment + "' class='postil' >" + c + "<svg class='icons minipostil icon-bubble2'><use xlink:href='#icon-bubble2'></use></svg></ins>";
  //                    content = content.replace(reg, reHtml);
  //                    $(".content").html(content);
  //                    $(".content .minipostil").each(function() {
  //                        $(this).bind("keydown,keyup", function() {
  //                            e.preventDefault();
  //                            e.stopPropagation();
  //                        });
  //                        $(this).click(function(e) {
  //                            e.preventDefault();
  //                            e.stopPropagation();
  //                            $.dialog({
  //                                text: $(this.parentNode).attr("comment"),
  //                                ok: "删除备注",
  //                                cancel: "关闭"
  //                            }, function() {
  //                                $("ins#" + id).replaceWith(selected);
  //                            });
  //                        });
  //                    });
  //                });
  //            }
  //        });
  //    });
  //    $.fn.jPicker.defaults.images.clientPath = 'assets/images/jPicker/';
  //    $(".rs-colorpicker").jPicker({
  //            window: {
  //                expandable: true
  //            }
  //        },
  //        function(color, context) {
  //            var all = color.val('all');
  //            //alert('Color chosen - hex: ' + (all && '#' + all.hex || 'none') + ' - alpha: ' + (all && all.a + '%' || 'none'));
  //            var rgba = "rgba(" + all.r + "," + all.g + "," + all.b + "," + (all.a / 255) + ")";
  //
  //            $(curEditor).focus();
  //            config.current.attr("data-ops", rgba);
  //            var cmd = config.current.attr("data-cmd"),
  //                ops = rgba;
  //            document.execCommand(cmd, 0, ops);
  //            tools.hide();
  //
  //            $('#Commit').css({
  //                backgroundColor: all && '#' + all.hex || 'transparent'
  //            }); // prevent IE from throwing exception if hex is empty
  //        },
  //        function(color, context) {
  //            //if (context == LiveCallbackButton.get(0)) alert('Color set from button');
  //            var hex = color.val('hex');
  //            // LiveCallbackElement.css(
  //            //   {
  //            //     backgroundColor: hex && '#' + hex || 'transparent'
  //            //   }); // prevent IE from throwing exception if hex is empty
  //        },
  //        function(color, context) {
  //
  //        }
  //    );
  //    return tools;
  //};
  //
  //var tooltips = $.toolTips({
  //    container: $(".wrapper")
  //});
  //tooltips.rect = function() {
  //    return {
  //        width: $(".wrapper").find(".tools").width(),
  //        height: $(".wrapper").find(".tools").height()
  //    };
  //};
  ////这个三个方法的应用顺序一般是：
  ////1. 鼠标选中editor的一段内容之后，立即执行 saveSelection() 方法
  ////2. 当你想执行 execCommand（例如加粗、插入链接等） 方法之前，先调用 restoreSelection() 方法
  //
  //
  //function mouseMove(ev) {
  //    Ev = ev || window.event;
  //    var mousePos = mouseCoords(ev);
  //    //console.log(rsMouse.x + "    ===" + rsMouse.y);
  //    return {
  //        x: mousePos.x,
  //        y: mousePos.y
  //    };
  //}
  //
  //function mouseCoords(ev) {
  //    if (ev.pageX || ev.pageY) {
  //        return {
  //            x: ev.pageX,
  //            y: ev.pageY
  //        };
  //    }
  //    return {
  //        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
  //        y: ev.clientY + document.body.scrollTop - document.body.clientTop
  //    };
  //}
  //
  //$(".content").bind("mousemove", function(e) {
  //    rsMouse.tmpPos = mouseMove(e);
  //});

  player = videojs('VIDEO_MIAN_WINDOW', {
     "poster": "./assets/images/poster.jpg"
  }, function() {
     console.log('Good to go!');
     this.isEnd_ = false;
     this.isEnd = function() {
         return this.isEnd_;
     };
     //  this.play(); // if you don't trust autoplay for some reason

     // How about an event listener?
     this.on('ended', function() {
         console.log('awww...over so soon?');
         this.isEnd_ = true;
         videoPosRender();
     });
  });
  // $(".main-scroll").mousewheel(function(e) {
  //    videoPosRender();
  // });
  $(".main-scroll").scroll(function(e) {
     videoPosRender();
  });
  var videoPosRender = function() {
    console.log($(".main-scroll").scrollTop());
     if (player.hasStarted() && (!player.paused())) {
         if ($(".main-scroll").scrollTop() >= 520) {
             $("#VIDEO_MIAN_WINDOW").addClass("minivideo");
         } else if ($(".main-scroll").scrollTop() < 520) {
             $("#VIDEO_MIAN_WINDOW").removeClass("minivideo");
         }
     } else if (player.isEnd()) {
         $("#VIDEO_MIAN_WINDOW").removeClass("minivideo");
     }
  };


});
