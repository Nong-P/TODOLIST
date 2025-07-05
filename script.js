const input = document.getElementById("text-todo");
const add = document.getElementById("add-todo");
const list = document.getElementById("todolist");
const enddate = document.getElementById("Enddate");
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

if (input && add && list) {
     add.addEventListener("click", () => {
          const todolist = input.value.trim();
          const todoend = todoendinput.value;
          if (todolist) {
               // add todolist
               const todoitem = document.createElement("li");
               todoitem.innerHTML = `
               <div class="mx-[2rem] mb-[2rem] gap-[1rem] p-[1rem] bg-black/10 border-[0.2rem] border-white/20 border-solid rounded-2xl backdrop-blur-[0.5rem] shadow-black/30 shadow-xl grid text-center md:flex md:justify-between">
                              <div class="grid md:flex items-center gap-[1rem]">
                                   <p class="text-[1.5rem] break-all">${todolist}</p>
                                   <p class="font-bold">Start  ${nowdate}</p>
                                   <p class="font-bold">End  ${todoend}</p>
                              </div>
                              <div class="flex justify-center items-center gap-[1rem]">
                                   <div class="btn-parent h-[3rem] w-[3rem] text-[1.3rem] bg-red-500/30 rounded-full backdrop-blur-[2rem] p-[0.5rem] mb-[1rem] md:mb-[0rem] transform transition-transform duration-500 hover:scale-105 cursor-pointer flex items-center justify-center">
                                        <div class="btn-check hidden text-green-500">
                                             <i class="fas fa-check"></i>
                                        </div>
                                        <div class="btn-x text-red-500">
                                             <i class="fas fa-x"></i>
                                        </div>
                                   </div>
                                   <div class="delete-btn h-[3rem] w-[3rem] text-white text-[1.3rem] bg-white/30 rounded-full backdrop-blur-[2rem] p-[0.5rem] mb-[1rem] md:mb-[0rem] transform transition-transform duration-500 hover:scale-105 cursor-pointer flex items-center justify-center">
                                        <i class="fas fa-trash"></i>
                                   </div>
                              </div>
                         </div>
               `;
               list.appendChild(todoitem);
               input.value = "";
               todoendinput.value = "";
               // delete todolist
               const btndelete = todoitem.querySelector(".delete-btn");
               btndelete.addEventListener("click", () => {
                    todoitem.remove();
                    updatestats();
                    //btndelete.parentNode.remove();
               });
               const btncheck = todoitem.querySelector(".btn-check");
               const btnx = todoitem.querySelector(".btn-x");
               const btnpa = todoitem.querySelector(".btn-parent");
               btnpa.addEventListener("click", () => {
                    btncheck.classList.toggle("hidden");
                    todoitem.classList.toggle("done");
                    btnx.classList.toggle("hidden");
                    btnpa.classList.toggle("bg-green-500/30");
                    btnpa.classList.toggle("bg-red-500/30");
                    updatestats();
               });
               updatestats();
          }
     });
}
const updatestats = () => {
     const totalstats = list.querySelectorAll("li").length;
     const donestats = list.querySelectorAll("li.done").length;
     stats.textContent = totalstats;
     statsnum.textContent = donestats;

     const percent = totalstats === 0 ? 0 : (donestats / totalstats) * 100;
     progress.style.width = percent + "%";
};
