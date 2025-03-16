import moment from "moment";
import PacoteViagem from "../model/pacotedeviagens.js";

export default class PacoteViagemCtrl {

    // POST - Gravar novo pacote de viagem
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { destino, dataSaida, duracao, localPartida, preco, lugaresDisponiveis, 
                    hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos } = dados;

            // Validação da data
            const dataFormatada = moment(dataSaida, ["YYYY-MM-DD", "DD/MM/YYYY"], true);
            if (!dataFormatada.isValid()) {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Data inválida! Use o formato YYYY-MM-DD ou DD/MM/YYYY"
                });
            }

            if (destino && dataSaida && duracao && localPartida && preco && lugaresDisponiveis) {
                const pacote = new PacoteViagem(
                    null, destino, dataFormatada.format("YYYY-MM-DD"), duracao, 
                    localPartida, preco, lugaresDisponiveis, hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos
                    );

                pacote.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Pacote de viagem gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao gravar o pacote de viagem: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // PUT ou PATCH - Alterar pacote de viagem
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const { id, destino, dataSaida, duracao, localPartida, preco, lugaresDisponiveis, 
                    hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos } = dados;

            const dataFormatada = moment(dataSaida, ["YYYY-MM-DD", "DD/MM/YYYY"], true);
            if (!dataFormatada.isValid()) {
                return resposta.status(400).json({
                    status: false,
                    mensagem: "Data inválida! Use o formato YYYY-MM-DD ou DD/MM/YYYY"
                });
            }

            if (id && destino && dataSaida && duracao && localPartida && preco && lugaresDisponiveis) {
                const pacote = new PacoteViagem(
                    id, destino, dataFormatada.format("YYYY-MM-DD"), String(duracao),
                    localPartida, preco, lugaresDisponiveis, hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos
                );

                pacote.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Pacote de viagem alterado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao alterar o pacote de viagem: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos obrigatórios devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // DELETE - Excluir pacote de viagem
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const { id } = requisicao.body;

            if (id) {
                const pacote = new PacoteViagem(id);
                pacote.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Pacote de viagem excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao excluir o pacote de viagem: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do pacote de viagem a ser excluído!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // GET - Consultar todos os pacotes de viagem
    consultar(requisicao, resposta) {
        if (requisicao.method === 'GET') {
            PacoteViagem.consultar().then((listaPacotes) => {
                resposta.status(200).json({
                    status: true,
                    pacotes: listaPacotes
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar os pacotes de viagem: " + erro
                });
            });
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }
}
