const createTask = (text) => ({
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
});

const updateTask = (task, updates) => ({
    ...task,
    ...updates,
    updatedAt: Date.now()
});

const toggleComplete = (task) => updateTask(task, { completed: !task.completed });

const sortTasks = (tasks, criteria) => {
    const copy = [...tasks];
    const sorters = {
        created: (a, b) => a.createdAt - b.createdAt,
        updated: (a, b) => b.updatedAt - a.updatedAt,
        completed: (a, b) => a.completed - b.completed
    };
    return copy.sort(sorters[criteria]);
};

let tasks = [];

const renderTasks = () => {
    const taskList = document.getElementById("taskList");
    const sortValue = document.getElementById("sortSelect").value;
    taskList.innerHTML = "";
    sortTasks(tasks, sortValue).forEach((task) => {
        const li = document.createElement("li");
        li.className = "task" + (task.completed ? " completed" : "");

        const leftPart = document.createElement("div");
        leftPart.style.display = "flex";
        leftPart.style.alignItems = "center";
        leftPart.style.gap = "0.5rem";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks = tasks.map((t) =>
                t.id === task.id ? toggleComplete(t) : t
            );
            renderTasks();
        });

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        textSpan.contentEditable = false;

        textSpan.addEventListener("dblclick", () => {
            textSpan.contentEditable = true;
            textSpan.focus();
        });

        textSpan.addEventListener("blur", () => {
            const newText = textSpan.textContent.trim();
            if (newText && newText !== task.text) {
                tasks = tasks.map((t) =>
                    t.id === task.id ? updateTask(t, { text: newText }) : t
                );
                renderTasks();
            }
        });

        const actions = document.createElement("div");
        actions.className = "actions";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✕";
        deleteBtn.style.backgroundColor = "var(--danger-color)";
        deleteBtn.style.color = "white";
        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
        });

        leftPart.appendChild(checkbox);
        leftPart.appendChild(textSpan);

        actions.appendChild(deleteBtn);
        li.appendChild(leftPart);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
};

document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text.length >= 3) {
        tasks = [...tasks, createTask(text)];
        input.value = "";
        renderTasks();
    }
});

document.getElementById("sortSelect").addEventListener("change", renderTasks);