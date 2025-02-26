import PacoteViagem from "./model/pacotedeviagens.js"

var pacote1 = new PacoteViagem(1, "Rio de Janeiro", "2025-04-10", "5 dias", "São Paulo", 3899.00, 10, true, true, true, true, ["Cristo Redentor", "Pão de Açúcar", "Praia de Copacabana"]);
var pacote2 = new PacoteViagem(2, "Salvador", "2025-06-20", "7 dias", "Rio de Janeiro", 3000.00, 8, true, true, true, true, ["Pelourinho", "Forte de São Marcelo", "Praia do Farol da Barra"]);
var pacote3 = new PacoteViagem(3, "Maceió", "2025-07-15", "6 dias", "Belo Horizonte", 4000.00, 12, true, true, true, true, ["Pajuçara", "Praia do Francês", "Maragogi"]);
var pacote4 = new PacoteViagem(4, "Tóquio", "2025-05-05", "10 dias", "São Paulo", 12500.00, 5, true, false, true, true, ["Templo Senso-ji", "Torre de Tóquio", "Shibuya Crossing"]);
var pacote5 = new PacoteViagem(5, "Orlando", "2025-08-12", "8 dias", "Brasília", 7600.00, 7, true, true, false, false, ["Disney World", "Universal Studios", "SeaWorld"]);
var pacote6 = new PacoteViagem(6, "Dubai", "2025-07-06", "9 dias", "Curitiba", 15000.00, 6, true, false, true, true, ["Burj Khalifa", "Deserto de Dubai", "Ilhas Palm"]);

// Gravar pacotes de viagem no banco de dados
/*[pacote1, pacote2, pacote3, pacote4, pacote5, pacote6].forEach(pacote => {
    pacote.gravar().then(() => {
        console.log(`Pacote ${pacote.destino} gravado com sucesso!`);
    }).catch((erro) => {
        console.log(`Erro ao gravar o pacote ${pacote.destino}: ` + erro);
    });
});*/

// Alterar pacotes de viagem no banco de dados
/*[pacote1, pacote2, pacote3, pacote4, pacote5, pacote6].forEach(pacote => {
    pacote.alterar().then(() => {
        console.log(`Pacote ${pacote.destino} alterado com sucesso!`);
    }).catch((erro) => {
        console.log(`Erro ao alterar o pacote ${pacote.destino}: ` + erro);
    });
});*/

// Excluir pacotes de viagem do banco de dados
/*[pacote1, pacote2, pacote3, pacote4, pacote5, pacote6].forEach(pacote => {
    pacote.excluir().then(() => {
        console.log(`Pacote ${pacote.destino} excluído com sucesso!`);
    }).catch((erro) => {
        console.log(`Erro ao excluir o pacote ${pacote.destino}: ` + erro);
    });
});/*/


PacoteViagem.consultar().then((pacotes) => {
    pacotes.forEach(pacote => {
        console.log(pacote);
    });
}).catch((erro) => {
    console.log("Erro ao consultar pacotes: " + erro);
});
