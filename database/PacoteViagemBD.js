import conectar from "./conexao.js";
import PacoteViagem from '../model/pacotedeviagens.js';

export default class PacoteViagemDB {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `CREATE TABLE IF NOT EXISTS pacote_viagem (
                id INT AUTO_INCREMENT PRIMARY KEY,
                destino VARCHAR(255) NOT NULL,
                data_saida DATE NOT NULL,
                duracao VARCHAR(50),
                local_partida VARCHAR(255),
                preco DECIMAL(10, 2),
                lugares_disponiveis INT,
                hotel_incluso BOOLEAN,
                cafe_manha BOOLEAN,
                almoco BOOLEAN,
                jantar BOOLEAN,
                passeiosTuristicos TEXT
            )`;

            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao iniciar a tabela pacote_viagem: " + erro);
        }
    }

    async gravar(pacote) {
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            const sql = `INSERT INTO pacote_viagem (destino, data_saida, duracao, local_partida, preco, lugares_disponiveis, hotel_incluso, cafe_manha, almoco, jantar, passeiosTuristicos)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const parametros = [
                pacote.destino ?? null,
                pacote.dataSaida ?? null,
                pacote.duracao ?? null,
                pacote.localPartida ?? null,
                pacote.preco ?? null,
                pacote.lugaresDisponiveis ?? null,
                pacote.hotelIncluso ?? null,
                pacote.cafeManha ?? null,
                pacote.almoco ?? null,
                pacote.jantar ?? null,
                pacote.passeiosTuristicos ? JSON.stringify(pacote.passeiosTuristicos) : null
            ];

            try {
                await conexao.execute(sql, parametros);
            } catch (erro) {
                console.error(`Erro ao gravar o pacote ${pacote.destino}: `, erro);
            } finally {
                await conexao.release();
            }
        }
    }
    async alterar(pacote) {
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            const sql = `UPDATE pacote_viagem SET 
                destino = ?, 
                data_saida = ?, 
                duracao = ?, 
                local_partida = ?, 
                preco = ?, 
                lugares_disponiveis = ?, 
                hotel_incluso = ?, 
                cafe_manha = ?, 
                almoco = ?, 
                jantar = ?, 
                passeiosTuristicos = ? 
            WHERE id = ?`;
    
            const parametros = [
                pacote.destino ?? null,
                pacote.dataSaida ?? null,
                pacote.duracao ?? null,
                pacote.localPartida ?? null,
                pacote.preco ?? null,
                pacote.lugaresDisponiveis ?? null,
                pacote.hotelIncluso ?? null,
                pacote.cafeManha ?? null,
                pacote.almoco ?? null,
                pacote.jantar ?? null,
                pacote.passeiosTuristicos ? JSON.stringify(pacote.passeiosTuristicos) : null,
                pacote.id ?? null
            ];
    
            try {
                await conexao.execute(sql, parametros);
                console.log(`Pacote de viagem ID ${pacote.id} alterado com sucesso!`);
            } catch (erro) {
                console.error(`Erro ao alterar o pacote ${pacote.destino}: `, erro);
            } finally {
                await conexao.release();
            }
        }
    }
    

    async excluir(pacote) {
        if (pacote instanceof PacoteViagem) {
            // Conectar ao banco de dados
            const conexao = await conectar();
            
            const sql = `DELETE FROM pacote_viagem WHERE id = ?`;
            const parametros = [pacote.id]; // Passando o id do pacote como parâmetro
    
            try {
                // Executando a consulta SQL de forma segura
                const [resultado] = await conexao.execute(sql, parametros);
                console.log(`Pacote com ID ${pacote.id} excluído com sucesso.`);
            } catch (erro) {
                console.error(`Erro ao excluir o pacote ${pacote.destino}: `, erro);
            } finally {
                // Liberando a conexão
                await conexao.release();
            }
        }
    }
    

    async consultar() {
        const conexao = await conectar();
        const sql = `SELECT * FROM pacote_viagem ORDER BY destino`;
        const [registros] = await conexao.execute(sql);
        await conexao.release();
    
        let listaPacotes = [];
        for (const registro of registros) {
            let passeios = registro.passeiosTuristicos 
                ? registro.passeiosTuristicos.split(",") 
                : [];
    
            const pacote = new PacoteViagem(
                registro.id,
                registro.destino,
                registro.data_saida,
                registro.duracao,
                registro.local_partida,
                registro.preco,
                registro.lugares_disponiveis,
                registro.hotel_incluso,
                registro.cafe_manha,
                registro.almoco,
                registro.jantar,
                passeios
            );
    
            listaPacotes.push(pacote);
        }
    
        return listaPacotes;
    }
}
