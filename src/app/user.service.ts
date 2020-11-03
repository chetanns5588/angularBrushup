import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost/angularBrushup/php_backend";
  constructor(private http: HttpClient) { }
  
  public createUser(firstName, lastName, age, gender, email, pwd) {
    return this.http.post<any>(this.baseUrl + '/register.php', 
    { firstName, lastName, age, gender, email, pwd })
      .pipe(map(Users => {
        return Users;
      }));
  }
}
