import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { PaymentInfoComponent } from './payment-info/payment-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentInfoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
