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
  paymentResult: string;
  isPaymentExecuting = false;
  validationErrors = [];
  isLoading = true;
  isRefreshingToken = true;
  accessToken = "";
  currencyCode = "";
  amount = "";
  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  public ngOnInit() {
    this.http.get(environment.tokenUrl + window.location.search).
      subscribe(data => {
        this.loadPaymentDetails(data["id"]);
      });

  }

  refreshToken(){
    this.isRefreshingToken = true;
    this.http.get(environment.tokenUrl + window.location.search).
      subscribe(data => {
    this.updateToken("100", "826", data["id"])
      })
  }


  updateToken(amount, currencyCode, paymentToken){
    this.isRefreshingToken = true;
    this.connectE.updateAccessToken({
      amount: amount,
      currencyCode: currencyCode,
      paymentToken: paymentToken
    })
    this.isPaymentExecuting = false;
    this.paymentResult = "";
    console.log("Payment Token updated")
    this.isRefreshingToken = false;
    this.snackBar.open('Access token updated', "close");
  }

  manuallyUpdateToken(){
    this.updateToken(this.amount + '', this.currencyCode + '', this.accessToken)
    this.amount = ""
    this.currencyCode = ""
    this.accessToken = ""
  }

  payBtnClick = () =>{
    console.log("executing payment")
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

  loadPaymentDetails(accessToken: string){
    PaymentConfig.paymentDetails.paymentToken = accessToken;
    PaymentConfig.onIframeLoaded = () => {this.isLoading = false;}
    this.connectE = new Connect.ConnectE(PaymentConfig, (errors) => {this.validationErrors = errors}, this.payBtnClick);
    this.isRefreshingToken = false;
  }

}
