if (window.self === window.top) {
    if (!("keyboard" in navigator)) {
      alert("Your browser does not support the Keyboard Lock API.");
    }
  }
  
  const fullscreenButton = document.querySelector("#fullscreen");
  const keyboardButton = document.querySelector("#keyboard");
  const body = document.body;
  const div = document.querySelector("div");
  const info = document.querySelector(".info");
  
  const ENTER_FULLSCREEN = "Enter ";
  const LEAVE_FULLSCREEN = "Submit";
  const ACTIVATE_KEYBOARD_LOCK = "Good luck with your exams!";
  const DEACTIVATE_KEYBOARD_LOCK = "Submit";
  
  const LOCKED_KEYS = ["MetaLeft", "MetaRight", "Tab", "KeyN", "KeyT", "Escape","F11","KeyI"];
  
  let lock = false;
  
  fullscreenButton.addEventListener("click", async () => {
    if (window.self !== window.top) {
      window.open(location.href, "", "noopener,noreferrer");
      return;
    }
    try {
      if (!document.fullscreen) {
        await document.documentElement.requestFullscreen();
        fullscreenButton.textContent = LEAVE_FULLSCREEN;
        return;
      }
      await document.exitFullscreen();
      fullscreenButton.textContent = ENTER_FULLSCREEN;
    } catch (err) {
      fullscreenButton.textContent = ENTER_FULLSCREEN;
      alert(`${err.name}: ${err.message}`);
    }
  });
  
  fullscreenButton.addEventListener("click", async () => {
    try {
      if (!lock) {
        await navigator.keyboard.lock(LOCKED_KEYS);
        lock = true;
      
   fullscreenButton.textContent = DEACTIVATE_KEYBOARD_LOCK;
        return;
      }
      navigator.keyboard.unlock();
      fullscreenButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      lock = false;
    } catch (err) {
      lock = false;
      fullscreenButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      alert(`${err.name}: ${err.message}`);
    }
  });
  
  document.addEventListener("fullscreenchange", () => {
    keyboardButton.textContent = ACTIVATE_KEYBOARD_LOCK;
    lock = false;
    if (document.fullscreen) {
      fullscreenButton.textContent = LEAVE_FULLSCREEN;
      return (div.style.display = "block");
    }
    fullscreenButton.textContent = ENTER_FULLSCREEN;
    div.style.display = "none";
  });
  
  document.addEventListener("keydown", (e) => {
    if (
      lock && (e.code === "Escape" || ((e.code === "KeyN" || e.code === "KeyT" || e.code === "KeyJ" || e.code === "F11" || e.code === "KeyI" || e.code === "Tab") && (event.ctrlKey || event.metaKey || event.FnKey || event.shiftKey )))
    ) {
      info.style.display = "block";
      setTimeout(() => {
        info.style.display = "none";
      }, 3000);
    }
  });

  function setColor(e) {
    var target = e.target,
        status = e.target.classList.contains('change');
 
    e.target.classList.add(status ? 'inactive' : 'change');
    e.target.classList.remove(status ? 'change' : 'inactive'); 
 }