$(function() {
        var form = $('.subscribe-form form');
        var formMessages = form.find('.form-messege'); // Assuming a message div within the form

        // If no specific message div, create one
        if (formMessages.length === 0) {
            form.append('<div class="form-messege mt-3 text-center"></div>');
            formMessages = form.find('.form-messege');
        }

        $(form).submit(function(e) {
            e.preventDefault();

            var formData = {
                newsletter_email: $(this).find('input[name="newsletter_email"]').val()
            };

            $(formMessages).removeClass('success error').addClass('loading').text('Subscribing...');

            $.ajax({
                type: 'POST',
                url: 'https://cyan-teens-server.onrender.com/subscribe-newsletter',
                data: JSON.stringify(formData),
                contentType: 'application/json'
            })
            .done(function(response) {
                $(formMessages).removeClass('error loading').addClass('success');
                $(formMessages).text('Subscribed successfully!');
                form.find('input[name="newsletter_email"]').val('');
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $(formMessages).removeClass('success loading').addClass('error');
                if (jqXHR.responseText !== '') {
                    $(formMessages).text(jqXHR.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your subscription could not be processed.');
                }
            });
        });
    });
