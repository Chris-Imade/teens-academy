$(function() {
        var form = $('#application-form');
        var formMessages = $('.form-messege');

        $(form).submit(function(e) {
            e.preventDefault();

            var formData = {
                firstname: $('input[name="firstname"]').val(),
                lastname: $('input[name="lastname"]').val(),
                program: $('select[name="program"]').val(),
                parent_name: $('input[name="parent-name"]').val(),
                number: $('input[name="number"]').val(),
                email: $('input[name="email"]').val(),
                address: $('input[name="address"]').val(),
                dob: $('input[name="dob"]').val(),
                gender: $('select[name="gender"]').val(),
                agree: $('input[name="agree"]').is(':checked')
            };

            $(formMessages).removeClass('success error').addClass('loading').text('Submitting application...');

            $.ajax({
                type: 'POST',
                url: 'https://cyan-teens-server.onrender.com/submit-application',
                data: JSON.stringify(formData),
                contentType: 'application/json'
            })
            .done(function(response) {
                $(formMessages).removeClass('error loading').addClass('success');
                $(formMessages).text('Application submitted successfully!');
                $('#application-form input, #application-form select').val('');
                $('#application-form input[name="agree"]').prop('checked', false);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $(formMessages).removeClass('success loading').addClass('error');
                if (jqXHR.responseText !== '') {
                    $(formMessages).text(jqXHR.responseText);
                } else {
                    $(formMessages).text('Oops! An error occurred and your application could not be submitted.');
                }
            });
        });
    });
