<!doctype html>
<html lang="en">
    <head>
        <title>PreAuth &amp; Collect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="{{ url("css/styles.css") }}">
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
        <script src="https://web.e.test.connect.paymentsense.cloud/assets/js/client.js"></script>
        <script src="{{ url("js/pay_config.js") }}"></script>
        <script src="{{ url("js/sale.js") }}"></script>
        <script src="{{ url("js/pre_auth.js") }}"></script>
        <script type="text/javascript">
            window.addEventListener('load', function () {
                const btnOrder = document.getElementById("btnOrder");
                btnOrder.onclick = () => processOrder();

                let confirmPaymentCallback = function(response) {
                    document.getElementById("inputCollectCrossReference").value = response.crossReference;
                    document.getElementById("sectionCollect").classList.remove("hidden");
                }

                const btnPay = document.getElementById("btnPay");
                btnPay.onclick = () => processPayment(confirmPaymentCallback);

                const btnCollect = document.getElementById("btnCollect");
                btnCollect.onclick = () => processCollect();
            })
        </script>
    </head>
    <body>
        <div class="container">
            <h1>PreAuth &amp; Collect</h1>
            <div id="sectionOrder">
                <h2>Order</h2>
                <form id="orderForm">
                    <div class="form-group">
                        <label for="inputAmount">Amount (£)</label>
                        <input type="text" class="form-control" id="inputAmount" value="100">
                    </div>
                    <div class="form-group">
                        <label for="inputTransactionType">Transaction type</label>
                        <input class="form-control" type="text" id="inputTransactionType" value="PREAUTH" readonly>
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
            <div id="sectionCollect" class="hidden">
                <h2>Collect</h2>
                <form id="collectForm">
                    <div class="form-group">
                        <label for="inputCollectTransactionType">Transaction type</label>
                        <input class="form-control" type="text" id="inputCollectTransactionType" value="COLLECTION" readonly>
                    </div>
                    <div class="form-group">
                        <label for="inputCollectCrossReference">Cross Reference</label>
                        <input class="form-control" type="text" id="inputCollectCrossReference" value="" readonly>
                    </div>
                    <button id="btnCollect" type="submit" class="btn-primary btn pull-right">Collect</button>
                </form>
            </div>
            <div id="sectionCollectResult" class="hidden">
                <h3>Result</h3>
                <div id="sectionCollectResultLoading">
                    <p>Loading...</p>
                </div>
                <div id="sectionCollectResultTable" class="hidden">
                    <table id="collectResultTable">
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
