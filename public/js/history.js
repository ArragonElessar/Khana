$(document).ready(function () {
    $.get('/handler/orders', function (response) {
        
        for (let i = 0; i < response.length; i++) {
            let address = ''

            $.post({
                url: '/handler/address',
                data: {
                    message: 'send address',
                    type: response[i].addressType
                }
            }).done(function (ret) {
                address = ret.addline1 + ' ' + ret.addline2
                var order_status = 'Unsuccessful'
                var payment_string = ''
                if (response[i].status) {
                    order_status = "Successful"
                }
                if (response[i].payment.mode == 'upi') {
                    payment_string = response[i].payment.details.id
                }
                var subtotal = 0.0
                var orderTable = ``
                for (let j = 0; j < response[i].items.length; j++) {

                    item = JSON.parse(response[i].items[j])
                    orderTable += `<tr>
                <td style="width:50%">`+ item.name + `</td>
                <td>`+ item.qty + `</td>
                <td>₹ `+ parseFloat(item.rate) * (item.qty) + `</td>
            </tr>`
                    subtotal += parseFloat(item.rate) * (item.qty)
                }


                $("#history-div").empty();
                var divhtml = `<div
            style="background: var(--bs-white);border-color: var(--bs-purple);margin-bottom: 2.5px;margin-top: 2.5px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div style="background: var(--bs-white);margin: 5px;">
                            <h3>At `+ response[i].timeStamp.split(',')[0] + `, ` + order_status + `</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div style="background: var(--bs-white);">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Delivered to: `+ address + `</td>
                                        </tr>
                                        <tr>
                                            <td>Order Total: ₹ `+ (subtotal * 1.05).toFixed(2) + `</td>
                                        </tr>
                                        <tr>
                                            <td>Paid Using: `+ payment_string + `</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div style="background: var(--bs-white);">
                            <div class="table-responsive" style="height: 65%;">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th colspan="3"
                                                style="text-align: center;background: var(--bs-purple);color: var(--bs-white);">
                                                Order Summary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr></tr>`+ orderTable + `
                    
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


                $("#history-div").append(divhtml)
            })




        }

    })
})