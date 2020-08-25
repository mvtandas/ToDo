const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');

eventListeners();

function eventListeners(){

        form.addEventListener("submit",addTodo);
        document.addEventListener("DOMContentLoaded",loadAllToDosToUI);
        secondCardBody.addEventListener("click",deleteTodo);
        secondCardBody.addEventListener("click",okeyTodo);
        filter.addEventListener("keyup",filterTodos);
        clearButton.addEventListener("click",clearAllTodos);
        

}
function clearAllTodos(){
        if (confirm("Tümünü silmek ister misiniz")){
             while(todoList.firstChild != null) {  
                todoList.removeChild(todoList.firstChild);
        }
        localStorage.removeItem("todos");
}
}






function filterTodos(e){
        let filterValue = e.target.value.toLowerCase();
        let listItems = document.querySelectorAll(".list-group-item");

        listItems.forEach(function(listItem){
                const text = listItem.textContent.toLowerCase();
                if (text.indexOf(filterValue)=== -1){
                        listItem.setAttribute("style","display : none !important");
                }else {
                        listItem.setAttribute("style","display : none");

                }
        })

}

function deleteTodo(e){
        if (e.target.className === "fa fa-remove"){
                e.target.parentElement.parentElement.remove();
                deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
                showAlert("success","Todo başarıyla silindi.")
        }
}
function deleteTodoFromStorage(x){
        let todos = getTodosFromStorage();
        todos.forEach(function(todo,index){
                  if (todo = x){
                        todos.splice(index,1);
                }
                localStorage.setItem("todos",JSON.stringify(todos));
        })
       
       

}



function okeyTodo(e){
        if (e.target.className === "todostext"){
                const s = document.createElement("s");
                const text = e.target.textContent;
                e.target.textContent = "";
                s.appendChild(document.createTextNode(text));
                e.target.appendChild(s);
                e.target.className ="okeytodo";
        }
       
       
}


     


function loadAllToDosToUI(){
        let todos = getTodosFromStorage();
        
        todos.forEach(function(todo){
                addTodoToUI(todo);
                
        })
}


function addTodo(e){

        const newTodo = todoInput.value.trim();


        if (newTodo === ""){




                showAlert("danger","Lütfen bir todo girin");
        }else{
                
                 addTodoToUI(newTodo);
                 addTodoToStroge(newTodo);
                 showAlert("success","Todo başarıyla eklendi..");
        }



        e.preventDefault();



}


function getTodosFromStorage(){
        let todos;

        if (localStorage.getItem("todos")=== null){
                todos =[];
        }
        else{
                todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;


}

function addTodoToStroge(newTodo){

        let todos = getTodosFromStorage();
        todos.push(newTodo);

        localStorage.setItem("todos", JSON.stringify(todos));
     
}



function showAlert(type,message){
        const alert = document.createElement("div");
        alert.className = 'alert alert-'+type;
        alert.textContent = message;
        

        firstCardBody.appendChild(alert);
        
        setTimeout(function(){
                alert.remove();

        },1000)

}



function addTodoToUI(newTodo) {

        const listItem = document.createElement("li");
        const link = document.createElement("a");
        const text = document.createElement("p");
        text.className= "todostext";
        text.href= "#";
   
        link.href= "#";
        link.className = "delete-item";
        link.innerHTML = "<i class = 'fa fa-remove'> </i>";


        listItem.className = "list-group-item d-flex justify-content-between";
        text.appendChild(document.createTextNode(newTodo));
        listItem.appendChild(text);
        listItem.appendChild(link);
        todoList.appendChild(listItem);
        todoInput.value = "";
  

}