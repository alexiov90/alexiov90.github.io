import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FantasmiService {
  private ghostUrl = 'assets/ghosts.json'; // Percorso del JSON

  constructor(private http: HttpClient) {}

  getFantasmi(): Observable<any[]> {
    return this.http.get<any[]>(this.ghostUrl);
  }
}
