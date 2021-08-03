const getData = (data) => {
    // converts json string to object 
    let session = JSON.parse(data.replace(/&#34;/g, '"'));
    $(document).ready(function () {
        if (session.login_state) {
            // css changes if logged in
            $("#login_link").removeClass("login");
            $("#login_link").addClass("visually-hidden");

            //dropdown changes
            $("#dropdown").removeClass('visually-hidden')
            $("#dropdown").addClass('nav-item dropdown')

            $("#my_account").html("My Account");
            $("#address_link").html("My Address");
            $("#address_link").attr("href", '/address')

            // log out functionality
            $("#signup_link").html("Log-Out")
            $("#signup_link").on("click", function () {
                $.ajax({
                    url: '/handler/logout',
                    method: "POST",
                    data: {
                        email: session.email
                    }
                }).done(function (ret) {
                    console.log('log out: ' + ret);
                })
            })

        }
    })
}