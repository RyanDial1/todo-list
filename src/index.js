import {ToDo} from './todo.js';
import {project} from './project.js';
import {displayDefaultProject, displayForm, addItemtoChecklist, clearForm} from './DOM.js';
import './style.css';
//Call empty project on first load
project();

//Call DOM function on first load
//displayDefaultProject();

//TODO: click event module for buttons 
let clickEventsModule = (function(){
    //click event for displaying form
    const addNewToDo = document.querySelector(".add-todo-button");
    addNewToDo.addEventListener("click", displayForm);

    //click event for adding item to checklist on the form
    const addToChecklist = document.querySelector(".add-to-checklist");
    addToChecklist.addEventListener("click", addItemtoChecklist);

    //click event for clearing the form
    const clearButton = document.querySelector(".reset-button");
    clearButton.addEventListener("click", clearForm);

    //click event to submit a new todo form to project
    const submitButton = document.querySelector(".submit-button");
    submitButton.addEventListener("click", ToDo);
})();

