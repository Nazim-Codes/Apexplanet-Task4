// MOBILE NAVIGATION MENU
var menuButton = document.getElementById("menuButton");
var navLinks = document.getElementById("navLinks");

menuButton.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

var navItems = navLinks.getElementsByTagName("a");

for (var i = 0; i < navItems.length; i++) {
  navItems[i].addEventListener("click", function () {
    navLinks.classList.remove("show");
  });
}

// SIMPLE SCROLL ANIMATION
var sections = document.querySelectorAll(".section");

function showSections() {
  for (var i = 0; i < sections.length; i++) {
    var sectionTop = sections[i].getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
      sections[i].classList.add("show-section");
    }
  }
}

for (var j = 0; j < sections.length; j++) {
  sections[j].classList.add("reveal");
}

window.addEventListener("scroll", showSections);
showSections();

// TO-DO LIST WITH LOCAL STORAGE
var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var emptyMessage = document.getElementById("emptyMessage");
var tasks = JSON.parse(localStorage.getItem("portfolioTasks")) || [];

function saveTasks() {
  localStorage.setItem("portfolioTasks", JSON.stringify(tasks));
}

function showTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var checked = "";
    var completedClass = "";

    if (task.completed) {
      checked = "checked";
      completedClass = "completed";
    }

    taskList.innerHTML +=
      '<li class="task-item ' + completedClass + '">' +
      '<input class="task-check" type="checkbox" data-id="' + task.id + '" ' + checked + '>' +
      '<span class="task-text">' + task.text + '</span>' +
      '<button class="delete-button" type="button" data-id="' + task.id + '">Delete</button>' +
      '</li>';
  }
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({
    id: new Date().getTime(),
    text: text,
    completed: false
  });

  saveTasks();
  showTasks();
  taskInput.value = "";
});

taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("task-check")) {
    var id = Number(event.target.dataset.id);

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].completed = event.target.checked;
      }
    }

    saveTasks();
    showTasks();
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    var id = Number(event.target.dataset.id);

    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks.splice(i, 1);
      }
    }

    saveTasks();
    showTasks();
  }
});

showTasks();

// PRODUCT FILTERS AND SORTING
var category = document.getElementById("category");
var price = document.getElementById("price");
var priceNumber = document.getElementById("priceNumber");
var sort = document.getElementById("sort");
var productList = document.getElementById("productList");
var productMessage = document.getElementById("productMessage");
var productCards = document.getElementsByClassName("product-card");

for (var k = 0; k < productCards.length; k++) {
  productCards[k].dataset.order = k;
}

function updateProducts() {
  var selectedCategory = category.value;
  var maximumPrice = Number(price.value);
  var selectedSort = sort.value;
  var cards = [];
  var numberOfProducts = 0;

  priceNumber.textContent = price.value;

  for (var i = 0; i < productCards.length; i++) {
    cards.push(productCards[i]);
  }

  cards.sort(function (firstCard, secondCard) {
    if (selectedSort === "rating") {
      return Number(secondCard.dataset.rating) - Number(firstCard.dataset.rating);
    }

    return Number(firstCard.dataset.order) - Number(secondCard.dataset.order);
  });

  for (var j = 0; j < cards.length; j++) {
    var card = cards[j];
    var categoryMatches = selectedCategory === "all" || card.dataset.category === selectedCategory;
    var priceMatches = Number(card.dataset.price) <= maximumPrice;

    if (categoryMatches && priceMatches) {
      card.style.display = "block";
      numberOfProducts++;
    } else {
      card.style.display = "none";
    }

    productList.appendChild(card);
  }

  productMessage.textContent = numberOfProducts + " product(s) found";
}

category.addEventListener("change", updateProducts);
price.addEventListener("input", updateProducts);
sort.addEventListener("change", updateProducts);
updateProducts();

// CONTACT FORM
var contactForm = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  formMessage.textContent = "Thank you, " + name + "! Your message has been received.";
  contactForm.reset();
});
