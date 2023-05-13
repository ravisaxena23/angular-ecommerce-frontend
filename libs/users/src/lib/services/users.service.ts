import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '@env/environment';
import * as countriesLib from 'i18n-iso-countries';
import { UsersFacade } from '../state/users.facade';
declare const require;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'users';
  headers= new HttpHeaders()

  constructor(private http: HttpClient, private usersFacade: UsersFacade) {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.headers.append('Access-Control-Allow-Headers','*')
    this.headers.append('Access-Control-Allow-Methods','*');
    this.headers.append('Access-Control-Allow-Origin','*')
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers,{headers: this.headers});
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`,{headers: this.headers});
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user,{headers: this.headers});
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user,{headers: this.headers});
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`,{headers: this.headers});
  }

  getUsersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLUsers}/get/count`,{headers: this.headers})
      .pipe(map((objectValue: any) => objectValue.userCount));
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  initAppSession() {
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
