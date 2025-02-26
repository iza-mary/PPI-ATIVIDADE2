import conectar from "./conexao.js";
import PacoteViagem from '../model/pacotedeviagens.js';
export default class PacoteViagemDB {
    constructor(){
        this.init();
    }

    // Inicializa a tabela no banco de dados
    async init(){
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
                passeios_turisticos JSON
            )`;
            await conexao.execute(sql);
        } catch (erro) {
            console.log("Erro ao inicializar a tabela pacote_viagem: " + erro);
        }
    }

    // Método para gravar um pacote de viagem
    async gravar(pacote){
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            const sql = `INSERT INTO pacote_viagem (destino, data_saida, duracao, local_partida, preco, lugares_disponiveis, hotel_incluso, cafe_manha, almoco, jantar, passeios_turisticos)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                pacote.destino,
                pacote.dataSaida,
                pacote.duracao,
                pacote.localPartida,
                pacote.preco,
                pacote.lugaresDisponiveis,
                pacote.hotelIncluso,
                pacote.cafeManha,
                pacote.almoco,
                pacote.jantar,
                JSON.stringify(pacote.passeiosTuristicos)

            ];

            await conexao.execute(sql, parametros);
            await conexao.release(); // Libera a conexão de volta para o pool
        }
    }

    // Método para alterar um pacote de viagem
    async alterar(pacote){
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            const sql = `UPDATE pacote_viagem SET
                         destino = ?, data_saida = ?, duracao = ?, local_partida = ?, preco = ?, lugares_disponiveis = ?, hotel_incluso = ?, cafe_manha = ?, almoco = ?, jantar = ?, passeios_turisticos = ?
                         WHERE id = ?`;
            const parametros = [
                pacote.destino,
                pacote.dataSaida,
                pacote.duracao,
                pacote.localPartida,
                pacote.preco,
                pacote.lugaresDisponiveis,
                pacote.hotelIncluso,
                pacote.cafeManha,
                pacote.almoco,
                pacote.jantar,
                JSON.stringify(pacote.passeiosTuristicos),  // Armazenando passeios como JSON
                pacote.id
            ];

            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    // Método para excluir um pacote de viagem
    async excluir(pacote){
        if (pacote instanceof PacoteViagem) {
            const conexao = await conectar();
            const sql = `DELETE FROM pacote_viagem WHERE id = ?`;
            const parametros = [pacote.id];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

// Método para consultar pacotes de viagem
async consultar(){
    const conexao = await conectar();
    const sql = `SELECT * FROM pacote_viagem ORDER BY destino`;
    const [registros, campos] = await conexao.execute(sql);
    await conexao.release();

    let listaPacotes = [];
    for (const registro of registros) {
        let passeios = [];
        
        // Verifica se o campo não é nulo e tenta converter para JSON
        try {
            passeios = registro.passeios_turisticos 
                ? JSON.parse(registro.passeios_turisticos) 
                : [];
        } catch (erro) {
            console.error(`Erro ao converter passeios_turisticos do pacote ${registro.id}:`, erro);
            console.error("Valor armazenado:", registro.passeios_turisticos); 
            passeios = []; 
        }
        

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
