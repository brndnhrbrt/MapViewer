import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { AppComponent } from './app.component';
import { MapJsonService } from './map-json.service';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LeafletModule.forRoot()
  ],
  providers: [MapJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
