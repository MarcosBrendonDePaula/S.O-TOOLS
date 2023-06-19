/**
 * Adiciona uma ou várias classes a um elemento jQuery.
 *
 * @param {Object} obj - O objeto jQuery ao qual as classes serão adicionadas.
 * @param {Array} _class - Um array contendo as classes a serem adicionadas.
 */
function appendClass(obj, _class = []) {
    $(obj).addClass(_class.join(' '));
}

/**
 * Adiciona elementos filhos a um elemento jQuery.
 *
 * @param {Object} obj - O objeto jQuery ao qual os elementos filhos serão adicionados.
 * @param {Array} _childs - Um array contendo os elementos filhos a serem adicionados.
 */
function appendChilds(obj, _childs = []) {
    for (var i = 0; i < _childs.length; i++) {
        $(obj).append(_childs[i]);
    }
}

/**
 * Cria um elemento <span> com texto e classes personalizadas.
 *
 * @param {string} text - O texto a ser exibido no elemento <span>.
 * @param {Array} _childs - Um array contendo elementos filhos a serem adicionados ao elemento <span>.
 * @param {Array} _class - Um array contendo as classes a serem adicionadas ao elemento <span>.
 * @returns {Object} - O objeto jQuery representando o elemento <span> criado.
 */
function makeSigla(text, _childs = [], _class = []) {
    var spanSigla = $('<span>');
    spanSigla.html(text);
    appendClass(spanSigla, _class);
    appendChilds(spanSigla, _childs);
    return spanSigla;
}

/**
 * Cria um elemento HTML `<div>` representando um "bit" com cor de fundo e letra contrastante.
 *
 * @param {string} text - O texto a ser exibido no bit.
 * @param {Array} cor - A cor de fundo do bit no formato [r, g, b, a].
 * @returns {jQuery} - O objeto jQuery contendo o elemento `<div>` representando o bit.
 */
function makeBitRender(text = "", cor = [255, 255, 255, 1]) {
    var divBit = $('<div>');
    divBit.css({
        'background-color': `rgba(${cor[0]}, ${cor[1]}, ${cor[2]}, ${cor[3]})`,
        'display': 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'font-size': '1.5em'
    });

    // Determinar se a cor de fundo é escura ou clara
    var brightness = (cor[0] * 299 + cor[1] * 587 + cor[2] * 114) / 1000;
    var letraCor = (brightness > 125) ? [0, 0, 0, 1] : [255, 255, 255, 1];

    var spanSigla = makeSigla(text, [], ['sigla']);
    spanSigla.css('color', `rgba(${letraCor[0]}, ${letraCor[1]}, ${letraCor[2]}, ${letraCor[3]})`);

    appendClass(divBit, ['bit']);
    appendChilds(divBit, [spanSigla]);
    return divBit;
}

/**
 * Gera uma cor RGBA com base no nome e número fornecidos.
 *
 * @param {string} nome - O nome para gerar a cor.
 * @param {number} numero - O número para gerar a cor.
 * @returns {Array} - Um array contendo os valores RGBA da cor gerada.
 */
function gerarCorRGBA(nome) {
    function adler32(str) {
        var MOD_ADLER = 65521;
        var a = 1, b = 0;
        for (var i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % MOD_ADLER;
            b = (b + a) % MOD_ADLER;
        }
        return (b << 16) | a;
    }

    var hash = adler32(nome);
    var seed = (nome.length + hash) % 360;
    var alpha = 0.8; // Aumentamos o valor do alpha para 0.8 para tornar a cor mais opaca

    var h = seed / 360;
    var s = 1; // Aumentamos o valor de saturação para 0.8 para cores mais fortes e vivas
    var l = 0.5; // Aumentamos o valor de luminosidade para 0.6 para cores mais fortes e vivas

    var c = (1 - Math.abs(2 * l - 1)) * s;
    var x = c * (1 - Math.abs((h * 6) % 2 - 1));
    var m = l - c / 2;

    var r, g, b;

    if (h < 1 / 3) {
        r = c;
        g = x;
        b = 0;
    } else if (h < 2 / 3) {
        r = x;
        g = c;
        b = 0;
    } else {
        r = 0;
        g = x;
        b = c;
    }

    r = Math.floor((r + m) * 255);
    g = Math.floor((g + m) * 255);
    b = Math.floor((b + m) * 255);

    var corRGBA = [r, g, b, alpha];
    return corRGBA;
}


