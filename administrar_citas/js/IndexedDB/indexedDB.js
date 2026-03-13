import {citaObject,editando} from "../variables.js";
import {restartObjectCita,cargarEdicion} from "../functions.js";
import {Notificacion} from "../Classes/notification.js";
import {formulario,formularioInput,contenedorCitas} from "../selectors.js";

// indexedDB
let DB;

function crearDB() {
    // crear base de datos 1.0
    const crearDB = window.indexedDB.open('citas', 1.0);
    // si hay un error
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }
    // si todo salio bien
    crearDB.onsuccess = function() {
        console.log('La DB se creo correctamente');
        DB = crearDB.result;
        // cargar citas desde IndexedDB cuando este todo listo
        citas.cargarCitas();
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

// class AdminCitas
class AdminCitas {
    constructor() {
        this.citas = [];
    }
    agregar(cita) {
        this.citas = [...this.citas,cita];
        this.mostrar();
    }
    editar(citaActualizada) {
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
        // actualizar en IndexedDB
        if (DB) {
            const transaction = DB.transaction(['citas'], 'readwrite');
            const objectStore = transaction.objectStore('citas');
            objectStore.put(citaActualizada);
            transaction.oncomplete = () => console.log('Cita actualizada en DB');
            transaction.onerror = () => console.error('Error al actualizar en DB');
        }
        this.mostrar();
    }
    eliminar(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
        // eliminar de IndexedDB
        if (DB) {
            const transaction = DB.transaction(['citas'], 'readwrite');
            const objectStore = transaction.objectStore('citas');
            objectStore.delete(id);
            transaction.oncomplete = () => console.log('Cita eliminada de DB');
            transaction.onerror = () => console.error('Error al eliminar de DB');
        }
        this.mostrar();
    }

    mostrar() {
        // limpiar HTML
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
        // comprobar si hay citas
        if(this.citas.length === 0) {
            contenedorCitas.innerHTML = `<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>`;
            return;
        }
        // generando citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');

            const paciente = document.createElement('p');
            paciente.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

            const telefono = document.createElement('p');
            telefono.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            telefono.innerHTML = `<span class="font-bold uppercase">Telefono: </span> ${cita.telefono}`;

            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case');
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
            // boton editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');
            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
            const clone = structuredClone(cita);
            btnEditar.onclick = () => cargarEdicion(clone);
            // boton eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
            btnEliminar.onclick = () => this.eliminar(cita.id);

            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex','justify-between','mt-10');
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // agregar HTML
            divCita.appendChild(paciente);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(telefono);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
            contenedorCitas.appendChild(divCita);
        });
    }

    cargarCitas() {
        if (!DB) {
            console.error('DB no esta lista');
            return;
        }
        const objectStore = DB.transaction('citas').objectStore('citas');
        const request = objectStore.getAll();
        request.onsuccess = (event) => {
            this.citas = event.target.result;
            this.mostrar();
        };
        request.onerror = () => {
            console.error('Error al cargar citas');
        };
    }
};

const citas = new AdminCitas();

// functions IndexedDB
function datosCita(event) {
    citaObject[event.target.name] = event.target.value;
};

function submitCita(event) {
    event.preventDefault();
    if(Object.values(citaObject).some(valor => valor.trim() === '')) {
            new Notificacion({
            texto : 'Todos los campos son obligatorios',
            tipo : 'error'
        })
        return;
    }
    if(editando.value) {
        citas.editar({...citaObject});
        new Notificacion({
            texto : 'Guardado Correctamente',
            tipo : 'exito'
        })
    } else {
        citas.agregar({...citaObject});
        // indexedDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');
        objectStore.add(citaObject);
        transaction.oncomplete = function() {
            console.log('Cita agregada');
        }
        new Notificacion({
            texto : 'Paciente Registrado',
            tipo : 'exito'
        })
    }
    formulario.reset();
    restartObjectCita();
    formularioInput.value = 'Registrar Paciente';
    editando.value = false;
};


export {crearDB,datosCita,submitCita,AdminCitas};