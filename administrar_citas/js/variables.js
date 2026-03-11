import {generarId} from "./functions.js";

// objeto de cita
const citaObject = {
    id : generarId(),
    paciente : '',
    propietario : '',
    email : '',
    telefono : '',
    fecha : '',
    sintomas : ''
};

let editando = {value : false};  // declarar de manera global una variable let la convierte en const


export {citaObject,editando};