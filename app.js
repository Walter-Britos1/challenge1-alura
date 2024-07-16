let placeholder = document.getElementById('outputText').placeholder = 'Texto encriptado/desencriptado:';

// Funciones para encriptación y desencriptación del texto
const encrypText = (text) => {
  let encryptedText = text
    .replace(/e/g, 'enter')
    .replace(/i/g, 'imes')
    .replace(/a/g, 'ai')
    .replace(/o/g, 'ober')
    .replace(/u/g, 'ufat');
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

// Función para detectar si el texto está encriptado
const isEncrypted = (text) => {
  const encryptionPatterns = ['enter', 'imes', 'ai', 'ober', 'ufat'];
  const cleanedText = text.trim(); // Eliminar espacios al inicio y al final

  // Verificar si alguna de las cadenas de encriptación está presente en el texto en minúsculas
  const encrypted = encryptionPatterns.some((pattern) =>
    cleanedText.includes(pattern)
  );

  return encrypted;
};

// Función para mostrar la notificación
const showNotification = (message) => {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

// Función para copiar texto al portapapeles
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      showNotification('Texto copiado al portapapeles');
      // Limpiar textareas
      document.getElementById('inputText').value = '';
    },
    () => {
      showNotification('Error al copiar el texto');
    }
  );
};

// Función para mostrar el spinner
const showSpinner = () => {
  document.getElementById('spinner').style.display = 'block';
  document.getElementById('outputText').placeholder = '';
};

// Función para ocultar el spinner
const hideSpinner = () => {
  document.getElementById('spinner').style.display = 'none';
};

// Manejadores de eventos
document.getElementById('encryptButton').addEventListener('click', () => {
  const inputText = document.getElementById('inputText').value.trim();

  // Ocultar todos los mensajes de error
  const warningSpan = document.querySelector('.main__div span');
  const emptyTextWarning = document.getElementById('emptyTextWarning');
  warningSpan.classList.remove('show', 'warning', 'zoom');
  emptyTextWarning.classList.remove('show');

  // Verificar si el campo de entrada está vacío
  if (inputText === '') {
    emptyTextWarning.classList.add('show');
    document.getElementById('outputText').placeholder = '';

    // Ocultar el mensaje después de un tiempo
    setTimeout(() => {
      emptyTextWarning.classList.remove('show');
      placeholder
    }, 2000);

    return; // Detener la ejecución si no hay texto
  }

  // Verificar si el texto está en mayúsculas
  if (inputText === inputText.toUpperCase()) {
    warningSpan.classList.add('warning', 'zoom'); // Añadir clases de animación
    setTimeout(() => {
      warningSpan.classList.remove('warning', 'zoom'); // Quitar clases después de la animación
    }, 800);

    return; // Detener la ejecución si el texto está en mayúsculas
  }

  // Continuar con la encriptación/desencriptación si no hay errores
  document.getElementById('outputText').value = '';
  showSpinner();
  setTimeout(() => {
    if (isEncrypted(inputText)) {
      const decryptedText = decrypText(inputText);
      document.getElementById('outputText').value = decryptedText;
    } else {
      const encryptedText = encrypText(inputText);
      document.getElementById('outputText').value = encryptedText;
    }
    hideSpinner();
  }, 2000);
});


// Manejadores de eventos
document.getElementById('decryptButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').value;
  document.getElementById('outputText').value = '';
  showSpinner();
  setTimeout(() => {
    const decryptedText = decrypText(outputText);
    document.getElementById('outputText').value = decryptedText;
    hideSpinner();
  }, 2000);
});

document.getElementById('copyButton').addEventListener('click', () => {
  const outputText = document.getElementById('outputText').value;
  copyToClipboard(outputText);
});

// Manejador de evento para detectar cambios en el campo de entrada
document.getElementById('inputText').addEventListener('input', () => {
  document.getElementById('inputText').addEventListener('input', () => {
    const inputText = document.getElementById('inputText').value.trim(); // Obtén el valor y elimina espacios en blanco
    const decryptButton = document.getElementById('decryptButton');
    const encryptButton = document.getElementById('encryptButton');

    // Verificar si el texto está encriptado
    if (isEncrypted(inputText)) {
      decryptButton.disabled = false;
      encryptButton.disabled = true;
    } else {
      decryptButton.disabled = true;
      encryptButton.disabled = false;
    }
  });
});

document.getElementById('clearButton').addEventListener('click', () => {
  // Limpiar textareas
  document.getElementById('inputText').value = '';
  document.getElementById('outputText').value = '';

  // Volver a habilitar el boton de encriptar
  document.getElementById('encryptButton').disabled = false;
  placeholder
});
