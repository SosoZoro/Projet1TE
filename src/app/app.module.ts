import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerbComponent } from './verb/verb.component';

// Import Angular Material components
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; // Add this import for mat-select
import { MatOptionModule } from '@angular/material/core'; // Add this import for mat-option
import { MatTabsModule } from '@angular/material/tabs'; // Add this import if using tabs

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    VerbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule, // Ensure HttpClientModule is imported
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule, // Ensure MatFormFieldModule is imported
    MatSelectModule, // Import for mat-select
    MatOptionModule, // Import for mat-option
    MatTabsModule // Import for mat-tabs if using tabs
  ],
  providers: [
    provideHttpClient(withFetch()) // Add withFetch() to configure HttpClient with fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
