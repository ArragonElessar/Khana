/*
<div class="accordion-item">
    <h2 class="accordion-header" role="tab"><button class="accordion-button collapsed"
            data-bs-toggle="collapse" data-bs-target="#accordion-1 .item-2" aria-expanded="false"
            aria-controls="accordion-1 .item-2"
            style="background: var(--bs-purple);color: var(--bs-white);">Accordion Item</button>
    </h2>
    <div class="accordion-collapse collapse item-2" role="tabpanel" data-bs-parent="#accordion-1">
        <div class="accordion-body">
            <div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Item Name</td>
                                <td>Rate</td>
                                <td style="width: 10%;"><input type="number" style="width: 100%;"
                                        min="0" max="5" step="1" placeholder="0"></td>
                            </tr>
                            <tr>
                                <td>Item Name</td>
                                <td>Rate</td>
                                <td style="width: 10%;"><input type="number" style="width: 100%;"
                                        min="0" max="5" step="1" placeholder="0"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>                                            
*/
/*
$("#tr").after(`<tr><td style="width: 50%;">` + ret.name + `</td>
        <td>`+ qty + `</td>
        <td>₹ `+ qty * ret.rate + `</td></tr>`)
*/
function showCart() {

}



function cart(id) {
    let qty = $('#' + id).val()
    $.ajax({
        url: '/handler/cart',
        type: 'POST',
        data: {
            id: id,
            qty: qty
        }
    }).done(ret => {
        console.log(ret)
        showCart(id, qty)
    })
}



function getItems(category) {
    $.ajax({
        url: '/handler/menu/category&' + category
    }).done(function (ret) {

        for (let i = 0; i < ret.length; i++) {
            $("#" + category.split(' ')[0]).after(`<tr>
            <td>`+ ret[i].name + `</td>
            <td>₹ `+ ret[i].rate + `</td>
            <td style="width: 10%;">
            <input type="number" style="width: 100%;" id="`+ ret[i].id + `" onchange="cart(` + ret[i].id + `)" min="0" max="5" step="1" placeholder="0"></td>
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
})