function address(session, Addtype) {
    // converts json string to object 
    let info = JSON.parse(session.replace(/&#34;/g, '"'));
    let addressType = JSON.parse(Addtype.replace(/&#34;/g, '"'));
    console.log(addressType)
    $(document).ready(function () {
        // initial load of home address if available
        $('#type [value=' + addressType + ']').attr('selected', 'true');
        $('#type').val(addressType)
        getAddress(info.email, $("#type").val());
        // get cities when new state is selected
        $("#state_select").on("change", function () {
            if ($("#state_select").val() != 'select') {
                $.ajax({
                    url: '/handler/address/' + $("#state_select").val(),
                }).done(function (ret) {
                    for (let i = 0; i < ret.length; i++) {
                        $("#select_city_option").after('<option value="' + ret[i] + '" id="' + ret[i] + '">' + ret[i] + '</option>')
                    }
                })
            }
        })
        // get address of type when type changes
        $("#type").change(function () {
            getAddress(info.email, $("#type").val())
        })
        // update address
        $('#update-address').on('click', function () {
            let type = $("#type").val()
            $.ajax({
                url: '/handler/address',
                type: 'POST',
                data: {
                    message: 'update address',
                    email: info.email,
                    type: type,
                    address: JSON.stringify({
                        state: $("#state_select").val(),
                        city: $("#city_select").val(),
                        addline1: $("#addline1").val(),
                        addline2: $("#addline2").val()
                    })
                }
            }).done(ret => {
                window.location.href = '/'
            })
        })


    })
}
async function getAddress(email, type) {
    // gets user address from db
    $.ajax({
        url: '/handler/address',
        type: 'POST',
        data: {
            message: 'send address',
            type: type,
            email: email,
        }
    }).done(function (ret) {
        // filling changes in fields
        if (!jQuery.isEmptyObject(ret)) {
            $("#state_select").val(ret.state)
            $("#state_select").trigger('change')
            $("#addline1").attr('placeholder', ret.addline1)
            $("#addline1").val(ret.addline1)
            $("#addline2").attr('placeholder', ret.addline2)
            $("#addline2").val(ret.addline2)
            $("#select_city_option").before('<option value="' + ret.city + '" selected>' + ret.city + '</option>')
        } else {
            // return to normal fields
            $("#addline1").attr('placeholder', 'Flat Number/ Building')
            $("#addline2").attr('placeholder', 'Locality/ Town')
            $("#state_select").val('select')
            $("#city_select").val('select')

        }
    })

}


