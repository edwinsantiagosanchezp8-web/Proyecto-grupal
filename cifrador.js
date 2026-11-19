const CLAVE_NUMERICA = 7;

const MAYUS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const MINUS = "abcdefghijklmnñopqrstuvwxyz";

function moverCaracter(caracter, k) {
    let posicion = MAYUS.indexOf(caracter);
    let alfabeto = MAYUS;
    if (posicion === -1) {
        posicion = MINUS.indexOf(caracter);
        alfabeto = MINUS;
    }
    if (posicion === -1) {
        return caracter;
    }
    let nuevaPosicion = ((posicion + k) % alfabeto.length + alfabeto.length) % alfabeto.length;
    return alfabeto[nuevaPosicion];
}

function cesar(texto, k) {
    let resultado = "";
    for (const caracter of texto) {
        resultado += moverCaracter(caracter, k);
    }
    return resultado;
}

function codificarNumeros(texto) {
    let resultado = "";
    for (const caracter of texto) {
        let numero = caracter.codePointAt(0);
        resultado += String(numero).padStart(7, "0");
    }
    return resultado;
}

function decodificarNumeros(texto) {
    let resultado = "";
    for (let i = 0; i < texto.length; i += 7) {
        let numero = Number(texto.slice(i, i + 7));
        resultado += String.fromCodePoint(numero);
    }
    return resultado;
}

function invertir(texto) {
    return Array.from(texto).reverse().join("");
}

function cifrar(texto) {
    let paso1 = cesar(texto, CLAVE_NUMERICA);
    let paso2 = codificarNumeros(paso1);
    let paso3 = invertir(paso2);
    return paso3;
}

function descifrar(texto) {
    let paso1 = invertir(texto);
    let paso2 = decodificarNumeros(paso1);
    let paso3 = cesar(paso2, -CLAVE_NUMERICA);
    return paso3;
}

console.log("PRUEBAS DEL CÓDIGO 27");
console.log(descifrar(cifrar("HOLA")) === "HOLA");
console.log(descifrar(cifrar("Ñandú, ¿cómo estás?")) === "Ñandú, ¿cómo estás?");
console.log(descifrar(cifrar("Prueba 123\nSegunda línea")) === "Prueba 123\nSegunda línea");
console.log("Sistema cargado correctamente");

const selector = document.getElementById("archivo");

function pedirArchivo() {
    return new Promise(function (entregar) {
        selector.value = "";
        selector.addEventListener("cancel", function () {
            entregar(null);
        }, { once: true });
        selector.addEventListener("change", async function () {
            const archivo = selector.files[0];
            if (!archivo) {
                entregar(null);
                return;
            }
            if (!archivo.name.toLowerCase().endsWith(".txt")) {
                alert("El archivo debe ser de texto (.txt).");
                entregar(null);
                return;
            }
            const texto = await archivo.text();
            if (texto.length === 0) {
                alert("El archivo está vacío.");
                entregar(null);
                return;
            }
            entregar({ nombre: archivo.name, texto: texto });
        }, { once: true });
    });
}

function descargar(contenido, nombreArchivo) {
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();
    setTimeout(function () {
        URL.revokeObjectURL(url);
    }, 1000);
}

function nombreSalida(nombreOriginal, sufijo) {
    const sinExtension = nombreOriginal.slice(0, -4);
    return sinExtension + sufijo + ".txt";
}

async function menu() {
    let opcion = "";
    while (opcion !== "3") {
        opcion = prompt(
            "CIFRADOR DE ARCHIVOS\n\n" +
            "1. Cifrar un archivo\n" +
            "2. Descifrar un archivo\n" +
            "3. Salir\n\n" +
            "Elige una opción:"
        );
        if (opcion === null) {
            opcion = "3";
        }
        opcion = opcion.trim();
        if (opcion === "1") {
            alert("Selecciona en la página el archivo .txt que quieres CIFRAR.");
            const archivo = await pedirArchivo();
            if (archivo !== null) {
                const resultado = cifrar(archivo.texto);
                if (descifrar(resultado) !== archivo.texto) {
                    alert("¡Cuidado! Al descifrar no se obtiene el texto original. Revisen su sistema.");
                } else {
                    const nombre = nombreSalida(archivo.nombre, "_cifrado");
                    descargar(resultado, nombre);
                    alert("Listo. Se descargó: " + nombre);
                }
            }
        } else if (opcion === "2") {
            alert("Selecciona en la página el archivo .txt que quieres DESCIFRAR.");
            const archivo = await pedirArchivo();
            if (archivo !== null) {
                const resultado = descifrar(archivo.texto);
                const nombre = nombreSalida(archivo.nombre, "_descifrado");
                descargar(resultado, nombre);
                alert("Listo. Se descargó: " + nombre);
            }

        } else if (opcion === "3") {
            alert("¡Hasta luego! Recarga la página (F5) para volver a usar el cifrador.");

        } else {
            alert("Opción no válida. Escribe 1, 2 o 3.");
        }
    }
}

menu();