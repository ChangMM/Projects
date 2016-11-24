/**
 * Created by cmm on 16/4/27.
 */
var main={
    isScroll:false,
    menuMask:$("#menu-mask"),
    pageList:$("#page-list"),
    prevPage:$("#prev-page"),
    nextPage:$("#next-page"),
    page:0,
    scene:0,
    pos:0,
    delay:1000,
    lastRunTime : new Date().getTime(),
    changeScene:function(pos){
        if(main.isScroll){
            return ;
        }else{
            main.isScroll = true;
        }
        $(".main").animate({top:"-"+100*pos+"%"},500,TWEEN.BounceInOut,function(){
            main.pos = pos;
            main.scene = pos;
            main.isScroll = false;
        });

    },
    changeScroll:function(index){
        $(document.body).animate({'scrollTop':HEIGHT*index+"px"},400);
    },
    changePage:function(page){
        if(page<0||page>3){
            return;
        }
        main.pageList.animate({"margin-left":page*(-500)+"px"},300,TWEEN.easeInOutCubic,function(){
            var dot = $("#page-dot .dot");
            dot.removeClass("active");
            dot.eq(page).addClass("active");
            main.nextPage.removeClass("active");
            main.prevPage.removeClass("active");
            if(page == 0){
                main.nextPage.addClass("active");
            }else if(page == 3){
                main.prevPage.addClass("active");
            }else{
                main.nextPage.addClass("active");
                main.prevPage.addClass("active");
            }
            main.page = page;
        });
    },
    wheel:function(event){
        event.preventDefault();
        if(event.deltaY>6&&(new Date().getTime() - main.lastRunTime>main.delay)){
            if(main.scene <= 0){
                return;
            }else{
                if(!main.isScroll){
                    main.scene--;
                    main.changeScene(main.scene);
                }
            }
            main.lastRunTime = new Date().getTime();
        }else if(event.deltaY<-6&&(new Date().getTime() - main.lastRunTime>main.delay)){
            if(main.scene >= 4){
                return;
            }else{
                if(!main.isScroll){
                    main.scene++;
                    main.changeScene(main.scene);
                }
            }
            main.lastRunTime = new Date().getTime();
        }
    },
    showChildPage:function(index){
        var parent = $("#scene-"+index);
        parent.addClass("active");
        parent.off("click");
        parent.on("click",".close",function(){
            parent.removeClass("active");
        });
        
        parent.on("click",".cancel",function(){
            $("#name").val("");
            $("#content").val("");
            parent.removeClass("active");
        });

        parent.on("click",".submit",function(){
            if($.trim($("#content").val())==""||$.trim($("#name").val())==""){
                alert("信息不能为空~");
                return ;
            }
            alert("您的留言已收到");
            $("#content").val("");
            $("#content").val("");
            parent.removeClass("active");
        })
    },
    initEvent:function(){
        //绑定滚轮事件
        // $(".main").on("mousewheel",main.wheel);

        //绑定菜单事件
        $("#menu-bar").on("click",function(){
            main.menuMask.addClass("active");
        });
        $("#close-menu-bar").on("click",function(){
            main.menuMask.removeClass("active");
        });
        $("#menu-list").on("click",".menu-item",function(){
            var self = $(this);
            main.menuMask.removeClass("active");
            setTimeout(function(){
                main.changeScroll(+self.attr("data-id"))
            },200);
        });

        $("#mouse").on("click",function(){
            $(this).remove();
            main.changeScroll(1);
        });

        //第二页文章的切换
        $("#dot-wrap").on("click",".dot",function(){
            var self = $(this),
                index =  self.index();
            if(self.hasClass("active")){
                return ;
            }else{
                $(".dot").removeClass("active");
                self.addClass("active");
                $(".item-article").removeClass("active");
                $(".item-article").eq(index).addClass("active");
            }
        });

        //第四页文章的切换
        $("#history-dot-wrap").on("click",".dot",function(){
            var self = $(this),
                index =  self.index();
            if(self.hasClass("active")){
                return ;
            }else{
                $(".dot").removeClass("active");
                self.addClass("active");
                $(".mid-wrap").removeClass("active");
                $(".mid-wrap").eq(index).addClass("active");
            }
        });

        //工具页面显示具体文章页
        $(".tool-button").on("click",function(){
            var self = $(this),
                id =  self.attr("data-id");

            $(".detail-article-wrap").removeClass("active");
            setTimeout(function(){
                $(".detail-article-wrap-"+id).addClass("active");
            },200);
        });
        $(".detail-article-wrap .close").on("click",function(){
            var parent = $(this).parent();
                parent.removeClass("active");
        });
        //切换页
        main.nextPage.on("click",function(){
            main.page++;
            main.changePage(main.page);
        });

        main.prevPage.on("click",function(){
            main.page--;
            main.changePage(main.page);
        });

        $("#page-dot").on("click",".dot",function(){
            var page = $(this).attr("data-id");
            main.changePage(+page);
        });

        $("#act-list").on("mouseenter",".act-item-wrap",function(){
            var self = $(this);
            $(".act-item-wrap").removeClass("active");
            var i = self.index()+1;
                self.addClass("active");
            $("#act-img").attr("src","./img/scene7/"+i+".png")
        })
    },
    initVideo:function(){
       
    },
    init:function(){
        main.initVideo();
        main.initEvent();
        main.changePage(0);
    }
};

var HEIGHT = $(document.body).height();
main.init();
