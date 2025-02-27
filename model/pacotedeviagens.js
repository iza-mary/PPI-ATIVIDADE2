import PacoteViagemDB from"../database/PacoteViagemBD.js";
export default class PacoteViagem {

    // Atributos privados do pacote de viagem
    #id;
    #destino;  
    #dataSaida;
    #duracao;
    #localPartida;
    #preco;
    #lugaresDisponiveis;
    #hotelIncluso;
    #cafeManha;
    #almoco;
    #jantar;
    #passeiosTuristicos;
    constructor(id, destino, dataSaida, duracao, localPartida, preco, lugaresDisponiveis, hotelIncluso, cafeManha, almoco, jantar, passeiosTuristicos) {
        this.#id = id;
        this.#destino = destino; 
        this.#dataSaida = dataSaida;
        this.#duracao = duracao;
        this.#localPartida = localPartida;
        this.#preco = preco;
        this.#lugaresDisponiveis = lugaresDisponiveis;
        this.#hotelIncluso = hotelIncluso;
        this.#cafeManha = cafeManha;
        this.#almoco = almoco;
        this.#jantar = jantar;
        this.#passeiosTuristicos = passeiosTuristicos; 
    }
    

    // Métodos Getters e Setters
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    get destino() {
        return this.#destino;
    }

    set destino(novoDestino) {
        this.#destino = novoDestino;
    }

    get dataSaida() {
        return this.#dataSaida;
    }

    set dataSaida(novaDataSaida) {
        this.#dataSaida = novaDataSaida;
    }

    get duracao() {
        return this.#duracao;
    }

    set duracao(novaDuracao) {
        this.#duracao = novaDuracao;
    }

    get localPartida() {
        return this.#localPartida;
    }

    set localPartida(novoLocalPartida) {
        this.#localPartida = novoLocalPartida;
    }

    get preco() {
        return this.#preco;
    }

    set preco(novoPreco) {
        this.#preco = novoPreco;
    }

    get lugaresDisponiveis() {
        return this.#lugaresDisponiveis;
    }

    set lugaresDisponiveis(novoLugaresDisponiveis) {
        this.#lugaresDisponiveis = novoLugaresDisponiveis;
    }

    get hotelIncluso() {
        return this.#hotelIncluso;
    }

    set hotelIncluso(novoHotelIncluso) {
        this.#hotelIncluso = novoHotelIncluso;
    }

    get cafeManha() {
        return this.#cafeManha;
    }

    set cafeManha(novoCafeManha) {
        this.#cafeManha = novoCafeManha;
    }

    get almoco() {
        return this.#almoco;
    }

    set almoco(novoAlmoco) {
        this.#almoco = novoAlmoco;
    }

    get jantar() {
        return this.#jantar;
    }

    set jantar(novoJantar) {
        this.#jantar = novoJantar;
    }

    get passeiosTuristicos() {
        return this.#passeiosTuristicos;
    }

    set passeiosTuristicos(novoPasseiosTuristicos) {
        this.#passeiosTuristicos = novoPasseiosTuristicos;
    }

    // Retorna os dados do objeto em formato JSON
    toJSON() {
        return {
            "id": this.#id,
            "destino": this.#destino, 
            "dataSaida": this.#dataSaida,
            "duracao": this.#duracao,
            "localPartida": this.#localPartida,
            "preco": this.#preco,
            "lugaresDisponiveis": this.#lugaresDisponiveis,
            "hotelIncluso": this.#hotelIncluso,
            "cafeManha": this.#cafeManha,
            "almoco": this.#almoco,
            "jantar": this.#jantar,
            "passeiosTuristicos": this.#passeiosTuristicos
        };
    }

    
    // Gravar o pacote no banco de dados
    async gravar() {
        const pacoteDB = new PacoteViagemDB();
        await pacoteDB.gravar(this);  // Grava o pacote no banco
    }

    // Alterar os dados do pacote no banco de dados
    async alterar() {
        const pacoteDB = new PacoteViagemDB();
        await pacoteDB.alterar(this);  // Altera os dados do pacote no banco
    }

    // Excluir o pacote do banco de dados
    async excluir() {
        const pacoteDB = new PacoteViagemDB();
        await pacoteDB.excluir(this);  // Exclui o pacote do banco
    }

    // Consultar todos os pacotes de viagem no banco de dados
    static async consultar() {
        const pacoteDB = new PacoteViagemDB();
        return await pacoteDB.consultar();  // Retorna todos os pacotes
    }
}