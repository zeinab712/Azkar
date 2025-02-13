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
  const now = new Date().getTime(); 

  let nextResetTime = localStorage.getItem("nextResetTime");

  if (!nextResetTime || now > nextResetTime) {

    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    localStorage.clear(); 
    localStorage.setItem("nextResetTime", midnight.getTime()); 
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
  const now = new Date().getTime(); 

  let nextResetTime = localStorage.getItem("nextResetTime");

  if (!nextResetTime || now > nextResetTime) {

      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); 

      localStorage.setItem("dailyTasks", JSON.stringify({})); 
      localStorage.setItem("nextResetTime", midnight.getTime()); 
  }

  let savedTasks = JSON.parse(localStorage.getItem("dailyTasks")) || {};

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
// ======================= start rosary=====================//
document.addEventListener("DOMContentLoaded", function () {
  const rosary = document.querySelector(".rosary"); 
  if (!rosary) return; 

  const buttons = rosary.querySelectorAll(".item button"); 
  const resetButton = rosary.querySelector(".zero"); 

  buttons.forEach((button, index) => {
    let storedCount = localStorage.getItem(`rosary_button_${index}`); 
    if (storedCount !== null) {
      button.innerText = storedCount; 
    }

    button.addEventListener("click", function () {
      let count = parseInt(this.innerText) || 0;
      count++;
      this.innerText = count;
      localStorage.setItem(`rosary_button_${index}`, count);
    });
  });

  resetButton.addEventListener("click", function () {
    buttons.forEach((button, index) => {
      button.innerText = "0"; 
      localStorage.setItem(`rosary_button_${index}`, "0"); 
    });
  });
});
// ======================= end rosary=====================//

