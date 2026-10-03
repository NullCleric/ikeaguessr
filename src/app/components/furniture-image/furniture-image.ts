import { Component, input } from '@angular/core';

@Component({
  selector: 'app-furniture-image',
  standalone: true,
  templateUrl: './furniture-image.html',
  styleUrl: './furniture-image.scss',
})
export class FurnitureImage {
  src = input.required<string>();
}
