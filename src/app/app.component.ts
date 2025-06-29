import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SqliteService } from './services/sqlite.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,            // ↪️ para renderizar <ion-app>
    IonRouterOutlet    // ↪️ para renderizar <ion-router-outlet>
  ],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private sqliteService: SqliteService
  ) {
    this.platform.ready().then(() => {
      this.initDatabase();
    });
  }

  private async initDatabase() {
    try {
      await this.sqliteService.initialize();
      console.log('✅ Base de datos inicializada');
    } catch (err) {
      console.error('❌ Error inicializando la BDD', err);
    }
  }
}