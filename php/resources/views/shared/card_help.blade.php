<div id="sectionCardHelp" class="hidden">
    <h2>Pay: Test Cards</h2>
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            @if (env('CONNECT_E_ENV') === 'build')
                                aria-expanded="true"
                            @else
                                aria-expanded="false"
                            @endif
                            aria-controls="collapseOne">
                        Build
                    </button>
                </h2>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Card Holder</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">CV2</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>John Watson</th>
                                <td>4976000000003436</td>
                                <td>12/24</td>
                                <td>452</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <th>Lee Chase</th>
                                <td>340000150358074</td>
                                <td>12/24</td>
                                <td>7654</td>
                                <td>Declined</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseTwo"
                            @if (env('CONNECT_E_ENV') === 'test')
                                aria-expanded="true"
                            @else
                                aria-expanded="false"
                            @endif
                            aria-controls="collapseTwo">
                        Test
                    </button>
                </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Card Holder</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">CV2</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Test Cardholder</th>
                                <td>4456530000001096</td>
                                <td>12/24</td>
                                <td>020</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <th>Test Cardholder</th>
                                <td>4456530000001013</td>
                                <td>12/24</td>
                                <td>341</td>
                                <td>Declined</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>