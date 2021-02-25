let flag_skip = false;

function isInViewport(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

function waitForMs(ms) {
  if (flag_skip) {
    return;
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeSentence(sentence, eleRef, delay = 100) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length) {
    await waitForMs(delay);
    eleRef.innerHTML = eleRef.innerHTML + letters[i];
    i++;
  }
}

function clearConsole() {
  const terminal = document.getElementById("terminal");
  terminal.innerHTML = "";
}

async function cleanOutput(str) {
  clearConsole();

  const container = document.createElement("div");
  container.className = "input";

  const output = document.createElement("div");
  output.className = "typing-section";
  const cursor = document.createElement("div");
  cursor.className = "typing-cursor";

  const terminal = document.getElementById("terminal");
  container.appendChild(output);
  container.appendChild(cursor);
  terminal.appendChild(container);

  await typeSentence(str, output);
}

async function printLineByLine(largeText, eleRef, delay = 250) {
  let lines = largeText.split("\n");
  for (let line_idx in lines) {
    const line = lines[line_idx].replace(" ", "&nbsp;");
    eleRef.innerHTML = eleRef.innerHTML + line + "<br>";
    if (!isInViewport(eleRef)) {
      eleRef.scrollIntoView();
    }
    await waitForMs(delay);
  }
}

async function inputOutputConsole(input, output) {
  const container = document.createElement("div");
  container.className = "input";

  const prompt_elem = document.createElement("div");
  prompt_elem.className = "console";
  prompt_elem.innerText = "$>";

  const input_command = document.createElement("div");
  input_command.className = "typing-section";

  const cursor = document.createElement("div");
  cursor.className = "typing-cursor";

  const output_command = document.createElement("div");

  const terminal =
    document.getElementById("terminal").lastElementChild ||
    document.getElementById("terminal");
  container.appendChild(prompt_elem);
  container.appendChild(input_command);
  container.appendChild(cursor);
  terminal.appendChild(container);
  terminal.appendChild(output_command);

  if (!isInViewport(prompt_elem)) {
    prompt_elem.scrollIntoView();
  }

  await typeSentence(input, input_command);
  container.removeChild(cursor);
  await waitForMs(500);
  await printLineByLine(output, output_command);
}

async function main() {
  const wakeup = "Wake up, Neo ...";
  cleanOutput(wakeup);
  await waitForMs(3000);

  const followTheWhiteRabbit = "Follow the white rabbit.";
  cleanOutput(followTheWhiteRabbit);
  await waitForMs(3000);

  clearConsole();
  // WHOAMI
  const whoami = "whoami";
  const whoami_output = "Richard Montoya, Web developer";
  await inputOutputConsole(whoami, whoami_output);

  // TECHNOLOGIES.txt
  const cat_technologies = "cat TECHNOLOGIES.txt";
  const cat_technologies_output =
    "JavaScript, Angular JS, React, Material design, Typescript, Redux, CSS,\n" +
    "Stylus, HTML5, Pug, Jinja,Python, Django, Flask, PHP,\n" +
    "CodeIgniter, Laravel, Wordpress, Java, Spring Boot \n" +
  ("Node.js, Express, AWS, Linux, MongoDB, MariaDB, MySQL, Oracle DB,Curl, BASH, Selenium");
  await inputOutputConsole(cat_technologies, cat_technologies_output);

  // SKILLS.txt
  const cat_skills = "cat SKILLS.txt";
  const cat_skills_output =
    "Problem Solving\n" +
    "Teamwork\n" +
    "Logical Thinking\n" +
    "Dedicated\n" +
    "Responsible\n" +
    "Proactive\n" +
    "Fast Learner";
  await inputOutputConsole(cat_skills, cat_skills_output);

  // curl EXPERIENCE
  const curl_experience =
    'curl -s -X GET http://experience.local -H "Accept: application/json" | jq ".experience[]"';
  const curl_output =
    "{\n" +
    "  company: CILAB DIGITAL,\n" +
    "  position: Developer,\n" +
    "  start_datetime: 2020-11-23,\n" +
    "  end_datetime: 2021-02-15,\n" +
    "},\n" +
    "{\n" +
    "   company: Savant BPO,\n" +
    "   position: Developer,\n" +
    "   start_datetime: 2018-02-05,\n" +
    "   end_datetime: 2020-11-20,\n" +
    "}\n" +
    "{\n" +
    "   company: INSITE S.A.S,\n" +
    "   position: Developer,\n" +
    "   start_datetime: 2016-03-13,\n" +
    "   end_datetime: 2016-07-28,\n" +
    "}";
  await inputOutputConsole(curl_experience, curl_output);

  const contact_information = "cat /proc/contact_info";
  const contact_information_output =
    'EMAIL: <a href="mailto:richard.a.montoya.l@gmail.com">richard.a.montoya.l@gmail.com</a>\n' +
    "PHONE: +57 311 706 7977\n" +
    'CV: <a href="CV.pdf">Resume</a>';
  await inputOutputConsole(contact_information, contact_information_output);
}

window.onload = () => {
  main();
};

function skip() {
  flag_skip = true;
}
