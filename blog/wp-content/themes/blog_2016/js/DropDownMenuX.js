function DropDownMenuX(id){this.type="horizontal";this.delay={"show":0,"hide":400}
this.position={"level1":{"top":0,"left":0},"levelX":{"top":0,"left":0}}
this.fixIeSelectBoxBug=true;this.zIndex={"visible":500,"hidden":-1};this.browser={"ie":Boolean(document.body.currentStyle),"ie5":(navigator.appVersion.indexOf("MSIE 5.5")!=-1||navigator.appVersion.indexOf("MSIE 5.0")!=-1),"ie6":(navigator.appVersion.indexOf("MSIE 6.0")!=-1)};if(!this.browser.ie){this.browser.ie5=false;this.browser.ie6=false;}
this.init=function(){if(!document.getElementById(this.id)){return alert("DropDownMenuX.init() failed. Element '"+this.id+"' does not exist.");}
if(this.type!="horizontal"&&this.type!="vertical"){return alert("DropDownMenuX.init() failed. Unknown menu type: '"+this.type+"'");}
if(this.browser.ie&&this.browser.ie5){fixWrap();}
fixSections();parse(document.getElementById(this.id).childNodes,this.tree,this.id);}
function fixSections(){var arr=document.getElementById(self.id).getElementsByTagName("div");var sections=new Array();var widths=new Array();for(var i=0;i<arr.length;i++){if(arr[i].className=="section"){sections.push(arr[i]);}}
for(var i=0;i<sections.length;i++){widths.push(getMaxWidth(sections[i].childNodes));}
for(var i=0;i<sections.length;i++){sections[i].style.width=(widths[i])+"px";}
if(self.browser.ie){for(var i=0;i<sections.length;i++){setMaxWidth(sections[i].childNodes,widths[i]);}}}
function fixWrap(){var elements=document.getElementById(self.id).getElementsByTagName("a");for(var i=0;i<elements.length;i++){if(/item2/.test(elements[i].className)){elements[i].innerHTML='<div nowrap="nowrap">'+elements[i].innerHTML+'</div>';}}}
function getMaxWidth(nodes){var maxWidth=0;for(var i=0;i<nodes.length;i++){if(nodes[i].nodeType!=1||/section/.test(nodes[i].className)){continue;}
if(nodes[i].offsetWidth>maxWidth){maxWidth=nodes[i].offsetWidth;}}
return maxWidth;}
function setMaxWidth(nodes,maxWidth){for(var i=0;i<nodes.length;i++){if(nodes[i].nodeType==1&&/item2/.test(nodes[i].className)&&nodes[i].currentStyle){if(self.browser.ie5){nodes[i].style.width=(maxWidth)+"px";}else{nodes[i].style.width=(maxWidth-parseInt(nodes[i].currentStyle.paddingLeft)-parseInt(nodes[i].currentStyle.paddingRight))+"px";}}}}
function parse(nodes,tree,id){for(var i=0;i<nodes.length;i++){if(1!=nodes[i].nodeType){continue;}
switch(true){case /\bitem1\b/.test(nodes[i].className):nodes[i].id=id+"-"+tree.length;tree.push(new Array());nodes[i].onmouseover=itemOver;nodes[i].onmouseout=itemOut;break;case /\bitem2\b/.test(nodes[i].className):nodes[i].id=id+"-"+tree.length;tree.push(new Array());nodes[i].onmouseover=itemOver;nodes[i].onmouseout=itemOut;break;case /\bsection\b/.test(nodes[i].className):nodes[i].id=id+"-"+(tree.length-1)+"-section";nodes[i].onmouseover=sectionOver;nodes[i].onmouseout=sectionOut;var box1=document.getElementById(id+"-"+(tree.length-1));var box2=document.getElementById(nodes[i].id);var el=new Element(box1.id);if(1==el.level){if("horizontal"==self.type){box2.style.top=box1.offsetTop+box1.offsetHeight+self.position.level1.top+"px";if(self.browser.ie5){box2.style.left=self.position.level1.left+"px";}else{box2.style.left=box1.offsetLeft+self.position.level1.left+"px";}}else if("vertical"==self.type){box2.style.top=box1.offsetTop+self.position.level1.top+"px";if(self.browser.ie5){box2.style.left=box1.offsetWidth+self.position.level1.left+"px";}else{box2.style.left=box1.offsetLeft+box1.offsetWidth+self.position.level1.left+"px";}}}else{box2.style.top=box1.offsetTop+self.position.levelX.top+"px";box2.style.left=box1.offsetLeft+box1.offsetWidth+self.position.levelX.left+"px";}
self.sections.push(nodes[i].id);self.sectionsShowCnt.push(0);self.sectionsHideCnt.push(0);if(self.fixIeSelectBoxBug&&self.browser.ie6){nodes[i].innerHTML=nodes[i].innerHTML+'';}
break;}
if(nodes[i].childNodes){if(/\bsection\b/.test(nodes[i].className)){parse(nodes[i].childNodes,tree[tree.length-1],id+"-"+(tree.length-1));}else{parse(nodes[i].childNodes,tree,id);}}}}
function itemOver(){self.itemShowCnt++;var id_section=this.id+"-section";if(self.visible.length){var el=new Element(self.visible.getLast());el=document.getElementById(el.getParent().id);if(/item\d-active/.test(el.className)){el.className=el.className.replace(/(item\d)-active/,"$1");}}
if(self.sections.contains(id_section)){clearTimers();self.sectionsHideCnt[self.sections.indexOf(id_section)]++;var cnt=self.sectionsShowCnt[self.sections.indexOf(id_section)];var timerId=setTimeout(function(a,b){return function(){self.showSection(a,b);}}(id_section,cnt),self.delay.show);self.timers.push(timerId);}else{if(self.visible.length){clearTimers();var timerId=setTimeout(function(a,b){return function(){self.showItem(a,b);}}(this.id,self.itemShowCnt),self.delay.show);self.timers.push(timerId);}}}
function itemOut(){self.itemShowCnt++;var id_section=this.id+"-section";if(self.sections.contains(id_section)){self.sectionsShowCnt[self.sections.indexOf(id_section)]++;if(self.visible.contains(id_section)){var cnt=self.sectionsHideCnt[self.sections.indexOf(id_section)];var timerId=setTimeout(function(a,b){return function(){self.hideSection(a,b);}}(id_section,cnt),self.delay.hide);self.timers.push(timerId);}}}
function sectionOver(){self.sectionsHideCnt[self.sections.indexOf(this.id)]++;var el=new Element(this.id);var parent=document.getElementById(el.getParent().id);if(!/item\d-active/.test(parent.className)){parent.className=parent.className.replace(/(item\d)/,"$1-active");}}
function sectionOut(){self.sectionsShowCnt[self.sections.indexOf(this.id)]++;var cnt=self.sectionsHideCnt[self.sections.indexOf(this.id)];var timerId=setTimeout(function(a,b){return function(){self.hideSection(a,b);}}(this.id,cnt),self.delay.hide);self.timers.push(timerId);}
this.showSection=function(id,cnt){if(typeof cnt!="undefined"){if(cnt!=this.sectionsShowCnt[this.sections.indexOf(id)]){return;}}
this.sectionsShowCnt[this.sections.indexOf(id)]++;if(this.visible.length){if(id==this.visible.getLast()){return;}
var el=new Element(id);var parents=el.getParentSections();for(var i=this.visible.length-1;i>=0;i--){if(parents.contains(this.visible[i])){break;}else{this.hideSection(this.visible[i]);}}}
var el=new Element(id);var parent=document.getElementById(el.getParent().id);if(!/item\d-active/.test(parent.className)){parent.className=parent.className.replace(/(item\d)/,"$1-active");}
if(document.all){document.getElementById(id).style.display="block";}
document.getElementById(id).style.visibility="visible";document.getElementById(id).style.zIndex=this.zIndex.visible;if(this.fixIeSelectBoxBug&&this.browser.ie6){var div=document.getElementById(id);var iframe=document.getElementById(id+"-iframe");iframe.style.width=div.offsetWidth+parseInt(div.currentStyle.borderLeftWidth)+parseInt(div.currentStyle.borderRightWidth);iframe.style.height=div.offsetHeight+parseInt(div.currentStyle.borderTopWidth)+parseInt(div.currentStyle.borderBottomWidth);iframe.style.top=-parseInt(div.currentStyle.borderTopWidth);iframe.style.left=-parseInt(div.currentStyle.borderLeftWidth);iframe.style.zIndex=div.style.zIndex-1;iframe.style.display="block";}
this.visible.push(id);}
this.showItem=function(id,cnt){if(typeof cnt!="undefined"){if(cnt!=this.itemShowCnt){return;}}
this.itemShowCnt++;if(this.visible.length){var el=new Element(id+"-section");var parents=el.getParentSections();for(var i=this.visible.length-1;i>=0;i--){if(parents.contains(this.visible[i])){break;}else{this.hideSection(this.visible[i]);}}}}
this.hideSection=function(id,cnt){if(typeof cnt!="undefined"){if(cnt!=this.sectionsHideCnt[this.sections.indexOf(id)]){return;}
if(id==this.visible.getLast()){for(var i=this.visible.length-1;i>=0;i--){this.hideSection(this.visible[i]);}
return;}}
var el=new Element(id);var parent=document.getElementById(el.getParent().id);if(/item\d-active/.test(parent.className)){parent.className=parent.className.replace(/(item\d)-active/,"$1");}
document.getElementById(id).style.zIndex=this.zIndex.hidden;document.getElementById(id).style.visibility="hidden";if(document.all){document.getElementById(id).style.display="none";}
if(this.fixIeSelectBoxBug&&this.browser.ie6){var iframe=document.getElementById(id+"-iframe");iframe.style.display="none";}
if(this.visible.contains(id)){if(id==this.visible.getLast()){this.visible.pop();}else{return;}}else{return;}
this.sectionsHideCnt[this.sections.indexOf(id)]++;}
function Element(id){this.menu=self;this.id=id;this.getLevel=function(){var s=this.id.substr(this.menu.id.length);return s.substrCount("-");}
this.getParent=function(){var s=this.id.substr(this.menu.id.length);var a=s.split("-");a.pop();return new Element(this.menu.id+a.join("-"));}
this.hasParent=function(){var s=this.id.substr(this.menu.id.length);var a=s.split("-");return a.length>2;}
this.hasChilds=function(){return Boolean(document.getElementById(this.id+"-section"));}
this.getParentSections=function(){var s=this.id.substr(this.menu.id.length);s=s.substr(0,s.length-"-section".length);var a=s.split("-");a.shift();a.pop();var s=this.menu.id;var parents=[];for(var i=0;i<a.length;i++){s+=("-"+a[i]);parents.push(s+"-section");}
return parents;}
this.level=this.getLevel();}
function clearTimers(){for(var i=self.timers.length-1;i>=0;i--){clearTimeout(self.timers[i]);self.timers.pop();}}
var self=this;this.id=id;this.tree=[];this.sections=[];this.sectionsShowCnt=[];this.sectionsHideCnt=[];this.itemShowCnt=0;this.timers=[];this.visible=[];}
if(typeof Array.prototype.indexOf=="undefined"){Array.prototype.indexOf=function(item){for(var i=0;i<this.length;i++){if(this[i]===item){return i;}}
return-1;}}
if(typeof Array.prototype.contains=="undefined"){Array.prototype.contains=function(s){for(var i=0;i<this.length;i++){if(this[i]===s){return true;}}
return false;}}
if(typeof String.prototype.substrCount=="undefined"){String.prototype.substrCount=function(s){return this.split(s).length-1;}}
if(typeof Array.prototype.getLast=="undefined"){Array.prototype.getLast=function(){return this[this.length-1];}}
function ShowHideDiv(val)
{if(val=='Show'){document.getElementById('inquiry-div').style.display='';}else{document.getElementById('inquiry-div').style.display='none';}}
function hidestyle(val)
{var dispvar;if(val=='_vName_CALLBACK')
dispvar='Name';if(val=='_vEmail_CALLBACK')
dispvar='E-mail';if(val=='_vPhone_CALLBACK')
dispvar='Phone';if(val=='_vComment_CALLBACK')
dispvar='Comment';if(Trim(document.getElementById(val).value)!=''&&document.getElementById(val).value!=dispvar)
document.getElementById(val).className='input';else
{document.getElementById(val).className='input-red';document.getElementById(val).value=dispvar;}}
function toggle(theDiv){var elem=document.getElementById(theDiv);elem.style.display=(elem.style.display=="none")?"":"none";}
function hideshowid(num)
{for(i=1;i<=75;i++)
{document.getElementById("question"+i).style.display="none";}
document.getElementById("question"+num).style.display="";}