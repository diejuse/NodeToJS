# NodeToJS
NodeToJS is a module/library at once: a module for NodeJS and a library for Javascript (JS). It allows to create text based apps/games that can be executed and work both in the terminal (for Windows, Linux or Mac) and in a web browser. That is, with the same code you will create a CLI app/game and a text-based webapp/webgame.

### Use:
The minimum files you need are three: a wrap file (game.html), the NodeToJS module/library (NODEtoJS.js), and a NodeJS or Javascript file that starts your js application.

1. Your HTML wrap file (for example app.html) will load the NodeToJS library (NodeToJS.js) and will load the starter NodeJS/Javascript script of yout app (app.js in this example). You also have to add NodeToJS.HTMLMODE=1 right after loading the library/module and before loading your scripts.

app.html
```
     <!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>
     <script src="NODEToJS.js></script><script>NodeToJS.HTMLMODE=1</script>
     <script src="app.js></script>
```
2. Your apps.js must contain at least the following code. It is the first thing that has to be executed.
```
     function init(){
          // Your code
     }
     if(typeof(NodeToJS)=="undefined"){NodeToJS=require('./NODEtoJS').NodeToJS;}
     NodeToJS.start(32,104,"./HP_100LX_10x11.woff",10,11,function(){ 
          // 32 and 104 are the maximum rows and the columns of the simulated terminal
          // HP_100LX_10x11.woff is a monospace font that I recommend to use. 
          //             Font downloaded from https://int10h.org/oldschool-pc-fonts/fontlist/font?hp_100lx_10x11#-
          // 10 and 11 are the width and height of each character of the loaded font, measured in pixels
          init()
     });
```

