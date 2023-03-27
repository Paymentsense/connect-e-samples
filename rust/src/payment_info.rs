use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PaymentInfo {
	auth_code         		:Option<String>,
	billing_address         :Option<Address>,
	expiry_date        		:String,
	card_name             	:Option<String>,
	card_number        		:String,
	card_type        		:String,
	cross_reference         :Option<String>,
	message       			:Option<String>,
	payment_method_id       :Option<String>,
	status_code         	:i32,
	transaction_date_time 	:Option<String>,
	user_email_address      :Option<String>,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Address {
	address_1        		:String,
	address_2         		:Option<String>,
	address_3         		:Option<String>,
	address_4         		:Option<String>,
	city         			:Option<String>,
	country_code         	:Option<String>,
	state         			:Option<String>,
	postcode         		:Option<String>,
}
