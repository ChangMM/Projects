/**
 * Created by cmm on 16/3/31.
 * 资源加载模块
 */

(function(win){
    var loading = {
        base: "c-img/",
        total: 0,
        source:RESOURCE,
        callbacks:[],
        loading:[],
        beforeLoading:[]
    };
    loading.per = Math.ceil((1 / loading.source.length)*100);
    loading.addDoneCallback = function(func){
        loading.callbacks.push(func);
    };
    loading.addLoading = function(func){
        loading.loading.push(func);
    };
    loading.addBeforeLoading = function(func){
        loading.beforeLoading.push(func);
    };
    loading.init = function() {
        for(var i = 0,len = loading.beforeLoading.length;i<len;i++){
            loading.beforeLoading[i]();
        }
        var img = new Image();
        img.onload = function() {
            for(var i = 0,len = loading.loading.length;i<len;i++){
                loading.loading[i]();
            }
            loading.source.pop();
            loading.per = Math.ceil((1 / loading.source.length)*100);
            setTimeout(function() {
                if (loading.source.length == 0)
                    for(var i = 0,len = loading.callbacks.length;i<len;i++){
                        loading.callbacks[i]();
                    }
                else
                    loading.init();
            }, 1000 / 30)
        };
        img.src = loading.base + loading.source[loading.source.length - 1];
    };

    loading.addLoading(function(){
        //document.querySelector("#percent").innerHTML=loading.per;
    });
    loading.addDoneCallback(function(){
        // setTimeout(function(){
            // document.querySelector("#loading-canvas").classList.add("disappear");
            document.querySelector("#welcome-word").classList.add("appear");
            document.querySelector("#start-cat").classList.add("appear");
            var logo = document.getElementById("logo"),
                word = document.getElementById("word");
            logo.addEventListener("click",function(){
                document.querySelector("#mask").classList.add("remove");
            });

            word.addEventListener("click",function(){
                document.querySelector("#mask").classList.add("remove");
            });
            // setTimeout(function(){
            //     document.querySelector("#mask").classList.add("remove");
            //     var mask = document.getElementById("loading-canvas");
            //     delete mask.parentNode.removeChild(mask);
            //     var js = document.getElementById("loading-js");
            //     delete js.parentNode.removeChild(js);
            // },3000);
        // },5000);

    });
    loading.init();
})(window);