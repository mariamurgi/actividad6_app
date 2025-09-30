import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  // Recibe el usuario a mostrar en la tarjeta
  @Input() user!: User;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  // Elimina el usuario mostrado en la tarjeta
  async removeUser(id: number | undefined) {
    if (!id || !this.user) return;
    const confirm = await Swal.fire({
      title: `¿Eliminar a ${this.user.first_name}?`,
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        const response = await this.usersService.delete(id);
        if (response && response.id) {
          Swal.fire(
            '¡Borrado!',
            `El usuario ${response.first_name} ha sido eliminado.`,
            'success'
          );
          window.location.reload();
        } else {
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al intentar borrar el usuario.', 'error');
      }
    }
  }
}
