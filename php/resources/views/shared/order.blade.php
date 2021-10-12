<div id="sectionOrder">
    <h2>Order</h2>
    <form id="orderForm">
        <div class="form-group">
            <label for="inputTransactionType">Transaction type</label>
            <input class="form-control" type="text" id="inputTransactionType" value="{{ $transactionType }}" readonly>
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
        <button id="btnOrder" type="submit" class="btn-primary btn pull-right">Submit</button>
    </form>
</div>