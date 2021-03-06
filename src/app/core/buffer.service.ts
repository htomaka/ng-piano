import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class BufferService {
  constructor(private http: HttpClient) {}

  load(url): Observable<ArrayBuffer> {
    return this.http.get(url, {
      responseType: 'arraybuffer'
    });
  }
}
