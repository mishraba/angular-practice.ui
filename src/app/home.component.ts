import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="home-page">
      <section>
        <h1>Welcome to Angular Practice</h1>
        <p>This is the home page of your application.</p>
      </section>

      <section class="notice success">
        <h2>Success</h2>
        <p>User loaded successfully.</p>
        <pre>{{ response.name }}</pre>
      </section>

      <section *ngIf="error" class="notice error">
        <h2>Error</h2>
        <p>{{ error }}</p>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100dvh;
        box-sizing: border-box;
        padding: 2rem;
        background: #f9fafb;
        color: #111827;
      }

      .home-page {
        max-width: 860px;
        margin: 0 auto;
      }

      h1 {
        font-size: clamp(2rem, 4vw, 3rem);
        margin: 0 0 1rem;
      }

      p {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.75;
        color: #4b5563;
      }

      .notice {
        margin-top: 2rem;
        padding: 1.25rem;
        border-radius: 0.75rem;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      }

      .notice h2 {
        margin: 0 0 0.75rem;
        font-size: 1.35rem;
      }

      .notice.success {
        background: #ecfdf5;
        border: 1px solid #34d399;
        color: #065f46;
      }

      .notice.error {
        background: #fef2f2;
        border: 1px solid #fca5a5;
        color: #b91c1c;
      }
    `
  ]
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
