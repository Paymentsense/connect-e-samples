use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaymentTokenRequest {
	amount                  :String,
	cross_reference         :Option<String>,
	currency_code           :String,
	customer_id             :Option<String>,
	gateway_username        :Option<String>,
	gateway_password        :Option<String>,
	merchant_url            :Option<String>,
	order_id                :String,
	order_description       :Option<String>,
	payment_method_id       :Option<String>,
	previous_transaction_id :Option<String>,
	transaction_type        :String,
	transaction_source      :Option<String>,
	user_email_address      :Option<String>,
	user_phone_number       :Option<String>,
	user_address1           :Option<String>,
	user_address2           :Option<String>,
	user_address3           :Option<String>,
	user_address4           :Option<String>,
	user_city               :Option<String>,
	user_state              :Option<String>,
	user_postcode           :Option<String>,
	user_country_code       :Option<String>,
	webhook_url             :Option<String>,	
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaymentTokenResponse {
	id                      :String,
	expires_at              :u64,
}