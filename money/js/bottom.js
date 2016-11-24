var Cmm = {
	showView : function(viewId){//right main item 转场动画
		var e = app.getRightMainItem(viewId);
        setTimeout(function(){
        		e.classList.remove('hide');
        		var delay = app.hideTheFirst ? 0 : 200;
        		 setTimeout(function(){
           	 	e.classList.add('show');
       		 },delay);
        },200);
        
	},
	hideView : function(viewId){
		var e = app.getRightMainItem(viewId);
        e.classList.remove('show');
        	e.classList.add('hide');
	},
	showBottom : function(){//bottom main div 转场动画
		document.querySelector('.bottom-main').classList.add('bottomIn');
	},
	hideBottom : function(){
		document.querySelector('.bottom-main').classList.remove('bottomIn');
	},
	showTreatmentBanned : function(){
        app.showTipMsg("请先进行具体的诊断");
    },
	showCheckPlanBanned : function(){
        app.showTipMsg("请先描述症状信息");
	},
	showChecking : function(){
        app.showCheckMsg();
    },
	showDogProfile : function(){//点击基本信息后，显示信息框
		if(app.currentPage != 1){
			return;
		}
        document.getElementById('dog-info-cross').addEventListener(app.evtType,Cmm.hideDogProfile);
        document.querySelector('#dog-info').classList.add('active');
    },
	hideDogProfile : function(){//隐藏信息框
        document.querySelector('#dog-info').classList.remove('active');
        document.querySelector('#js-profile').classList.remove('active');
        document.getElementById('dog-info-cross').removeEventListener(app.evtType,Cmm.hideDogProfile);
    },
	ringSpeednormal : function(){//狗周围的光环旋转速度回复正常
        document.querySelector('#dog-main-wrap').classList.remove('active');
    },
	ringSpeedup : function(){//狗周围的光环加速旋转
        document.querySelector('#dog-main-wrap').classList.add('active');
    },
	showCheckItem : function(id){//点击检查项后，将检查结果详情显示出来
        document.getElementById('result-cross-'+id).addEventListener(app.evtType,Cmm.hideCheckItem);
        document.querySelector('#result-info-'+id).classList.add('active');
	},
	hideCheckItem : function(){//remove所有检查结果详情
		var e = document.getElementsByClassName('result-info-panel');
		for(var i = 0; i < e.length; i ++){
			e[i].classList.remove('active');
		}
	},
	showCheckItemEmpty : function(){//所有检查项全为空
        app.showTipMsg("检查项不能为空");
   	},
   	showSubmittingNow : function(){
   		var e = document.querySelector('.submit-wrap');
   		if(e.classList.contains('active')){
   			e.classList.remove('active')
   		}else{
   			return;
   		}
        app.showTipMsg("您的爱犬已完成本次治疗<br>感谢使用智能诊疗系统",2000);
        setTimeout(function(){
        		View.gotoView(1, View.getCurrentPage());
			View.pushHistory(1);
        },2000)
    },
    showDealTime : function(i){ //显示狗狗治疗所需时间 i=0 为 不显示 ， 【1234】 为处方 【ABCD】对应的 时间
		var time_span = document.getElementById("time-span");
        var num;
        if(i ==1 ){
            num = 8;
        }else if(i ==2){
            num = 7.5;
        }else if(i ==3){
            num = 9;
        }else if(i ==4){
            num = 11
        }else{
            num = "";
        }
		time_span.innerHTML = num;
    }
};



var bottom = {
	descList : ['1. 狗狗最近一个多月来，精神不好，不爱吃饭，也不愿意活动。',
				'2. 体重二个月前33公斤，现在28公斤。在别的医院检查过怀疑肝脏问题，抽过腹水。',
				'3. 听诊心音弱，奔马律，心动过速（约165bpm）。股动脉触诊脉搏节律不齐，强弱不等。',
				'4. 呼吸正常，未见肺部异常。'],
    quesList : ["2.狗狗体重有什么变化吗？",
                "3.初步听诊和触诊的症状有哪些？",
                "4.呼吸是否正常？",
    				"4.呼吸是否正常？"],
    checkList : ['1. 血常规检查',
		         '2. 生化检查',
				 '3. X光拍片(腹背位+右侧位)',
    			 	'4. 心电图ECG',
    			 	'5. 血压检查',
                 '6. 胸腔CT检查']
};
var View = {
	history : "1",
	pushHistory : function(history){
		this.history += (history+"")
	},
	popHistory : function(){
		var h = this.history;
		this.history = h.substr(0,h.length-1);
		return h[h.length-1]
	},
	getCurrentPage : function(){
		return this.history[this.history.length-1]
	},
	
	gotoView : function(showId,hideId){
		app.hideTheFirst = (hideId == 1 ? true : false);
		Cmm.hideView(hideId);
		this.hideCallback(hideId);
		Cmm.showView(showId);
		this.showCallback(showId);
		app.currentPage = showId;
		if(showId == 3 || showId == 4){
			document.querySelector('img.animal').src = "./img/left-main/dogpic.jpg";
			document.querySelector('img.animal').classList.add('animal-big');
		}else{
			document.querySelector('img.animal').src = "./img/left-main/animal.png";
			document.querySelector('img.animal').classList.remove('animal-big');
		}
	},
	
	hideCallback : function(viewId){
		if(viewId*1 == 1){
			document.getElementById('js-profile').classList.add('noneopacity');
			document.getElementById('js-illinfo').classList.add('noneopacity');
		}else if(viewId*1 == 4){
			document.querySelector('.frame-1').src = './img/check/frame1.png';
			document.querySelector('.frame-3').src = './img/check/frame3.png';
			document.querySelector('.frame-4').src = './img/check/frame4.png';
			document.querySelector('.line-1').src = './img/check/line1.png';
			document.querySelector('.line-3').src = './img/check/line3.png';
			document.querySelector('.line-4').src = './img/check/line4.png';
			document.getElementById('js-volume-7').classList.add('none');
			document.getElementById('result-panel').classList.remove('active');
			Cmm.hideCheckItem();
		}else if(viewId*1 == 5){
			document.getElementById("js-percent").classList.remove('none');
			document.getElementById("js-percent-2").classList.add('none');
			document.querySelector('.time-wrap').classList.remove('active');
		}
		
//		var opDiv = document.getElementsByClassName('opacityDiv');
//		for(var i = 0; i < opDiv.length; i ++){
//			opDiv[i].classList.remove('on');
//		}
	},
	showCallback : function(viewId){
		switch(viewId*1){
			case 1: Cmm.hideBottom();
					// document.querySelector('.canvas-wrap:nth-child(1)>div').children[3].classList.remove('on');
					var checkInfo = document.getElementsByClassName('check-item');
					for(var i = 0; i < checkInfo.length; i ++){
						checkInfo[i].classList.remove('active')
					}
					document.getElementById('js-profile').classList.remove('active');
					document.getElementById('js-illinfo').classList.remove('active');
					document.getElementById('js-checkinfo').classList.remove('active');
					document.getElementById('js-plan').classList.remove('active');
					document.getElementById('js-treatment').classList.remove('active');	
					document.getElementById('js-profile').classList.remove('noneopacity');
					document.getElementById('js-illinfo').classList.remove('noneopacity');break;
			case 2: document.getElementById("js-next").innerHTML = "进入检查 >";
					var checkInfo = document.getElementsByClassName('check-item');
					for(var i = 0; i < checkInfo.length; i ++){
						checkInfo[i].classList.remove('active')
					}
					break;
			case 3: document.getElementById("js-next").innerHTML = "开始检查 >";
					//选中的检查项显示检查结果
					var checkItemParent = document.getElementById('scrollContainer-3');
					var checkItem = checkItemParent.children;
					var n = 1; 
					for(var i = 0; i < checkItem.length; i ++){
						var t = i + 1;
						if(checkItem[i].classList.contains('active')){
							var e = document.querySelector('.check-item-'+t);
							e.classList.add('active');
						}
					}
					break;
			case 4: document.getElementById("js-next").innerHTML = "生成处方 >";
					document.querySelector('.frame-1').src = './img/check/frame1-err.png';
					document.querySelector('.frame-3').src = './img/check/frame3-err.png';
					document.querySelector('.frame-4').src = './img/check/frame4-err.png';
					document.querySelector('.line-1').src = './img/check/line1-err.png';
					document.querySelector('.line-3').src = './img/check/line3-err.png';
					document.querySelector('.line-4').src = './img/check/line4-err.png';
					document.getElementById('js-volume-7').classList.remove('none');
					if(app.firstTime4){//只有第一次开始检查有百分比的动画效果
						app.firstTime4 = false;
						setTimeout(function(){
							if(app.illinfoNum == 1){
								app.showPercent("illness1",41,6,"狗瘟");
								app.showPercent("illness2",32,32,"肝脏水肿");
								app.showPercent("illness3",25,87,"心力衰竭");
								app.showPercent("illness4",15,0,"感冒");
							}else if(app.illinfoNum == 2){
								app.showPercent("illness1",35,6,"狗瘟");
								app.showPercent("illness2",46,32,"肝脏水肿");
								app.showPercent("illness3",38,87,"心力衰竭");
							}else if(app.illinfoNum == 3){
								app.showPercent("illness1",11,6,"狗瘟");
								app.showPercent("illness2",38,32,"肝脏水肿");
								app.showPercent("illness3",78,87,"心力衰竭");
								app.showPercent("illness4",45,95,"心肌病");
							}else if(app.illinfoNum == 4){
								app.showPercent("illness1",13,6,"狗瘟");
								app.showPercent("illness2",51,32,"肝脏水肿");
								app.showPercent("illness3",83,87,"心力衰竭");
								app.showPercent("illness4",48,95,"心肌病");
							}
						},300)
					}
					//选中的检查项显示检查结果
					var checkItemParent = document.getElementById('scrollContainer-3');
					var checkItem = checkItemParent.children;
					var n = 1; 
					for(var i = 0; i < checkItem.length; i ++){
						var t = i + 1;
						var e = document.querySelector('.js-show:nth-child('+t+')');
						if(checkItem[i].classList.contains('active')){
							e.classList.remove('none');
							e.innerHTML = n + '.' + e.innerHTML.split('.')[1];
							n ++;
							var s = document.querySelector('.check-item-'+t);
							s.classList.add('active');
						}else{
							e.classList.add('none');
						}
					}
					app.treatMentFlag = true;break;
					Cmm.addErrorClass();
			case 5: document.getElementById("js-percent").classList.add('none');
					document.getElementById("js-percent-2").classList.remove('none');
					document.getElementById("js-next").innerHTML = "主菜单 >";
					document.querySelector('.submit-wrap').classList.add('active');
					document.querySelector('.time-wrap').classList.add('active');
					var checkInfo = document.getElementsByClassName('check-item');
					for(var i = 0; i < checkInfo.length; i ++){
						checkInfo[i].classList.remove('active')
					}
					break;
			default:break;
		}
	}
};




var callBack = {
	checkinfo : function(e){
		var e = e.target;
		if(e.tagName == "IMG"){
			e = e.parentNode;
		}
		e.classList.add('active');
		View.gotoView(2,View.getCurrentPage());
		View.pushHistory(2);
		Cmm.showBottom();
	},
	plan : function(e){
		if(!app.checkPlanFlag){
			Cmm.showCheckPlanBanned();
			return ;
		}
		var e = e.target;
		if(e.tagName == "IMG"){
			e = e.parentNode;
		}
		e.classList.add('active');
		View.gotoView(3,View.getCurrentPage());
		View.pushHistory(3);
		Cmm.showBottom();
	},
	treatment : function(e){
		if(!app.treatMentFlag){
			Cmm.showTreatmentBanned();
			return;
		}
		var e = e.target;
		if(e.tagName == "IMG"){
			e = e.parentNode;
		}
		e.classList.add('active');
		View.gotoView(5,View.getCurrentPage());
		View.pushHistory(5);
		Cmm.showBottom();
	},
	illinfo : function(e){
		if(app.currentPage != 1){
			return;
		}
		var e = e.target;
		if(e.tagName == "IMG"){
			e = e.parentNode;
		}
		e.classList.add('active');
		View.gotoView(2,View.getCurrentPage());
		View.pushHistory(2);
		Cmm.showBottom();
	},
	next : function(e){
		if(!app.nextFlag)
			return
		var currentPage = View.getCurrentPage();
		var nextPage = currentPage % 5 + 1;
		if(nextPage == 4){
			if(!app.checkCheckItemNotEmpty()){
				Cmm.showCheckItemEmpty();
				return;
			}
			Cmm.ringSpeedup();
			Cmm.showChecking();
			app.nextFlag = false;
			app.returnbFlag = false;
			app.toggleActiveFlag = false;
			setTimeout(function(){
				Cmm.ringSpeednormal();
				View.gotoView(nextPage, View.getCurrentPage());
				View.pushHistory(nextPage);
				setTimeout(function(){
					app.toggleActiveFlag = true;
					app.nextFlag = true;
					app.returnbFlag = true;
				},600);
			}, 3000)
		}else if(nextPage == 3){
			if(app.checkPlanFlag){
				View.gotoView(nextPage, View.getCurrentPage());
				View.pushHistory(nextPage);
			}else{
				Cmm.showCheckPlanBanned();
			}
		}else if(nextPage == 5){
			var a = document.getElementById('result-panel');
			if(a.classList.contains('active')){
				a.classList.remove('active');
				View.gotoView(nextPage, View.getCurrentPage());
				View.pushHistory(nextPage);
			}else{
				a.classList.add('active');
				document.querySelector('#js-percent .opacityDiv').classList.add('on');
			}
		}else if(nextPage == 1){
			var e = document.querySelector('.submit-wrap');
   			if(e.classList.contains('active')){
				View.gotoView(nextPage, View.getCurrentPage());
				View.pushHistory(nextPage);
   			}else{
   				return;
   			}
		}else{
			View.gotoView(nextPage, View.getCurrentPage());
			View.pushHistory(nextPage);
		}
	},
	returnb : function(e){
		if(!app.returnbFlag)
			return
		var currentPage = View.popHistory();
		if(currentPage == 5){
			document.getElementById("result-panel").classList.add('active');
		}else if(currentPage == 4){
			document.getElementById("result-panel").classList.remove('active');
		}
		View.gotoView(View.getCurrentPage(),currentPage);
	},
	volume : function(e){
		if(app.typingFlag){
			return;
		}
		app.checkPlanFlag = true;
		e = (e.target.tagName == 'DIV' ? e.target : e.target.parentNode);
		var clicktime = e.dataset.clicktime;
		if(e.classList.contains('active')){
			e.classList.remove('active');
			if(clicktime == 5){
				return;
			}
			var p = document.querySelector('#itemContainer>p:nth-child(@)'.replace('@',clicktime));
			p.classList.remove('none');
			app.quesChange = false;
			app.typeContext(bottom.descList[clicktime-1], p);
		}else{
			e.classList.add('active');
			if(e.dataset.clicktime >= 4){
				e.dataset.clicktime = 5;
				return;
			}
			
			e.dataset.clicktime = e.dataset.clicktime*1 + 1;
			app.returnbFlag = false;
			app.nextFlag = false;
		}
	},
	profile : function(e){
		var e = e.target;
		if(e.tagName == "IMG"){
			e = e.parentNode;
		}
		if(e.classList.contains('active')){
			e.classList.remove('active');
			Cmm.hideDogProfile();
		}else{
			e.classList.add('active');
			Cmm.showDogProfile();
		}
	}
};

function detectmob() {
    if (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i) || 
        navigator.userAgent.match(/Windows Phone/i)) 
    {
        return true;
    } else {
        return false;
    }
}

var app = {
	checkPlanFlag : false,
	treatMentFlag : false,
	typingFlag : false,
	quesChange : false,
	firstTime4 : true,
	illinfoNum : 0,
	returnbFlag : true,
	nextFlag : true,
	toggleActiveFlag : true,
	percentFillingNum : 0,
	percent : [0,0,0,0,0,0],
	addIllFlag : 0,
	percentStatus : [0,0,0,0,0,0],
	hideTheFirst : true,
	currentPage: 1,
	evtType : '',
	bindEvt : function(){
        if (detectmob()) {
            app.evtType = "touchend";
        }else{
        		app.evtType = 'click';
        }
		
		var volume = document.getElementById('js-volume'),
            returnb = document.getElementById('js-return'),
            next = document.getElementById('js-next'),
            illinfo = document.getElementById('js-illinfo'),
            checkinfo = document.getElementById('js-checkinfo'),
            plan = document.getElementById('js-plan'),
            profile = document.getElementById('js-profile'),
            tipCross = document.getElementById('tip-cross'),
            treatment = document.getElementById('js-treatment'),
            volume3 = document.getElementById('js-volume-3'),
            submt = document.querySelector('div.submit-wrap');
			
		
		volume.addEventListener(app.evtType, callBack.volume);
		returnb.addEventListener(app.evtType, callBack.returnb);
		next.addEventListener(app.evtType, callBack.next);
		illinfo.addEventListener(app.evtType, callBack.illinfo);
		checkinfo.addEventListener(app.evtType, callBack.checkinfo);
		plan.addEventListener(app.evtType, callBack.plan);
		profile.addEventListener(app.evtType, callBack.profile);
		treatment.addEventListener(app.evtType, callBack.treatment);
		submt.addEventListener(app.evtType, Cmm.showSubmittingNow);
        tipCross.addEventListener(app.evtType,function(){
           app.closeTipMsg();
        });
        
        app.showPercent('t1',57,57,'处方A');
        app.showPercent('t2',45,45,'处方B');
        app.showPercent('t3',31,31,'处方C');
        app.showPercent('t4',13,13,'处方D');
        var a1 = document.getElementById('t1');
        var a2 = document.getElementById('t2');
        var a3 = document.getElementById('t3');
        var a4 = document.getElementById('t4');
        document.getElementById('t1').addEventListener(app.evtType,function(){
        		app.uncheckCheckItem();
        		if(a1.children[3].classList.contains('on')){
        			a1.children[3].classList.remove('on');
        			Cmm.showDealTime(0);
        		}else{
        			a2.children[3].classList.remove('on');
        			a3.children[3].classList.remove('on');
        			a4.children[3].classList.remove('on');
        			a1.children[3].classList.add('on');
        			app.checkCheckItem([1,2]);
        			Cmm.showDealTime(1);
        		}
        });
        document.getElementById('t2').addEventListener(app.evtType,function(){
        		app.uncheckCheckItem();
        		if(a2.children[3].classList.contains('on')){
        			a2.children[3].classList.remove('on');
        			Cmm.showDealTime(0);
        		}else{
        			a1.children[3].classList.remove('on');
        			a3.children[3].classList.remove('on');
        			a4.children[3].classList.remove('on');
        			a2.children[3].classList.add('on');
        			app.checkCheckItem([2,3,4]);
        			Cmm.showDealTime(2);
        		}
        });
        document.getElementById('t3').addEventListener(app.evtType,function(){
        		app.uncheckCheckItem();
        		if(a3.children[3].classList.contains('on')){
        			a3.children[3].classList.remove('on');
        			Cmm.showDealTime(0);
        		}else{
        			a1.children[3].classList.remove('on');
        			a2.children[3].classList.remove('on');
        			a4.children[3].classList.remove('on');
        			a3.children[3].classList.add('on');
        			app.checkCheckItem([1,4]);
        			Cmm.showDealTime(3);
        		}
        });
        document.getElementById('t4').addEventListener(app.evtType,function(){
        		app.uncheckCheckItem();
        		if(a4.children[3].classList.contains('on')){
        			a4.children[3].classList.remove('on');
        			Cmm.showDealTime(0);
        		}else{
        			a1.children[3].classList.remove('on');
        			a3.children[3].classList.remove('on');
        			a2.children[3].classList.remove('on');
        			a4.children[3].classList.add('on');
        			app.checkCheckItem([1,3]);
        			Cmm.showDealTime(4);
        		}
        });
        
        document.getElementById('js-volume-7').addEventListener(app.evtType, function(){
        		var e = document.getElementById('js-volume-7');
        		if(e.classList.contains('active')){
        			e.classList.remove('active');
        			if(app.addIllFlag){
        				return;
        			}
        			app.addIllFlag = true;
        			for(var i = 0; i < 6; i ++){
        				if(app.percent[i] == 0){
        					i ++;
        					app.showPercent('illness'+i,99,100,"心肌炎");
        					document.querySelector("#illness"+i+" .percentText").classList.add('t_100');
        					var opDiv = document.getElementsByClassName('opacityDiv');
						for(var j = 0; j < opDiv.length; j ++){
							opDiv[j].classList.remove('on');
						}
						var s = document.getElementById("illness"+i)
						s.children[3].classList.add('on');
						var a = document.getElementById('result-panel').classList.add('active');
						break;
        				}
        			}
        		}else{
        			e.classList.add('active');
        		}
        });
        
        var volume5 = document.getElementById('js-volume-5');
        volume5.addEventListener(app.evtType,function(){
        		if(app.typingFlag){
				return;
			}
			if(volume5.classList.contains('active')){
				volume5.classList.remove('active');
				var a = document.querySelector('#treatmentContainer>p.none');
				if(!a) return;
				var p = document.createElement('p');
				p.setAttribute('class','text-item');
				document.getElementById('treatmentContainer').appendChild(p);
				app.typeLetter2(a.innerText.trim(),p,0);
				a.remove();
			}else{
				volume5.classList.add('active');
			}
        });
		volume3.addEventListener(app.evtType, function(){
			if(app.typingFlag){
				return;
			}
			if(volume3.classList.contains('active')){
				volume3.classList.remove('active');
				var a = document.querySelector('#conclude-container>p.none');
				if(!a) return;
				var p = document.createElement('p');
				document.getElementById('conclude-container').appendChild(p);
				app.typeLetter2(a.innerText.trim(),p,0);
				a.remove();
			}else{
				volume3.classList.add('active');
			}
		});
        
       	var a = document.querySelector('#result-panel .submit-button');
        a.addEventListener(app.evtType, function(){
        		if(app.typingFlag){
				return;
			}
        		callBack.next();
        });
        document.getElementById('conclude-cross').addEventListener(app.evtType,function(){
        		if(app.typingFlag){
				return;
			} 
			var e = document.querySelector('#js-percent .opacityDiv.on');
        		if(e){
        			e = e.classList.remove('on');
        		}
        		document.getElementById('result-panel').classList.remove('active');
        });
        
        //检查项的语音输入
        	var v2 = document.getElementById('js-volume-2');	
        	v2.addEventListener(app.evtType, function(e){
        		if(v2.classList.contains('active')){
        			v2.classList.remove('active');
        			var e = document.querySelector('#scrollContainer-3>p:nth-child(7)');
        			e.classList.remove('none');
        			e.classList.add('active');
        			document.querySelector('.check-item-7').classList.add('active');
        			document.getElementById('scrollContainer-3').scrollTop = 1000;
        		}else{
        			v2.classList.add('active');
        		}
        	});
		
		var activeElements = document.getElementsByClassName('js-active');
		for(var i = 0; i < activeElements.length; i ++){
			activeElements[i].addEventListener(app.evtType,app.toggleActive)
		}
		
		var showElements = document.getElementsByClassName('js-show');
		for(var i = 0; i < showElements.length; i ++){
			showElements[i].addEventListener(app.evtType,app.showView);
		}
		
		var percentElements = document.getElementsByClassName('canvas-wrap');
		for(var i = 0; i < percentElements.length; i ++){
			percentElements[i].addEventListener(app.evtType,app.percentClick);
		}
		
		var resultCross = document.getElementsByClassName('result-cross');
		for(var i = 0; i < resultCross.length; i ++){
			resultCross[i].addEventListener(app.evtType,Cmm.hideCheckItem);
		}
	},
	percentClick : function(e){
		if(app.currentPage == 4){
			var a = e.target;
			while(!a.classList || !a.classList.contains('canvas-wrap')){
				a = a.parentElement;
			}
			a = a.children[1];
			if(a.children.length == 4){
				if(a.children[3].classList.contains('on')){
					a.children[3].classList.remove('on');
					document.getElementById('result-panel').classList.remove('active');
				}else{
					var opDiv = document.getElementsByClassName('opacityDiv');
					for(var i = 0; i < opDiv.length; i ++){
						opDiv[i].classList.remove('on');
					}
					a.children[3].classList.add('on');
					var ts = document.getElementById('result-panel');
					if(ts.classList.contains('active')){
						ts.classList.remove('active');
						setTimeout(function(){
							ts.classList.add('active');
						},200)
					}else{
						ts.classList.add('active');
					}
				}
			}
		}
		if(app.currentPage != 3)//只有检查项选择页面才能点击按钮
		{
			return;
		}
		var a = e.target;
		while(!a.classList || !a.classList.contains('canvas-wrap')){
			a = a.parentElement;
		}
		var s = a.children[1];
		if(s.children.length == 4){//可选项
			var t = s.children[2].innerText.trim();
			if(s.children[3].classList.contains('on')){//光圈由亮变暗
				s.children[3].classList.remove('on')
				var a = s.id[7];
				a --;
				app.percentStatus[a] = 0;
				if(app.currentPage == 3){
					if(t == "心力衰竭"){
						app.uncheckCheckItem();
					}else if(t == "肝脏水肿"){
						app.uncheckCheckItem();
					}else if(t == "狗瘟"){
						app.uncheckCheckItem();
					}else if(t == "心肌病"){
						app.uncheckCheckItem();
					}else if(t == "感冒"){
						app.uncheckCheckItem();
					}
				}
//				else if(app.currentPage == 5){
//					if(t == "感冒"){
//						app.uncheckCheckItem([1,2]);
//					}else if(t == "传染病"){
//						app.uncheckCheckItem([3,4]);
//					}else if(t == "疟疾"){
//						app.uncheckCheckItem([5]);
//					}
//				}
			}else{//光圈由暗变亮
//				消除所有圆的光晕
//				var opDiv = document.getElementsByClassName('opacityDiv');
//				for(var i = 0; i < opDiv.length; i ++){
//					opDiv[i].classList.remove('on');
//				}
//				消除所有检查项的指向狗的样式
//				var checkInfo = document.getElementsByClassName('check-item');
//				for(var i = 0; i < checkInfo.length; i ++){
//					checkInfo[i].classList.remove('active')
//				}
		
				var a = s.id[7];
				a --;
				app.percentStatus[a] = 1;
				
				s.children[3].classList.add('on');
				
				if(app.currentPage == 3){
					if(t == "心力衰竭"){
						//app.clearCheckItem();
						app.checkCheckItem([1,2,3,4,5]);
					}else if(t == "肝脏水肿"){
						//app.clearCheckItem();
						app.checkCheckItem([1,2,3,5]);
					}else if(t == "狗瘟"){
						//app.clearCheckItem();
						app.checkCheckItem([1,2,4]);
					}else if(t == "心肌病"){
						app.checkCheckItem([1,3,4,5]);
					}else if(t == "感冒"){
						app.checkCheckItem([3,4,5]);
					}
				}
//				else if(app.currentPage == 5){
//					if(t == "心力衰竭"){
//						app.checkCheckItem([1,2]);
//					}else if(t == "肝脏水肿"){
//						app.checkCheckItem([3,4]);
//					}else if(t == "狗瘟"){
//						app.checkCheckItem([5]);
//					}
//				}
			}
		}
	},
	checkCheckItem : function(arr){
		var isN3 = (app.currentPage == 3);
		var page_5 = (app.currentPage == 5? " .panel-item-2 " : "");
		for(var i = 0; i < arr.length; i ++){
			var e = document.querySelector('#js-item-'+app.currentPage+page_5+' .panel-content-wrap .panel-content>p:nth-child('+arr[i]+')');
			e.classList.add('active');
			if(arr[i] > 5){
				document.getElementById('scrollContainer-'+app.currentPage).scrollTop = 1000;
			}
			if(arr[i] == 1){
				document.getElementById('scrollContainer-'+app.currentPage).scrollTop = 0;
			}
			if(isN3){
				var e = document.querySelector('.check-list-wrap>div.check-item-'+arr[i]);
				e.classList.add('active');
			}
		}
	},
	uncheckCheckItem : function(){
		var page_5 = (app.currentPage == 5? " .panel-item-2 " : "");
		for(var i = 1; i < 8; i ++){
			var e = document.querySelector('#js-item-'+app.currentPage+page_5+' .panel-content-wrap .panel-content>p:nth-child('+i+')');
			if(!e){
				break;
			}
			e.classList.remove('active');
			var x = document.querySelector('.check-list-wrap>div.check-item-'+i);
			x.classList.remove('active');
		}
		if(page_5){
			return;
		}
		for(var i = 0; i < 6; i ++){
			if(app.percentStatus[i] == 1){
				var t = document.querySelector('#illness'+(i+1)+'>p.illName').innerText;
				if(t == "心力衰竭"){
					//app.clearCheckItem();
					app.checkCheckItem([1,2,3,4,5]);
				}else if(t == "肝脏水肿"){
					//app.clearCheckItem();
					app.checkCheckItem([1,2,3,5]);
				}else if(t == "狗瘟"){
					//app.clearCheckItem();
					app.checkCheckItem([1,2,4]);
				}else if(t == "心肌病"){
					app.checkCheckItem([1,3,4,5]);
				}else if(t == "感冒"){
					app.checkCheckItem([3,4,5]);
				}
			}
		}
	},
	clearCheckItem : function(){
		var e = document.querySelector('#js-item-3 .panel-content-wrap .panel-content');	
		e = e.children;
		for(var i = 0; i < e.length; i ++){
			e[i].classList.remove('active');
		}
	},
	showView : function(e){
		if(e.target.classList.contains('show')){
			e.target.classList.remove('show');
			Cmm.hideCheckItem();
		}else{
			e.target.classList.add('show');
			var id = e.target.dataset.id;
			Cmm.hideCheckItem();
			Cmm.showCheckItem(id);
		}
	},
	toggleActive : function(e){
		if(!app.toggleActiveFlag){
			return;
		}
		var t = e.target;
		while(t.tagName != 'DIV' && t.tagName != 'P'){
			t = t.parentNode;
		}
		
		var p = t.parentElement;
		if(t.classList.contains('active')){
			t.classList.remove('active')
			if(p.id == 'scrollContainer-3'){
				var index = t.innerHTML.trim().split('.')[0];
				//var e = document.getElementsByClassName('check-item-'+index);
				var e = document.getElementById('check-item-'+index);
				e.classList.remove('active');
			}
		}else{
			t.classList.add('active');
			if(p.id == 'scrollContainer-3'){
				var index = t.innerHTML.trim().split('.')[0];
				//var e = document.getElementsByClassName('check-item-'+index);
				var e = document.getElementById('check-item-'+index);
				e.classList.add('active');
			}
		}
	},
	showPercent : function(canvasContainerId,startPercent,endPercent,illName){
		var id = canvasContainerId;
		if(app.currentPage != 1){
			app.percentFillingNum ++;
			id = canvasContainerId.replace('illness','');
			app.percent[id-1] = endPercent;
		}
		var canvas = document.createElement('canvas'),context = canvas.getContext('2d'),p1 = document.createElement('p'),p2 = document.createElement('p'),span1 = document.createElement('span'),span2 = document.createElement('span');
		var opacityDiv = document.createElement('div');
		opacityDiv.setAttribute('class', 'opacityDiv');
		p1.setAttribute('class','percentText');
		p1.appendChild(span1);
		p1.appendChild(span2);
		p2.setAttribute("class", "illName");
		p2.innerHTML = illName;
		
		span1.innerText = startPercent;
		span2.innerText = "%";
		document.getElementById(canvasContainerId).innerHTML = "";
		document.getElementById(canvasContainerId).appendChild(canvas);
		document.getElementById(canvasContainerId).appendChild(p1);
		document.getElementById(canvasContainerId).appendChild(p2);
		document.getElementById(canvasContainerId).appendChild(opacityDiv);
		this.drawPercent(startPercent,endPercent,canvas,context,span1);
	},
	drawPercent : function(startPercent,endPercent,canvas,context,span1){
		var now = span1.textContent;
		var add = true;
		
		if(endPercent < startPercent){
			add = false;
		}
		if(add){
			now = now*1 	+ 1;
		}else{
			now = now*1 - 1;
		}
		span1.textContent = now;
		canvas.width  = 88;
	    canvas.height = 88;
		var rS = 1.5*Math.PI;
		var rE = 1.5*Math.PI + 2*Math.PI*now/100;
		context.lineWidth = 5;
		context.strokeStyle = "#3ea3e8";
		context.arc(43.2,44.5,41,rS,rE,false);
		context.stroke();
		
		if((add && now < endPercent) || (!add && now > endPercent)){
			var rate = app.getRate(startPercent,endPercent,now);
			setTimeout(function(){
				app.drawPercent(startPercent,endPercent,canvas,context,span1);
			},rate);
		}else{
			if(endPercent == 0){
				setTimeout(function(){
					var e = span1.parentElement.parentElement;
					e.innerHTML = "";
				},200)
			}
			app.percentFillingNum --;
			if(app.percentFillingNum <= 0){
				app.percentFillingNum = 0;
				setTimeout(function(){
					app.adjustOrder();
				},500)
			}
			return ;
		}
	},
	getRate : function(){
		return 30;
	},
	typeContext : function(content, p){
		if(!app.quesChange){
			Cmm.ringSpeedup();
		}
		var index = 0;
		this.typeLetter(content, p, index);
	},
	typeLetter : function(content, p, index){
		if(content.length < (index+1)){
			return;
		}
		app.typingFlag = true;
		p.innerText += content[index];
		document.getElementById('itemContainer').scrollTop = 1000;
		index ++;
		if(index == content.length){
			var clicktime = document.getElementById('js-volume').dataset.clicktime*1;
			app.typingFlag = false;
			if(!app.quesChange){
				Cmm.ringSpeednormal();
				setTimeout(function(){
					if(clicktime == 1){
						app.showPercent("illness1",0,41,"狗瘟");
						app.showPercent("illness2",0,32,"肝脏水肿");
						app.showPercent("illness3",0,25,"心力衰竭");
						app.showPercent("illness4",0,15,"感冒");
					}else if(clicktime == 2){
						app.showPercent("illness1",41,35,"狗瘟");
						app.showPercent("illness2",32,46,"肝脏水肿");
						app.showPercent("illness3",25,38,"心力衰竭");
						app.showPercent("illness4",15,0,"感冒");
					}else if(clicktime == 3){
						app.showPercent("illness1",35,11,"狗瘟");
						app.showPercent("illness2",46,38,"肝脏水肿");
						app.showPercent("illness3",38,78,"心力衰竭");
						app.showPercent("illness4",0,45,"心肌病");
					}else if(clicktime == 4){
						app.showPercent("illness1",11,13,"狗瘟");
						app.showPercent("illness2",38,51,"肝脏水肿");
						app.showPercent("illness3",78,83,"心力衰竭");
						app.showPercent("illness4",45,48,"心肌病");
					}
					app.illinfoNum = (clicktime <= 4 ? clicktime : 4) ;
					app.quesChange = true;
					setTimeout(function(){app.changeRecommendQues(clicktime)},2000)
					
				},200);
			}
			return;
		}
		setTimeout(function(){
			app.typeLetter(content, p, index);
		},40);
	},
	typeLetter2 : function(content, p, index){
		if(content.length < (index+1)){
			return;
		}
		app.typingFlag = true;
		p.innerText += content[index];
		document.getElementById('conclude-container').scrollTop = 1000;
		document.getElementById('treatmentContainer').scrollTop = 1000;
		index ++;
		if(index == content.length){
			var clicktime = document.getElementById('js-volume').dataset.clicktime*1;
			app.typingFlag = false;
			return;
		}
		setTimeout(function(){
			app.typeLetter2(content, p, index);
		},40);
	},
	adjustOrder : function(){
		var order = [1,2,3,4,5,6];
		for(var i = 0; i < 6; i ++){
			var b = app.percent[i];
			if(b == 0){
				break
			}
			var k = 0;
			for(var j = 0; j < 6; j ++){
				if(app.percent[j] > b){
					k ++;
				}
			}
			order[k] = (i+1); 
		}
		var rootNode = document.getElementById("js-percent");
		for(var i = 0; i < 6; i ++){
			var e = document.getElementById("illness"+order[i]).parentElement;
			rootNode.appendChild(e);
		}
	},
	getRightMainItem : function(viewId){
		var e = document.getElementById("js-item-"+viewId);
		return e;
	},
	changeRecommendQues : function(index){
		index --;
		var p = document.getElementById('js-question');
		p.innerHTML = bottom.quesList[index];
		setTimeout(function(){
			app.returnbFlag = true;
			app.nextFlag = true;
		},100)
	//	app.typeContext(bottom.quesList[index],p);
	},
	checkCheckItemNotEmpty : function(){
		var test = document.querySelector('#js-item-3 .panel-content-wrap p.active');
		if(test == null){
			return false;
		}else{
			return true;
		}
	},
    showTipMsg : function(msg,time){
        var obj  = document.querySelector('#tip-panel'),
            word = document.querySelector('#tip-word');
        word.innerHTML = msg;

        obj.classList.add('active');
        time = time || 1500;
        setTimeout(function(){
            obj.classList.remove('active');
        },time);
    },
    closeTipMsg : function(){
        var obj  = document.querySelector('#tip-panel');
        obj.classList.remove('active');
    },
    showCheckMsg :function(){
        var obj  = document.querySelector('#check-panel'),
            percent = document.getElementById('check-percent'),
            bar = document.getElementById('loading-bar');
        obj.classList.add('active');
        var flag = 1;
        var timer = setInterval(function(){
            if(flag>=100){
                clearInterval(timer);
                setTimeout(function(){
                    app.hideCheckMsg();
                },300);
            }else{
                flag++;
                percent.innerHTML = flag;
                bar.style.left=(240/100)*flag+(-240)+"px";
            }
        },30)
    },
    hideCheckMsg :function(){
        var obj  = document.querySelector('#check-panel');
        obj.classList.remove('active');
    }
};
app.bindEvt();




