import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../components/tabs/tabs.component';

@Component({
  selector: 'app-tabs-bar',
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, TabsComponent],
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage {}