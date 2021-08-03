$(document).ready(function () {
    // sends ajax request to handler with username and password given by user
    $("#login_button").on("click", function () {
        $.ajax({
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            type: "POST",
            url: '/handler/login'
        }).done(function (ret) {
            // ret is boolean value
            console.log(ret)
            if (ret) {
                // true, logged in, redirect to home
                window.location.href = '/';
            }
            else {
                // false, make css changes
                $(".form-control").css("border-color", 'red');
                alert("Incorrect Username or password");
            }
        })
    })
})