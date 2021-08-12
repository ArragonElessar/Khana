function addAddress(type) {
    // address of given type is not added
    window.location.href = '/address/' + type;

}

function getAddress(type) {
    $.ajax({
        type: 'POST',
        url: '/handler/address',
        data: {
            message: 'send address',
            type: type
        }
    }).done(function (response) {
        $("#address-label").removeClass("visually-hidden")
        $("#address-label").html(response.addline1 + ' ' + response.addline2)
        if (!response) {
            $("#address_edit").html('Add')
        }
    })
}

$(document).ready(function () {
    let selectedType = ''
    $("[name='address']").on("click", function () {
        selectedType = $(this).val()
        getAddress($(this).val());

    })
    $("#address_edit").click(function () {
        addAddress(selectedType);
    })

})