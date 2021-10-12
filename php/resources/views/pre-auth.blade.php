@extends('layout')

@section('title', 'PreAuth & Collect')

@section('stylesheets')
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ url("css/styles.css") }}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="{{ env('CONNECT_E_BASE_WEB_URL') }}/assets/js/client.js"></script>
    <script src="{{ url("js/pay_config.js") }}"></script>
    <script src="{{ url("js/shared.js") }}"></script>
    <script src="{{ url("js/sale.js") }}"></script>
    <script src="{{ url("js/pre_auth.js") }}"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnOrder = document.getElementById("btnOrder");
            btnOrder.onclick = () => processOrder();

            const btnStartPayment = document.getElementById("btnStartPayment");
            btnStartPayment.onclick = () => processStartPayment();

            let confirmPaymentCallback = function(response) {
                if (typeof response.statusCode === 'undefined' || response.statusCode !== 0) {
                    console.error("invalid response", response);
                    showErrorMessage("An api error occurred, please check console.log for details");
                    return;
                }
                document.getElementById("inputCollectCrossReference").value = response.crossReference;
                document.getElementById("sectionCollect").classList.remove("hidden");
            }

            const btnPay = document.getElementById("btnPay");
            btnPay.onclick = () => processPayment(confirmPaymentCallback);

            const btnStartCollect = document.getElementById("btnStartCollect");
            btnStartCollect.onclick = () => processStartCollect();

            const btnCollect = document.getElementById("btnCollect");
            btnCollect.onclick = () => processCollect();
        })
    </script>
@endsection

@section('body')
    <h1>PreAuth &#38; Collect</h1>
    @include('shared.error')
    @include('shared.order', ['transactionType' => 'PREAUTH'])
    @include('shared.order_payment_token')
    @include('shared.card_help')
    @include('shared.pay')
    @include('shared.pay_result')
    <div id="sectionCollect" class="hidden">
        <h2>Collect</h2>
        <form id="collectForm">
            <div class="form-group">
                <label for="inputCollectTransactionType">Transaction type</label>
                <input class="form-control" type="text" id="inputCollectTransactionType" value="COLLECTION" readonly>
            </div>
            <div class="form-group">
                <label for="inputCollectAmount">Amount (£)</label>
                <input type="text" class="form-control" id="inputCollectAmount" value="100">
            </div>
            <div class="form-group">
                <label for="inputCollectOrderId">Order Id</label>
                <input type="text" class="form-control" id="inputCollectOrderId" value="ORD00001">
            </div>
            <div class="form-group">
                <label for="inputCollectOrderDescription">Order description</label>
                <textarea class="form-control" id="inputCollectOrderDescription" rows="3">Example description.</textarea>
            </div>
            <div class="form-group">
                <label for="inputCollectCrossReference">Cross Reference</label>
                <input class="form-control" type="text" id="inputCollectCrossReference" value="">
            </div>
            <button id="btnStartCollect" type="submit" class="btn-primary btn pull-right">Submit</button>
        </form>
    </div>
    <div id="sectionCollectPaymentToken" class="hidden">
        <h2>Collect: Payment Token</h2>
        <form id="collectPaymentTokenForm">
            <div class="form-group">
                <label for="inputCollectPaymentToken">Payment Token</label>
                <input type="text" class="form-control" id="inputCollectPaymentToken" value="">
            </div>
            <button id="btnCollect" type="submit" class="btn-primary btn pull-right">Submit</button>
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
@endsection
