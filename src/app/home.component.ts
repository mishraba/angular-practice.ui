import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    response: any;
    error: string | null = null;
    success = false;

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.userService.getUser().subscribe({
            next: (res) => {
                this.response = res;
                this.success = true;
                this.error = null;
                console.log(this.response);
            },
            error: (err) => {
                this.error = err?.message ?? 'Unable to load user data.';
                this.success = false;
                console.error(err);
            }
        });
    }
}
