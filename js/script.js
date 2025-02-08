// ======================= satrt landing======================//
// gsap
document.addEventListener("DOMContentLoaded", function() {
  gsap.from(".main-title", { 
      opacity: 0, 
      x: 100, 
      duration: 3, 
      ease: "power3.out" 
  });

  gsap.from("main p", { 
      opacity: 0, 
      x: -100, 
      duration: 3, 
      ease: "power3.out",
      delay: 0.3 
  });
});
// ======================= end landing======================//
// ======================= satrt side bar======================//
const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menu_toggle.addEventListener('click', () => {
  menu_toggle.classList.toggle('is-active');
  sidebar.classList.toggle('is-active');
});

document.addEventListener('click', (event) => {

  if (!sidebar.contains(event.target) && !menu_toggle.contains(event.target)) {
    sidebar.classList.remove('is-active');
    menu_toggle.classList.remove('is-active');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let menuItems = document.querySelectorAll(".menu a .box");
  let currentPage = window.location.pathname.split("/").pop();
  let savedPage = localStorage.getItem("activePage");

  menuItems.forEach(item => {
      let parentLink = item.parentElement.getAttribute("href").split("/").pop();

      if (parentLink === currentPage) {

          menuItems.forEach(box => box.classList.remove("active"));
          item.classList.add("active");

          localStorage.setItem("activePage", parentLink);
      }
  });
});
// ======================= end side bar======================//
// ======================= satrt main======================//
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".section button");
  const resetTime = 24 * 60 * 60 * 1000; 
  const lastReset = localStorage.getItem("lastReset");
  const now = new Date().getTime();

  if (!lastReset || now - lastReset > resetTime) {
    localStorage.clear(); 
    localStorage.setItem("lastReset", now);
  }

  buttons.forEach((button, index) => {
    let storedCount = localStorage.getItem(`button_${index}`);
    if (storedCount !== null) {
      button.innerText = storedCount;
      if (storedCount == 0) {
        button.classList.add("depleted");
      }
    }

    button.addEventListener("click", function () {
      if (this.classList.contains("depleted")) return;

      let count = parseInt(this.innerText);
      if (count > 0) {
        count--;
        this.innerText = count;
        localStorage.setItem(`button_${index}`, count);
      }

      if (count === 0) {
        this.classList.add("depleted");
      }
    });
  });
});
// ======================= end main======================//
// ======================= satrt todo===================//
document.addEventListener("DOMContentLoaded", function () {
  const tasks = document.querySelectorAll("#taskList li");
  const today = new Date().toDateString(); 

  let savedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || {};
  let lastSavedDate = localStorage.getItem("lastSavedDate");

  if (lastSavedDate !== today) {
      localStorage.setItem("dailyTasks", JSON.stringify({})); 
      localStorage.setItem("lastSavedDate", today);
      savedTasks = {};
  }

  tasks.forEach(task => {
      const taskName = task.getAttribute("data-task");
      if (savedTasks[taskName]) {
          task.classList.add("completed"); 
      }

      task.addEventListener("click", function () {
          this.classList.toggle("completed");
          savedTasks[taskName] = this.classList.contains("completed");
          localStorage.setItem("dailyTasks", JSON.stringify(savedTasks));
      });
  });
});
// ======================= end todo=====================//
  // gsap library for every box in website
document.addEventListener("DOMContentLoaded", function() {
  gsap.utils.toArray(".box").forEach((box, index) => {
      gsap.to(box, {
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power3.out",
          delay: index * 0.2
      });
  });
});
