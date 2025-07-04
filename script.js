const input = document.getElementById("text-todo");
const add = document.getElementById("add-todo");
const list = document.getElementById("todolist");
const enddate = document.getElementById("Enddate");

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const day = now.getDate().toString().padStart(2, "0");
const nowdate = `${day}/${month}/${year}`;

const fp = flatpickr("#Enddate", {
     dateFormat: "d/m/Y",
});
const todoendinput = document.getElementById("Enddate");

if (input && add && list) {
     add.addEventListener("click", () => {
          const todolist = input.value.trim();
          const todoend = todoendinput.value;
          if (todolist) {
               // add todolist
               const todoitem = document.createElement("li");
               todoitem.innerHTML = `
               <p>${todolist}</p>
               <p>Start ${nowdate}</p>
               <p>End ${todoend}</p>
               <i class="fas fa-x delete-btn"></i>
               `;
               list.appendChild(todoitem);
               input.value = "";
               // delete todolist
               const btndelete = todoitem.querySelector(".delete-btn");
               btndelete.addEventListener("click", () => {
                    btndelete.parentNode.remove();
               });
          }
     });
}
