use crate::payment_token::PaymentTokenRequest;
use crate::payment_token::PaymentTokenResponse;
use crate::payment_info::PaymentInfo;
use awc::{self, error::JsonPayloadError};

pub async fn create_access_token(req: PaymentTokenRequest) -> Result<PaymentTokenResponse, JsonPayloadError> {
    let auth_key = get_auth_key();
    let api_url = get_api_url();

    let response = awc::Client::new()
     .post(format!("{}{}", api_url, "/access-tokens"))
     .bearer_auth(auth_key)
     .send_json(&req)
     .await;

    return response.unwrap().json::<PaymentTokenResponse>().await;
}

pub async fn get_payment_info_by_access_token(access_token: String) -> Result<PaymentInfo, JsonPayloadError> {
    let auth_key = get_auth_key();
    let api_url = get_api_url();

    let response = awc::Client::new()
     .get(format!("{}{}{}", api_url, "/payments/", url_escape::encode_fragment(&access_token)))
     .bearer_auth(auth_key)
     .content_type(mime::APPLICATION_JSON.to_string())
     .send()
     .await;

    return response.unwrap().json::<PaymentInfo>().await;
}

fn get_auth_key() -> String {
    return match std::env::var_os("AUTH_KEY") {
        Some(val) => val.into_string().unwrap(),
        None => panic!("AUTH_KEY is not defined in the environment")
    };
}

fn get_api_url() -> String {
    return match std::env::var_os("API_URL") {
        Some(val) => val.into_string().unwrap(),
        None => panic!("API_URL is not defined in the environment")
    };
}