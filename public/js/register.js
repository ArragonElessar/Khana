$(document).ready(function () {
    $("#signup").on("click", function () {
        $.ajax({
            data: {
                name: $("#name").val(),
                email: $("#email").val(),
                password: $("#password").val()
            },
            type: "POST",
            url: '/handler/register'
        }).done(function (ret) {
            console.log(ret)
            if (ret) {
                // add login functionality
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
                })
            } else {
                // css changes
                $(".form-control").css("border-color", 'red');
                alert("Account with email already exists");
            }
        })
    })
})