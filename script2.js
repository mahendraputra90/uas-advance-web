let allTasks = [];
let innerTasks = [];

let count = 1;
const upperLi = document.getElementById("upperLi");
const innerLi = document.getElementById("innerLi");
const mainForm = document.getElementById("addingForm");
const mainInput = addingForm.children[0];
const mainList = document.getElementById("mainList");
const delAll = document.getElementById("delAll");

eventListeners();
loadLS();
loadInnerTasks();


function eventListeners() {
  
  mainForm.addEventListener("submit", addNewItem);

  
  mainList.addEventListener("click", taskStufs);

  
  delAll.addEventListener("click", deleteAll);
}


function createNewTask(text, check) {
  
  const newLi = upperLi.cloneNode(true);
 
  newLi.classList.remove("d-none");
  
  newLi.setAttribute("id", "");

  newLi.children[0].setAttribute("href", `#collapse${count}`); 

  newLi.children[0].classList.remove("line-throught");

  newLi.children[0].innerText = text;
  if (check === true) {
    newLi.children[0].classList.add("line-throught");
  } else {
    newLi.children[0].classList.remove("line-throught");
  }
  newLi.children[3].setAttribute("id", `collapse${count}`);

  mainList.children[0].appendChild(newLi);

  count++; 
  mainInput.value = "";
}


function addNewItem(e) {
  e.preventDefault();

  const taskText = mainInput.value;

  if (taskText != "") {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
    let c = false;
    allTasks.forEach(function (item) {
      if (item.text == taskText) {
        c = true;
        alert("Task Already Added");
      }
    });
    if (c == false) {
      createNewTask(taskText);
      saveLS(taskText, 1);
    }
  }
}


function addInnerTask(upperText, mainText, check) {

  let tempLi = innerLi.cloneNode(true);
  tempLi.setAttribute("id", "");


  tempLi.childNodes.forEach(function (item, index) {
    if (index == 3 || index == 5) {
      item.classList.remove("d-none");
    }
  });

  tempLi.children[0].innerText = mainText;


  if (check == true) {
    tempLi.children[0].classList.add("line-throught");
  } else {
    tempLi.children[0].classList.remove("line-throught");
  }


  let tempList;
  for (let i = 1; i < mainList.children[0].children.length; i++) {
    if (upperText == mainList.children[0].children[i].children[0].innerText) {
      tempList = mainList.children[0].children[i];
      break;
    }
  }


  tempList.lastElementChild.firstElementChild.firstElementChild.insertBefore(
    tempLi,
    tempList.lastElementChild.firstElementChild.firstElementChild
      .lastElementChild
  );
}


