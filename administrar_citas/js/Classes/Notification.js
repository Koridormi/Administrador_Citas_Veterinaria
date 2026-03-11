import {formulario} from "../selectors.js";

// notification
class Notificacion {
    constructor({texto,tipo}) {
        this.texto = texto;
        this.tipo = tipo;
        this.mostrar();
    }

    mostrar() {
        // crear la notificacion
        const alerta = document.createElement('div');
        alerta.classList.add('text-center','w-full','p-3','text-white','my-5','alert','uppercase','font-bold','text-sm');
        // evitar que se agreguen multiples alertas
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove();
        // si es de tipo error
        this.tipo === 'error' ? alerta.classList.add("bg-red-500") : alerta.classList.add('bg-green-500');
        // mensaje de error
        alerta.textContent = this.texto;
        // insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);
        // eliminar notificacion luego de un tiempo
        setTimeout(() =>{
            alerta.remove();
        },3000)
    }
};


export {Notificacion};