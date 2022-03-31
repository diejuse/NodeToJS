# NodeToJS
NodeToJS is a module/library at once: a module for NodeJS and a library for Javascript (JS). It allows to create text based apps/games that can be executed and work both in the terminal (for Windows, Linux or Mac) and in a web browser. That is, with the same code you will create a CLI app/game and a text-based webapp/webgame.

Features:
    -     Use canvas to simulate the terminal.
    -     Draw text with foreground color and background color.
    -     Read key events.
    -     It has no user text input fields (for now).

### Use:
The minimum files you need are four:
    -     A wrap file:                                                     app.html
    -     A monospace font. I recommend woff files. For example:           WebPlus_ToshibaSat_9x16.woff
          You can get old PC fonts here: https://int10h.org/oldschool-pc-fonts/fontlist/
    -     The NodeToJS module/library:                                     NODEtoJS.js
    -     Your main .js file.                                              app.js

### Hello world example.

1. Your HTML wrap file (for example app.html) will load the NodeToJS library (NodeToJS.js) and will load the starter NodeJS/Javascript script of yout app (app.js in this example). You also have to add NodeToJS.HTMLMODE=1 right after loading the library/module and before loading your scripts.

app.html
```
     <!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>
     <script src="NodeToJS.js"></script><script>NodeToJS.HTMLMODE=1</script>
     <script src="app.js"></script>
```
2. Your apps.js. This file is an example to demonstrate the main functions of NodeToJS module/library.

app.js
```
     function readKey(){
          NodeToJS.readkey(function(k){ // k is the key pressed
                if(k=="x"){
                    NodeToJS.cleanScreen(0);
                    NodeToJS.draw([{c:1,b:7,y:1,x:1,t:" See you soon! "}])
                    NodeToJS.exit()
                }
          })
     }
     function init(){
          // NodeToJS.scaleFullScreen();
          NodeToJS.cleanScreen(16); // 16 is the background color used to clean the terminal
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
          // WebPlus_ToshibaSat_9x16.woff is a monospace font that my simulated terminal will use. 
          //      Downloaded from https://int10h.org/oldschool-pc-fonts/download/oldschool_pc_font_pack_v2.2_web.zip
          // 9 and 16 are the width and height of each character of the chosen font, measured in pixels.
          init()
     });
```

Color:  ```html
   <span style='color:red'>Hola</span>
```
