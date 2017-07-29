/**
 * Created by Administrator on 2017/6/30.
 */
window.onload=function () {
    imgLocation("container","box");
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"}]};
    window.onscroll=function () {
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent=document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg=document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function  checkFlag() {
    var cparent=document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    //由于box的祖先元素只有container和body，又container没有边框，所以offsetTop直接获取的就是最后一个box的顶端到body顶端的距离
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight< scrollTop + pageHeight){
        return true;
    }
}

function imgLocation(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;
    var columns=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*columns+"px;margin:0 auto;";
    var boxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<columns){
            boxHeightArr[i]=ccontent[i].offsetHeight;
        }else{
            var minHeight=Math.min.apply(null,boxHeightArr);
            var minIndex=getminheight(boxHeightArr,minHeight);
            ccontent[i].style.position="absolute";
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            boxHeightArr[minIndex]=boxHeightArr[minIndex]+ccontent[i].offsetHeight;
        }
    }
}

function getminheight(boxHeightArr,minHeight) {
    for(var i in boxHeightArr){
        if(boxHeightArr[i]==minHeight){
            return i;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr=[];
    var allContent=parent.getElementsByTagName("*");
    for(var i=0;i<allContent.length;i++){
        if(allContent[i].className==content){
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
}