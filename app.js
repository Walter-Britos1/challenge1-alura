// Funciones para encriptación y desencriptación del texto
const encrypText = (text) => {
  let encryptedText = text
      .replace(/e/g, 'enter')
      .replace(/e/g, 'enter')
      .replace(/i/g, 'imes')
      .replace(/a/g, 'ai')
      .replace(/o/g, 'ober')
      .replace(/u/g, 'ufat')
    return encryptedText;

};

const decrypText = (text) => {
  let decryptedText = text
      .replace(/enter/g, 'e')
      .replace(/imes/g, 'i')
      .replace(/ai/g, 'a')
      .replace(/ober/g, 'o')
      .replace(/ufat/g, 'u');
    return decryptedText;
};


// Función para copiar texto al portapapeles
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Texto copiado al portapapeles');
  }, () => {
      alert('Error al copiar el texto');
  });
};



// Manejadores de eventos
document.getElementById('encryptButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  const encryptedText = encrypText(inputText);
  document.getElementById('outputText').value = encryptedText;
});

document.getElementById('descryptButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  const decryptedText = decrypText(inputText);
  document.getElementById('outputText').value = decryptedText;
});

document.getElementById('copyButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value;
  copyToClipboard(inputText);
})