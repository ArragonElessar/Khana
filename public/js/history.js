$(document).ready(function () {
    // send a request to get the orders for the user
    $.get('/handler/orders', function (response) {
        for (let i = 0; i < response.length; i++) {
            // since only address type is recieved, send a request to get the whole address to display
            let address = ''
            $.post({
                url: '/handler/address',
                data: {
                    message: 'send address',
                    type: response[i].addressType
                }
            }).done(function (ret) {
                // ret has the address as an object
                // fill in the address variable 
                address = ret.addline1 + ' ' + ret.addline2

                // variable to hold order status message
                var order_status = 'Unsuccessful'
                // similarly for payment details string
                var payment_string = ''
                // change status depending upon success
                if (response[i].status) {
                    order_status = "Successful"
                }
                // similarly for payment details
                if (response[i].payment.mode == 'upi') {
                    payment_string = response[i].payment.details.id
                }
                // variables for subtotal and the order table, which will contain the html
                // for building the table of items in the order
                var subtotal = 0.0
                var orderTable = ``
                for (let j = 0; j < response[i].items.length; j++) {

                    item = JSON.parse(response[i].items[j])
                    // parse item string as JSON object, and add to necessary places
                    orderTable += `<tr>
                <td style="width:50%">`+ item.name + `</td>
                <td>`+ item.qty + `</td>
                <td>₹ `+ parseFloat(item.rate) * (item.qty) + `</td>
            </tr>`
                    // simultaneously calculate the subtotal
                    subtotal += parseFloat(item.rate) * (item.qty)
                }

                // empty previously held orders
                $("#history-div").empty();
                // string to hold the entire division
                // here data is added as per designed earlier
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

                // append this string to the division, hence automatically new divisions will be created upon new orders
                $("#history-div").append(divhtml)
            })
        }
    })
})