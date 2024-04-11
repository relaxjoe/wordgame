const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the main page
      document.location.replace("/main");
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (email && password) {
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // If successful, redirect the browser to the main page
        document.location.replace("/main");
      } else {
        // Handle any errors in the response
        alert(response.statusText);
      }
    } catch (error) {
      // Handle any network or server errors
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again later.");
    }
  }
};

document
  .querySelector(".login-card")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-card")
  .addEventListener("submit", signupFormHandler);
