import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://<domainname>:<port>';

  constructor(private _http: HttpClient) {

  }


  addUsers(): void {
    forkJoin([
      this.createUser('Alice'),
      this.createUser('Bob'),
      this.createUser('Eve')]
    ).subscribe(result => {
      forkJoin([
        this.addGroup(result[0].userId, result[0].name),
        this.addGroup(result[1].userId, result[1].name),
        this.addGroup(result[2].userId, result[2].name)
      ]).subscribe(finalResult => {
        console.log('Complete');
      });
    });
  }

  createUser(name: string): Observable<any> {
    return this._http.get('${this.apiUrl}/user/create?name=${name}');
  }

  addGroup(userId: string, name: string): Observable<any> {
    return this._http.get('${this.apiUrl}/user/${userId}/addGroup?name=${name}');
  }







}
