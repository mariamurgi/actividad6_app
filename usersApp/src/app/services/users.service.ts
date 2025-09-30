import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl: string = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.apiUrl}?page=${page}`));
  }

  getById(id: number): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.apiUrl}/${id}`));
  }

  create(user: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(this.apiUrl, user));
  }

  delete(id: number): Promise<any> {
    return lastValueFrom(this.http.delete<any>(`${this.apiUrl}/${id}`));
  }

  update(user: User): Promise<any> {
    return lastValueFrom(this.http.put<any>(`${this.apiUrl}/${user.id}`, user));
  }

}
