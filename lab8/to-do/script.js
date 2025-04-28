function allowDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    const task = document.getElementById(id);
    event.currentTarget.appendChild(task);
    event.currentTarget.classList.remove('drag-over');
}

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
});