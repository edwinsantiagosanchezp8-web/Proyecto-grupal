Evaluacion de cifrado

Integrantes:
Max Henríquez Pimiento
Edwin Santiago Sanchez Parra

Instructor:
Miguel


SENA-Centro Agroturístico
Ficha: 3477122
San Gil
2026



PRACTICA 1:

> const archivo = document.getElementById("archivo").files[0];

> archivo.name
'carta.txt'

> archivo.size
98

> archivo.type
'text/plain'

> const texto = await archivo.text();

> console.log(texto);
Querida Ñata:
El niño comió piña, pingüino y café.
¿Nos vemos el 15/11 a las 8:30? ¡Si!


> archivo.size
98

> texto. length
89

> // ¿Por que son distintos (archivo.size) y (texto.length)?
RTA= Los resultados son distintos porque el archive.size cuenta los bytes del archivo, mientras que texto.length cuenta las unidades de
codigo del javascript.

> texto.split("\n").length
 3

> // ¿Da 3 o 4? ¿Por que?
En mi caso me dio "3"; el resultado depende de los saltos de linea que

> function descargar(contenido, nombreArchivo) {
const blob - new Blob([contenido], {
type: "text/plain;charset=utf-8"

const url = URL.create0bjectURL(blob);

const enlace = document.createElement("a");
enlace.href - url;
enlace. download = nombreArchivo;
enlace.click();

setTimeout(function () {
URL.revokeObjectURL(ur1);
}, 1000);

> descargar(texto.toUpperCase(), "carta_mayus.txt");

1. ¿Por qué archivo.size y texto.length dan números distintos?

Porque archivo.size cuenta el tamaño del archivo en bytes, mientras que texto.length cuenta los caracteres del texto. Algunos caracteres especiales, como la ñ y las vocales con tilde, ocupan más de un byte al guardarse en UTF-8.

2. ¿Por qué una página web no puede leer un archivo de tu computador sin que tú lo elijas?

Porque los navegadores tienen medidas de seguridad que protegen los archivos personales del usuario. Por eso, la página necesita que la persona seleccione el archivo antes de poder leerlo.

3. ¿Qué quedaría guardado en la variable si escribes archivo.text() sin await?

Quedaría guardada una Promesa (Promise), porque la lectura del archivo es una operación asíncrona. Para obtener el contenido como texto se necesita utilizar await.


Practica 2:

Filter

> cesar("Ataca al amanecer", 7)
"Hahjh hr hshtljly'

> descifrar(cifrar("ABC"))
"ABC

> // ¿Que aparece?
Me arroja el mismo resultado que cuaando tenia el codigo correcto (const
nueva - ((posicion + k) % n + n) % n;) pero cuando solo coloco descifrar("ABC") si arroja el resultado incorrecto.
undefined

> descifrar("ABC")
'undefinedundefinedundefined'

> const secreto = "Uyc kbmqrfyc pekbnkw cñmbndyc";

> for (let k = 1; k < 27; k++) {
   console.log(k, cesar(secreto, -k));
}

> 10 'Los archivos guardan secretos'

> // ¿Cual es la clave y que dice?
la clave es el decimo mensaje, que dice (los archivos guardan
secretos).l


Practica 3:

> Paso	|     Transformación	    |        Funcionamiento
1	    | Conversión numérica       |	Cada carácter se convierte en un código de tres dígitos.
2	    | Inversión                 |	Se invierte el orden de los códigos.
3	    | Desplazamiento numérico	|   Se suma una clave a cada código.

> Paso |	Pieza            |	Configuración / clave       | Cómo se deshace
1	   | César (A)           |	Clave 7	                    | César con clave -7
2	   | Conversión numérica |	Código Unicode de 7 dígitos	| Convertir los números a caracteres
3	   | Invertir (C)        |	Invertir la cadena numérica	| Invertir nuevamente

> Si el otro grupo no logro romper su sistema sin la clave ¿Por que creen que fue? Si lo rompieron, ¿Que pieza les dio la pista? 



Prectica 4:

1. Como usar el programa

>Para cifrar un archivo:

Abrimos el archivo index.html en el navegador.

Seleccionamos la opción de cifrar en el menú del programa.

Cuando el programa lo solicite, seleccionamos el archivo .txt que queremos cifrar.

El programa lee el contenido del archivo y aplica nuestro sistema de cifrado.

Finalmente, se genera un nuevo archivo con el contenido cifrado, compuesto únicamente por números.

>Para descifrar un archivo:

Abrimos nuevamente el programa.

Seleccionamos la opción de descifrar.

Seleccionamos el archivo que contiene el texto cifrado.

El programa convierte los números nuevamente en caracteres y revierte las demás transformaciones.

Se genera un nuevo archivo con el texto original

2. Nuestro sistema

Nuestro sistema se llama Código 27. Lo diseñamos para que el texto original se convierta en una secuencia compuesta únicamente por números.

Para conseguirlo, combinamos dos piezas de la guía y una transformación numérica propia.

> El proceso funciona de la siguiente manera:

Cifrado César (pieza A): primero desplazamos las letras del texto siete posiciones dentro del alfabeto. La clave utilizada es 7.

Conversión numérica: después convertimos cada carácter en su código Unicode, utilizando siete dígitos para representar cada uno.

Invertir texto (pieza C): finalmente invertimos toda la secuencia numérica para obtener el resultado cifrado.


3. Ejemplo a mano 

>Ejemplo 1: hola

Paso 1. Aplicar César con clave 7:

H → O

O → V

L → S

A → H

Resultado: OVSH

Paso 2. Convertir cada carácter en siete dígitos Unicode:

O → 0000079

V → 0000086

S → 0000083

H → 0000072

Resultado: 0000079000008600000830000072

Paso 3. Invertir toda la secuencia numérica:

2700000380000068000009700000

> Ejempo 2:

Paso 1. Aplicar César con clave 7:

Ñ → U

a → h

n → t

d → k

ú → ú

Resultado: Uhtkú



Paso 2. Convertir cada carácter en siete dígitos Unicode:

U → 0000085

h → 0000104

t → 0000116

k → 0000107

ú → 0000250

Resultado: 00000850000104000011600001070000250

Paso 3. Invertir toda la secuencia numérica:

05200007010000611000040100005800000

4. Explicacion del codigo

- MAYUS: contiene las letras mayúsculas del alfabeto español.

- MINUS: contiene las letras minúsculas del alfabeto español.

- moverCaracter(caracter, k): busca una letra dentro del alfabeto y la desplaza según la cantidad indicada en la clave. Si el carácter no pertenece al alfabeto, lo deja igual.

- cesar(texto, k): recorre el texto carácter por carácter y aplica el desplazamiento César.

- codificarNumeros(texto): convierte cada carácter en su código Unicode y lo representa con siete dígitos.

- decodificarNumeros(texto): separa la secuencia numérica en bloques de siete dígitos y convierte cada bloque nuevamente en un carácter.

- invertir(texto): invierte el orden de los caracteres de una cadena.

- cifrar(texto): realiza los tres pasos del cifrado: César con clave 7, conversión numérica e inversión.

- descifrar(texto): realiza los pasos contrarios: inversión, conversión de números a caracteres y César con clave -7.

5. Como funciona el programa

El JavaScript se encarga de trabajar con los archivos seleccionados por el usuario. Primero obtiene el archivo, después lee su contenido y realiza las validaciones necesarias, como comprobar que se haya seleccionado un archivo y que tenga la extensión correspondiente.

Cuando el contenido está disponible, el menú utiliza las funciones cifrar() o descifrar(), dependiendo de la opción seleccionada.

Después de obtener el resultado, el programa genera un nuevo archivo de texto para que el usuario pueda guardarlo.

6. Verificacion 

Probamos con la carta, además de frases que contienen espacios, números, signos de puntuación y saltos de línea.

cifrar("Querida Ñata:
El niño comió piña, pingüino y café.
¿Nos vemos el 15/11 a las 8:30? ¡Sí!")

RTA/ 010000031000000100000310000033000007320000090000016100002300000360000084000001500000850000065000002300000221000040100004110000230000040100002300000940000094000007400000350000094000002300000411000080100002300000221000081100005110000801000099000002300000221000081100004800000191000001000003100000640000033200009010000401000060100002300000201000023000008110000611000011100002520000011000061100001110000911000023000004400000401000071100001110000911000023000003420000111000051100008110000601000023000008110000711000011100006110000230000041100006700000010000031000008500000401000079000004010000580000023000004010000701000011100001210000801000089000008800000

7. Por que es reversible

Probamos palabras como HOLA y Ñandú, además de frases que contienen espacios, números, signos de puntuación y saltos de línea.

También utilizamos la siguiente comparación:

descifrar(cifrar("HOLA")) === "HOLA"

El resultado fue verdadero, lo que demuestra que el texto recuperado coincide con el original.

Finalmente, realizamos pruebas con archivos de texto y comparamos el archivo original con el archivo descifrado. El objetivo fue comprobar que no se perdiera ni modificara ningún carácter.

8. Por qué es reversible

>Nuestro sistema es reversible porque cada transformación tiene una operación contraria que permite recuperar la información original.

- El desplazamiento César se deshace utilizando la clave -7.

- La conversión numérica se deshace convirtiendo cada bloque de siete dígitos nuevamente en su carácter Unicode.

- La inversión se deshace invirtiendo nuevamente la secuencia.


