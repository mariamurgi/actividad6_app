import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent implements OnInit {

  // Recibe el usuario para mostrar en el popup
  @Input() user!: User;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}


  ngOnInit(): void {}

  // Elimina el usuario mostrado en el popup
  async removeUser(id: number | undefined) {
    if (!id || !this.user) return;
    const confirm = await Swal.fire({
      title: `¿Eliminar a ${this.user.first_name}?`,
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      iconColor: '#d9534f',
      width: '30%',
      focusConfirm: true,
      showCancelButton: true,
      confirmButtonColor: '#0275d8',
      cancelButtonColor: '#d9534f',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (confirm.isConfirmed) {
      try {
        const response = await this.usersService.delete(id);
        if (response && response.id) {
          await Swal.fire({
            text: `El usuario ${response.first_name} ${response.last_name} ha sido eliminado correctamente!`,
            icon: 'success',
            iconColor: '#0275d8',
            width: '50%',
            showConfirmButton: false,
            timer: 2500
          });
          this.router.navigate(['/home']);
        } else {
          await Swal.fire({
            text: 'Hubo un error eliminando el usuario.',
            icon: 'error',
            iconColor: '#d9534f',
            width: '50%',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch {
        await Swal.fire({
          text: 'Hubo un error eliminando el usuario.',
          icon: 'error',
          iconColor: '#d9534f',
          width: '50%',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      await Swal.fire({
        text: 'Has cancelado la operación',
        icon: 'info',
        iconColor: '#d9534f',
        width: '50%',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
