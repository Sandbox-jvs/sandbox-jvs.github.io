document.addEventListener("DOMContentLoaded", loadStates);
// document.addEventListener("DOMContentLoaded", loadCounties);


//Event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#username").addEventListener("change", checkUsername); 
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#password").addEventListener("click", checkPassword);
document.querySelector("#passwordAgain").addEventListener("change", checkPassword);
// document.querySelector("#county").addEventListener("click", loadCounties);
document.querySelector("#state").addEventListener("change", loadCounties);


//Whether before or after the event listeners, since the functions are called later, the
//following placeholder displays a semi-transparent text when the document loads
let password = document.querySelector("#password");
password.placeholder = "Enter a password";

let confirmPassword = document.querySelector("#passwordAgain");
confirmPassword.placeholder = "Confirm Password";

let username = document.querySelector("#username");
username.placeholder = "Enter username";


async function checkUsername() {
    let username = document.querySelector("#username").value; //Stores the username
    let usernameError = document.querySelector("#usernameError"); //References the error display area

    if (username.length === 0) {
        usernameError.textContent = "Username Required"; 
        usernameError.style.color = "red";
        return false; 
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url); // This is the moment the browser sends a request to the API
    let data = await response.json(); 

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.style.color = "green";
        usernameError.style.display = "block";
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.style.color = "red";
        usernameError.style.display = "block";
        return false;
    }
}

async function checkPassword () {

    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");

    let url = `https://csumb.space/api/suggestedPassword.php?length=6`
    let response = await fetch(url);
    let data = await response.json();
    
    if (password.length === 0) {
        passwordError.textContent = "Ex: " + data.password;
        passwordError.style.color = "blue";
    }

}

async function validateForm() {
    //Stops the browser's default form submission behavior - in this case, going to welcome.html
    event.preventDefault(); // Needed to prevent the from submitting immediately

    let isValid = true;

    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    let password = document.querySelector("#password").value;
    let confirmPassword = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");
    let confirmPasswordError = document.querySelector("#confirmPasswordError");


    usernameError.textContent = "";

    //Check that user entered something into username input 
    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        isValid = false; 
    } else if (password.length < 6) {
        passwordError.textContent = "Password must be at least six characters";
        passwordError.style.color = "red";
        isValid = false;  
    } else if (confirmPassword.length === 0) {
        confirmPasswordError.textContent = "Please confirm your password";
        confirmPasswordError.style.color = "red";
        isValid = false;  
    } else if (confirmPassword !== password) {
        confirmPasswordError.textContent = "Password doesn't match. Try again.";
        confirmPasswordError.style.color = "red";
        isValid = false;  
    } else {
        let usernameAvailable = await checkUsername(); 

        if (usernameAvailable === false) {
            isValid = false;
        } 
    }
    
    if (isValid) {
        document.querySelector("#signupForm").submit();
    }
}

//async lets us use await inside the funtion to pause this funtilon until the remote data is ready w/o freezing the browser
async function displayCity() {
    // alert(document.querySelector("#zip").value);
    try {
        //Stores the zip code from the input box into the variable
        let zipCode = document.querySelector("#zip").value;
        //The API url that references the zipCode value to obtain information from the external website
        let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
        let response = await fetch(url); //Stores the results of the fetched data from the url to response variable
        let data = await response.json();

        //The API returns false when the zip code is not found, so we can check for that
        if (data === false) {
            document.querySelector("#city").textContent = "Zip code not found";
            document.querySelector("#latitude").textContent = "";
            document.querySelector("#longitude").textContent = "";
            return;
        }

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude;
        document.querySelector("#longitude").textContent = data.latitude;

        document.querySelector("#city").style.color = "purple";
        document.querySelector("#latitude").style.color = "blue";
        document.querySelector("#longitude").style.color = "orange";


    } catch (error) {
        document.querySelector("#city").textContent = "Unable to retrieve city";
        console.error(error);
    }
}

async function loadStates() {
    let stateMenu = document.querySelector("#state"); //Grab the states dropdown  
    
    stateMenu.textContent = ""; //reset the menu

    //Begin creating element of available options
    let defaultOption = document.createElement("option");
    defaultOption.value = ""; 
    defaultOption.textContent = "Select One";
    stateMenu.appendChild(defaultOption);

    try {
        let url = "https://csumb.space/api/allStatesAPI.php";
        let response = await fetch(url);
        let data = await response.json();

        //Iterate through and obtain the data available 
        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.usps; //Sets the option element's value to the usps value
            option.textContent = item.state; //Text that appears to the user - unabbreviated states 
            stateMenu.appendChild(option); 
        }
    } catch (error) {
        console.log(error);

        stateMenu.textContent = ""; // Reset the dropdown menu

        let errorOption = document.createElement("option"); 
        errorOption.value = ""; 
        errorOption.textContent = "Unable to load states";
        stateMenu.appendChild(errorOption);
    }
    
}

async function loadCounties() {

    //Setup: Grab and reset the county menu
    let countyMenu = document.querySelector("#county");
    countyMenu.textContent = "";
    
    //Create a default option element
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select One";
    countyMenu.appendChild(defaultOption);
    
    //Grab the user selected abbreviated state
    let selectedState = document.querySelector("#state").value;

    try {
        let url = `https://csumb.space/api/countyListAPI.php?state=${selectedState}`;
        let response = await fetch(url);
        let data = await response.json();

        for (let item of data) {
            let option = document.createElement("option");
            option.value = item.county;
            option.textContent = item.county;
            countyMenu.appendChild(option);
        }

    } catch (error) {
        console.log(error);
        
        countyMenu.textContent = "";

        let errorOption = document.createElement("option");
        errorOption.value = "";
        errorOption.textContent = "Unable to load County";
    }
}