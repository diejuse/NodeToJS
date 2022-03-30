# NodeToJS
NodeToJS is a module/library at once: a module for NodeJS and a library for Javascript (JS). It allows to create text based apps/games that can be executed and work both in the terminal (for Windows, Linux or Mac) and in a web browser. That is, with the same code you will create a CLI app/game and a text-based webapp/webgame.

### Use:
1. You need a HTML wrap file (for example game.html) to load the NodeToJS library (NodeToJS.js) like a script and to load your NodeJS/Javascript scripts (game.js in this example) from a web browser. You also have to add NodeToJS.HTMLMODE=1 right after loading the library/module and before loading your scripts.

game.html
```
     <!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>
     <script src="NODEToJS.js></script><script>NodeToJS.HTMLMODE=1</script>
     <script src="game.js></script>
```

