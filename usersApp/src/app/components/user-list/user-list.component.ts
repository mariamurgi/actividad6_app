import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {  
  
  users: User[] = [];
  page: number = 1;
  pagesCount: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers(this.page);
  }

  async loadUsers(page: number): Promise<void> {
    try {
      const result = await this.usersService.getAll(page);
      this.users = result.data;
      this.page = result.page;
      this.pagesCount = result.total_pages;
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    }
  }

  // Devuelve un array con los números de página disponibles
  getPages(): number[] {
    return Array.from({ length: this.pagesCount }, (_, i) => i + 1);
  }

}