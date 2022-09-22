import { compareAsc, format, parseISO, startOfToday } from "date-fns";
import { clearForm } from "./DOM";
import {saveToDoToLocal} from "./manage-storage.js"


let toDoArray = [];

export const ToDo = () => {
    let Title = document.getElementById("Title").value;
    let Description = document.getElementById("Description").value;
    let DueDate = document.getElementById("DueDate").value;
    let Priority = document.getElementById("Priority").value;

    //check for empty fields
    if(Title == "" || Description == "" || DueDate == "" || Priority == ""){
        alert("Fields are required");
        return;
    }

    //check if pre-date was entered
    if (parseISO(DueDate) < startOfToday()){
        alert("Date has already passed");
        return;
    }

    //loop over checklist and convert to string 
    const nodeListChecklist = document.querySelectorAll("li");
    let checkListArray = [];
    for (let i =0; i < nodeListChecklist.length; i++){
        //remove x from list and push to array
        let strippedCheckList = nodeListChecklist[i].textContent.replace("\u00D7", '');
        checkListArray.push(strippedCheckList);
    }

    //remove checklist array and convert to string separated by commas
    let checkList = checkListArray.join(", ");


    //add to toDoArray
    toDoArray.push({Title, Description, DueDate, Priority, checkList});
    console.log(toDoArray);

    //call storage module and push to local storage

    //clear form after submitting task
    //checkList is moved outside of the object because its not a property, it is a string
    saveToDoToLocal({Title, Description, DueDate, Priority}, checkList);


    clearForm();

    return{Title, Description, DueDate, Priority}, checkList;

}


