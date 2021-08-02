$(document).ready(function () {
    $("#login_button").on("click", function () {
        $.ajax({
            data: {
                email: $("#email").val(),
                password: $("#password").val()
            },
            type: "POST",
            url: '/handler/login'
        }).done(function (ret) {
            console.log(ret)
            if (ret) {
                window.location.href = '/';
            }
            else {
                $(".form-control").css("border-color", 'red');
                alert("Incorrect Username or password");
            }
        })
    })
})