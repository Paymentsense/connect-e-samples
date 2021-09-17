const payConfig = {
    paymentDetails: {
        amount: "tbc",
        currencyCode: "826",
        paymentToken: "tbc",
    },
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
                width: "50%",
                float: "left",
                boxSizing: "border-box"
            },
            default: {
                borderRadius: "0 .25rem .25rem 0"
            }
        },
        expiryDate: {
            container: {
                width: "50%",
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
                width: "100%",
                float: "left",
            },
            default: {
                borderRadius: ".25rem 0 0 .25rem",
                borderRight: "none"
            },
        }
    }
}
