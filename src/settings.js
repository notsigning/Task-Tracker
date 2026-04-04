document.getElementById("settings").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Settings changed");
  const formData = new FormData(event.target);
  //add settings to localStorage
  console.log(document.getElementById("site_title").value);
  let settings = [];
  console.log(settings);
  localStorage.setItem("settings", settings);
});
