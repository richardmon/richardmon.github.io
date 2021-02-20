async function typeSentence(sentence, eleRef, delay = 100, showPrompt = false) {
  const letters = sentence.split("");
  let i = 0;
  let pro = document.getElementById("console");
  pro.style = "display: inherit;";
  if (!showPrompt) {
    pro ? (pro.style = "display: none;") : "";
  }
  while (i < letters.length) {
    await waitForMs(delay);
    const element = document.getElementById(eleRef);
    element.innerHTML = element.innerHTML + letters[i];
    i++;
  }
  return;
}

function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function eraseSentence(eleRef) {
  const element = document.getElementById(eleRef);
  element.innerHTML = "";
}

async function printLineByLine(largeText, eleRef, delay = 10) {
  let lines = largeText.split("\n");
  for (let line_idx in lines) {
    const line = lines[line_idx];
    const element = document.getElementById(eleRef);
    element.innerHTML = element.innerHTML + line + "<br/>";
    await waitForMs(delay);
  }
}

async function main() {
  // Neo
  // const wakeup = "Wake up, Neo ...";
  // await typeSentence(wakeup, "typing", 0);
  // await waitForMs(2000);
  // eraseSentence("typing");
  // const followTheWhiteRabbit = "Follow the white rabbit.";
  // await typeSentence(followTheWhiteRabbit, "typing", 200);
  // await waitForMs(2000);
  // eraseSentence("typing");

  // cat CV
  const cat = "cat CV.txt";
  await typeSentence(cat, "typing", 100, true);
  await waitForMs(1000);

  const lineByLine = "Hello\n" + "My name is Richard\n" + "This is my cv\n";

  printLineByLine(lineByLine, "output", 250);
}

window.onload = () => {
  main();
};
