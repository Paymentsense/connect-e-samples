@extends('layout')

@section('title', 'Sale')

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
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnOrder = document.getElementById("btnOrder");
            btnOrder.onclick = () => processOrder();

            const btnStartPayment = document.getElementById("btnStartPayment");
            btnStartPayment.onclick = () => processStartPayment();

            const btnPay = document.getElementById("btnPay");
            btnPay.onclick = () => processPayment();

            function onFormCompleteCallback() {
                document.getElementById("btnPay").focus();
            }

            payConfig.callbacks = {
                onFormComplete: onFormCompleteCallback,
            }
        })
    </script>
@endsection

@section('body')
    <h1>Sale</h1>
    @include('shared.error')
    @include('shared.order', ['transactionType' => 'SALE'])
    @include('shared.order_payment_token')
    @include('shared.card_help')
    @include('shared.pay')
    @include('shared.pay_result')
@endsection
