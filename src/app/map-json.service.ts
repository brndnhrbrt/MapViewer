import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MapJsonService {

  getOutline5mJSON(): Observable<any> {
    return this.http.get("assets/gz_2010_us_outline_5m.json")
  }

  getStateOutline5mJSON(): Observable<any> {
    return this.http.get("assets/gz_2010_us_040_00_5m.json");
  }

  getCountiesOutline5mJSON(): Observable<any> {
    return this.http.get("assets/gz_2010_us_050_00_5m.json");
  }

  getCongressOutline5mJSON(): Observable<any> {
    return this.http.get("assets/gz_2010_us_500_11_5m.json");
  }
  
  constructor(
    private http: HttpClient
  ) {}


  


}
