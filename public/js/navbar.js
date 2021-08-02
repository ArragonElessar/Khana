const getData = (data) => {

    let session = JSON.parse(data.replace(/&#34;/g, '"'));
    console.log(session);
    $(document).ready(function () {
        if (session.login_state) {
            // css changes if logged in
            $("#login_link").removeClass("login");
            $("#login_link").addClass("visually-hidden");

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