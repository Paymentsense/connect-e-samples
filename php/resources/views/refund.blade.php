@extends('layout')

@section('title', 'Refund')

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
    <script src="{{ url("js/refund.js") }}"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnOrder = document.getElementById("btnOrder");
            btnOrder.onclick = () => processOrder();

            let confirmPaymentCallback = function(response) {
                document.getElementById("inputRefundCrossReference").value = response.crossReference;
                document.getElementById("sectionRefund").classList.remove("hidden");
            }

            const btnPay = document.getElementById("btnPay");
            btnPay.onclick = () => processPayment(confirmPaymentCallback);

            const btnRefund = document.getElementById("btnRefund");
            btnRefund.onclick = () => processRefund();
        })
    </script>
@endsection

@section('body')
    <h1>Refund</h1>
    @include('shared.error')
    @include('shared.order', ['transactionType' => 'SALE'])
    @include('shared.card_help')
    @include('shared.pay')
    @include('shared.pay_result')
    <div id="sectionRefund" class="hidden">
        <h2>Refund</h2>
        <form id="refundForm">
            <div class="form-group">
                <label for="inputRefundTransactionType">Transaction type</label>
                <input class="form-control" type="text" id="inputRefundTransactionType" value="REFUND" readonly>
            </div>
            <div class="form-group">
                <label for="inputRefundCrossReference">Cross Reference</label>
                <input class="form-control" type="text" id="inputRefundCrossReference" value="" readonly>
            </div>
            <button id="btnRefund" type="submit" class="btn-primary btn pull-right">Refund</button>
        </form>
    </div>
    <div id="sectionRefundResult" class="hidden">
        <h3>Result</h3>
        <div id="sectionRefundResultLoading">
            <p>Loading...</p>
        </div>
        <div id="sectionRefundResultTable" class="hidden">
            <table id="refundResultTable">
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
            </table>
        </div>
    </div>
@endsection
