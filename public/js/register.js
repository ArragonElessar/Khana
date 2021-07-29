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
        })
    })
})