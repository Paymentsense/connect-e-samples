export const PaymentConfig = {
    onIframeLoaded: undefined,
    paymentDetails: {
        amount: "100",
        currencyCode: "826",
        paymentToken: ""
    },
    containerId: "payment",
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
                backgroundColor: '#fff'
            },
            focus: {
                color: '#495057',
                backgroundColor: '#fff',
                borderColor: '#80bdff',
                outline: '0',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
            },
            error: {
                color: "#B00",
                borderColor: "#B00"
            },
            valid: {
                color: "green"
            },
            container: {
                marginBottom: '1rem'
            },
            label: {
                fontFamily: "'Do Hyeon', sans-serif",
                marginBottom: '.5rem',
                display: 'inline-block'
            }
        },
        cv2: {
            container: {
                width: "50%",
                float: "left",
                paddingLeft: "5px",
                boxSizing: "border-box"
            },
        },
        expiryDate: {
            container: {
                width: "50%",
                float: "left",
                paddingRight: "5px",
                boxSizing: "border-box"
            },

        },

    },
    text: {
        cv2: {
            label: "CVV",
            placeholder: "CVV"
        },
        cardNumber: {
            label: "Card",
            placeholder: "Card"
        },
        expiryDate: {
            label: "Expiry",
            placeholder: "Expiry"
        }
    }
};