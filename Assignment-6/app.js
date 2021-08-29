// Todo Input
const todoInput = document.getElementById('todoInput');
// Button to add Todo
const addButton = document.getElementById('add');
// ul containing Todos
const todoList = document.getElementById('todo');
// Array containing Todo li
const todoArray=[];


  // Adding Todos in ul
  function addListItems(){
    for(let i=0;i<todoArray.length;i++){
      todoList.append(todoArray[i]);
    }
  }


// Event listener to add todo
addButton.addEventListener('click',addingNewLi);

// Adding new Todo on pressing Enter key

todoInput.addEventListener('keypress',(e)=>{
  if(e.key == 'Enter'){
    addingNewLi();
  }
})



// Function to add new Todo
function addingNewLi (){
  // Fetching Input from Todo Input
  let toAdd = todoInput.value;
  
  // clearing input after add button clicked
  todoInput.value="";
  todoInput.blur(); 

   if(toAdd != ""){

    // Creating list item
    const listItem = document.createElement('li');
    listItem.classList.add('todoLi');

    // Creating checkbox 
    const checkInput = document.createElement('input');
    checkInput.type="checkbox";
    checkInput.classList.add('checkBox');
    
    // Creating input element for li
    const newTodo = document.createElement('input');
    newTodo.value=toAdd;
    newTodo.classList.add('disabledInput','todoInput','todoOverflow');

    // Creating Edit button
    const editButton = document.createElement('button');
    const editIcon = document.createElement('span');
    editIcon.append(document.createTextNode('edit'));
    editIcon.classList.add('material-icons-outlined');
    editButton.append(editIcon);
    editButton.classList.add('todoActions');

    // Creating Delete button
    const deleteButton = document.createElement('button');
    const deleteIcon = document.createElement('span');
    deleteIcon.append(document.createTextNode('delete'));
    deleteIcon.classList.add('material-icons-outlined');
    deleteButton.append(deleteIcon);
    deleteButton.classList.add('todoActions');

    // Creating Upward Shift button
    const upButton = document.createElement('button');
    const upIcon = document.createElement('span');
    upIcon.append(document.createTextNode('expand_less'));
    upIcon.classList.add('material-icons-outlined');
    upButton.append(upIcon);
    upButton.classList.add('todoActions');

    // Creating Downward Shift button
    const downButton = document.createElement('button');
    const downIcon = document.createElement('span');
    downIcon.append(document.createTextNode('expand_more'));
    downIcon.classList.add('material-icons-outlined');
    downButton.append(downIcon);
    downButton.classList.add('todoActions');

    // Appending all Components to li
    listItem.append(checkInput);
    listItem.append(newTodo);
    listItem.append(editButton);
    listItem.append(deleteButton);
    listItem.append(upButton);
    listItem.append(downButton);

    // Adding li to ul
    todoList.append(listItem);

    // Adding li to todoArray array
    todoArray.push(listItem);



   // Edit button Event listener
  editButton.addEventListener('click',() => {

  // Checking if current input is already enabled for editing 

    if(newTodo.classList.contains('disabledInput')){
      newTodo.classList.remove('disabledInput');
      newTodo.focus();
    }
  });

  // Disable input after editing on focus loss
  newTodo.addEventListener('blur',()=>{
    if(!newTodo.classList.contains('disabledInput')){
      newTodo.classList.add('disabledInput');
      newTodo.blur();
    }
  })

  // Disable input after editing on enter
  newTodo.addEventListener('keypress',(e)=>{
    if(e.key == 'Enter'){
        newTodo.classList.add('disabledInput');
        newTodo.blur();
    }
  })


  // Delete todo
  deleteButton.addEventListener('click',()=>{
    // Fetching index of current li in todoArray
    let currentIndex=todoArray.indexOf(listItem);

    // Deleting li from array
    todoArray.splice(currentIndex,1);

    // Emptying the ul
    todoList.innerHTML="";

    // Appending updated array
    addListItems();
  });

  // Moving li  upward
  upButton.addEventListener('click',()=>{

     // Fetching index of current li in todoArray
    let currentIndex=todoArray.indexOf(listItem); 

      if(currentIndex>0){

      moveArrayItemToNewIndex(currentIndex,currentIndex-1);

      // Emptying the ul
      todoList.innerHTML="";

      // Appending updated array
      addListItems();
      currentIndex=currentIndex-1;
      }
  })

  // Moving li downward
  downButton.addEventListener('click',()=>{

     // Fetching index of current li in todoArray
    let currentIndex=todoArray.indexOf(listItem); 

      // checking if current li is not item in array
     if(currentIndex<todoArray.length-1){
      moveArrayItemToNewIndex(currentIndex,currentIndex+1);

      // Emptying the ul
      todoList.innerHTML="";
      // Appending updated array

      addListItems();
      currentIndex=currentIndex-1;
     }
  })

  // line through on checkbox checked
  checkInput.addEventListener('change',(e)=>{
    console.log('changed');
    if(checkInput.checked){
      newTodo.classList.add('completed');
    }
    else{
      newTodo.classList.remove('completed');
    }
  });

 }
 
}


// Shifting li in ul

function moveArrayItemToNewIndex(old_index, new_index) {
  if (new_index >= todoArray.length) {
      var k = new_index - todoArray.length + 1;
      while (k--) {
          todoArray.push(undefined);
      }
  }
  todoArray.splice(new_index, 0, todoArray.splice(old_index, 1)[0]);
};