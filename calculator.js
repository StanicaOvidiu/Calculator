const display = document.getElementById("display");
const result = document.getElementById("result");
const history = document.getElementById("history");
const more = document.getElementById("more");
const listContainer = document.getElementById("list");
let lv = [];

function append(input) {
  if (display.value == "" && (/^[.,%+)\*/]+$/.test(input) || input == "00"))
    display.value = "";
  else if (
    /[/%*+-]/.test(display.value[display.value.length - 1]) &&
    input == "00"
  )
    display.value = display.value;
  else if (
    (/\d/.test(display.value[display.value.length - 1]) &&
      /[+%\-*\/]/.test(input)) ||
    (/[+%\-*\/]/.test(display.value[display.value.length - 1]) &&
      /\d/.test(input)) ||
    (/[+%\-*\/]/.test(display.value[display.value.length - 1]) &&
      (input == "log(" || input == "sin(" || input == "cos("))
  )
    display.value += " " + input;
  else if (
    (display.value[display.value.length - 1] == " " &&
      (/[.()]/.test(input) || /\d/.test(input))) ||
    (/[(]/.test(display.value[display.value.length - 1]) && input == ")") ||
    (/\d/.test(display.value[display.value.length - 1]) && input == "(") ||
    (display.value[display.value.length - 1] == ")" && /\d/.test(input)) ||
    (/[./%*+-]/.test(display.value[display.value.length - 1]) &&
      /[./%*+-]/.test(input)) ||
    (display.value[display.value.length - 1] == "(" &&
      /[.+%\*\/]/.test(input)) ||
    (display.value[display.value.length - 1] == "0" && input == "00") ||
    (/\d/.test(display.value[display.value.length - 1]) &&
      (input == "cos(" ||
        input == "log(" ||
        input == "2.71" ||
        input == "3.14" ||
        input == "sin(")) ||
    (input === "." && /\d+\.\d*$/.test(display.value))
  )
    display.value = display.value;
  else display.value += input;
  let expression = display.value
    .replace("sin", "Math.sin")
    .replace("cos", "Math.cos")
    .replace("log", "Math.log");
  result.value = eval(expression).toFixed(2);
  display.scrollLeft = display.scrollWidth;
}

function calculate(input) {
  if (/[.%+\-*\/]/.test(input[input.length - 1])) {
    display.value = display.value;
  } else {
    let expression = display.value
      .replace("sin", "Math.sin")
      .replace("cos", "Math.cos")
      .replace("log", "Math.log");
    display.value = eval(expression).toFixed(2);
    lv.push(input);
    lv.push(display.value);
    result.value = "";
    populateList();
  }
}

function cancel() {
  display.value = "";
  result.value = "";
}

function back() {
  display.value = display.value.slice(0, -1);
  if (display.value == "") result.value = "";
  else result.value = eval(display.value).toFixed(2);
}

function toggleHistory() {
  if (history.style.display === "none" || history.style.display === "") {
    history.style.display = "block";
  } else {
    history.style.display = "none";
  }
}

function toggleMore() {
  if (more.style.display === "none" || more.style.display === "") {
    more.style.display = "block";
  } else {
    more.style.display = "none";
  }
}

function populateList() {
  listContainer.innerHTML = "";
  for (let i = 0; i < lv.length; i += 2) {
    let listItem = document.createElement("li");
    listItem.textContent = lv[i] + " " + "=" + " " + lv[i + 1];
    listContainer.appendChild(listItem);
  }
}
