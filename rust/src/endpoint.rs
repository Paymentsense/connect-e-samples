#[path="service.rs"] mod service;
use actix_web::{HttpResponse, web, post, get};
use crate::payment_token::PaymentTokenRequest;

#[post("/access-tokens")]
pub async fn create_access_token(req: web::Json<PaymentTokenRequest>) -> HttpResponse {
    let pt_req = req.into_inner();
    let result = service::create_access_token(pt_req).await;
    
    match result {
        Ok(result)=> {HttpResponse::Created().json(result)},
        Err(e)=> {HttpResponse::InternalServerError().body(format!("Failed to create an access token: {}", e))}
    }
}

#[get("/payments/{access_token}")]
pub async fn get_payment_info_by_access_token(access_token: web::Path<String>) -> HttpResponse {
    let access_token_req = access_token.into_inner();
    let result = service::get_payment_info_by_access_token(access_token_req).await;
    
    match result {
        Ok(result)=> {HttpResponse::Ok().json(result)},
        Err(e)=> {HttpResponse::InternalServerError().body(format!("Failed to get payment info: {}", e))}
    }
}