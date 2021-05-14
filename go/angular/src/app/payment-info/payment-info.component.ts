import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {

  @Input() paymentInfo: PaymentInfo

  constructor() { }

  ngOnInit() {
  }

}

export class PaymentInfo{
  authCode: string
  acsUrl: string
  paReq: string
  md: string
  statusCode: string
  message: string
}