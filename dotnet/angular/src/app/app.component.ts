import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentConfig } from './payment.config';
import { environment } from '../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Connect: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Connect-E Angular Demo Payment';
  connectE: any;
  paymentResult: any;
  isPaymentExecuting = false;
  validationErrors = [];
  isLoading = true;
  accessToken = "";
  tokenType = "SALE";
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const typeValue = urlParams.get('type')
    if(typeValue)
    {
      this.tokenType = typeValue;
    }
    this.http.get(environment.tokenUrl + "/" + this.tokenType).
    subscribe(data => {
        this.loadPaymentDetails(data["id"]);
      });

  }

  payBtnClick = () =>{
    this.isPaymentExecuting = true;
    this.connectE.executePayment()
      .then(data => {
        this.paymentResult = data
      })
      .catch(data => {
        if(data.constructor !== Array){
          this.paymentResult = data
        }
        
        this.isPaymentExecuting = false;
      })
  }

  collectBtnClick = () =>{
    this.http.get("http://localhost:7190/api/CardPayments/collection/" + PaymentConfig.paymentDetails.paymentToken).
      subscribe(data => {
        this.paymentResult = data
      });
  }

  loadPaymentDetails(accessToken: string){
    PaymentConfig.paymentDetails.paymentToken = accessToken;
    PaymentConfig.onIframeLoaded = () => {this.isLoading = false;}
    this.connectE = new Connect.ConnectE(PaymentConfig, (errors) => {this.validationErrors = errors}, this.payBtnClick);
  }

}
