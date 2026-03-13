import {citaObject,editando} from "./variables.js";
import {Notificacion} from "./Classes/notification.js";
import {AdminCitas} from "./Classes/adminCitas.js";
import {formulario,formularioInput,pacienteInput,propietarioInput,emailInput,telefonoInput,fechaInput,sintomasInput} from "./selectors.js";
import {DB} from "./IndexedDB/indexedDB.js";

const citas = new AdminCitas();

// function
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

function restartObjectCita() {
    // reiniciar el objeto --- tambien puedo usar: Object.assign(citaObject, {id : generarId(),paciente : '',propietario : '',})
    citaObject.id = generarId();
    citaObject.paciente = '';
    citaObject.propietario = '';
    citaObject.email = '';
    citaObject.telefono = '';
    citaObject.fecha = '';
    citaObject.sintomas = '';
};

function cargarEdicion(cita) {
    Object.assign(citaObject,cita);
    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    telefonoInput.value = cita.telefono;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;
    editando.value = true;
    formularioInput.value = 'Guardar Cambios';
};

// generador de ID basico
function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
};


export {datosCita,submitCita,restartObjectCita,cargarEdicion,generarId};