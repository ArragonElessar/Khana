$(document).ready(function () {
    $("[name='confirmation']").on("click", function () {
        $.post({
            url: "/handler/confirm",
            data: { "status": $(this).val() }
        }).done(function (response) {
            console.log(response)
            if(response){
                window.location.href = '/history';
            }else{
                alert("Payment Failed");
                window.location.href = '/history';
            }
        })
    })
})