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
    <script src="{{ url("js/shared.js") }}"></script>
    <script src="{{ url("js/subscription.js") }}"></script>
    <script type="text/javascript">
        window.addEventListener('load', function () {
            const btnStartSubscription = document.getElementById("btnStartSubscription");
            btnStartSubscription.onclick = () => processStartSubscription();

            const btnSubscription = document.getElementById("btnSubscription");
            btnSubscription.onclick = () => processSubscription();
        })
    </script>
@endsection

@section('body')
    <h1>Subscription</h1>
    @include('shared.error')
    <div id="sectionSubscription">
        <h2>Order</h2>
        <form id="subscriptionForm">
            <div class="form-group">
                <label for="inputTransactionType">Transaction type</label>
                <input class="form-control" type="text" id="inputTransactionType" value="SALE" readonly>
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
            <button id="btnStartSubscription" type="submit" class="btn-primary btn pull-right">Submit</button>
        </form>
    </div>
    <div id="sectionSubscriptionPaymentToken" class="hidden">
        <h2>Subscription: Payment Token</h2>
        <form id="subscriptionPaymentTokenForm">
            <div class="form-group">
                <label for="inputPaymentToken">Payment Token</label>
                <input type="text" class="form-control" id="inputPaymentToken" value="">
            </div>
            <button id="btnSubscription" type="submit" class="btn-primary btn pull-right">Submit</button>
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
