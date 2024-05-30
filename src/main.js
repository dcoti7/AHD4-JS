//Importar la case tarea desde task.js 
import { Tarea } from "./task.js";

//Obtener elementos del DOM
const tareaForm = document.getElementById('task-form');
const tareaInput = document.getElementById('task-input');
const tareaList = document.getElementById('task-list');


//Crear array para almacenar las tareas.
let tareas = [];

//Función para agregar una nueva tarea
function addTask(descripcion){
    //crear una nueva instancia de la clase Tarea
    const nuevaTarea = new Tarea(descripcion);

    //Agregar la tarea al aray de tareas
    tareas.push(nuevaTarea);

    //actualizar lista de tareas ODm
    renderTareas(); 
}

//funcion para renderizar la lista de tareas en el DOM
function renderTareas(){
    //limpiar la lista de tareas en el DOM.
    tareaList.innerHTML="";
    //Iterar sobre todas las tareas
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.descripcion;
        
        //botón para eliminar tareas
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add('eliminar-btn');
        eliminarBtn.addEventListener('click', () => {
            eliminarTarea(tarea);
        })
        //Agregar clase completado si la tarea esta completa
        if(tarea.completado){
            li.classList.add('completada');
            
        }
        //agregar un evento click para marcar una tarea completa
        li.addEventListener('click', () => {
            tarea.tareaCompletada();
            renderTareas();
        });

        li.appendChild(eliminarBtn);
        tareaList.appendChild(li);
    })

}

//Agregar un evento de envío al formulario para agregar nuevas tareas
tareaForm.addEventListener('submit', event => {
    event.preventDefault();
    const descripcion = tareaInput.value.trim();
    if(descripcion!= ''){
        addTask(descripcion);
        tareaInput.value = "";
    }
})

//Función para eliminar una tarea
function eliminarTarea(tareaEliminar){
    tareas = tareas.filter(tarea => tarea !== tareaEliminar);
    renderTareas();
}


//Renderizar la lista de tareas al cargar la pagina
renderTareas();