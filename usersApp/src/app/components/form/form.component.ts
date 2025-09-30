import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  formTitle: string = 'Registro de Usuario';
  buttonText: string = 'Guardar';
  formMode: 'new' | 'edit' = 'new';
  userId: number | null = null;
  

  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      const id = Number(params.iduser);
      if (id) {
        this.formMode = 'edit';
        this.formTitle = 'Editar Usuario';
        this.buttonText = 'Actualizar';
        this.userId = id;
        try {
          const user = await this.usersService.getById(id);
          this.userForm.patchValue({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            image: user.image
          });
        } catch (err) {
          Swal.fire('Error', 'No se pudo cargar el usuario.', 'error');
          this.router.navigate(['/home']);
        }
      }
    });
  }


  async submitForm() {
    if (this.userForm.invalid) {
      Swal.fire('Formulario incompleto', 'Revisa los campos obligatorios.', 'warning');
      return;
    }
    if (this.formMode === 'new') {
      try {
        const createdUser = await this.usersService.create(this.userForm.value);
        if (createdUser.id) {
          Swal.fire('Usuario creado', `${createdUser.first_name} ha sido registrado.`, 'success');
          this.router.navigate(['/home']);
        }
      } catch (err) {
        Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
      }
    } else {
      const updatedUser: User = {
        id: this.userId!,
        ...this.userForm.value
      };
      try {
        const response = await this.usersService.update(updatedUser);
        if (response && response.id) {
          Swal.fire({
            title: 'Actualización exitosa',
            text: `${response.first_name} ha sido actualizado correctamente.`,
            icon: 'success',
            confirmButtonText: 'Ver usuario'
          });
          this.router.navigate(['/user', response.id]);
        } else {
          Swal.fire('Error', 'No se recibió respuesta válida del servidor.', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Ocurrió un problema al actualizar el usuario.', 'error');
      }
    }
  }

  // Valida si un campo tiene un error específico y ha sido tocado
  hasError(control: string, error: string): boolean {
    const ctrl = this.userForm.get(control);
    return !!(ctrl && ctrl.hasError(error) && ctrl.touched);
  }
}
