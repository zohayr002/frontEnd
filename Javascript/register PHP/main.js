function First() {
  let form1 = document.getElementById("form1");
  let form2 = document.getElementById("form2");
  let content1 = document.getElementById("content1");
  let content2 = document.getElementById("content2");
  form1.classList.replace("form1", "form1-animation");
  content2.classList.replace("content2", "content2-animation");
  setTimeout(function () {
    form1.style.display = "none";
    content2.style.display = "none";
    form2.style.display = "flex";
    content1.style.display = "flex";
    form2.classList.replace("form2", "form2-animation");
    content1.classList.replace("content1", "content1-animation");
  }, 500);
  setTimeout(function () {
    form2.classList.replace("form2-animation", "form2");
    content1.classList.replace("content1-animation", "content1");
  }, 1000);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    let right = document.querySelector(".right");
    let left = document.querySelector(".left");
    right.style.display = "flex";
    left.style.display = "none";
    content2.style.display = "none";
  }
}

function Second() {
  let form1 = document.getElementById("form1");
  let form2 = document.getElementById("form2");
  let content1 = document.getElementById("content1");
  let content2 = document.getElementById("content2");
  form2.classList.replace("form2", "form3-animation");
  content1.classList.replace("content1", "content3-animation");
  setTimeout(function () {
    form2.style.display = "none";
    content1.style.display = "none";
    form1.style.display = "flex";
    content2.style.display = "flex";
    form1.classList.replace("form1-animation", "form4-animation");
    content2.classList.replace("content2-animation", "content4-animation");
  }, 500);
  setTimeout(function () {
    form1.classList.replace("form4-animation", "form1");
    form2.classList.replace("form3-animation", "form2");
    content2.classList.replace("content4-animation", "content2");
    content1.classList.replace("content3-animation", "content1");
  }, 2000);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    let right = document.querySelector(".right");
    let left = document.querySelector(".left");
    left.style.display = "flex";
    right.style.display = "none";
    content1.style.display = "none";
  }
}

