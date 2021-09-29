function displayErrors(errors) {
  const errorsDiv = document.getElementById('errors');
  errorsDiv.innerHTML = '';
  if (errors && errors.length) {
    const list = document.createElement('ul');
    errors.forEach(function (error) {
      const item = document.createElement('li');
      item.innerText = error.message;
      list.appendChild(item);
    });
    errorsDiv.appendChild(list);
  }
}

const styles = {
  base: {
    default: {
      color: 'black',
      textDecoration: 'none',
      fontFamily: "'Do Hyeon', sans-serif",
      boxSizing: 'border-box',
      padding: '.375rem .75rem',
      boxShadow: 'none',
      fontSize: '1rem',
      borderRadius: '.25rem',
      lineHeight: '1.5',
      backgroundColor: '#fff',
    },
    focus: {
      color: '#495057',
      borderColor: '#80bdff',
    },
    error: {
      color: '#B00',
      borderColor: '#B00',
    },
    valid: {
      color: 'green',
      borderColor: 'green',
    },
    label: {
      display: 'none',
    },
  },
  cv2: {
    container: {
      width: '25%',
      float: 'left',
      boxSizing: 'border-box',
    },
    default: {
      borderRadius: '0 .25rem .25rem 0',
    },
  },
  expiryDate: {
    container: {
      width: '25%',
      float: 'left',
      borderRadius: '0rem',
    },
    default: {
      borderRadius: '0',
      borderRight: 'none',
    },
  },

  cardNumber: {
    container: {
      width: '50%',
      float: 'left',
    },
    default: {
      borderRadius: '.25rem 0 0 .25rem',
      borderRight: 'none',
    },
  },
};

const form = document.getElementById('txn-type-select-form');

const buildRefundButton = (xref, atData) => {
  // after sale, process as REFUND
  atData.transactionType = "REFUND";
  atData.crossReference = xref;

  let refundButton = document.createElement("button");
  refundButton.innerHTML = "Refund";
  refundButton.onclick = function() {
    refundButton.disabled = true;
    console.log("clicked refund button");

    // create a new access token with the updated transaction type
    fetch('/api/access-tokens',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(atData),
    }).then((accessTokensResponse) => {
      return accessTokensResponse.json();
    })
    .then((accessTokensResponse) => {
      let xrefUrl = `/api/cross-reference-payments/${accessTokensResponse.id}`;
      fetch(xrefUrl, {
        method: 'POST',
        body: JSON.stringify({ crossReference: xref })
      })
      .then((xrefResponse) => {
        return xrefResponse.json();
      })
      .then((xrefResponse) => {
        // update refund div with response status
        document.getElementById("refund").innerHTML = JSON.stringify(xrefResponse);
        return xrefResponse;
      })
      .catch((error) => {
        console.error(`${xrefUrl} - error`, JSON.stringify(error));
        throw error;
      });
    });
  }
  refundButton.classList.add("btn-primary"); // btn pull-right
  refundButton.classList.add("btn");
  refundButton.classList.add("pull-right");
  document.getElementById("refund").appendChild(refundButton);
}

const buildCollectionButton = (xref, atData) => {
  // after preauth, process as COLLECTION
  atData.transactionType = "COLLECTION";
  atData.crossReference = xref;

  let collectionButton = document.createElement("button");
  collectionButton.innerHTML = "Collection";
  collectionButton.onclick = function() {
    collectionButton.disabled = true;
    console.log("clicked collection button");
    
    // create a new access token with the updated transaction type
    fetch('/api/access-tokens',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(atData),
    }).then((accessTokensResponse) => {
      return accessTokensResponse.json();
    })
    .then((accessTokensResponse) => {
      let xrefUrl = `/api/cross-reference-payments/${accessTokensResponse.id}`;
      fetch(xrefUrl, {
        method: 'POST',
        body: JSON.stringify({ crossReference: xref })
      })
      .then((xrefResponse) => {
        return xrefResponse.json();
      })
      .then((xrefResponse) => {
        // update preauth div with response status
        document.getElementById("preauth").innerHTML = JSON.stringify(xrefResponse);
        return xrefResponse;
      })
      .catch((error) => {
        console.error(`${xrefUrl} - error`, JSON.stringify(error));
        throw error;
      });
    });
  }
  collectionButton.classList.add("btn-primary"); // btn pull-right
  collectionButton.classList.add("btn");
  collectionButton.classList.add("pull-right");
  document.getElementById("preauth").appendChild(collectionButton);
}

form.addEventListener('submit', (event) => {
  // disable the submit button
  $('#form-submit').prop('disabled', true);
  event.preventDefault();

  let txnType = document.getElementById("txntype").value;

  const requestData = {
    currencyCode: '826',
    amount: '100',
    transactionType: txnType,
    orderId: 'ORD0001',
    orderDescription: 'Order description'
  };

  fetch('/api/access-tokens',  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.status >= 400) {
      throw data;
    }
    const debugAccessTokenDiv = document.getElementById('debug-access-token');
    debugAccessTokenDiv.innerHTML = JSON.stringify(data);
    const paymentDetails = 
    {
      amount: '100',
      currencyCode: '826',
      paymentToken: data.id
    };

    const config = {
      paymentDetails: paymentDetails,
      containerId: 'demo-payment',
      fontCss: ['https://fonts.googleapis.com/css?family=Do+Hyeon'],
      styles: styles,
    };

    const connectE = new Connect.ConnectE(config, displayErrors);

    $('#testPay').show();
    $('#testPay').on('click', () => {
      $('#testPay').prop('disabled', true);
      connectE
        .executePayment()
        .then((data) => {
          $('#demo-payment').hide();
          $('#testPay').hide();
          $('#demo-result').show();
          $('#status-code').text(data.statusCode);
          $('#auth-code').text(data.authCode);
          const debugExecutePaymentDiv = document.getElementById(
            'debug-execute-payment',
          );
          debugExecutePaymentDiv.innerHTML = JSON.stringify(data);

          console.info(
            'INFO: connectE.executePayment - data',
            JSON.stringify(data),
          );

          const id = paymentDetails.paymentToken;
          const url = `/api/payments/${id}`;
          fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              console.info(`${url} - data`, JSON.stringify(response));
              const debugConfirmPaymentDiv = document.getElementById(
                'debug-confirm-payment',
              );
              debugConfirmPaymentDiv.innerHTML = JSON.stringify(response);

              if (txnType == "PREAUTH") {
                document.getElementById("xref").style.display = "block";
                buildCollectionButton(response.crossReference, requestData);
              }
              if (txnType == "SALE") {
                // hit the access tokens endpoint with refund type,
                // then hit the cross reference endpoint with that token to execute
                document.getElementById("xref").style.display = "block";
                buildRefundButton(response.crossReference, requestData);
              }

              return response;
            })
            .catch((error) => {
              console.error(`${url} - error`, JSON.stringify(error));
              throw error;
            });
        })
        .catch((data) => {
          const errors = JSON.stringify(data);
          console.log('Payment Request failed:', errors);
          $('#errors').text(errors);
        })
    });
  })
  .catch((error) => {
    displayErrors([error]);
  });

});
