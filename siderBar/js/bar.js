/**
 * Created by cmm on 15/6/23.
 *  利用面向对象的方式实现侧边栏。
 */

;(function(win){

    //先初始化menuBar
    var MenuBar = function(){
        this.ele = document.getElementById("item-wrap");
        this.state = "allClosed";
        this.ele.addEventListener("click",function(event){
            event.stopPropagation();
            event.cancelBubble = true;
        });
        var self = this;
        this.menuList = document.querySelectorAll("#item-wrap .item");
        for(var i = 0,length = this.menuList.length; i<length;i++){
            this.menuList[i].addEventListener("click",function(event){
                var menuContent = document.getElementById(event.currentTarget.id+"-content");
                if(self.state === "allClosed"){
                    menuContent.style.top = "0";
                    menuContent.style.left = "-85px";
                    menuContent.className = "nav-content";
                    menuContent.classList.add("menuContent-move-right");
                    self.state = "hasOpened";
                    self.currentMenu = menuContent;
                }else{
                    self.currentMenu.className ="nav-content";
                    self.currentMenu.style.top ="0";
                    self.currentMenu.style.left ="35";
                    self.currentMenu.classList.add("menuContent-move-left");

                    menuContent.style.top = "250px";
                    menuContent.style.left = "35px";
                    menuContent.className = "nav-content";
                    menuContent.classList.add("menuContent-move-up");

                    self.currentMenu = menuContent;
                }
            });
        }

        this.menuListClose = document.querySelectorAll(".nav-content .nav-con-close");
        for(var j = 0,length1 = this.menuListClose.length; j<length1;j++){
            this.menuListClose[j].addEventListener("click",function(event){
                var menuContent = event.currentTarget.parentNode;
                menuContent.className = "nav-content";
                menuContent.style.top = "0";
                menuContent.style.left = "35px";
                menuContent.classList.add("menuContent-move-left");
                self.state = 'allClosed';
            })
        }
    };

    MenuBar.prototype.close = function() {
        this.currentMenu.className = 'nav-content';
        this.currentMenu.style.top = '0px';
        this.currentMenu.style.left = '35px';
        this.currentMenu.classList.add('menuContent-move-left');
        this.state = 'allClosed';
    };

    var SideBar = function (sideBarId,closeBarId){
        //状态
        this.state = "open";
        this.sideEle = document.getElementById(sideBarId);
        this.closeEle = document.getElementById(closeBarId);
        var self = this;
        this.menuBar = new MenuBar();
        this.sideEle.addEventListener('click',function(event){
           if(event.target !== self.sideEle){
                self.switchState();
           }
        });
    };
    SideBar.prototype.open = function(){
        //再添加类名之前一定要先修改样式
        this.sideEle.style.left = "-120px";
        this.sideEle.className = "sideBar-move-right";
        this.closeEle.style.left ="160px";
        this.closeEle.className = "closeBar-move-left";
        this.state ="open";
    };

    SideBar.prototype.close = function(){
        //若有具体内容项打开，先关闭具体内容项
        if(this.menuBar.currentMenu) {
            this.menuBar.close();
        }
        //再添加类名之前一定要先修改样式
        this.sideEle.style.left    = "0";
        this.sideEle.className = "sideBar-move-left";
        this.closeEle.style.left ="0";
        this.closeEle.className = "closeBar-move-right";
        this.state ="close";
    };

    SideBar.prototype.switchState = function(){
        if(this.state === "open"){
            this.close();
        }else{
            this.open();
        }
    };
    var sideBar = new SideBar("sidebar","closeBar");

})(window);