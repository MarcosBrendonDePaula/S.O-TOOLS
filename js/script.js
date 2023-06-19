/**
 * Função construtora para criar um objeto Programa.
 *
 * @param {string} nome - O nome do programa.
 * @param {number} tamanho - O tamanho do programa.
 * @param {Array} cor - A cor do programa no formato [x, y, z, c].
 * @returns {Object} - Objeto Programa criado.
 */
function Programa(nome = "", tamanho = 1, cor = undefined) {
    if (cor === undefined) {
        cor = gerarCorRGBA(nome);
    }

    if (nome.length === 0) {
        nome = 'U';
    }

    this.cor = cor;
    this.nome = nome;
    this.sigla = nome[0];
    this.tamanho = tamanho;
}

/**
 * Classe Fragmento representa um fragmento de memória.
 * @param {number} posicaoInicial - A posição inicial do fragmento.
 * @param {number} posicaoFinal - A posição final do fragmento.
 * @param {number} status - O status do fragmento (0: não utilizado, 1: utilizado).
 * @param {Object} programa - O programa associado ao fragmento (opcional).
 */
function Fragmento(posicaoInicial, posicaoFinal, status = 0, programa = undefined) {
    this.posicaoInicial = posicaoInicial;
    this.posicaoFinal = posicaoFinal;
    this.status = status;
    this.programa = programa;

    /**
     * Verifica se um bit pertence ao fragmento.
     * @param {number} posicaoBit - A posição do bit a ser verificado.
     * @returns {boolean} - True se o bit pertence ao fragmento, False caso contrário.
     */
    this.verificarBit = function(posicaoBit) {
        return posicaoBit >= this.posicaoInicial && posicaoBit <= this.posicaoFinal;
    };
}

this.fragmentos = [];
/**
 * Função construtora para criar um objeto Bit.
 *
 * @param {string} nome - O nome do bit.
 * @param {Array} cor - A cor do bit no formato [x, y, z, c].
 * @param {Object} programa - O programa associado ao bit.
 * @param {Object} proximo - O próximo bit na sequência caso o programa seja fragmentado em blocos distintos.
 * @returns {Object} - Objeto Bit criado.
 */
function Bit(nome = " ", cor = undefined, programa = undefined, proximo = undefined) {
    if (cor === null || cor === undefined) {
        cor = gerarCorRGBA(nome);
    }

    this.cor  = cor;
    this.nome  = nome;
    this.sigla = nome[0];
    this.programa = programa;
    this.proximo = proximo;
}


/**
 * Função construtora para criar um objeto Memoria.
 *
 * @param {Element} obj - O elemento DOM que representa a memória.
 * @returns {Object} - Objeto Memoria criado.
 */
function Memoria(obj) {
    this.container = $(obj);
    this.visualizador = this.container.find('.visualizador');

    this.memoria = [];
    this.programas_alocados = [];
    this.fragmentos = [];

    /**
     * Função para retornar o fragmento de um determinado bit.
     * @param {Array} fragmentos - O array de fragmentos.
     * @param {number} posicaoBit - A posição do bit a ser buscado.
     * @returns {Object|null} - O fragmento que contém o bit ou null se o bit não for encontrado em nenhum fragmento.
     */
    this.buscarFragmento = (posicaoBit) => {
        for (let i = 0; i < this.fragmentos.length; i++) {
            const fragmento = this.fragmentos[i];
            if (posicaoBit >= fragmento.posicaoInicial && posicaoBit <= fragmento.posicaoFinal) {
                return fragmento;
            }
        }
        return null;
    }

    
    /**
     * Função construtora interna para inicializar a memória.
     */
    this.constructorFn = function() {
        let size        = parseInt(this.container.attr('data-size') || '0');
        this.fragmentos = [new Fragmento(0,size,0,undefined)]
        for (let pos = 0; pos < size; pos++) {
            this.memoria.push(new Bit(' '));
        }
        this.update();
    };

    /**
     * Atualiza a renderização da memória.
     */
    this.update = () => {
        this.render();
    };

    /**
     * Renderiza a memória.
     */
    this.render = () => {
        this.visualizador.html("");
        this.memoria.forEach(element => {
            this.visualizador.append(makeBitRender(element.sigla, element.cor));
        });
    };

    /**
     * Redimensiona a memória para um novo tamanho.
     *
     * @param {number} newSize - O novo tamanho da memória.
    */
    this.redimensionar = function(newSize) {
        if (newSize <= 0) {
            return;
        }

        var currentSize = this.memoria.length;

        if (newSize === currentSize) {
            return;
        }

        if (newSize < currentSize) {
            this.memoria.splice(newSize);
        } else {
            for (var i = currentSize; i < newSize; i++) {
                this.memoria.push(new Bit(' '));
            }
        }
        this.update();
    };

    this.constructorFn();
}

let containers = $(".memoria");
//inicializa varias memorias
// $containers.map((index, container) => {
//     new Memoria(container);
// });
let memoria = new Memoria(containers[0]);

$(document).ready(function() {
    $('#confirmar').click(function() {
      var novoTamanho = $('#memoriaSize').val();
      // Aqui, substitua "objetoMemoria" pelo nome do seu objeto Memoria
      memoria.redimensionar(novoTamanho);
      $('#modalMemoria').modal('hide');
    });
});