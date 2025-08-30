const checkboxes = document.querySelectorAll(".gole");
const inputBox = document.querySelectorAll(".taskInput");
const progressBar = document.querySelector(".progresh-bar");
const progreshValue = document.querySelector(".progresh-value");
const progreshP = document.querySelector(".progresh-value p");
const upperPara = document.querySelector(".container-2ndstpara");
const lastDayUpdate = document.querySelector('.keep-going')
// -----when page load-------------
const date = new Date()
const allGoles = JSON.parse(localStorage.getItem("allGoles")) || {};
let countTrue = Object.values(allGoles).filter((goal) => {
  return goal.complite;
}).length;
progreshValue.style.width = `${
  (countTrue / Object.values(allGoles).length) * 100
}%`;
if (countTrue !== 0) {
  progreshP.innerText = `${countTrue}/${
    Object.values(allGoles).length
  } Completed`;
} else {
  progreshP.innerText = "";
}
// --------- upperPara text update---------
const textArray = [
  "Raise the bar by completing your goals!",
  "well begin is half done",
  "Just a step away, keep going!",
  "whoa! You just completed all the goals, time for Chil:d"
];
upperPara.innerText= `${textArray[countTrue]}`
checkboxes.forEach((checked) => {
  checked.addEventListener("click", () => {
    // -----checkd sign---------------
    const allTaskFiled = [...inputBox].every((list) => {
      return list.value;
    });
    if (allTaskFiled) {
      checked.parentElement.classList.toggle("complite");
      const inputId = checked.nextElementSibling.id;
      allGoles[inputId].complite = !allGoles[inputId].complite;
      localStorage.setItem("allGoles", JSON.stringify(allGoles));
      // ---------progresh bar---------
      countTrue = Object.values(allGoles).filter((goal) => {
        return goal.complite;
      }).length;
      progreshValue.style.width = `${
        (countTrue / Object.values(allGoles).length) * 100
      }%`;
      if (countTrue !== 0) {
        progreshP.innerText = `${countTrue}/${
          Object.values(allGoles).length
        } Completed`;
      } else {
        progreshP.innerText = "";
      }
      upperPara.innerText= `${textArray[countTrue]}`
    }
    // -----error-----------
    else {
      progressBar.classList.add("show-error");
    }
  });
});

inputBox.forEach((input) => {
  if(allGoles[input.id]){
    input.value = allGoles[input.id].name;
    if (allGoles[input.id].complite) {
      input.parentElement.classList.add("complite");
    }
  }
  // -----------error remove-----------
  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    // dont gave for writing when select
    if (allGoles[input.id] && allGoles[input.id].complite) {
      input.value = allGoles[input.id].name;
      return;
    }
    // ----------------localStorage----------
    allGoles[input.id] = {
      name: input.value,
      complite: false,
    };
    localStorage.setItem("allGoles", JSON.stringify(allGoles));
  });
});
