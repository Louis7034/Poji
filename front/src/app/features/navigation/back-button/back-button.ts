import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [],
  template: `
    <button type="button" class="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" (click)="back()">
      <span aria-hidden="true" class="text-lg leading-none">←</span>
      <span>Retour</span>
    </button>
  `,
})
export class BackButton {
  constructor(private readonly location: Location) {}

  back(): void {
    this.location.back();
  }
}
