import express from "express";
import rotaViagens from "./rotas/rotasViagens.js";
const host = '0.0.0.0'; 
const porta = 4000;

const app = express();
app.use(express.json());

app.use("/viagem", rotaViagens);

app.listen(porta, host, () => {
    console.log("Servidor backend em execução: http://"+host+":"+porta);
});