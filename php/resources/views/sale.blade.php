<!doctype html>
<html lang="en">
    <head>
        <title>Connect-e PHP sample project - Sale</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="{{ url("css/styles.css") }}">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
        <script src="https://web.e.test.connect.paymentsense.cloud/assets/js/client.js"></script>
        <script src="{{ url("js/pay_config.js") }}"></script>
        <script src="{{ url("js/sale.js") }}"></script>
        <script type="text/javascript">
            window.addEventListener('load', function () {
                const btnOrder = document.getElementById("btnOrder");
                btnOrder.onclick = () => processOrder();

                const btnPay = document.getElementById("btnPay");
                btnPay.onclick = () => processPayment();
            })
        </script>
    </head>
    <body>
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">Home</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/sale">Sale</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/refund">Refund</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/subscription">Subscription</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pre-auth">PreAuth</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <h1>Sale</h1>
            <div id="sectionError">
                <div id="errorMsg" class="alert alert-danger hidden" role="alert"></div>
            </div>
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
        </div>
    </body>
</html>
