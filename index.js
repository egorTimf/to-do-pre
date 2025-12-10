let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = JSON.parse(localStorage.getItem('tasks'));
	const correctTasks = savedTasks===null ? items: savedTasks;
	correctTasks.forEach( item => listElement.append(createItem(item)) );

	return correctTasks;
}

items = loadTasks();

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		let items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener("click", () => {
		var itemName = textElement.textContent;
		var newItem = createItem(itemName);
		listElement.prepend(newItem);
		var items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click',() => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	return clone;
}

function getTasksFromDOM() {
	let itemsNamesElements = document.querySelectorAll(".to-do__item-text");
	let tasks = [];

	itemsNamesElements.forEach( item => tasks.push(item.textContent));

	return tasks;
}

function saveTasks(tasks) {
	const tasksJSON = JSON.stringify(tasks);
	localStorage.setItem('tasks', tasksJSON);
}

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputValue = inputElement.value;
	if (inputValue === "") return;

	const item = createItem(inputValue);
	listElement.prepend(item);

	items = getTasksFromDOM();
	saveTasks(items);

	inputElement.value = "";
});

