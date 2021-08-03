$(document).ready(function () {
    $("#signup").on("click", function () {
        // send ajax request to register new user on click
        $.ajax({
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            },
            type: "POST",
            url: '/handler/register'
        }).done(function (ret) {
            // ret is a boolean value
            if (ret) {
                // successfully registered
                // send login request
                $.ajax({
                    data: {
                        email: $("#email").val(),
                        password: $("#password").val()
                    },
                    type: "POST",
                    url: '/handler/login'
                }).done(function (ret) {
                    if (ret) {
                        // logged in, redirect to home page
                        window.location.href = '/';
                    }
                })
            } else {
                // user with entered email already exists
                // css changes
                $(".form-control").css("border-color", 'red');
                alert("Account with email already exists");
            }
        })
    })
})