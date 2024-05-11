(function () {
  "use strict";

  // Select all forms with class '.php-email-form'
  let forms = document.querySelectorAll('.php-email-form');

  // Loop through each form
  forms.forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      let thisForm = this; // Reference to the current form

      let action = thisForm.getAttribute('action'); // Get form action URL
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key'); // Get reCaptcha site key
      
      // Check if form action is set
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading spinner
      thisForm.querySelector('.loading').style.display = 'block';
      thisForm.querySelector('.error-message').style.display = 'none';
      thisForm.querySelector('.sent-message').style.display = 'none';

      // Get form data
      let formData = new FormData(thisForm);

      // If reCaptcha is enabled
      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          // Execute reCaptcha
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token); // Add reCaptcha token to form data
                php_email_form_submit(thisForm, action, formData); // Submit form
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        // If reCaptcha is not enabled, submit form
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  // Function to submit form data via AJAX
  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if (response.ok) {
        return response.text(); // Return response as text
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      // Hide loading spinner
      thisForm.querySelector('.loading').style.display = 'none';
      // If form submission is successful
      if (data.trim() == 'OK') {
        // Show success message and reset form
        thisForm.querySelector('.sent-message').style.display = 'block';
        thisForm.reset(); 
      } else {
        // If form submission fails, display error message
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      // Handle errors
      displayError(thisForm, error);
    });
  }

  // Function to display error message
  function displayError(thisForm, error) {
    // Hide loading spinner
    thisForm.querySelector('.loading').style.display = 'none';
    // Display error message
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').style.display = 'block';
  }

})();
