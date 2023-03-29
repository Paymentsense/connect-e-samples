mod endpoint;
mod payment_token;
mod payment_info;

use actix_files::Files;
use actix_web::{App, HttpServer, middleware};
use endpoint::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = std::env::var("PORT").unwrap_or("8080".to_string());
    
	HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
			.service(create_access_token)
            .service(get_payment_info_by_access_token)
            .service(Files::new("/", "./static")
                .show_files_listing()
                .index_file("index.html")
                .use_last_modified(true)
            )
    })
    .bind(("0.0.0.0", port.parse::<u16>().unwrap()))?
    .run()
    .await
}
