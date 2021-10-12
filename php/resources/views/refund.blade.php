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
    <script src="{{ url("js/shared.js") }}"></script>
    <script src="{{ url("js/refund.js") }}"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnStartRefund = document.getElementById("btnStartRefund");
            btnStartRefund.onclick = () => processStartRefund();

            const btnRefund = document.getElementById("btnRefund");
            btnRefund.onclick = () => processRefund();
        })
    </script>
@endsection

@section('body')
    <h1>Refund</h1>
    @include('shared.error')
    <div id="sectionRefund">
        <h2>Order</h2>
        <form id="refundForm">
            <div class="form-group">
                <label for="inputTransactionType">Transaction type</label>
                <input class="form-control" type="text" id="inputTransactionType" value="REFUND" readonly>
            </div>
            <div class="form-group">
                <label for="inputAmount">Amount (£)</label>
                <input type="text" class="form-control" id="inputAmount" value="100">
            </div>
            <div class="form-group">
                <label for="inputOrderId">Order Id</label>
                <input type="text" class="form-control" id="inputOrderId" value="ORD00001">
            </div>
            <div class="form-group">
                <label for="inputOrderDescription">Order description</label>
                <textarea class="form-control" id="inputOrderDescription" rows="3">Example description.</textarea>
            </div>
            <div class="form-group">
                <label for="inputCrossReference">Cross Reference</label>
                <input class="form-control" type="text" id="inputCrossReference" value="">
            </div>
            <button id="btnStartRefund" type="submit" class="btn-primary btn pull-right">Submit</button>
        </form>
    </div>
    <div id="sectionRefundPaymentToken" class="hidden">
        <h2>Refund: Payment Token</h2>
        <form id="refundPaymentTokenForm">
            <div class="form-group">
                <label for="inputPaymentToken">Payment Token</label>
                <input type="text" class="form-control" id="inputPaymentToken" value="">
            </div>
            <button id="btnRefund" type="submit" class="btn-primary btn pull-right">Submit</button>
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
