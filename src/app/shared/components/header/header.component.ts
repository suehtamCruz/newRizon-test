import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true
})
export class HeaderComponent {
    router = inject(Router);


    navigateToNewContact() {
        this.router.navigate(['/new-contact'])
    }

    navigateToAllContacts() {
        this.router.navigate(['/contacts'])
    }
}