import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { MapComponent, NgbdModalContent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    NgbdModalContent
  ],
  entryComponents: [
    NgbdModalContent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    LeafletModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
