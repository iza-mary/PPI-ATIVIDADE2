import PacoteViagem from "../model/pacotedeviagens.js";
export default class viagemcontrole {

    //POST - Cadastrar um novo pacote de viagem
    gravar(requisicao, resposta) {
        if (requisicao.method === 'POST' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const id = dados.id;
            const destino = dados.destino;
            const dataSaida = dados.dataSaida;
            const duracao = dados.duracao;
            const localPartida = dados.localPartida;
            const preco = dados.preco;
            const lugaresDisponiveis = dados.lugaresDisponiveis;
            const hotelIncluso = dados.hotelIncluso;
            const cafeManha = dados.cafeManha;
            const almoco = dados.almoco;
            const jantar = dados.jantar;
            const passeiosTuristicos = dados.passeiosTuristicos;

            if (destino && dataSaida && duracao && localPartida && preco && lugaresDisponiveis !== undefined && hotelIncluso !== undefined && cafeManha !== undefined && almoco !== undefined && jantar !== undefined && passeiosTuristicos) {
                const pacote = new PacoteViagem(id, destino, dataSaida, duracao, localPartida, preco, lugaresDisponiveis, hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos);
                
                pacote.gravar().then(() => {
                    resposta.status(201).json({
                        status: true,
                        mensagem: "Pacote de viagem cadastrado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao cadastrar o pacote: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    //PUT ou PATCH - Atualizar um pacote existente
    alterar(requisicao, resposta) {
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const id = dados.id;
            const destino = dados.destino;
            const dataSaida = dados.dataSaida;
            const duracao = dados.duracao;
            const localPartida = dados.localPartida;
            const preco = dados.preco;
            const lugaresDisponiveis = dados.lugaresDisponiveis;
            const hotelIncluso = dados.hotelIncluso;
            const cafeManha = dados.cafeManha;
            const almoco = dados.almoco;
            const jantar = dados.jantar;
            const passeiosTuristicos = dados.passeiosTuristicos;

            if (id && destino && dataSaida && duracao && localPartida && preco && lugaresDisponiveis !== undefined && hotelIncluso !== undefined && cafeManha !== undefined && almoco !== undefined && jantar !== undefined && passeiosTuristicos) {
                const pacote = new PacoteViagem(id, destino, dataSaida, duracao, localPartida, preco, lugaresDisponiveis, hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos);
                
                pacote.alterar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Pacote de viagem atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Erro ao atualizar o pacote: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Todos os campos devem ser informados"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    //DELETE - Excluir um pacote pelo ID
    excluir(requisicao, resposta) {
        if (requisicao.method === 'DELETE' && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const id = dados.id;

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
                        mensagem: "Erro ao excluir o pacote: " + erro
                    });
                });
            } else {
                resposta.status(400).json({
                    status: false,
                    mensagem: "Informe o ID do pacote a ser excluído!"
                });
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Requisição inválida"
            });
        }
    }

    // GET - Consultar todos os pacotes ou um específico
consultar(requisicao, resposta) {
    if (requisicao.method === 'GET') {
        const { id } = requisicao.params;

        const pacote = new PacoteViagem();

        if (id) {
            // Se um ID for informado, busca um pacote específico
            pacote.consultarPorId(id).then((pacoteEncontrado) => {
                if (pacoteEncontrado) {
                    resposta.status(200).json({
                        status: true,
                        pacote: pacoteEncontrado
                    });
                } else {
                    resposta.status(404).json({
                        status: false,
                        mensagem: "Pacote não encontrado"
                    });
                }
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar o pacote: " + erro
                });
            });
        } else {
            // Caso contrário, retorna todos os pacotes
            pacote.consultar().then((listaPacotes) => {
                resposta.status(200).json({
                    status: true,
                    pacotes: listaPacotes
                });
            }).catch((erro) => {
                resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao consultar os pacotes: " + erro
                });
            });
        }
    } else {
        resposta.status(400).json({
            status: false,
            mensagem: "Requisição inválida"
        });
    }
}

}
