const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".btn-clear");
const messageSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

const updateMessage = () => {
  const tasksLength = tasks.children.length;
  if (tasksLength > 0) {
    messageSpan.textContent = `You have ${tasksLength} tasks in list`;
  } else {
    messageSpan.textContent = "There is no tasks in the list";
  }
};

updateMessage();

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskValue = addForm.task.value.trim();
  if (taskValue.length) {
    tasks.innerHTML += `<li class="task">
    <span>${taskValue}</span
    ><button class="btn-delete">X</button>
  </li>`;
    addForm.reset();
  }
  updateMessage();
});

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    e.target.parentElement.remove();
    updateMessage();
  }
});

clearAll.addEventListener("click", (e) => {
  const taskItems = document.querySelectorAll("li");
  taskItems.forEach((item) => {
    item.remove();
  });
  updateMessage();
});

function filterTask(term) {
  Array.from(tasks.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.add("hide");
    });

  Array.from(tasks.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup", (e) => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-clear")) {
    searchForm.reset();
  }
});
