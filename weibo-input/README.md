#weibo-input
##实现的功能具体有：
####1、输入@后，如果@后面没有空格，当光标处于@后或紧挨@后面的文字后面时会弹出提示框
####2、弹出的提示框的信息是根据光标前，@后的字符的信息筛选的
####3、筛选不仅可以实现英文，汉字，拼音的筛选
####4、可以用上下键+回车键选择提示框中的名字
####5、提示框可以根据光标的移动自动变化位置，而且这一点实现的比较巧妙，值得学习与借鉴
####6、还有一个bug是如果原文是自动换行的话，提示框的位置会有问题，这点新浪围应该是对结尾处进行了判断（我也不太清楚）