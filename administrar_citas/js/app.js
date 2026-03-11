import {pacienteInput,propietarioInput,emailInput,telefonoInput,fechaInput,sintomasInput,formulario} from "./selectors.js";
import {datosCita,submitCita} from "./functions.js";

// events
pacienteInput.addEventListener('change',datosCita);
propietarioInput.addEventListener('change',datosCita);
emailInput.addEventListener('change',datosCita);
fechaInput.addEventListener('change',datosCita);
telefonoInput.addEventListener('change',datosCita);
sintomasInput.addEventListener('change',datosCita);
formulario.addEventListener('submit',submitCita);

