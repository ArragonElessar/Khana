var order = {
    items: [],
    paymentMethod: {},
    address: '',
}



function updatePayment(paymentMethod) {
    // calls here to update payment method
    // display on the summary tab
    // make an ajax request to update payment method.
    order.paymentMethod = paymentMethod;

    // by upi
    if (paymentMethod.mode == "upi") {
        $('#payment-label').removeClass('visually-hidden')
        $('#payment-label').html(paymentMethod.details.id.toString())

    }

}


function addAddress(type) {
    // address of given type is not added or is to be edited
    // hence redirect to address page with given type selected
    window.open('/address/' + type, '_blank');

}

// on selecting radio options for address section
function getAddress(type) {
    // send an AJAX request to get address of selected type
    $.ajax({
        type: 'POST',
        url: '/handler/address',
        data: {
            message: 'send address',
            type: type
        }
    }).done(function (response) {
        // response is address where address exists
        // false where it doesn't exist'
        

        // if theres no address, change html of edit button
        if (!response) {
            $("#address_edit").html('Add')
        }
        else{
            order.address = type
            // add the address to summary coloumn
            $("#address-label").removeClass("visually-hidden")
            $("#address-label").html(response.addline1 + ' ' + response.addline2)
        }
    })
}

function printCart() {
    /*
        add a feature to say "looks empty here"
        if cart is empty
    */

    // empty the cart items display table
    $("#cartTable").empty();
    // fetch the cart items using AJAX request
    $.ajax({
        url: '/handler/cart/fetch',
        method: 'POST',
        data: '0', // dummy data
    }).done(function (ret) {
        // ret here contains items {id, qty, rate, name}
        for (let i = 0; i < ret.length - 1; i++) {
            order.items.push(JSON.stringify(ret[i]));
            // append the cart table with items as rows
            $("#cartTable").append(
                `<tr id='` + ret[i].id + `' class="cartitems">
                <td style="width: 50%;">` + ret[i].name + `</td>
                <td>`+ ret[i].qty + `</td>
                <td>₹ `+ ret[i].qty * parseInt(ret[i].rate) + `</td>
            </tr>`
            )

        }
        // display the subtotal
        $("#subtotal").html("₹ " + ret[ret.length - 1].subTotal)
        $("#total").html("₹ " + (ret[ret.length - 1].subTotal * (1+ret[ret.length - 1].tax)).toFixed(2))
    })
}

$(document).ready(function () {
    // variable for holding selected address type
    let selectedType = ''
    let paymentMethod = { mode: '', details: '' }
    // onclick of address radio input
    $("[name='address']").on("click", function () {
        // set selected type
        selectedType = $(this).val()
        // call getAddress
        getAddress($(this).val());

    })
    // on click of edit button
    $("#address_edit").click(function () {
        // call add address
        addAddress(selectedType);
    })
    // get cart items
    printCart();
    // provide option for making changes to cart
    $("#change-cart").click(function () {
        window.location.href = '/menu'
    })

    // payments section
    $("[name='payment_method']").on("click", function () {
        // on clicking of a radio button
        if ($(this).val() == 'upi') {
            // upi clicked, css changes
            $("#upi-input-group").removeClass('visually-hidden')
            $("#upi-input-group").addClass('input-group')

            // on click of verify button
            $("#verify-upi").click(function () {
                // regex test to check for valid upi string
                var regex = new RegExp(/^[\w.-]+@[\w.-]+$/)
                if (regex.test($("#upi-id").val())) {
                    // correct string, update payment methods
                    paymentMethod.mode = 'upi';
                    paymentMethod.details = {
                        id: $("#upi-id").val()
                    }
                    $("#upi-id").css("border-color", "green");
                    updatePayment(paymentMethod) // build the function later

                } else {
                    $("#upi-id").css("border-color", "red");
                    $("#upi-id").val("xxxxxxxx@xxxx");
                }
            })

        } else if ($(this).val() == 'card') {
            $("#card-row").removeClass('visually-hidden')
            $("#card-row").addClass('row')

        } else {
            $("#net-input-group").removeClass('visually-hidden')
            $("#net-input-group").addClass('input-group')
        }

    })

    // proceeds with actual payment
    $("#pay").on("click", function () {
        if (jQuery.isEmptyObject(order.items)) {
            // if cart is empty
            alert("OOPS! Nothing to order")
            $("#change-cart").html("Add to Cart")
            $("#change-cart").css("border", "red 5px")
        }
        else if (jQuery.isEmptyObject(order.paymentMethod)) {
            // if no payment method is selected
            alert("Please choose a payment method")
            $("#payment-col").css("border", "red 5px")
        }
        else if(jQuery.isEmptyObject(order.address)) {
            // if no address is chosen
            alert("Please choose a valid address")
        }
        else{
            // everything well, proceed
            console.log(order)
            $.post({
                url: "/handler/pay",
                data:order
            }).done(function (response) {
                console.log(response)
                window.location.href = '/payment'
            })
        }
    })
})