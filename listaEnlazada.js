class Nodo {
    constructor(dato, enlace = null) {
        this.dato = dato;
        this.enlace = enlace;
    }

    toString() {
        return `${this.dato} => ${this.enlace}`;
    }

    leerDato() {
        return this.dato;
    }

    siguiente() {
        return this.enlace;
    }
}

class Lista {
    constructor() {
        this.primero = null;
    }

    leerPrimero() {
        return this.primero;
    }

    insertarCabezaLista(entrada) {
        const nuevo = new Nodo(entrada, this.primero);
        this.primero = nuevo;
    }

    insertarLista(anterior, entrada) {
        const nuevo = new Nodo(entrada, anterior.enlace);
        anterior.enlace = nuevo;
    }

    eliminar(entrada) {
        let actual = this.primero;
        let anterior = null;
        
        while (actual !== null && actual.dato !== entrada) {
            anterior = actual;
            actual = actual.enlace;
        }
        
        if (actual !== null) {
            if (actual === this.primero) {
                this.primero = actual.enlace;
            } else {
                anterior.enlace = actual.enlace;
            }
        }
    }

    buscarLista(destino) {
        let indice = this.primero;
        while (indice !== null) {
            if (indice.dato === destino) {
                return indice;
            }
            indice = indice.enlace;
        }
        return null;
    }

    visualizar() {
        let n = this.primero;
        const elementos = [];
        while (n !== null) {
            elementos.push(n.dato);
            n = n.enlace;
        }
        console.log(elementos.join(' '));
    }

    toString() {
        return `=> ${this.primero}`;
    }

    invertir() {
        let actual = this.primero;
        let previo = null;
        let siguiente = null;
    
        while (actual !== null) {
            siguiente = actual.enlace;  // Guarda el siguiente nodo
            actual.enlace = previo;     // Invierte el enlace actual
            previo = actual;            // Mueve previo hacia adelante
            actual = siguiente;         // Mueve actual hacia adelante
        }
    
        this.primero = previo;  // Actualiza la cabeza al nuevo primer nodo
    }

    eliminarDuplicados() {
        let actual = this.primero;
    
        while (actual !== null) {
            let corredor = actual;
            while (corredor.enlace !== null) {
                if (corredor.enlace.dato === actual.dato) {
                    corredor.enlace = corredor.enlace.enlace; // Elimina duplicado
                } else {
                    corredor = corredor.enlace; // Avanza el corredor
                }
            }
            actual = actual.enlace; // Avanza al siguiente elemento para verificar duplicados
        }
    }
    
    obtenerDesdeElFinal(n) {
        let principal = this.primero;
        let secundario = this.primero;
    
        // Mueve secundario n posiciones adelante
        for (let i = 0; i < n; i++) {
            if (secundario === null) return null; // Si la lista tiene menos de n nodos
            secundario = secundario.enlace;
        }
    
        // Mueve ambos punteros hasta que secundario llegue al final
        while (secundario !== null) {
            principal = principal.enlace;
            secundario = secundario.enlace;
        }
    
        return principal ? principal.dato : null;
    }
        
    toArray() {
        const resultado = [];
        let actual = this.primero;
        while (actual !== null) {
            resultado.push(actual.dato);
            actual = actual.enlace;
        }
        return resultado;
    }
}

function pruebas() {
    const lista = new Lista();

    // Prueba lista vacía
    console.assert(lista.obtenerDesdeElFinal(1) === null, "Falla: obtenerDesdeElFinal en lista vacía");

    // Prueba insertar en lista vacía
    lista.insertarCabezaLista(10);
    console.assert(lista.toArray().toString() === "10", "Falla: insertarCabezaLista en lista vacía");

    // Prueba con múltiples elementos
    lista.insertarCabezaLista(20);
    lista.insertarCabezaLista(30);
    lista.insertarCabezaLista(20); // duplicado
    lista.insertarCabezaLista(10); // duplicado

    console.assert(lista.toArray().toString() === "10,20,30,20,10", "Falla: insertar múltiples elementos");

    // Prueba eliminarDuplicados
    lista.eliminarDuplicados();
    console.assert(lista.toArray().toString() === "10,20,30", "Falla: eliminarDuplicados");

    // Prueba invertir
    lista.invertir();
    console.assert(lista.toArray().toString() === "30,20,10", "Falla: invertir lista");

    // Prueba obtenerDesdeElFinal
    console.assert(lista.obtenerDesdeElFinal(1) === 10, "Falla: obtener último elemento");
    console.assert(lista.obtenerDesdeElFinal(2) === 20, "Falla: obtener segundo desde final");
    console.assert(lista.obtenerDesdeElFinal(3) === 30, "Falla: obtener tercer desde final");

    console.log("¡Todas las pruebas superadas con éxito!");
}

const lista = new Lista();
lista.insertarCabezaLista(3);
lista.insertarCabezaLista(2);
lista.insertarCabezaLista(1);

console.log("Lista inicial:");
lista.visualizar(); 

const nodo2 = lista.buscarLista(2);
if (nodo2) {
    lista.insertarLista(nodo2, 5);
}

console.log("\nDespués de insertar 5 después del 2:");
lista.visualizar(); 

lista.eliminar(5);
console.log("\nDespués de eliminar el 5:");
lista.visualizar(); 

lista.eliminar(1);
console.log("\nDespués de eliminar la cabeza (1):");
lista.visualizar(); 

console.log("\nRepresentación toString:");
console.log(lista.toString()); 

pruebas();