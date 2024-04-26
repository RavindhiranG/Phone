import { Injectable, ErrorHandler } from '@angular/core';
import { BrandException } from './brand-exception';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    if (error instanceof BrandException) {
      console.error('Brand Exception occurred:', error);
      // Handle the BrandException here, you can display a message to the user or perform any other action
    } else {
      // Log other errors
      console.error('An error occurred:', error);
      // You can display a generic error message or perform other actions
    }
  }
}
