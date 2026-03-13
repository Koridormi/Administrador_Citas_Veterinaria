import {citaObject,editando} from "./variables.js";
import {formularioInput,pacienteInput,propietarioInput,emailInput,telefonoInput,fechaInput,sintomasInput} from "./selectors.js";

// functions
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


export {restartObjectCita,cargarEdicion,generarId};