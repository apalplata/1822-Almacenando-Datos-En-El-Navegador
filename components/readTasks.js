import { createTask } from "./addTask.js";
import dateElement from "./dateElement.js";
import { uniqueDates, orderDates } from "../services/date.js";

export const displayTasks = () => {
  const list = document.querySelector("[data-list]"); //selecciona la lista a la cual agregar las tareas almacenadas
  const tasksList = JSON.parse(localStorage.getItem('tasks')) || []; //tomando la info que está almacenada en el local storage
  const dates = uniqueDates(tasksList);
  orderDates(dates);

  dates.forEach((date) => {
    const dateMoment = moment(date, "DD/MM/YYYY");
    list.appendChild(dateElement(date));
    tasksList.forEach((task) => { //recorre el arreglo, a cada uno de los elementos que existen dentro del arreglo le vamos a enviar la estructura
      const taskDate = moment(task.dateFormat, "DD/MM/YYYY");
      const diff = dateMoment.diff(taskDate);
     
      if(diff === 0) {
        list.appendChild(createTask(task));
      }
    });
  });
};