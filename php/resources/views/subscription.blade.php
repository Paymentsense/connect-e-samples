<!doctype html>
<html lang="en">
    <head>
        <title>Subscription</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="{{ url("css/styles.css") }}">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <script src="https://web.e.test.connect.paymentsense.cloud/assets/js/client.js"></script>
        <script src="{{ url("js/pay_config.js") }}"></script>
        <script src="{{ url("js/sale.js") }}"></script>
        <script src="{{ url("js/subscription.js") }}"></script>
        <script type="text/javascript">
            window.addEventListener('load', function () {
                const btnOrder = document.getElementById("btnOrder");
                btnOrder.onclick = () => processOrder();

                let confirmPaymentCallback = function(response) {
                    document.getElementById("inputSubscriptionCrossReference").value = response.crossReference;
                    document.getElementById("sectionSubscription").classList.remove("hidden");
                }

                const btnPay = document.getElementById("btnPay");
                btnPay.onclick = () => processPayment(confirmPaymentCallback);

                const btnSubscription = document.getElementById("btnSubscription");
                btnSubscription.onclick = () => processSubscription();
            })
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Subscription</h1>
            <div id="sectionOrder">
                <h2>Order</h2>
                <form id="orderForm">
                    <div class="form-group">
                        <label for="inputAmount">Amount (£)</label>
                        <input type="text" class="form-control" id="inputAmount" value="100">
                    </div>
                    <div class="form-group">
                        <label for="inputTransactionType">Transaction type</label>
                        <input class="form-control" type="text" id="inputTransactionType" value="SALE" readonly>
                    </div>
                    <div class="form-group">
                        <label for="inputOrderId">Order Id</label>
                        <input type="text" class="form-control" id="inputOrderId" value="ORD00001">
                    </div>
                    <div class="form-group">
                        <label for="inputOrderDescription">Order description</label>
                        <textarea class="form-control" id="inputOrderDescription" rows="3">Example description.</textarea>
                    </div>
                    <button id="btnOrder" type="submit" class="btn-primary btn pull-right">Submit</button>
                </form>
            </div>
            <div id="sectionCardHelp" class="hidden">
                <h3>Test card info</h3>
                <ul>
                    <li>Test Cardholder</li>
                    <li>5200 0000 0000 0056</li>
                    <li>12 / 24</li>
                    <li>341</li>
                </ul>
            </div>
            <div id="sectionPay" class="hidden">
                <h3>Pay</h3>
                <div id="demo-payment"></div>
                <div id="errors"></div>
                <button id="btnPay" class="btn-primary btn pull-right" data-loading-text="Processing...">Pay</button>
                <div id="demo-result" class="hidden">
                    <h5>Payment Complete</h5>
                    <dl>
                        <dt>Status Code</dt>
                        <dd id="status-code"></dd>
                        <dt>Auth Code</dt>
                        <dd id="auth-code"></dd>
                    </dl>
                </div>
            </div>
            <div id="sectionPayResult" class="hidden">
                <h3>Result</h3>
                <div id="sectionPayResultLoading">
                    <p>Loading...</p>
                </div>
                <div id="sectionPayResultTable" class="hidden">
                    <table id="payResultTable">
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="sectionSubscription" class="hidden">
                <h2>Subscription</h2>
                <form id="subscriptionForm">
                    <div class="form-group">
                        <label for="inputSubscriptionTransactionType">Transaction type</label>
                        <input class="form-control" type="text" id="inputSubscriptionTransactionType" value="SALE" readonly>
                    </div>
                    <div class="form-group">
                        <label for="inputSubscriptionCrossReference">Cross Reference</label>
                        <input class="form-control" type="text" id="inputSubscriptionCrossReference" value="" readonly>
                    </div>
                    <button id="btnSubscription" type="submit" class="btn-primary btn pull-right">Subscription</button>
                </form>
            </div>
            <div id="sectionSubscriptionResult" class="hidden">
                <h3>Result</h3>
                <div id="sectionSubscriptionResultLoading">
                    <p>Loading...</p>
                </div>
                <div id="sectionSubscriptionResultTable" class="hidden">
                    <table id="subscriptionResultTable">
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>
