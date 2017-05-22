var ar =[];ar[0]=[0,0,0,0];ar[1]=[0,0,0,0];ar[2]=[0,0,0,0];ar[3]=[0,0,0,0];
var temp=[0,0,0,0,0];
var startTime=new Date().getSeconds();
var move=0;
var score=0;
var change=1;
window.onload=listenKey;
//数字刷新
function shuaxin(){   
    for(var i = 0 ; i < 4;i++){
         for(var j = 0;j <4;j++){
             var k=i*4+j+1;
             var id="in"+k;
             var x0=document.getElementById(id);
             if(ar[i][j]==0){
                x0.value=" ";
            }
             else{
                x0.value=ar[i][j];
            }
        }
    }
    var moveValue=document.getElementById("move");
    moveValue.value=move;
    var scoreValue=document.getElementById("score");
    scoreValue.value=score;
    gameover=gameOverJudge(ar);
}
//键盘事件处理函数
function getKey(event){
    var e = event|| window.event;
    var keycode = e.which ? e.which : e.keyCode;
    var value=e.target.value;
    if(!gameOverJudge(ar)){  //游戏继续
        var judge=(!gameOverJudge(ar))&&whiteSpace(ar);
        //向上移动
        if(keycode == 38||value=='上'){
            moveUp();
            if(judge){
                rand();
            }
            shuaxin();
        }
        //向左移动
        if(keycode == 37||value=='左'){
            moveLeft();
            if(judge){
                rand();
            }
            shuaxin();
        }
        //向右移动
        if(keycode == 39||value=='右'){
            moveRight();
            if(judge){
                rand();
            }
            shuaxin();
        }
        //向下移动
        if(keycode == 40||value=='下'){
            moveDown();
            if(judge){
                rand();
            }
            shuaxin();
        } 
    }else{//游戏结束
        var endTime=new Date().getSeconds();
        alert("游戏结束"+"您的成绩是"+score+'\n'+'用时'+Math.ceil((endTime-startTime)/1000)+'秒');
        //游戏重置
        ar =[0,0,0,0];
        ar[0]=[0,0,0,0];
        ar[1]=[0,0,0,0];
        ar[2]=[0,0,0,0];
        ar[3]=[0,0,0,0];
        temp=[0,0,0,0,0];
        move=0;
        score=0;
        change=1;
        return ;
    }  
}
//事件监听
function listenKey (){
    // if(gameover)
    if (document.addEventListener){
        document.addEventListener("keyup",getKey,false);
    }else if (document.attachEvent){
        document.attachEvent("onkeyup",getKey);
    }else{
        document.onkeyup = getKey;
    }
}
//数字相加
function add(){
    var i,t=0,change=0;
    //如果某方向有空白，则继续向某方向移动
    do{
        for(i=0;i<=3;i++){
            if(temp[i]==0){
                if(temp[i]!=temp[i+1]){
                    change=1;
                }
                temp[i]=temp[i+1];
                temp[i+1]=0;
            }
        }
        t++;
    }while(t<=3);

    //合并运算,计算积分
    for(i=1;i<=3;i++){
        if(temp[i]==temp[i-1]){
            // if(temp!=0){
                change=1;
                score=score+temp[i]*2;
            // }
            temp[i-1]=temp[i-1]*2;
            temp[i]=0;
        }
    }
    //数字移动
    do{
        for(i=0;i<=3;i++){
            if(temp[i]==0){
                temp[i]=temp[i+1];
                temp[i+1]=0;
            }
        }
        t++;
    }while(t<=3);
    return change;
}
//生成随机数
function rand(){
    var i,j;
    do{
        i=(Math.floor(Math.random()*(3-0+1)+0));
        j=(Math.floor(Math.random()*(3-0+1)+0));
    }while(ar[i][j]!=0);

    ar[i][j]=(2*Math.floor(Math.random()*(2-1+1)+1));
    move++;
}
//判断游戏是否结束
function gameOverJudge(ar){
    var gameover1=true,gameover2=true,gameover3=true;
    //判断表中是否有空白
    for(var i=0;i<=3;i++){
        for(var j=0;j<=3;j++){
            if(ar[i][j]==0){
                gameover1=false;
            }
        }
    }
    //判断每一行是否存在可以合并的表格
    for(var i=0;i<=3;i++){
        // gameover2=1;
        for(var j=1;j<=3;j++){
            if(ar[i][j]==ar[i][j-1]){
                gameover2=false;
            }
        }
    }
    //判断每一列是否存在可以合并的表格
    for(var i=0;i<=3;i++){
        for(var j=1;j<=3;j++){
            if(ar[j][i]==ar[j-1][i]){
                gameover3=false;
            }
        }
    }
    var result=(gameover1&&gameover2&&gameover3)?true:false;
    return result;
}

// function gameGuide(ar,direction){
//     for(var i=0;i<=3;i++){
//         // gameover2=1;
//         for(var j=1;j<=3;j++){
//             if(ar[i][j]==ar[i][j-1]){
//                 gameover2=1;
//                 return '向左或向右移动';
//             }
//         }
//     }
//     //判断每一列是否存在可以合并的表格，有则游戏继续
//     for(var i=1;i<=3;i++){
//         // gameover3=1;
//         for(var j=0;j<=3;j++){
//             if(ar[j][i-1]==ar[j][i]){
//                 gameover3=1;
//                 return '向上或向下移动';
//             }
//         }
//     }
// }
//判断是否存在空白格
function whiteSpace(ar){
    for(var i=0;i<=3;i++){
        for(var j=0;j<=3;j++){
            if(ar[i][j]==0){
                return true;
            }
        }
    }
    return false;
}
//向上移动
function moveUp(){
   for(j=0;j<=3;j++){
       for(i=0;i<=3;i++){
           temp[i]=ar[i][j];
       }
       temp[4]=0;
       // change=change+add();
       add();
       for(i=0;i<=3;i++){
           ar[i][j]=temp[i];
       }
   }
}
//向左移动
function moveLeft(){
  for(i=0;i<=3;i++){
      for(j=0;j<=3;j++){
          temp[j]=ar[i][j];
      }
      temp[4]=0;
      // change=change+add();
      add();
      for(j=0;j<=3;j++){
          ar[i][j]=temp[j];
      }
  }  
}
//向右移动
function moveRight(){
    for(i=0;i<=3;i++){
        for(j=0;j<=3;j++){
            temp[j]=ar[i][3-j];
        }
        temp[4]=0;
        // change=change+add();
        add();
        for(j=0;j<=3;j++){
           ar[i][3-j]=temp[j];
        }
    }
}
//向下移动
function moveDown(){
    for(j=0;j<=3;j++){
        for(i=0;i<=3;i++){
            temp[i]=ar[3-i][j];
        }
        temp[4]=0;
        // change=change+add();
        add();
        for(i=0;i<=3;i++){
            ar[3-i][j]=temp[i];
        }
    }  
}