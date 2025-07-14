	/*-------------------------
        Ajax Contact Form 
    ---------------------------*/
    $(function() {

        // Get the form.
        var form = $('#contact-form');

        // Get the messages div.
        var formMessages = $('.form-messege');

        // Set up an event listener for the contact form.
        $(form).submit(function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Get form input values
            var formData = {
                name: $('input[name="name"]').val(),
                email: $('input[name="email"]').val(),
                subject: $('input[name="subject"]').val(),
                message: $('textarea[name="message"]').val()
            };

            // Show loading message
            $(formMessages).removeClass('success error').addClass('loading').text('Sending message...');

            // Submit the form using AJAX.
            $.ajax({
                type: 'POST',
                url: 'https://cyan-teens-server.onrender.com/submit-contact',
                data: JSON.stringify(formData),
                contentType: 'application/json'
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error loading').addClass('success');

                // Set the message text.
                $(formMessages).text('Message sent successfully!');

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success loading').addClass('error');

                // Set the message text.
                if (jqXHR.responseText !== '') {
                    $(formMessages).text(jqXHR.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your message could not be sent.');
                }
            });
        });

    });
