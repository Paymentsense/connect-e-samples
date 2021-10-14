@extends('layout')

@section('title', 'Wallet')

@section('stylesheets')
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="{{ url("css/styles.css") }}">
@endsection

@section('scripts')
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="{{ env('CONNECT_E_BASE_WEB_URL') }}/assets/js/client.js"></script>
    <script src="{{ url("js/pay_config_wallet.js") }}"></script>
    <script src="{{ url("js/shared.js") }}"></script>
    <script src="{{ url("js/wallet.js") }}"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnOrder = document.getElementById("btnOrder");
            btnOrder.onclick = () => processOrder();

            const btnStartPayment = document.getElementById("btnStartPayment");
            btnStartPayment.onclick = () => processStartPayment();
        })
    </script>
@endsection

@section('body')
    <h1>Wallet</h1>
    @include('shared.error')
    @include('shared.order', ['transactionType' => 'SALE'])
    @include('shared.order_payment_token')
    <div id="sectionPay" class="hidden">
        <h3>Pay</h3>
        <p>Note: ApplePay does not work because it requires HTTPS and to be facing the internet on a validated domain; for callbacks from Apple.</p>
        <div id="demo-payment-wallet"></div>
        <div id="errors"></div>
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
    @include('shared.pay_result')
@endsection
