// array to store the id, qty of items in cart
let cartIds = []

// print the cart items for display
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
            // add details to cartIDs
            cartIds.push([ret[i].id, ret[i].qty])
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
    })
}

// this will send an update request to cart, called on change of an
// input field of the menu-items on display 
function changeCart(id) {
    // get the value of the number input (qty)
    let qty = $('#' + id).val()
    $.ajax({
        url: '/handler/cart/update',
        type: 'POST',
        // sends product id and qty
        data: {
            id: id,
            qty: qty
        }
    }).then(ret => {
        if (ret == true) {
            // intentional hard coded timeout for database to get updated
            // calls printCart to display changes
            setTimeout(() => { printCart(); }, 500);
        }
    })
}

// get all the items of a given category
// update the items to the accordion of the category
function getItems(category) {
    // send an AJAX get request
    $.ajax({
        url: '/handler/menu/category&' + category
    }).done(function (ret) {
        // ret contains all the items of the category
        // {id, name, rate}
        for (let i = 0; i < ret.length; i++) {
            // variable for placeholder, to be updated in case item already in cart
            let qtyPlaceholder = 0
            for (let j = 0; j < cartIds.length; j++) {
                // check if the id of item sent by AJAX request is same as the id of a // product in cart
                if (ret[i].id == cartIds[j][0]) {
                    // set the placeholder in case it does
                    qtyPlaceholder = cartIds[j][1];
                }
            }
            // adds table rows to the accordion of the clicked category
            // category split is used because ids of elements cannot have spaces
            // some categories have a space in name
            $("#" + category.split(' ')[0]).after(`<tr>
            <td>`+ ret[i].name + `</td>
            <td>₹ `+ ret[i].rate + `</td>
            <td style="width: 10%;">
            <input type="number" style="width: 100%;" id="`+ ret[i].id + `"
            onchange="changeCart(` + ret[i].id + `)" min="0" max="5" step="1" placeholder="` + qtyPlaceholder + `"></td>
        </tr>`
            )
        }

    })
}

$(document).ready(function () {
    // on expansion only, set by the aria-expanded state
    $(".accordion-button").on("click", function () {
        if ($(this).attr("aria-expanded") == "true") {
            // get items of the given category
            getItems($(this).html())
        }
    });
    // print the initial cart
    printCart();

    $("#checkoutButton").click(function () {
        window.location.href = '/checkout'
    })
})