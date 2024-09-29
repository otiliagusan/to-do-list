// Targeting elements
const inputContainer = document.querySelector('.input');
const buttonContainer = document.querySelector('.btn');
const taskList = document.querySelector('.task-list');
const filterButtons = document.querySelectorAll('.btn.alternative');

function addTask() {
    const taskTextValue = inputContainer.value.trim(); // Get the input value and trim whitespace
    if (taskTextValue === '') {
        alert('Please write a task');
    } else {
        const li = document.createElement('li');
        
        // Create circle icon
        const icon = document.createElement('i');
        icon.className = 'far fa-circle';

        // Create closing icon
        const closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times';

        // Create a span for the task text
        const taskTextNode = document.createElement('span');
        taskTextNode.textContent = taskTextValue; // Set the text content

        // Add space between the icon and the text
        icon.style.cssText = "margin-right: 10px; cursor:pointer; color : #009d94;"; // Adds space to the right of the icon and makes it clickable
        closeIcon.style.cssText = 'margin-left:auto; margin-right:26px; color : #009d94; cursor:pointer;'; // Pushes the close icon to the end

        // Appending the content
        li.appendChild(icon); // Append the icon to the list item
        li.appendChild(taskTextNode); // Append the task text span
        li.appendChild(closeIcon); // Append close icon
        taskList.appendChild(li); // Append the list item to the task list

        inputContainer.value = ''; // Clear the input field

        // Event listener for closing the task
        closeIcon.addEventListener('click', () => {
            li.remove(); // Remove the list item
        });

        // Event listener for toggling the task completion
        icon.addEventListener('click', () => {
            if (icon.classList.contains('far', 'fa-circle')) {
                // Switch to checked circle
                icon.classList.remove('far', 'fa-circle'); // Remove empty circle classes
                icon.classList.add('fas', 'fa-check-circle'); // Add checked circle classes
                taskTextNode.classList.add('line-through'); // Add line-through class
                li.classList.add('completed');

            } else {
                // Switch back to empty circle
                icon.classList.remove('fas', 'fa-check-circle'); // Remove checked circle classes
                icon.classList.add('far', 'fa-circle'); // Add empty circle classes
                taskTextNode.classList.remove('line-through'); // Remove line-through class
                li.classList.add('unfinished');
            }
        });
    }
}

// Function to filter tasks
function filterTasks(e) {
    const todos = Array.from(taskList.children); // Get all task items
    todos.forEach(function (todoEl) {
        switch (e.target.value) {
            case "All":
                todoEl.style.display = "flex";
                break;
            case "Finished":
                if (todoEl.classList.contains("completed")) {
                    todoEl.style.display = "flex";
                } else {
                    todoEl.style.display = "none";
                }
                break;
            case "Unfinished":
                if (!todoEl.classList.contains("completed")) {
                    todoEl.style.display = "flex";
                } else {
                    todoEl.style.display = "none";
                }
                break;
        }
    });
}


buttonContainer.addEventListener('click', (event) => {
    event.preventDefault();
    addTask(); // Call the addTask function directly
});

inputContainer.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      addTask();
  }
});

filterButtons.forEach(button => {
    button.addEventListener('click', filterTasks);
});
