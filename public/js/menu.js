let cartIds = []

function printCart() {
    $("#cartTable").empty();
    $.ajax({
        url: '/handler/cart/fetch',
        method: 'POST',
        data: '0',
    }).done(function (ret) {
        console.log(ret)
        for (let i = 0; i < ret.length - 1; i++) {
            cartIds.push([ret[i].id, ret[i].qty])
            $("#cartTable").append(
                `<tr id='` + ret[i].id + `' class="cartitems">
                <td style="width: 50%;">` + ret[i].name + `</td>
                <td>`+ ret[i].qty + `</td>
                <td>₹ `+ ret[i].qty * parseInt(ret[i].rate) + `</td>
            </tr>`
            )

        }
        $("#subtotal").html("₹ " + ret[ret.length - 1].subTotal)
    })
    console.log(cartIds)
}


function cart(id) {
    let qty = $('#' + id).val()
    console.log(qty)
    $.ajax({
        url: '/handler/cart/update',
        type: 'POST',
        data: {
            id: id,
            qty: qty
        }
    }).then(ret => {
        if (ret == true) {
            setTimeout(() => { printCart(); }, 500);
        }
    })
}



function getItems(category) {
    $.ajax({
        url: '/handler/menu/category&' + category
    }).done(function (ret) {
        for (let i = 0; i < ret.length; i++) {
            let qtyPlaceholder = 0
            for (let j = 0; j < cartIds.length; j++) {
                if (ret[i].id == cartIds[j][0]) {
                    qtyPlaceholder = cartIds[j][1];
                }
            }
            $("#" + category.split(' ')[0]).after(`<tr>
            <td>`+ ret[i].name + `</td>
            <td>₹ `+ ret[i].rate + `</td>
            <td style="width: 10%;">
            <input type="number" style="width: 100%;" id="`+ ret[i].id + `"
            onchange="cart(` + ret[i].id + `)" min="0" max="5" step="1" placeholder="` + qtyPlaceholder + `"></td>
        </tr>`
            )
        }

    })
}
$(document).ready(function () {
    $(".accordion-button").on("click", function () {
        if ($(this).attr("aria-expanded") == "true") {
            getItems($(this).html())
        }
    });
    printCart();
})