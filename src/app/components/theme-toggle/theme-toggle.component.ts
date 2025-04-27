import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button class="btn btn-sm" (click)="toggleTheme()">
      <i class="bi" [ngClass]="{
        'bi-sun': !(darkMode$ | async),
        'bi-moon': (darkMode$ | async)
      }"></i>
    </button>
  `
})
export class ThemeToggleComponent {
  darkMode$ = this.themeService.darkMode$;

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
    document.body.classList.toggle('dark-mode');
  }
}