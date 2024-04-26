import { Component } from '@angular/core';
import { Phone } from '../phone';
import { PhoneServiceService } from '../phone-service.service';
import { BrandException } from '../brand-exception'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  phone: Phone = new Phone();
  showCreateForm: boolean = false;
  postSuccess: boolean = false;
  submitClicked: boolean = false; // Track if submit button is clicked
  specialButtonClicked: boolean = false; // Track if special button is clicked
  noColorPalindromeChecked: boolean = false; // Track if "submit no color palindrome" checkbox is checked
  ratingAbove8Checked: boolean = false; // Track if "submit only rating above 8" checkbox is checked
  brandStartsWithSChecked: boolean = false; // Track if "submit only brand starts with S" checkbox is checked
  errorMessage: string = ''; // Error message to be displayed

  constructor(private phoneService: PhoneServiceService) { }

  onSubmit(): void {
    try {
      // Check if "submit no color palindrome" checkbox is checked and the color is a palindrome
      if (this.noColorPalindromeChecked && this.isColorPalindrome(this.phone.color)) {
        this.errorMessage = 'Color cannot be a palindrome.';
        return; // Prevent form submission
      }
    
      // Check if "submit only rating above 8" checkbox is checked and rating is below 8
      if (this.ratingAbove8Checked && this.phone.rating < 8) {
        this.errorMessage = 'Rating must be greater than or equal to 8.';
        return; // Prevent form submission
      }
    
      // Check if "submit only brand starts with S" checkbox is checked and the brand name starts with 'S'
      if (this.brandStartsWithSChecked && !this.phone.brand.startsWith('S')) {
        throw new BrandException('Brand name must start with S.');
      }
    
      // Call the createPhone method of PhoneServiceService to create a new phone
      this.phoneService.createPhone(this.phone).subscribe(
        response => {
          console.log('Phone created successfully:', response);
          this.postSuccess = true;
          this.submitClicked = false; // Reset submitClicked flag
          // Optionally, reset the form after successful submission
          this.phone = new Phone();
          // Hide the form after successful submission
          this.showCreateForm = false;
          this.errorMessage = ''; // Clear any previous error message
        },
        error => {
          console.error('Error creating phone:', error);
          this.postSuccess = false;
          this.errorMessage = ''; // Clear any previous error message
        }
      );
    } catch (error) {
      if (error instanceof BrandException) {
        this.errorMessage = error.message;
      }
    }
  }
  
  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      // Reset the form when hiding it
      this.phone = new Phone();
      this.submitClicked = false; // Reset submitClicked flag
      this.specialButtonClicked = false; // Reset specialButtonClicked flag
      this.noColorPalindromeChecked = false; // Reset noColorPalindromeChecked flag
      this.ratingAbove8Checked = false; // Reset ratingAbove8Checked flag
      this.brandStartsWithSChecked = false; // Reset brandStartsWithSChecked flag
      this.errorMessage = ''; // Clear any previous error message
    }
  }

  isColorPalindrome(color: string): boolean {
    // Convert color to lowercase and remove non-alphabetic characters
    const cleanedColor = color.toLowerCase().replace(/[^a-z]/g, '');
    // Check if the cleaned color is a palindrome
    return cleanedColor === cleanedColor.split('').reverse().join('');
  }
}
