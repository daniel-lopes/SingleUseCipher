function converterCaractereParaBinario(numero) {
    let binario = String(numero.toString(2));
    if (binario.length < 8) {
        let diferencaTamanho = 8 - binario.length;
        let zeroNaFrente = '';
        for (let i = 0; i < diferencaTamanho; i++) {
            zeroNaFrente += '0';
        }
        binario = zeroNaFrente.concat(binario);
    }
    return binario;
}

function converterTextoParaBinario(texto) {
    let textoBinario = '';
    for (let i = 0; i < texto.length; i++) {
        textoBinario += converterCaractereParaBinario(texto[i].charCodeAt()) + ',';
    }
    return textoBinario.split(',');
}

function converterBinarioParaTexto(textoBinario) {
    let texto = '';
    let textoBinarioEmVetor = textoBinario.split(' ');
    let binario;
    let codigoASC2;

    for (let i = 0; i < textoBinarioEmVetor.length; i++) {
        binario = parseInt(textoBinarioEmVetor[i]);
        codigoASC2 = parseInt(binario, 2);
        texto += String.fromCharCode(codigoASC2);
    }
    return texto.trim();
}

function UserException(message) {
    this.message = message;
    this.name = "UserException";
}

function criptograrBinario(binario, chave) {
    let binarioCriptografado = '';

    if (chave.length != 8) {
        alert("A chave deve possuir 8 caracteres!");
        throw new UserException("A chave deve ter 8 caracteres!");
    }

    for (let i = 0; i < 8; i++) {
        if (chave[i] != 0 && chave[i] != 1) {
            alert("O campo chave deve possuir apenas 0 (Zeros) e 1 (Ums)");
            throw new UserException("A chave deve ter 8 caracteres!");
        }
        if (binario[i] == chave[i]) {
            binarioCriptografado += '0';
        } else {
            binarioCriptografado += '1';
        }
    }
    return binarioCriptografado;
}

function criptografarChaveUnica() {
    let texto = document.getElementById('TextoParaCriptografar').value;
    let chave = document.getElementById('chave').value;
    let textoBinario = converterTextoParaBinario(texto);
    let textoCriptografado = '';
    for (let i = 0; i < textoBinario.length - 1; i++) {
        textoCriptografado += criptograrBinario(textoBinario[i], chave) + ' ';
    }
    document.getElementById('TextoParaCriptografar').value = null;
    document.getElementById('TextoParaDescriptografar').value = textoCriptografado.trim();
    console.log(textoCriptografado.trim());
}

function descriptografarChaveUnica() {
    let texto = document.getElementById('TextoParaDescriptografar').value;
    let chave = document.getElementById('chave').value;
    let textoBinario = '';
    let textoDescriptografado;
    let textoCriptografado = texto.split(' ');
    for (let i = 0; i < textoCriptografado.length; i++) {
        textoBinario += criptograrBinario(textoCriptografado[i], chave) + ' ';
    }
    textoDescriptografado = converterBinarioParaTexto(textoBinario.trim());
    document.getElementById('TextoParaCriptografar').value = textoDescriptografado;
    document.getElementById('TextoParaDescriptografar').value = null;
    console.log(textoDescriptografado);
}