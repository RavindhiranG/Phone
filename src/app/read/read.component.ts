import { Component } from '@angular/core';
import { Phone } from '../phone';
import { PhoneServiceService } from '../phone-service.service';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.css']
})
export class ReadComponent {
    phones: any[] = [];
    filteredPhones: any[] = [];
    filterOption: string = 'full'; // Default to show full brand names
    selectedPhone: Phone = {
        id: 0,
        brand: '',
        price: 0,
        color: '',
        rating: 0
      };
      
    updateSuccessMessage: string = ''; // Property to hold the update success message


    constructor(private phoneservice: PhoneServiceService) { }

    ngOnInit(): void {
        this.phoneservice.getPhones().subscribe(
            phones => {
                this.phones = phones;
                this.filteredPhones = [...phones]; // Initially, set filtered phones to all phones
                console.log('Products loaded successfully:', phones);
            }
        );
    }

    getMiddleLetters(brand: string): string {
        const length = brand.length;
        const middleIndex = Math.floor(length / 2);
        return brand.charAt(middleIndex);
    }

    applyFilters(): void {
        switch (this.filterOption) {
            case 'full':
                this.filteredPhones = [...this.phones];
                break;
            case 'middleLetters':
                this.filteredPhones = this.phones.map(phone => ({
                    ...phone,
                    brand: this.getMiddleLetters(phone.brand)
                }));
                break;
            case 'black':
                this.filteredPhones = this.phones.filter(phone => phone.color.toLowerCase() === 'black');
                break;
            case 'lastTwo':
                this.filteredPhones = this.phones.slice(-2);
                break;
            case 'primeIDs':
                this.filteredPhones = this.phones.filter(phone => this.isPrime(phone.id));
                break;
            case 'nonDuplicatedRatings':
                this.filteredPhones = this.getNonDuplicatedRatings();
                break;
            case 'ascendingPrice':
                this.filteredPhones = this.phones.slice().sort((a, b) => a.price - b.price);
                break;
            case 'descendingPrice':
                this.filteredPhones = this.phones.slice().sort((a, b) => b.price - a.price);
                break;
            case 'greyEndingG':
                this.filteredPhones = this.phones.map(phone => ({
                    ...phone,
                    color: phone.brand.toLowerCase().endsWith('g') ? 'grey' : phone.color
                }));
                break;
            default:
                this.filteredPhones = [...this.phones];
                break;
        }
    }

    isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
            i += 6;
        }
        return true;
    }

    getNonDuplicatedRatings(): any[] {
        const ratingsMap = new Map<number, number>();
        this.phones.forEach(phone => {
            const rating = phone.rating;
            ratingsMap.set(rating, (ratingsMap.get(rating) ?? 0) + 1);
        });
        return this.phones.filter(phone => ratingsMap.get(phone.rating) === 1);
    }

    deletePhone(phoneId: number): void {
        this.phoneservice.deletePhone(phoneId).subscribe(
            () => {
                // Remove the deleted phone from the list
                this.phones = this.phones.filter(phone => phone.id !== phoneId);
                this.applyFilters(); // Reapply filters if necessary
                console.log('Phone deleted successfully:', phoneId);
            },
            error => {
                console.error('Error deleting phone:', error);
            }
        );
    }
    showUpdateForm(phone: Phone): void {
        this.selectedPhone = { ...phone }; // Set the selected phone details
    }
}
