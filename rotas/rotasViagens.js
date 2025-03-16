import { Router } from "express";
import viagemcontrole from ".../controller/viagemcontrole.js";

const rotaViagens = Router(); //mini aplicação http
const Victrl = new viagemcontrole();

rotaViagens.get("/", Victrl.consultar);
rotaViagens.post("/", Victrl.gravar);
rotaViagens.put("/", Victrl.alterar);
rotaViagens.patch("/", Victrl.alterar);
rotaViagens.delete("/", Victrl.excluir);

export default rotaViagens;