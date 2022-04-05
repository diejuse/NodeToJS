// bashBlitz (NodeJS/Javascript version). MIT License Copyright (c) 2022 Diego Jurado Seguí (diejuse). https://github.com/diejuse/NodeToJS/blob/main/LICENSE
function rep(a1,a2){for(var i=1,txt="";i<=a2;i++)txt+=a1;return txt}
function writeLevel(){NodeToJS.draw([{c:3,y:25,x:13,t:LEVEL+""},{y:25,x:22,t:MAXLEVEL+""},{y:29,x:17,t:MAXSCORE+""}])}
function writeScore(){NodeToJS.draw([{c:3,y:27,x:17,t:SCORE+""}])}
function initCity(){
    X=(-LE/2-2);Y=CH-2;B=0;BY=0;BLOQLEFT=CW+1;A=[]
    if(LEVEL<=7)SPEED=500-LEVEL*30;else SPEED=260-(LEVEL-8)*20;
    var y,x,al,stream=[]
    stream.push({c:7});for(y=Y0-CH;y<=Y0;y++)stream.push({y:y,x:X0-7*2+1,t:rep('  ',(CW+14))});stream.push({c:3})
    for(x=0;x<=CW;x++){ A[x]=4+Math.random()*15|0;al=4+Math.random()*3|0
        for(y=1;y<=A[x];y++)stream.push({b:al,y:Y0-y,x:X0+x*2,t:"··"}); }
    stream.push({c:2});for(x=-6;x<=CW+6;x++)stream.push({y:Y0,x:X0+x*2,t:"██"});
    stream.push({b:0});NodeToJS.draw(stream);cleanMsg();
}
function readKey(){ 
    NodeToJS.readkey(function(k){
        if(k=="q"){fin();return}
        if(END==1){if(k=="y")startGame()}
        else {  if(INICIO==1){  if(k=="s")startGame();   } 
                else {  if(k=="b" && B==0){B=1;BX=X+2;BY=0;BY0=Y-1} } }
    }) 
}
function cleanMsg(){for(var i=0;i<3;i++)NodeToJS.draw([{y:19+i,x:5,t:rep(" ",21)}])}
function motor(){     
    if(END)return;
    var y,stream=[]
    for(y=-2;y<1;y++)stream.push({y:Y0-Y+y,x:X0+X*2,t:rep(' ',LE)});
    X++;if(X>=CW+4){
        X=(-LE/2-2);Y--
        if(BLOQLEFT>=1 && BLOQLEFT<=3){
            cleanMsg();stream.push( {c:3,y:19,x:5,t:"Only "+BLOQLEFT+" buildings"},
            {y:20,x:5,t:"left!"})
        }else if(BLOQLEFT==0){stream.push( {c:3,y:Y0-CH+1,x:X0-7*2+1,t:"Congratulations pilot! You have bombed all the buildings!"},{y:Y0-CH+2,x:X0-7*2+1,t:"Now you are going to land and then you will attack another city."})}
    }
    stream.push({c:3,y:Y0-Y-2,x:X0+X*2,t:"__"},{y:Y0-Y-1,x:X0+X*2,t:"E \\___"},{y:Y0-Y-0,x:X0+X*2,t:" \\==-_')"});NodeToJS.draw(stream);stream=[]
    if(X+LE*.5>=0 && X+LE*.5<=CH && Y==A[X+LE*.5]){ 
        END=1;clearTimeout(TIMER)
        stream.push({c:1});for(y=-2;y<1;y++)stream.push({y:Y0-Y+y,x:X0+X*2,t:rep('*',LE)});stream.push({c:3,y:Y0-CH+1,x:X0-7*2+1,t:"Oh my God! Your plane has been destroyed!"})
        var change=0
        if(SCORE>MAXSCORE){
            stream.push({c:2,y:Y0-CH+2,x:X0-7*2+1,t:"New record! You have exceeded your maximum SCORE!"});change=1;MAXSCORE=SCORE  }
        if(LEVEL>MAXLEVEL){
            stream.push({c:4,y:Y0-CH+3,x:X0-7*2+1,t:"New record! You have exceeded your maximum LEVEL!"});change=1;MAXLEVEL=LEVEL  }
        if(change==1)writeLevel();        
        stream.push({c:6,y:Y0-CH+5,x:X0-7*2+1,t:"Do you want to play again? Choose yes ('y') or quit ('q')."});NodeToJS.draw(stream);
    }
    if(Y==1 && X==CW){LEVEL++;writeLevel();initCity()}
    if(B>0){
        stream=[]
        for(M=1;M<=4;M++){ 
            if(BY0+BY>=1){stream.push({c:1,y:Y0-BY0-BY-1,x:X0+BX*2,t:"__"},{y:Y0-BY0-BY,x:X0+BX*2,t:"\\/"});NodeToJS.draw();BY--}
            if(BY<=-2){stream.push({y:Y0-BY0-BY-3,x:X0+BX*2,t:"  "})}
            if(B==1 && BY0+BY<=0){ 
                stream.push({c:1,y:Y0-3,x:X0+BX*2,t:"  "},{y:Y0-2,x:X0+BX*2,t:"  "},{y:Y0-2,x:X0+BX*2,t:"**"},{y:Y0-1,x:X0+BX*2,t:"**"});B=2;break
            }else if(B==2 && BY0+BY<=0){
                stream.push({y:Y0-2,x:X0+BX*2,t:"  "},{y:Y0-1,x:X0+BX*2,t:"  "});B=0;vt=A[BX]
                if(BX>=0 && BX<=CW && A[BX]>0){cleanMsg();
                    stream.push({c:2,y:19,x:5,t:"Objective reached!"},{c:3,y:20,x:5,t:vt+"-storey building"},{y:21,x:5,t:"destroyed!"});SCORE+=A[BX];A[BX]=0;BLOQLEFT--;writeScore()
                    if(BLOQLEFT==0){SPEED=40;}
                }else{cleanMsg();stream.push({c:1,y:19,x:5,t:"You have failed!"},{c:3,y:20,x:5,t:"Come on pilot!"},{y:21,x:5,t:"You can do it!"})}
                break
            }
        }
        NodeToJS.draw(stream);
    }
    if((INICIO==0)){TIMER=setTimeout(function(){motor()},SPEED)}
}
function fin(){END=1;NodeToJS.cleanScreen();NodeToJS.draw([{c:3,y:1,x:1,t:"Diejuse appreciates you played his game. See you soon!\n\n"}]);NodeToJS.exit()}
function startGame(){LEVEL=1,SCORE=1,INICIO=0,END=0;initCity();motor();}
function welcome(){
    NodeToJS.draw(
        [{c:2,y:3,x:X0-7*2+1,t:"Welcome pilot!"},{c:3,y:4,x:X0-7*2+1,t:"Enemies are attacking our country savagely! We have to try to"},{y:5,x:X0-7*2+1,t:"weaken them. You are the best pilot in our country. Tonight we"},{y:6,x:X0-7*2+1,t:"need you to bombard with your fighter plane all the buildings of"},{y:7,x:X0-7*2+1,t:"the largest number of enemy cities."},{y:8,x:X0-7*2+1,t:"During your feat, we will inform you of your achievements in the"},{y:9,x:X0-7*2+1,t:"panels that you have on the screen."},{y:10,x:X0-7*2+1,t:"This is your night, pilot. We trust you!"},{c:5,y:12,x:X0-7*2+1,t:"Pulse 's' to start."},{y:13,x:X0-7*2+1,t:"Pulse 'b' to bomb the enemy city"},{y:14,x:X0-7*2+1,t:"Press 'q' to exit the game."}]
    );INICIO=1;readKey()
}
function init(){
    if(NodeToJS.cols<97 || NodeToJS.rows<31){
        NodeToJS.draw([{b:4},{c:3},{t:" /---------\\\ \n |BASHBLITZ| by Diejuse\n \\---------/ \n\nYour terminal has "+NodeToJS.cols+" columns and "+NodeToJS.rows+" rows.\nIt must have 97 or more columns and 31 or more rows to play this game.\n\n"},{c:7}]);NodeToJS.exit()
    }
    NodeToJS.scaleFullScreen();NodeToJS.cleanScreen()
    INICIO=0;END=0;CW=19;X0=43;Y0=29;CH=Y0-3;LEVEL=1;SCORE=0;MAXLEVEL=1;MAXSCORE=0;LE=8
    var y,x,oy,txt,stream=[]
    stream.push({c:7,y:2,x:X0-7*2,t:"┌"+rep("─",(2*(CW+14)))+"┐"})
    for(y=3;y<=Y0;y++)stream.push({y:y,x:X0-7*2,t:"│"+rep('  ',(CW+14))+"│"})   
    stream.push({y:Y0+1,x:X0-7*2,t:"└"+rep("─",(2*(CW+14)))+"┘"})
    NodeToJS.draw(stream)
    txt=["███████████████████████","█                     █","█ ▒▒ ░░░ ▒▒░ ░        █","█ ▒ ▒░ ░▒  ░ ░        █","█ ▒▒ ░░░ ▒ ░░░        █","█ ▒ ▒░ ░  ▒░ ░        █","█ ▒▒ ░ ░▒▒ ░ ░        █","█                     █","█    ██ ▒  ███▒▒▒███  █","█    █ █▒   █  ▒   █  █","█    ██ ▒   █  ▒  █   █","█    █ █▒   █  ▒ █    █","█    ██ ▒▒▒███ ▒ ███  █","█                     █","█          by Diejuse █","███████████████████████"]
    stream=[];stream.push({b:0},{c:4});for(oy=2,y=0;y<txt.length;y++)stream.push({y:y+oy,x:4,t:txt[y]});NodeToJS.draw(stream);
    txt=["┌─────────────────────┐","│                     │","│                     │","│                     │","│                     │","└─────────────────────┘"]
    stream=[];stream.push({b:0},{c:7});
    for(oy=18,y=oy;y<oy+txt.length;y++)stream.push({y:y,x:4,t:txt[y-oy]});
    stream.push({y:oy+6,x:4,t:"┌──────────┬──────────┐"},{y:oy+7,x:4,t:"│ LEVEL:   │ MAX:     │"},{y:oy+8,x:4,t:"└───┬──────┴──────────┤"},{y:oy+9,x:4,t:"    │ SCORE:          │"},{y:oy+10,x:4,t:"┌───┴─────────────────┤"},{y:oy+11,x:4,t:"│ MAX SCORE:          │"},{y:oy+12,x:4,t:"└─────────────────────┘"});NodeToJS.draw(stream)
    writeLevel();writeScore();welcome()
}
// This two lines are required to use NodeToJS module/library.
if(typeof(NodeToJS)=="undefined"){NodeToJS=require('./NodeToJS').NodeToJS;}
NodeToJS.start(104,32,"./HP_100LX_10x11.woff",10,11,function(){ init() });
