import { Router } from "express";
import viagemcontrole from "../controller/Viagemcontrole.js";

const rotaViagens = Router(); //mini aplicação http
const Victrl = new viagemcontrole();

rotaViagens.get("/:id", Victrl.consultar);
rotaViagens.get("/", Victrl.consultar);
rotaViagens.post("/", Victrl.gravar);
rotaViagens.put("/", Victrl.alterar);
rotaViagens.patch("/", Victrl.alterar);
rotaViagens.delete("/", Victrl.excluir);

export default rotaViagens;