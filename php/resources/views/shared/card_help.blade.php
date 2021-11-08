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
                            @if (env('CONNECT_E_GATEWAY') === 'payvector')
                                aria-expanded="true"
                            @else
                                aria-expanded="false"
                            @endif
                            aria-controls="collapseOne">
                        PayVector
                    </button>
                </h2>
            </div>
            @if (env('CONNECT_E_GATEWAY') === 'payvector')
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            @else
                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            @endif
                <div class="card-body">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Card Type</th>
                                <th scope="col">Card Holder</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">CV2</th>
                                <th scope="col">3DS</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>AMEX</td>
                                <td>Jake Keaton</td>
                                <td>340000432128428</td>
                                <td>12/24</td>
                                <td>3469</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>AMEX</td>
                                <td>Mark Dalton</td>
                                <td>340000061790712</td>
                                <td>12/24</td>
                                <td>5464</td>
                                <td>Yes (Press button)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Mastercard</td>
                                <td>Luke Johns</td>
                                <td>5100000000005460</td>
                                <td>12/24</td>
                                <td>524</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Mastercard</td>
                                <td>Jon Robb</td>
                                <td>5100000000001907</td>
                                <td>12/24</td>
                                <td>654</td>
                                <td>Yes (Press button)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>John Watson</td>
                                <td>4976000000003436</td>
                                <td>12/24</td>
                                <td>452</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Geoff Wayne</td>
                                <td>4976350000006891</td>
                                <td>12/24</td>
                                <td>342</td>
                                <td>Yes (Press button)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Jack Lewis</td>
                                <td>4921810000009076</td>
                                <td>12/24</td>
                                <td>875</td>
                                <td>No</td>
                                <td>Declined (Card declined)</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>George Toole</td>
                                <td>4792840000009202</td>
                                <td>12/24</td>
                                <td>654</td>
                                <td>No</td>
                                <td>Declined (Card referred)</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Kirsty Catlin</td>
                                <td>4282730000002397</td>
                                <td>12/24</td>
                                <td>985</td>
                                <td>Yes (Loading page)</td>
                                <td>Declined (Card declined)</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Julie Bean</td>
                                <td>4104710000005315</td>
                                <td>12/24</td>
                                <td>487</td>
                                <td>Yes (Loading page)</td>
                                <td>Declined (Card referred)</td>
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
                            @if (env('CONNECT_E_GATEWAY') === 'cybersource')
                                aria-expanded="true"
                            @else
                                aria-expanded="false"
                            @endif
                            aria-controls="collapseTwo">
                        CyberSource
                    </button>
                </h2>
            </div>
            @if (env('CONNECT_E_GATEWAY') === 'cybersource')
                <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
            @else
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
            @endif
                <div class="card-body">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Card Type</th>
                                <th scope="col">Card Holder</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">CV2</th>
                                <th scope="col">3DS</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>AMEX</td>
                                <td>John Watson</td>
                                <td>371449111020228</td>
                                <td>12/24</td>
                                <td>0200</td>
                                <td>Yes (1234)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Maestro</td>
                                <td>John Watson</td>
                                <td>6759410000006404</td>
                                <td>12/24</td>
                                <td>020</td>
                                <td>Yes (1234)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Mastercard</td>
                                <td>John Watson</td>
                                <td>5200000000000056</td>
                                <td>12/24</td>
                                <td>341</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Mastercard</td>
                                <td>John Watson</td>
                                <td>5200000000000007</td>
                                <td>12/24</td>
                                <td>020</td>
                                <td>Yes (1234)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>John Watson</td>
                                <td>4456530000001096</td>
                                <td>12/24</td>
                                <td>020</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Geoff Wayne</td>
                                <td>4456530000000007</td>
                                <td>12/24</td>
                                <td>020</td>
                                <td>Yes (1234)</td>
                                <td>Success</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapseThree"
                            @if (env('CONNECT_E_GATEWAY') === 'smartvista')
                                aria-expanded="true"
                            @else
                                aria-expanded="false"
                            @endif
                            aria-controls="collapseThree">
                        SmartVista (Dojo)
                    </button>
                </h2>
            </div>
            @if (env('CONNECT_E_GATEWAY') === 'smartvista')
                <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
            @else
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
            @endif
                <div class="card-body">
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Card Type</th>
                                <th scope="col">Card Holder</th>
                                <th scope="col">Card Number</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">CV2</th>
                                <th scope="col">3DS</th>
                                <th scope="col">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Discover</td>
                                <td>John Watson</td>
                                <td>6011000000001002</td>
                                <td>12/24</td>
                                <td>123</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>Mastercard</td>
                                <td>John Watson</td>
                                <td>5555555555555599</td>
                                <td>12/24</td>
                                <td>123</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>John Watson</td>
                                <td>4111111111111111</td>
                                <td>12/24</td>
                                <td>123</td>
                                <td>No</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>Julie Bean</td>
                                <td>4111111111111111</td>
                                <td>12/24</td>
                                <td>123</td>
                                <td>Yes (12345678)</td>
                                <td>Success</td>
                            </tr>
                            <tr>
                                <td>VISA</td>
                                <td>John Watson</td>
                                <td>4000000000000002</td>
                                <td>12/24</td>
                                <td>123</td>
                                <td>No</td>
                                <td>Declined</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>