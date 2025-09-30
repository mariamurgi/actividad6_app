import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  myUser: User | null = null;
  activeTab: string = 'aboutme';

  /**
   * We're injecting the UsersService and ActivatedRoute into the constructor function
   * @param {UsersService} usersService - This is the service we created earlier.
   * @param {ActivatedRoute} activatedRoute - This is the object that is handling the route information
   * for this component.
   */
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = Number(params.iduser);
      if (!id) {
        this.router.navigate(['/home']);
        return;
      }
      try {
        const user = await this.usersService.getById(id);
        this.myUser = user;
      } catch (err) {
        this.router.navigate(['/home']);
      }
    });
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  async removeUser(userId: number | undefined) {
    if (!userId || !this.myUser) return;
    const confirm = await Swal.fire({
      title: `¿Eliminar a ${this.myUser.first_name}?`,
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });
    if (confirm.isConfirmed) {
      try {
        const deleted = await this.usersService.delete(userId);
        if (deleted && deleted.id) {
          await Swal.fire('Eliminado', `${deleted.first_name} fue borrado correctamente.`, 'success');
          this.router.navigate(['/home']);
        } else {
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      } catch {
        Swal.fire('Error', 'Ocurrió un problema al eliminar el usuario.', 'error');
      }
    }
  }

}
