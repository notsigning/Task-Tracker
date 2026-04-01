var index = 0;
var file = "page" + index;
var title = "title" + index;
const displayElem = document.getElementById("displaybox");
const titleElem = document.getElementById("title");
const default_title = "New Page";
const default_content = "New content";
var MAX_PAGES = 5;
var darkmode = true;
const css_dark = ["darkblue", "darkred", "darkgreen"];
const css_light = ["lavender", "pink", "mocha"];
var css_index = 0;


function check() {
    if (displayElem.innerHTML == default_content && titleElem.innerHTML == default_title) return true;
    if (displayElem.innerHTML != localStorage.getItem(file) || titleElem.innerText != localStorage.getItem(title)) {
        return confirm("Unsaved changes! Continue?");
    } else return true;
}
function darkShift() {
  darkmode = !darkmode;
  if (darkmode) document.body.className = css_dark[css_index];
  else document.body.className = css_light[css_index];
}
function cssChange() {
    css_index++;
    css_index %= css_dark.length;
    //document.getElementById("css_thing").href = "CSS/" + css[css_index];
  if (darkmode) document.body.className = css_dark[css_index];
  else document.body.className = css_light[css_index];
}
/*
Updates display without modifying page numbers/count.
*/
function update() {
  file = "page" + index;
  title = "title" + index;
  const content = localStorage.getItem(file);
  const titlecontent = localStorage.getItem(title);
  if (content != null) {
      displayElem.innerHTML = content;
  } else {
      displayElem.innerHTML = default_content;
  }
  if (titlecontent != null) {
      titleElem.innerHTML = titlecontent;
  } else {
      titleElem.innerHTML = default_title;
  }
  document.getElementById("header").innerHTML = "Page: " + (index + 1);
}
/*
Loads Content from localStorage & updates display.
*/
function load() {
    //update page
    //console.log("Going to page " + (index+1));
    const page_temp = localStorage.getItem("MAX_PAGES");
    if (page_temp != null) {
        MAX_PAGES = page_temp;
    }
    else MAX_PAGES = 5;
    update();
}
/*
Shifts a page a certain number of times.
*/
function shift(i) {
    if (check()) {
        if (index + i < 0) { //loop back
            index = MAX_PAGES - 1;
        } else if (index + i >= MAX_PAGES) {
            if (confirm("Create new page?")) {
                index += i;
                MAX_PAGES = parseInt(MAX_PAGES) + 1;
            }
        } else {
            index += i;
        }
        update();
        document.getElementById("savemsg").innerHTML = "";
    }
}
/*
Save the current page.
*/
function save() {
    localStorage.setItem(file, document.getElementById("displaybox").innerHTML);
    localStorage.setItem(title, document.getElementById("title").innerHTML);
    localStorage.setItem("MAX_PAGES", MAX_PAGES);
    document.getElementById("savemsg").innerHTML = "Last saved: " + Date().slice( - 41, -32);
}
/*
Resets the current page.
*/
function resetPage() {
    if (confirm("Are you sure?")) {
        localStorage.removeItem(file);
        localStorage.removeItem(title);
        load();
    }
}
/*
Adds a list into the content container.
*/
function addList() {
    displayElem.innerHTML += "<ul><li>Sample Item</li></ul>";
}
/*
Display the menu interface.
*/
function showMenu() {
  for (let i = 0; i < MAX_PAGES; i++) {
    const title = localStorage.getItem("title" + i);
    if (title) {
      buttons[i].innerText = i + 1 + ": " + title;
    }
  }
  document.getElementById("menu").hidden = false;
  document.getElementById("main").hidden = true;
}
/*
Saves, then swaps the content of two pages. Note to not use zero-based indexing while calling this function.
*/
function swapPages(page_index) {
  
  page_index--;
  let page_title = localStorage.getItem("title" + page_index);
  let page_content = localStorage.getItem("page" + page_index);
  if(!page_title || !page_content){
    alert("Error in swapping: Other page has nothing saved.")
  }
  else if (document.getElementById("main").hidden) {
    alert("Please select a page before swapping.")
  }
  else {
    save();
    localStorage.setItem("title" + page_index, titleElem.innerHTML);
    localStorage.setItem("page" + page_index, displayElem.innerHTML);
    localStorage.setItem(file, page_content);
    localStorage.setItem(title, page_title);
    update();
  }
}
//Add a button to the menu
function addMenuButton(num) {
  buttons.push(document.createElement("button"));
  buttons[num].id = num;
  const title = localStorage.getItem("title" + num);
  if (title) {
    buttons[num].innerText = num + 1 + ": " + title;
  }
  else {
    buttons[num].innerText = num + 1 + ": New Page";
  }
  buttons[num].addEventListener("click", (event) => {
      index = parseInt(event.target.id);
      document.getElementById("menu").hidden = true;
      document.getElementById("main").hidden = false;
      load();
  });
  menu.appendChild(buttons[num]);
  let newline = document.createElement('br');
  menu.appendChild(newline);
}

//Initialize Keybinds
document.addEventListener("keydown", (event) => {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
        save();
        event.preventDefault(); //prevent saving current page
    }
});
//Filter index parameter
const params = new URLSearchParams(window.location.search);
if (params.get('index')) {
    index = parseInt(params.get('index'));
}
//load initial number of pages
const page_temp = localStorage.getItem("MAX_PAGES");
if (page_temp != null) {
    MAX_PAGES = page_temp;
}
else MAX_PAGES = 5;
//Add buttons to menu
const menu = document.getElementById("buttons")
var buttons = [];
for (var i = 0; i < MAX_PAGES; i++) {
  addMenuButton(i);
}
//Display menu on start.
showMenu();

// let test_input = parseInt(prompt("Hello world!"));
// if(test_input) console.log(test_input);