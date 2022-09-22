import {project} from './project.js';

export function displayDefaultProject () {
   

    //create div for empty project
    const projectDiv = document.createElement('div');
    projectDiv.textContent = project().projectTitle;
    contentDiv.append(projectDiv);
}

export function displayForm(){
    document.getElementById("add-todo-form").style.display = "";
}

export function addItemtoChecklist(){
    const addItem = document.getElementById("add-to-checklist").value;

    if(addItem !== ""){
        const ul = document.querySelector(".todo-ul");
        const li = document.createElement("li");
        li.textContent = addItem;
        const span = document.createElement("span"); //create span to create a clickable area
        span.className = "remove-checklist-item";
        const removeIcon = document.createTextNode("\u00D7"); //creates an x to remove from screen
        li.append(span);
        span.append(removeIcon);
        ul.append(li);
        document.getElementById("add-to-checklist").value = ""; //clears the data

        if(document.querySelectorAll("li").length > 0){ //event listener to remove each li element
            const nodeListChecklist = document.querySelectorAll("li");
            nodeListChecklist.forEach(checkListItem => {
                checkListItem.addEventListener("click", function removeItemFromChecklist (){
                    checkListItem.remove();
                });
            })
        }
        else return;
    }
}

export function clearForm() {
    const nodeListChecklist = document.querySelectorAll("li");
    for (let i = 0; i < nodeListChecklist.length; i++){
    nodeListChecklist[i].remove();
    }
    document.getElementById("add-todo").reset();
}

export function displayToDo(){
 

    //Gather data from local storage and assign to variables
    let Title = localStorage.getItem("Title");
    let Description = localStorage.getItem("Description");
    let DueDate = localStorage.getItem("DueDate");
    let Priority = localStorage.getItem("Priority");
    let Checklist = localStorage.getItem("Checklist");

    //check if each field is filled out, if not return
    if(Title == null || Description == null || DueDate == null){
        return;
    }

    //check and clear current display DOM
    const removeDivs = document.querySelectorAll(".card");
    for(let i = 0; i < removeDivs.length; i++){
        removeDivs[i].remove();
    }

    //Create display card 
    const projects = document.querySelector(".projects");
    const card = document.createElement("div");
    card.classList.add("card");
    projects.appendChild(card);

    //Create delete todo button
    const deleteToDoButton = document.createElement("button");
    deleteToDoButton.classList.add("remove-todo-button");
    deleteToDoButton.textContent = "Delete/Complete ToDo";
    card.append(deleteToDoButton);
    deleteToDoButton.addEventListener("click", function deleteToDo(){
        card.remove();
        localStorage.clear();
    });

    //Place data in array and display to DOM on right side of display
    let _displayArray = {Title, Description, DueDate, Priority};
    console.log(_displayArray);

    for (let key in _displayArray){
        console.log(`${key}: ${_displayArray[key]}`);
        const para = document.createElement("p");
        para.textContent = (`${key}: ${_displayArray[key]}`);
        card.appendChild(para);
    }

    //DOM for checklist items on right side of display
    const para = document.querySelectorAll("p");
    const CheckListLabel = document.createElement("p");
    CheckListLabel.textContent = "Checklist Items (Click when completed)";
    const ul = document.createElement("ul");
    CheckListLabel.classList.add("check-list-label");
    para[para.length-1].appendChild(ul); //last item in para and then append ul at the end
    ul.appendChild(CheckListLabel);


    console.log("contents from checklist that are stored in local storage", Checklist);
    let _checkListArray = Checklist.split(",");

    if (Checklist !== ""){
        //loop through checklistarray to create an Li and display to DOM for each
        for (let i = 0; i < _checkListArray.length; i++){
            console.log(_checkListArray[i]);
            let li = document.createElement("li");
            li.className = "display-li";
            li.textContent = _checkListArray[i];
            console.log(li);

            //add click event for each li and toggle css to cross out item in checklist
            li.addEventListener("click", function strikeOutCheckListItem() {
                if(li.classList.toggle("done")){
                    localStorage.setItem(li.textContent, "true");
                } else if(li.classList.toggle("display-li")){
                    localStorage.setItem(li.textContent, "false")
                }
            });
            ul.appendChild(li);
        }
    } else return;


    //call on page refresh to check for existing strikes through checklist items

    window.onload = function() {
        //loop through current display li's on DOM and assign strike through css 
        const liNodes = document.querySelectorAll(".display-li");
        liNodes.forEach(liNode => {
            if(localStorage.getItem(liNode.textContent) == "true") {
                liNode.className = "done";
            }
        })
    }
}