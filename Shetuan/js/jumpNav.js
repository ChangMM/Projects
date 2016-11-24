function jump(class1){
	var navMenu=document.getElementById("top").getElementsByTagName("ul")[0].getElementsByTagName("li");
	for (var i = navMenu.length - 1; i >= 0; i--) {
		if(navMenu[i].className==class1){
			navMenu[i].className+=" selected";
		}
	};
}