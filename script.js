// Part 1: Variables and Data Types
let currentUser = "";
let loginAttempts = 0;
let isLoggedIn = false;
const maxAttempts = 3;

// Part 1: Array of valid users (simulating a simple database)
const validUsers = [
  { username: "admin", password: "admin123", role: "Administrator" },
  { username: "user1", password: "pass123", role: "User" },
  { username: "demo", password: "demo123", role: "Guest" },
  { username: "test", password: "test123", role: "Tester" },
];

// Part 2: Functions - Display available users when page loads
function displayAvailableUsers() {
  const userListElement = document.getElementById("userList");
  let userListHTML = "";

  // Part 3: Loop - Iterate through users array
  for (let i = 0; i < validUsers.length; i++) {
    userListHTML += `<strong>${validUsers[i].username}</strong> (${validUsers[i].password}) - ${validUsers[i].role}<br>`;
  }

  userListElement.innerHTML = userListHTML;
}

// Part 2: Functions - Validate user credentials
function validateUser(username, password) {
  // Part 3: Loop - Check each user using forEach
  let foundUser = null;

  validUsers.forEach(function (user) {
    if (user.username === username && user.password === password) {
      foundUser = user;
    }
  });

  return foundUser;
}

// Part 2: Functions - Display messages to user
function displayMessage(message, type) {
  const messageElement = document.getElementById("message");
  messageElement.innerHTML = message;

  // Part 1: Conditionals - Change styling based on message type
  if (type === "error") {
    messageElement.className = "error";
  } else if (type === "success") {
    messageElement.className = "success";
  } else {
    messageElement.className = "";
  }
}

// Part 2: Functions - Update login attempts display
function updateAttemptsDisplay() {
  const attemptsElement = document.getElementById("attemptsDisplay");

  // Part 1: Conditionals - Show attempts if there are any
  if (loginAttempts > 0) {
    attemptsElement.innerHTML = `
                    <div class="login-attempts">
                        Login attempts: ${loginAttempts}/${maxAttempts}
                    </div>
                `;
  } else {
    attemptsElement.innerHTML = "";
  }
}

// Part 2: Functions - Main login function
function attemptLogin() {
  // Part 4: DOM - Get input values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Part 1: Conditionals - Basic validation
  if (username === "" || password === "") {
    displayMessage("Please enter both username and password!", "error");
    return;
  }

  // Check if user has exceeded max attempts
  if (loginAttempts >= maxAttempts) {
    displayMessage(
      "Too many failed attempts! Please refresh the page.",
      "error"
    );
    return;
  }

  // Validate credentials
  const user = validateUser(username, password);

  if (user) {
    // Part 1: Variable assignment
    currentUser = user;
    isLoggedIn = true;

    displayMessage("Login successful! Redirecting...", "success");

    // Part 4: DOM - Hide login, show welcome after delay
    setTimeout(function () {
      showWelcomeScreen();
    }, 1500);
  } else {
    // Increment attempts counter
    loginAttempts++;
    updateAttemptsDisplay();

    // Part 1: Conditionals - Different messages based on attempts
    if (loginAttempts >= maxAttempts) {
      displayMessage("Maximum login attempts reached! Access denied.", "error");
    } else {
      displayMessage(
        `Invalid credentials! ${
          maxAttempts - loginAttempts
        } attempts remaining.`,
        "error"
      );
    }
  }
}

// Part 2: Functions - Show welcome screen
function showWelcomeScreen() {
  // Part 4: DOM - Hide login section, show welcome section
  document.getElementById("loginSection").className = "hidden";
  document.getElementById("welcomeSection").className = "";

  // Part 4: DOM - Update welcome content
  document.getElementById("welcomeMessage").innerHTML = `
                <h3>Hello, ${currentUser.username}! </h3>
                <p>You have successfully logged into the system.</p>
            `;

  document.getElementById("userInfo").innerHTML = `
                <div class="user-list">
                    <h4>Your Account Information:</h4>
                    <strong>Username:</strong> ${currentUser.username}<br>
                    <strong>Role:</strong> ${currentUser.role}<br>
                    <strong>Login Time:</strong> ${new Date().toLocaleString()}
                </div>
            `;

  // Part 3: Loop - Generate some stats using while loop
  generateLoginStats();
}

// Part 2: Functions - Generate some fun stats
function generateLoginStats() {
  const statsElement = document.getElementById("loginStats");
  let statsHTML = "<h4>Quick Stats:</h4>";

  // Part 3: Loop - Using while loop to create some demo stats
  let i = 0;
  const stats = ["Active Sessions", "Messages", "Notifications", "Tasks"];

  while (i < stats.length) {
    // Generate random numbers for demo
    const randomNum = Math.floor(Math.random() * 50) + 1;
    statsHTML += `<strong>${stats[i]}:</strong> ${randomNum}<br>`;
    i++;
  }

  statsElement.innerHTML = `<div class="user-list">${statsHTML}</div>`;
}

// Part 2: Functions - Clear the login form
function clearForm() {
  // Part 4: DOM - Clear input fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  displayMessage("", "");
}

// Part 2: Functions - Logout function
function logout() {
  // Part 1: Reset variables
  currentUser = "";
  isLoggedIn = false;
  loginAttempts = 0;

  // Part 4: DOM - Show login section, hide welcome
  document.getElementById("loginSection").className = "";
  document.getElementById("welcomeSection").className = "hidden";

  // Clear form and messages
  clearForm();
  updateAttemptsDisplay();

  console.log("User logged out successfully"); // Part 1: Console output
}

// Part 4: DOM - Event listener for Enter key on password field
document.addEventListener("DOMContentLoaded", function () {
  displayAvailableUsers();

  document
    .getElementById("password")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        attemptLogin();
      }
    });

  // Part 1: Console log for debugging
  console.log("Login system initialized with", validUsers.length, "demo users");
});
