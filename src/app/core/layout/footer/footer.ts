import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-footer',
  imports: [ToolbarModule, Menubar],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();
}
