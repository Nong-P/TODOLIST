const input = document.getElementById("text-todo");
const add = document.getElementById("add-todo");
const list = document.getElementById("todolist");
const enddate = document.getElementById("Enddate");
const subjectselect = document.getElementById("subject-select");
const progressbars = document.getElementById("progress-bars");
const progress = document.getElementById("progress");
const statsnum = document.getElementById("stats-num");
const stats = document.getElementById("stats");

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const day = now.getDate().toString().padStart(2, "0");
const nowdate = `${day}/${month}/${year}`;

const fp = flatpickr("#Enddate", {
     dateFormat: "d/m/Y",
});
const todoendinput = document.getElementById("Enddate");
const alerterrorpopup = document.getElementById("alert-error-popup");
const alerterrorbtn = document.getElementById("alert-error-btn");
const alertdonepopup = document.getElementById("alert-done-popup");
const alertdonebtn = document.getElementById("alert-done-btn");

if (alerterrorbtn && alerterrorpopup) {
     alerterrorbtn.addEventListener("click", () => {
          alerterrorpopup.classList.add("opacity-0");
          alerterrorpopup.classList.remove("opacity-100");
          setTimeout(() => {
               alerterrorpopup.classList.add("hidden");
               alerterrorpopup.classList.remove("flex");
          }, 100);
     });
}

const alertdeletepopup = document.getElementById("alert-delete-popup");
const alertnodeletebtn = document.getElementById("alert-no-delete-btn");

if (alertdeletepopup && alertnodeletebtn) {
     alertnodeletebtn.addEventListener("click", () => {
          alertdeletepopup.classList.add("opacity-0");
          alertdeletepopup.classList.remove("opacity-100");
          setTimeout(() => {
               alertdeletepopup.classList.add("hidden");
               alertdeletepopup.classList.remove("flex");
          }, 100);
     });
}

if (alertdonebtn && alertdonepopup) {
     alertdonebtn.addEventListener("click", () => {
          alertdonepopup.classList.add("opacity-0");
          alertdonepopup.classList.remove("opacity-100");
          setTimeout(() => {
               alertdonepopup.classList.add("hidden");
               alertdonepopup.classList.remove("flex");
          }, 100);
     });
}

const updatestats = () => {
     const totalstats = list.querySelectorAll("li").length;
     const donestats = list.querySelectorAll("li.done").length;
     stats.textContent = totalstats;
     statsnum.textContent = donestats;

     const percent = totalstats === 0 ? 0 : (donestats / totalstats) * 100;
     progress.style.width = percent + "%";

     saveTodosToLocalStorage();
};

const saveTodosToLocalStorage = () => {
     const todoItems = list.querySelectorAll("li");
     const todosData = [];

     todoItems.forEach((item) => {
          const todoSubject = item.querySelector("p.subject").textContent;
          const todoText = item.querySelector("p.break-all").textContent;
          const startDate = item.querySelector("p:nth-child(2)").textContent.replace("Start date ", "");
          const dueDate = item.querySelector("p:nth-child(3)").textContent.replace("Due date ", "");
          const isDone = item.classList.contains("done");

          todosData.push({
               subject: todoSubject,
               text: todoText,
               startDate: startDate,
               dueDate: dueDate,
               isDone: isDone,
          });
           
     });

     localStorage.setItem("todoListData", JSON.stringify(todosData));
};

const createTodoItemElement = (todo) => {
     const todoitem = document.createElement("li");
     if (todo.isDone) {
          todoitem.classList.add("done");
     }
     const subjectText = subjectselect.value;
     todoitem.innerHTML = `
     <p class="font-bold subject">${todo.subject}</p>
     <div class="todopa mb-[2rem] gap-[1rem] p-[1rem] border-[0.2rem] border-white/20 border-solid rounded-2xl backdrop-blur-[0.5rem] shadow-black/30 shadow-xl grid text-center md:flex md:justify-between transition-all duration-300">
                    <div class="grid md:flex items-center gap-[1rem]">
                         <p class="text-[1.5rem] font-bold break-all">${todo.text}</p>
                         <p class="">Start date ${todo.startDate}</p>
                         <p class="">Due date ${todo.dueDate}</p>
                    </div>
                    <div class="flex justify-center items-center gap-[1rem]">
                         <div class="btn-parent h-[3rem] w-[3rem] text-[1.3rem] ${todo.isDone ? "bg-blue-500/30" : "bg-red-500/30"} rounded-full backdrop-blur-[2rem] p-[0.5rem] mb-[1rem] md:mb-[0rem] transform transition-transform duration-500 hover:scale-105 cursor-pointer flex items-center justify-center">
                              <div class="btn-check ${todo.isDone ? "" : "hidden"} text-blue-500">
                                  <i class="fas fa-check"></i>
                              </div>
                              <div class="btn-x ${todo.isDone ? "hidden" : ""} text-red-500">
                                  <i class="fas fa-x"></i>
                              </div>
                         </div>
                         <div class="delete-btn h-[3rem] w-[3rem] text-white text-[1.3rem] bg-white/30 rounded-full backdrop-blur-[2rem] p-[0.5rem] mb-[1rem] md:mb-[0rem] transform transition-transform duration-500 hover:scale-105 cursor-pointer flex items-center justify-center">
                              <i class="fas fa-trash"></i>
                         </div>
                    </div>
               </div>
     `;

     let itemtodelete = null;
     
     const btndelete = todoitem.querySelector(".delete-btn");
     const alertyesdeletebtn = document.getElementById("alert-yes-delete-btn");
     btndelete.addEventListener("click", () => {
          itemtodelete = todoitem;
          alertdeletepopup.classList.remove("hidden");
          alertdeletepopup.classList.add("flex");
          setTimeout(() => {
               alertdeletepopup.classList.remove("opacity-0");
               alertdeletepopup.classList.add("opacity-100");
          }, 100);
          updatestats();
     });

     if (alertyesdeletebtn) {
          alertyesdeletebtn.addEventListener("click", () => {
               if (itemtodelete) {
                    itemtodelete.remove();
                    itemtodelete = null;
               }
               alertdeletepopup.classList.add("opacity-0");
               alertdeletepopup.classList.remove("opacity-100");
               setTimeout(() => {
                    alertdeletepopup.classList.add("hidden");
                    alertdeletepopup.classList.remove("flex");
               }, 100);
               updatestats();
          });
     }

     const btncheck = todoitem.querySelector(".btn-check");
     const btnx = todoitem.querySelector(".btn-x");
     const btnpa = todoitem.querySelector(".btn-parent");
     const todopa = todoitem.querySelector(".todopa");

     if (todo.isDone) {
          todopa.style.backgroundColor = "rgb(147 197 253 / 0.3)";
     }else {
          todopa.style.backgroundColor = "rgb(248 113 113 / 0.3)";
     }

     btnpa.addEventListener("click", () => {
          btncheck.classList.toggle("hidden");
          todoitem.classList.toggle("done");
          btnx.classList.toggle("hidden");
          btnpa.classList.toggle("bg-blue-300/50");
          btnpa.classList.toggle("bg-red-500/30");

          if (todoitem.classList.contains("done")) {
               alertdonepopup.classList.remove("hidden");
               alertdonepopup.classList.add("flex");
               todopa.style.backgroundColor = "rgb(147 197 253 / 0.3)";
               setTimeout(() => {
                    alertdonepopup.classList.remove("opacity-0");
                    alertdonepopup.classList.add("opacity-100");
               }, 100);
          } else {
               alertdonepopup.classList.add("opacity-0");
               alertdonepopup.classList.remove("opacity-100");
               todopa.style.backgroundColor = "rgb(248 113 113 / 0.3)";
               setTimeout(() => {
                    alertdonepopup.classList.add("hidden");
                    alertdonepopup.classList.remove("flex");
               }, 100);
          }

          updatestats();
     });

     return todoitem;
};

const loadTodosFromLocalStorage = () => {
     const storedTodos = localStorage.getItem("todoListData");
     if (storedTodos) {
          const todos = JSON.parse(storedTodos);

          todos.sort((a, b) => {
                if (a.dueDate === "N/A") return 1;
                if (b.dueDate === "N/A") return -1;
                const dateA = new Date(a.dueDate.split("/").reverse().join("-"));
                const dateB = new Date(b.dueDate.split("/").reverse().join("-"));
                return dateA - dateB;
          });
          list.innerHTML = "";

          todos.forEach((todo) => {
               const newTodoElement = createTodoItemElement(todo);
               list.appendChild(newTodoElement);
          });
          updatestats();
     }
};

document.addEventListener("DOMContentLoaded", () => {
     loadTodosFromLocalStorage();
     if (input && add && list && alerterrorpopup) {
          add.addEventListener("click", () => {
               const todolistText = input.value.trim();
               const todoendText = todoendinput.value;
               const subjectText = subjectselect.value;

               if (!todolistText || subjectText === "select") {
                    alerterrorpopup.classList.remove("hidden");
                    alerterrorpopup.classList.add("flex");
                    setTimeout(() => {
                         alerterrorpopup.classList.remove("opacity-0");
                         alerterrorpopup.classList.add("opacity-100");
                    }, 100);
                    return;
               }

               const dueDateText = todoendText.trim() === "" ? "N/A" : todoendText;
               
               const newTodoData = {
                    subject: subjectText,
                    text: todolistText,
                    startDate: nowdate,
                    dueDate: dueDateText,
                    isDone: false,
               };

               const newTodoElement = createTodoItemElement(newTodoData);
               list.appendChild(newTodoElement);

               const filterSubjectSelect = document.getElementById("filter-subject-select");
               const selectedSubject = filterSubjectSelect.value;

               selectedSubject.value = "All";
               input.value = "";
               todoendinput.value = "";
               subjectselect.value = "select";
               updatestats();
               loadTodosFromLocalStorage();

          });
     }
});

const filterSubjectSelect = document.getElementById("filter-subject-select");
if (filterSubjectSelect) {
     filterSubjectSelect.addEventListener("change", () => {
          const selectedSubject = filterSubjectSelect.value;
          const todoItems = list.querySelectorAll("li");

          todoItems.forEach((item) => {
               const subject = item.querySelector("p.subject").textContent;
               if (selectedSubject === "All" || subject === selectedSubject) {
                    item.style.display = "grid";
               } else {
                    item.style.display = "none";
               }
          });
     });
}
