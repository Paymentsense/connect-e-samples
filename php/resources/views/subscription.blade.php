@extends('layout')

@section('title', 'Subscription')

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
@endsection

@section('body')
    <h1>Subscription</h1>
    @include('shared.error')
    @include('shared.order', ['transactionType' => 'SALE'])
    @include('shared.card_help')
    @include('shared.pay')
    @include('shared.pay_result')
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
@endsection
