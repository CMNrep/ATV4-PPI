import express from "express";//importa as funcoes express() da biblioteca express 
import authenticator from "./security/authenticator.js";
import { verifyAuthtentication, logout } from "./security/authenticator.js";
import session from "express-session";

const host = '0.0.0.0'//endereco ipv4 da maquina, no caso localhost
const port = 3000//porta de conexáo
const app = express(); 

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 1
    }
}))

app.use(express.static('./public'));//permite visualizar o conteudo publico

//endpoint
app.get("/more-details-classic-music-concert", (req, res) =>{
    res.redirect("/login.html");
})

app.get("/logout", logout)
app.post("/login", authenticator);

app.use(verifyAuthtentication, express.static('./private'));//permite visualizar o conteudo privado

app.listen(port, host, () => {//"escuta" as resquisicoes dos clients e exibe se o servidor iniciou escrevendo no terminal
    console.log(`Server is running at http://${host}:${port}`)
})