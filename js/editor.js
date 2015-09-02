;
(function($, win, doc, noop) {
    var a = typeof(noop);
    if (typeof win.rs === a) {
        win.rs = {};
    } else if (typeof win.rs.editor === a) {
        win.rs.editor={};
    }
})(jQuery, window, document);;
(function($, win, doc, noop) {
    //selector指的是
    $.fn.Editor = function(selector) {
        var rsMouse = {},
            option = {};
        win.rs.editor.instances = {};
        return $(selector).each(function() {
            var _configStr=$(this).attr("data-config"),_ops={};
            try{
                ops=JSON.parse(_configStr);
            }catch(e){
                console.log("配置config属性非法！");
                ops={};
            }
            $.rs.editor.instances[this.id] = new Editor(this, $.extend(option, ops));
        });
    };


    //构造实例函数
    function Editor(dom, ops) {
        this.dom = $(dom);
        this.init(ops);
        return this;
    }
    Editor.prototype.init = function(ops) {
        //获取每个编辑器的ClientRect参数
        // var rect = dom.getBoundingClientRect();
        // this.position={
        //   left: rect.left,
        //   right: rect.right,
        //   top: rect.top,
        //   bottom: rect.bottom,
        //   width: rect.width,
        //   height: rect.height
        // };
        var haader=this.createHeader("THIS IS A READER FOR EOFFCN");
        var footer=this.createFooter();
        var body=this.createBody(ops); 
        this.getData({
            request: "init", //init  render
            message: "获取数据",
            data: {
                page: 0
            },
            url: "./assets/data/common.json"
        }, function(data) {
            this.render(data);
        });
        this.regEvent();
    };
    Editor.prototype.createHeader=function(title){
        title=title?title:"I AM TITLE";
        var str="";
        str+="<header>"+title+"</header>";
        return str;
    };
    Editor.prototype.createFooter=function(){
        var str="";
        str+='<footer><div class="copyright">Copyright©1999-2010 中公教育 .All Rights Reserved</div>'+
            '<div><a style="color:#EFEEDB;" href="./icons.html">fontIcons</a> supported by <a style="color:#EFEEDB;" href="https://icomoon.io">icomoon</a></div></footer>';
        return str;
    };
    Editor.prototype.createBody=function(ops){

    }
    Editor.prototype.getData = function(ops, fn) {
        //数据处理
        var data = $.extend({}, ops.data),
            ths;
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
                }
                ths.log(response.code);
                // $(".reader-box .content .text").html(response);
                // editor.article = response;
                $.alert(ops.message + "成功！");
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
    Editor.prototype.regEvent = function() {

    };
    Editor.prototype.render = function(data) {
        $(this.element).find(".text").innerHTML += data.data.textbook;
    };









})(jQuery, window, document);


;
(function($, win, doc, noop) {
    function Range() {
        this.range = null;
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
    win.Range = Range;
})(jQuery, window, document);


$(function() {




    //$.getSelectionObject = {};
    ////获取一个文章内容api
    //var render = function(params, fn) {
    //    $.ajax({
    //        data: {
    //            page: params.page
    //        },
    //        url: params.url,
    //        success: function(response) {
    //            fn && fn(response);
    //        },
    //        failure: function() {
    //            $.alert("文章获取失败！！！").find(".mask-msg-box").css("color", "rgb(253, 135, 135)");
    //        }
    //    });
    //
    //};
    //
    ////阅读器顶部工具功能实现（暂未实现）
    //$(".contentBox .reader-tools").find("i").each(function() {
    //    $(this).click(function() {
    //        if ($(this).hasClass("read")) {
    //            $(curEditor.element).parent().attr("contentEditable", "false");
    //            $(curEditor.element).parent().css({
    //                "border": "none",
    //                "outline": "none"
    //            });
    //            $.alert("阅读模式");
    //        } else {
    //            $(curEditor.element).parent().attr("contentEditable", "true");
    //            $(curEditor.element).parent().css({
    //                "border": "2px solid #757575",
    //                "outline": "#7A7A7B dotted 3px"
    //            });
    //            $.alert("编辑模式");
    //        }
    //    });
    //
    //});
    //$(".content").bind("mousewheel", function(e) {
    //    var $content = $(".reader-box .content").get(0),
    //        scrollTop = $content.parentNode.scrollTop,
    //        clientHeight = $($content.parentNode).height(),
    //        scrollHeight = $content.parentNode.scrollHeight;
    //    if (scrollTop + clientHeight >= scrollHeight) {
    //        render({
    //            url: "./assets/common.txt",
    //            page: 0
    //        }, function(text) {
    //            $($content).find(".text").innerHTML += text;
    //            $.alert("获取成功");
    //        });
    //    }
    //});
    //$(".contentBox .content").bind("keyup keydown", function(e) {
    //    if (e.keyCode !== 16) { //shift键
    //        console.log('=====内容区键盘已禁用=====');
    //        return false;
    //    }
    //    e.stopPropagation();
    //});
    //$(".contentBox .content").blur(function(e) {
    //    console.log("blur");
    //    //restoreSelection();
    //});
    ////阅读器内容选中处理
    //$(".contentBox .content").bind("mousedown", function(e) {
    //    console.log("=====鼠标按下=====");
    //    $(".tools").hide();
    //});
    //
    //$(".contentBox .content").bind("mousemove", function(e) {
    //
    //});
    //
    //
    //
    //$(".contentBox .content").bind("mouseup", function(e) {
    //    console.log("=====鼠标松开=====");
    //    rsMouse.targetPos = rsMouse.tmpPos;
    //    console.log("=====光标位置：%o=====", rsMouse.targetPos);
    //    if ($(curEditor.element).parent().attr("contentEditable") === "true") {
    //        rsSelectObject(this, e);
    //    }
    //
    //    saveSelection();
    //});
    //$(".content").attr("tabindex", 0);
    //
    //$(".content").attr("hidefocus", "true");
    //
    //
    //var insertSign = function(range) {
    //    var sign = range.createContextualFragment("<sign></sign>");
    //};
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
    //$.ajax({
    //    url: "./js/a.js",
    //    dataType: "jsonp",
    //    jsonp: "callback",
    //    success: function() {
    //        alert(3);
    //    }
    //});
    //// callback = function(response) {
    ////   alert(response.text);
    //// }
    //
    //$(".content").bind("mousemove", function(e) {
    //    rsMouse.tmpPos = mouseMove(e);
    //});
    //
    //$(".pin-menu").on("click", ".menu-start", function(e) {
    //    var $this = $(this),
    //        _menu = $(this.parentNode);
    //    if (_menu.hasClass("show-menu")) {
    //        $this.removeClass("rotate135");
    //        _menu.removeClass("show-menu");
    //    } else {
    //        $this.addClass("rotate135");
    //        _menu.addClass("show-menu");
    //    }
    //});
    //$(".pin-menu").on("click", "li", function(e) {
    //    var $this = $(this),
    //        _menu = $(this.parentNode);
    //
    //});
    //
    //player = videojs('VIDEO_MIAN_WINDOW', {
    //    "poster": "./assets/images/poster.jpg"
    //}, function() {
    //    console.log('Good to go!');
    //    this.isEnd_ = false;
    //    this.isEnd = function() {
    //        return this.isEnd_;
    //    };
    //    //  this.play(); // if you don't trust autoplay for some reason
    //
    //    // How about an event listener?
    //    this.on('ended', function() {
    //        console.log('awww...over so soon?');
    //        this.isEnd_ = true;
    //        videoPosRender();
    //    });
    //});
    //$(".content").mousewheel(function(e) {
    //
    //    videoPosRender();
    //});
    //$(".content").scroll(function(e) {
    //    videoPosRender();
    //});
    //var videoPosRender = function() {
    //    if (player.hasStarted() && (!player.paused())) {
    //        if ($(".content").scrollTop() >= 190) {
    //            $("#VIDEO_MIAN_WINDOW").addClass("minivideo");
    //        } else if ($(".content").scrollTop() < 321) {
    //            $("#VIDEO_MIAN_WINDOW").removeClass("minivideo");
    //        }
    //    } else if (player.isEnd()) {
    //        $("#VIDEO_MIAN_WINDOW").removeClass("minivideo");
    //    }
    //};
    //
    //$(".pin-menu").on("click", "li", function() {
    //    var cmd = $(this).attr("data-cmd");
    //    $(this).addClass("active").siblings().removeClass("active");
    //    $("." + cmd + "mode").addClass("active").siblings().removeClass("active");
    //});


});
