displayQ4Choices();
displayQ7Choices();
displayQ8Choices();
displayQ9Choices();
displayQ10Choices();


document.querySelector("button").addEventListener("click",  gradeQuiz);

let score = 0;
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}

function setMarkImage(index, imageName, altText) {
    let markContainer = document.querySelector(`#markImg${index}`);
    markContainer.textContent = "";

    let img = document.createElement("img");
        img.src = `img/${imageName}`;
        img.alt = altText;
        markContainer.appendChild(img);
}

function rightAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Correct!";
    feedback.className = "bg-success text-white";
    setMarkImage(index, "checkmark.png", "Checkmark");
    score += 10;
}

function wrongAnswer(index) {
    let feedback = document.querySelector(`#q${index}Feedback`);
    feedback.textContent = "Incorrect!";
    feedback.className = "bg-warning text-white";
    setMarkImage(index, "xmark.png", "X mark");
}

function gradeQuiz() {
    document.querySelector("#validationFdbk").textContent = "";
    
    if(!isFormValid()) {
        return;
    }

    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q6Response = document.querySelector("#q6").value.toLowerCase();

    q1Feedback.textContent = "";
    q1Feedback.className = "";
    markImg1.textContent = "";

    //Condition to check response for question 1
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    //Condition to check response for question 2
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    //Condition to check response for question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
            rightAnswer(3);
    } else {
            wrongAnswer(3);
    }

    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    let selectedQ5 = document.querySelector("input[name=q5]:checked");
    let selectedQ7 = document.querySelector("input[name=q7]:checked");
    let selectedQ8 = document.querySelector("input[name=q8]:checked");
    let selectedQ9 = document.querySelector("input[name=q9]:checked");
    let selectedQ10 = document.querySelector("input[name=q10]:checked");

    //Condition to check response for question 4
    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //Condition to check the response for question 5
    if (selectedQ5 !== null && selectedQ5.value === "Aug. 2, 1776") {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    //Condition to check the response for question 6
    if (q6Response === "atlanta") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    //Condition to check the response for question 7
     if (selectedQ7 !== null && selectedQ7.value === "1982") {
        rightAnswer(7);
    } else {
        wrongAnswer(7);
    }

    //Condition to check the response for question 8
     if (selectedQ8 !== null && selectedQ8.value === "Women") {
        rightAnswer(8);
    } else {
        wrongAnswer(8);
    }
    
    //Condition to check the response for question 9
     if (selectedQ9 !== null && selectedQ9.value === "Madam C.J. Walker") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }
    
    //Condition to check the response for question 10
     if (selectedQ10 !== null && selectedQ10.value === "The 13 original colonies") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }   

    let totalScore = document.querySelector("#totalScore");

    if (score <= 80) {
        totalScore.className = "text-danger";
        totalScore.textContent = `Total Score: ${score}`;
    } else {
        totalScore.className = "text-success";
        totalScore.textContent = `Congratulations! Total Score: ${score}`;
    }

    attempts++; 
    document.querySelector("#totalAttempts").textContent = `total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts); 
        
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio"; 
        input.name = "q4"; 
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = choice; 
        label.textContent = choice;

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label); 
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

function displayQ7Choices() {
    let q7ChoicesArray = ["1986", "1900", "1982", "1999"];
    shuffleArray(q7ChoicesArray);

    let choicesContainer = document.querySelector("#q7Choices");
    choicesContainer.textContent = "";

    for (let choice of q7ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio"; 
        input.name = "q7";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label"); 
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input); 
        choicesContainer.appendChild(label); 
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

function displayQ8Choices() {
    let q8ChoicesArray = ["Men", "Women", "Children", "Elderly"];
    shuffleArray(q8ChoicesArray);

    let choicesContainer = document.querySelector("#q8Choices");
    choicesContainer.textContent = "";

    for (let choice of q8ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio"; 
        input.name = "q8";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label"); 
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input); 
        choicesContainer.appendChild(label); 
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

function displayQ9Choices() {
    let q9ChoicesArray = ["Jessica Walker", "Madam C.J. Walker", "Rosa Parks", "Mary J. Blige"];
    shuffleArray(q9ChoicesArray);

    let choicesContainer = document.querySelector("#q9Choices");
    choicesContainer.textContent = "";

    for (let choice of q9ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio"; 
        input.name = "q9";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label"); 
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input); 
        choicesContainer.appendChild(label); 
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

function displayQ10Choices() {
    let q10ChoicesArray = ["13 states", "Founding Fathers", "The 13 original colonies", "The first 13 millionaires"];
    shuffleArray(q10ChoicesArray);

    let choicesContainer = document.querySelector("#q10Choices");
    choicesContainer.textContent = "";

    for (let choice of q10ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio"; 
        input.name = "q10";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label"); 
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input); 
        choicesContainer.appendChild(label); 
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk = document.querySelector("#validationFdbk");

    if(q1Response === "") {
        isValid = false; 
        validationFdbk.textContent = "Questions 1 was not answered";
    }
    return isValid;
}



