import {pacienteInput,propietarioInput,emailInput,telefonoInput,fechaInput,sintomasInput,formulario} from "./selectors.js";
import {datosCita,submitCita} from "./IndexedDB/indexedDB.js";
import {crearDB} from "./IndexedDB/indexedDB.js";

// window load
window.onload = () => {
    eventListeners();
    crearDB();
};

// events
function eventListeners() {
    pacienteInput.addEventListener('change',datosCita);
    propietarioInput.addEventListener('change',datosCita);
    emailInput.addEventListener('change',datosCita);
    fechaInput.addEventListener('change',datosCita);
    telefonoInput.addEventListener('change',datosCita);
    sintomasInput.addEventListener('change',datosCita);
    formulario.addEventListener('submit',submitCita);
};