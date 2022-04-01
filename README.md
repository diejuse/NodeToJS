# NodeToJS
NodeToJS is a module/library at once: a module for NodeJS and a library for Javascript (JS). It allows to create text based apps/games that can be executed and work both in the terminal (for Windows, Linux or Mac) and in a web browser. That is, with the same code you will create a CLI app/game and a text-based webapp/webgame.

Features:
- Use canvas to simulate the terminal.
- Draw text with foreground color and background color.
- Read key events.
- It has no user text input fields (for now).

### Use:
The minimum files you need are four:
- A wrap file:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; app.html
- A monospace font. I recommend woff files. For example:&emsp;&emsp;&emsp;&emsp; WebPlus_ToshibaSat_9x16.woff
- The NodeToJS module/library: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; NODEtoJS.js
- Your main .js file. &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; app.js

You can get old PC fonts here: https://int10h.org/oldschool-pc-fonts/fontlist/

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
          // 35 and 14 are the maximum columns and the rows of the simulated terminal
          // WebPlus_ToshibaSat_9x16.woff is a monospace font that my simulated terminal will use. 
          // 9 and 16 are the width and height of each character of the chosen font, measured in pixels.
          init()
     });
```
### Code of colors (foreground and background)

0: black &emsp;&emsp;&emsp;&emsp; 10: darkgray <br/>
1: red &emsp;&emsp;&emsp; 11: lightred <br/>
2: yellow &emsp;&emsp;&emsp; 12: lightyellow <br/>
3: green &emsp;&emsp;&emsp; 13: lightgreen <br/>
4: blue &emsp;&emsp;&emsp; 14: lightblue <br/>
5: purple &emsp;&emsp;&emsp; 15: violet <br/>
6: niagara &emsp;&emsp;&emsp; 16: cyan <br/>
7: lightgray &emsp;&emsp;&emsp; 17: white <br/>

### Functions

.start( term_columns, term_rows, font_url, width_fontpixels, height_fontpixels, success)
```
- term_columns: Number of columns of the simulated terminal.
- term_rows: Number of rows of the simulated terminal.
- font_url: A string containing the URL to load the the monospace choosen font. https://int10h.org/oldschool-pc-fonts/download/oldschool_pc_font_pack_v2.2_web.zip
- width_fontpixels: Width of the loaded text font, measured in number of pixels.
- height_fontpixels: Height of the loaded text font, measured in number of pixels.
```
.draw( list_to_draw )
```
- list_to_draw: Array of elements to draw on the pseudo terminal with this structure:
{c:foreground color, b: background color, x: x-coordinate of the pseudo terminal, y: y-coordinate of the pseudo terminal, t: text to draw}

```

