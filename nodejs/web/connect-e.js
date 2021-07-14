function displayErrors(errors) {
  var errorsDiv = document.getElementById('errors');
  errorsDiv.innerHTML = '';
  if (errors && errors.length) {
    var list = document.createElement('ul');
    errors.forEach(function (error) {
      var item = document.createElement('li');
      item.innerText = error.message;
      list.appendChild(item);
    });
    errorsDiv.appendChild(list);
  }
}

fetch('/payment-config')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (data.status >= 400) {
      throw data;
    }

    console.log("/payment-config: data", data);

    // {
    //   amount: "100",
    //   currencyCode: "826",
    //   paymentToken: 'paymentToken'
    // }
    const paymentDetails = data;
    const config = {
      paymentDetails,
      containerId: "demo-payment",
      fontCss: ['https://fonts.googleapis.com/css?family=Do+Hyeon'],
      styles: {
        base: {
          default: {
            color: "black",
            textDecoration: "none",
            fontFamily: "'Do Hyeon', sans-serif",
            boxSizing: "border-box",
            padding: ".375rem .75rem",
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
            color: "#B00",
            borderColor: "#B00"
          },
          valid: {
            color: "green",
            borderColor: 'green'
          },
          label: {
            display: 'none'
          }
        },
        cv2: {
          container: {
            width: "25%",
            float: "left",
            boxSizing: "border-box"
          },
          default: {
            borderRadius: "0 .25rem .25rem 0"
          }
        },
        expiryDate: {
          container: {
            width: "25%",
            float: "left",
            borderRadius: '0rem',
          },
          default: {
            borderRadius: "0",
            borderRight: "none"
          },
        },

        cardNumber: {
          container: {
            width: "50%",
            float: "left",
          },
          default: {
            borderRadius: ".25rem 0 0 .25rem",
            borderRight: "none"
          },
        }
      }
    };

    const connectE = new Connect.ConnectE(config, displayErrors);
    const btn = document.getElementById("testPay");

    $('#testPay').on('click', () => {
      var btn = $(this);
      btn.button('loading');
      // btn.text('loading');
      connectE
        .executePayment()
        .then((data) => {
          $("#demo-payment").hide();
          $("#testPay").hide();
          $("#demo-result").show();
          $("#status-code").text(data.statusCode);
          $("#auth-code").text(data.authCode);
        })
        .catch((data) => {
          const errors = JSON.stringify(data);
          console.log('Payment Request failed:', errors);
          $('#errors').text(errors);
        })
        .finally(() => {
          btn.button('reset');
          // btn.text('reset');
        });
    });

    return data;
  })
  .catch((error) => {
    console.log('/payment-config: error', JSON.stringify(error));
    displayErrors([error]);
  });
