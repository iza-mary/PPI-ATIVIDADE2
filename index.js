import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import rotaViagens from "./rotas/rotasViagens.js";
import session from "express-session";
import autenticar from "./segurança/autenticar.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const host = '0.0.0.0'; 
const porta = 4000;

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(
    session({
        secret: "m1Nh4Ch4v3S3cR3t4",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 15 },
    })
);

app.use("/viagem", rotaViagens);

// Corrigindo a configuração dos arquivos estáticos
app.use(express.static("publico"));

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "login.html")); 
});

app.post("/login", (req, res) => {
    const usuario = req.body.usuario;
    const email = req.body.email;
    const senha = req.body.senha;

    if (usuario === "admin" && email === "admin@email.com" && senha === "admin321") {
        req.session.autenticado = true;
        res.redirect("/privado/detalhes.html");  
    } else {
        res.redirect("/login.html");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login"); 
});

app.get("/sessao", (req, res) => {
    res.json({ autenticado: req.session.autenticado || false });
});

app.use("/privado", autenticar);
app.use("/privado", express.static("privado")); 

app.get("/cadastro", autenticar, (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "cadastro.html")); 
});

// Rota para ativpw.html
app.get("/ativpw.html", (req, res) => {
    res.sendFile(path.join(__dirname, "publico", "ativpw.html"));
});

app.listen(porta, host, () => {
    console.log("Servidor backend em execução: http://"+host+":"+porta);
});
