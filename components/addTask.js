import { uniqueDates } from '../services/date.js';
import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import { displayTasks } from './readTasks.js';

export const addTask = (evento) => { //recibe un evento y este evento genera el formulario
  evento.preventDefault();
  
  const list = document.querySelector('[data-list]'); //trae la lista donde agregamos las tareas
  const input = document.querySelector('[data-form-input]'); //el usario llena con la tarea que quiere programar
  const calendar = document.querySelector('[data-form-date]'); //calendario donde selecciona la fecha

  const value = input.value; //texto que puso el usuario
  const date = calendar.value; //fecha que puso seleccionó el usuario
  const dateFormat = moment(date).format("DD/MM/YYYY"); //da formato a la fecha con la librería moment

  if(value === "" || date === "") {
    return;
  }

  input.value = ''; //limpiar el input para que lo que ingrese el usuario se borre una vez lo agregue a la lista
  calendar.value = ''; //limpiar la fecha para que se borre una vez el usuario agregue la tarea
  
  const complete = false;

  const taskObject = { //generar una constante objeto para almacenar el contenido de la tarea y el formato de la fecha
    value,
    dateFormat,
    complete,
    id: uuid.v4(), //librería para agregar id's a los elementos
  }

  list.innerHTML = '';
  
  const taskList = JSON.parse(localStorage.getItem('tasks')) || []; //lo que tiene almacenado el local storage con la llave task, lo regresa en un formato json y para que lo podamos utilizar lo pasamos por la función JSON.parse para que genere un objeto js y en caso que nos regrese null nos defina un arreglo vacío
  taskList.push(taskObject); //le agregamos el objeto a la lista
  localStorage.setItem("tasks", JSON.stringify(taskList)); //volver a almacenar el arreglo de tareas almacenado y convirtiéndolo a formato JSON
  
  displayTasks();
};

export const createTask = ({value, dateFormat, complete, id}) => { //recibe dos llaves, value y dateFormat
  
  const task = document.createElement('li'); //genera un elemento de tipo li
  task.classList.add('card'); //agrega la clase llamada card para que tome el mismo formato dado en css

  const taskContent = document.createElement('div'); //agrega un elemento tipo div

  const check = checkComplete(id);

  if(complete){
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }

  const titleTask = document.createElement('span'); //agrega un elemento tipo span
  titleTask.classList.add('task'); //al elemento span le agrega la tarea task
  titleTask.innerText = value; //agrega el valor o texto que escribió el usuario
  taskContent.appendChild(check); //agregando el icono de checkbox a taskContent
  taskContent.appendChild(titleTask); //agregando el título de la tarea
  
  task.appendChild(taskContent); //agrega el contenido de la lista de la tarea
  task.appendChild(deleteIcon(id)); //agrega el ícono de borrar
  
  return task; //regresamos la tarea
};