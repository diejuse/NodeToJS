// NodeToJS 0.5 by Diego Jurado Seguí (diejuse). Module for NodeJS + library for Javascript. 
// MIT License Copyright (c) 2022. https://github.com/diejuse/NodeToJS/blob/main/LICENSE
NodeToJS={HTMLMODE:0,wrap:0,canvas:0,px:10,py:11,rows:32,cols:104}
NodeToJS.color={"0":"#000000","1":"#cc0000","2":"#4e9a06","3":"#c4a000","4":"#3465a4","5":"#75507b","6":"#06989a","7":"#d3d7cf","10":"#555753","11":"#EF2929","12":"#8ae234","13":"#fce94f","14":"#729fcf","15":"#ad7fa8","16":"#34e2e2","17":"#eeeeec"}
NodeToJS.start=async function(cols,rows,urlFont,font_px,font_py,callback){var _t=this
    var setCanvas=function(){
        document.body.insertAdjacentHTML("beforeend","<div id='wrapNodeToJS'><canvas id='cNodeToJS' style='padding:0;margin:0'></canvas></div>")
        _t.wrap=document.getElementById("wrapNodeToJS");_t.wrap.style.overflow="hidden";
        _t.canvas=document.getElementById("cNodeToJS");
        _t.canvas.style.position="absolute";
        _t.canvas.style.top="0px";_t.canvas.style.left="0px";
        _t.py=font_py;_t.px=font_px
        _t.canvas.width=_t.cols*_t.px;_t.canvas.height=_t.rows*_t.py;
        _t.wrap.style.position="absolute";
        _t.wrap.style.top="0px";_t.wrap.style.left="0px";
        _t.wrap.style.width="100%";_t.wrap.style.height="100%"
        _t.ctx=_t.canvas.getContext("2d");_t.ctx.font=(_t.py)+"px MyFont" 
        _t.ctx.fillStyle="white";_t.ctx.fillRect(0,0,_t.canvas.width,_t.canvas.height)
        _t.ctx.textAlign="start";_t.ctx.textBaseline="top"
    }
    if(NodeToJS.HTMLMODE==1){
        _t.cols=cols;_t.rows=rows;
        var el;
        if (!document.head.style.length)
            document.head.appendChild(el=document.createElement("style"))
        //el.addEventListener("DOMNodeInserted", function (ev) {;},false);
        await _t.loadFont(urlFont);setCanvas(_t);return callback()
    } else {
        _t.cols=process.stdout.columns;_t.rows=process.stdout.rows;
        console.log("\x1b[?25l");console.clear(1);
        return callback()
    }
}
NodeToJS.getRows=function(){return this.rows}
NodeToJS.getColumns=function(){return this.columns}
NodeToJS.scale=function(w,h){
    this.canvas.style["transform-origin"]="0 0"
    this.canvas.style.transform="scale("+w+","+h+")";
}
NodeToJS.scaleFullScreen=function(){if(this.HTMLMODE==0)return;
    var w=this.wrap.offsetWidth/this.canvas.width,
        h=this.wrap.offsetHeight/this.canvas.height;
    this.canvas.style["transform-origin"]="0 0"
    this.canvas.style.transform="scale("+w+","+h+")";
}
NodeToJS.loadFont=async function(url){
  var myFont = new FontFace('MyFont','url('+url+')');
  await myFont.load();
  document.fonts.add(myFont);
  document.querySelector("style").fontFamily="MyFont";    
}
NodeToJS.cleanScreen=function(b){
    if(typeof(b)=="undefined"){
        if(typeof(this.lastbcol)=="undefined")this.lastbcol=0;
    }else this.lastbcol=b;
    b=this.lastbcol;
    if (NodeToJS.HTMLMODE==0){
        if(b<10)b=40+b;else b=100+b-10;console.log("\x1b["+b+"m");console.clear(1);
    }else{
        this.ctx.fillStyle=this.color[b];this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}
}
NodeToJS.readkey=function(f){
    if(NodeToJS.HTMLMODE==1){document.addEventListener('keypress',(k)=>{return f( String.fromCharCode(k.keyCode)) } )
    } else {
        const readline=require('readline');
        lee=process.stdin;readline.emitKeypressEvents(lee);lee.setRawMode(true)
        lee.on('keypress',(str,k)=>{return f(k.name)})
    }
}
NodeToJS.exit=function(){
    if(NodeToJS.HTMLMODE==0){console.log("\x1b[40;37m\x1b[?25h");process.exit(1)}
    else window.stop();
}
NodeToJS.draw=function(d){
    if (typeof(d)=="undefined")d=[];
    if(NodeToJS.HTMLMODE==1){
        for(var i=0;i<d.length;i++) {
            if (typeof(d[i].b)!="undefined")this.lastbcol=d[i].b;
            if (typeof(d[i].c)!="undefined")this.lastcol=d[i].c;
            if (typeof(this.lastbcol)=="undefined")this.lastbcol=0;
            if (typeof(this.lastcol)=="undefined")this.lastcol=17;
            if (typeof(d[i].t)!="undefined"){
                this.ctx.fillStyle=this.color[this.lastbcol];for(var tx0="",t=0;t<d[i].t.length;t++)tx0+="█";
                this.ctx.fillText(tx0,this.px*(d[i].x-1),this.py*(d[i].y-1));
                this.ctx.fillStyle=this.color[this.lastcol];
                this.ctx.fillText(d[i].t,this.px*(d[i].x-1),this.py*(d[i].y-1));
            }
        }
    } else {
        for(var i=0,c,txt="";i<d.length;i++){
            if(d[i].b<10)c=40+d[i].b;else c=100+d[i].b-10;
            if (typeof(d[i].b)!="undefined") txt+="\x1b["+c+"m";
            if(d[i].c<10)c=30+d[i].c;else c=90+d[i].c-10;
            if (typeof(d[i].c)!="undefined") txt+="\x1b["+c+"m";
            if (typeof(d[i].y)!="undefined") txt+="\x1b["+d[i].y+";"+d[i].x+"H";
            if (typeof(d[i].t)!="undefined") txt+=d[i].t;
        }
        console.log(txt)
    }
}
NodeToJS.input=function(){
    var el=document.createElement("input");el.setAttribute("maxlength",10);
    var x=0.1-NodeToJS.px+NodeToJS.px*1,y=4-NodeToJS.py+NodeToJS.py*1
    el.style.position="absolute";el.style.top=y+"px";el.style.left=x+"px";
    NodeToJS.wrap.appendChild(el);el.focus();
    el.onkeydown=function(e){
        if (e.keyCode == 13) {print("\n"+el.value);return el.value;el.remove();}
    }
}
if(typeof(module)!="undefined")module.exports={NodeToJS:NodeToJS};  
