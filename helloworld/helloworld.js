function readKey(){
    NodeToJS.readkey(function(k){
        if(k=="x"){
            NodeToJS.cleanScreen(0);
            NodeToJS.draw([{c:1,b:7,y:1,x:1,t:" See you soon! "}])
            NodeToJS.exit()
        }
    })
}
function init(){
    // NodeToJS.scaleFullScreen();
    NodeToJS.cleanScreen(16);
    NodeToJS.draw([
    // c is the foreground color, b is the background color, y and x are the terminal coordinates, t is the text to draw
        {c:0,b:17,y:5,x:10, t:"┌─────────────┐"},
        {y:6,x:10,          t:"│ Hello world │"},
        {y:7,x:10,          t:"└─────────────┘"},
        {c:7,b:6,y:9,x:8,t:" Press 'x' to exit "}
    ]);
    readKey();
}
if(typeof(NodeToJS)=="undefined"){NodeToJS=require('./NodeToJS.js').NodeToJS}
NodeToJS.start(35,14,"./WebPlus_ToshibaSat_9x16.woff",9,16,function(){ 
    // 35 and 14 are the maximum rows and the columns of the simulated terminal
    // HP_100LX_10x11.woff is a monospace font that I recommend to use. 
    //      Downloaded from https://int10h.org/oldschool-pc-fonts/download/oldschool_pc_font_pack_v2.2_web.zip
    // 9 and 16 are the width and height of each character of the chosen font, measured in pixels.
    init()
});
