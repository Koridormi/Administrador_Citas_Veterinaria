// indexedDB
let DB;

function crearDB() {
    // crear base de datos 1.0
    const crearDB = window.indexedDB.open('citas', 1.0);
    // si hay un error
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }
    // todo salio bien
    crearDB.onsuccess = function() {
        console.log('La DB se creo correctamente');
        DB = crearDB.result;
    }
    // definir el schema
    crearDB.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('citas', {
            keyPath: "id",
            autoIncrement: true
        })
        // definir todas las columnas
        objectStore.createIndex('id', 'id', { unique: true});
        objectStore.createIndex('paciente', 'paciente', { unique: false});
        objectStore.createIndex('propietario', 'propietario', { unique: false});
        objectStore.createIndex('email', 'email', { unique: false});
        objectStore.createIndex('telefono', 'telefono', { unique: false});
        objectStore.createIndex('fecha', 'fecha', { unique: false});
        objectStore.createIndex('sintomas', 'sintomas', { unique: false});

        console.log('DB creada y lista');
    }
};











export {crearDB,DB};