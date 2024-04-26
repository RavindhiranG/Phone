import { Component, Input, OnInit } from '@angular/core';
import { Phone } from '../phone';
import { PhoneServiceService } from '../phone-service.service';


@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.css']
})

export class UpdatePhoneComponent implements OnInit {
  @Input() phone: Phone | null = null; // Initialize with null
// Input property to receive phone details from parent component
updatedPhone: Phone = {
  id: 0,
  brand: '',
  price: 0,
  color: '',
  rating: 0
};

updateSuccessMessage: string = 'done'; // Property to hold the update success message



  constructor(private phoneService: PhoneServiceService) { }

  ngOnInit(): void {
    // Initialize updatedPhone with the received phone details
    this.updatedPhone = { ...this.phone } as Phone;
}


updatePhone(): void {
  this.phoneService.updatePhone(this.updatedPhone.id, this.updatedPhone).subscribe(
    response => {
      if (response !== null) {
        console.log('Phone updated successfully:', response);
        this.updateSuccessMessage = 'Updated successfully'; // Set the success message
      } else {
        console.error('Error updating phone: Invalid response');
        this.updateSuccessMessage = ''; // Clear the success message
        // Handle invalid response, such as displaying an error message to the user
      }
    },
    error => {
      console.error('Error updating phone:', error);
      this.updateSuccessMessage = ''; // Clear the success message
      // You can handle error response here, like displaying an error message to the user
    }
  );
}



}