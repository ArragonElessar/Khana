$(document).ready(function () {
    // get the click event for buttons
    $("[name='confirmation']").on("click", function () {
        // send a confirmation to handler
        $.post({
            url: "/handler/confirm",
            data: { "status": $(this).val() }
        }).done(function (response) {
            // make changes based upon response (T/F)
            if(response){
                window.location.href = '/history';
            }else{
                alert("Payment Failed");
                window.location.href = '/history';
            }
        })
    })
})