import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';

@Component({
  selector: 'app-add-edit-egreso',
  templateUrl: './add-edit-egreso.component.html',
  styleUrls: ['./add-edit-egreso.component.css']
})
export class AddEditEgresoComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder,
    private _egresoService: EgresoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      fecha: ["", Validators.required],
      categoria: ["", Validators.required],
      detalle: ["", Validators.required],
      valor: ["", Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
    console.log(this.id);
  }
  

  ngOnInit(): void {
    
    if (this.id !== null) {
      
      // Es editar
      this.operacion = 'Editar ';
      this.getEgreso(this.id);
    }
  }

  getEgreso(id: any) {
    this.loading = true;
    this._egresoService.getEgreso(id).subscribe((data: Egreso) => {
      this.loading = false;
      this.form.setValue({
        fecha: data.fecha,
        categoria: data.categoria,
        detalle: data.detalle,
        valor: data.valor
      })
    })
  }

  addEgreso() {
    /*  console.log(this.form.value.name);
     console.log(this.form.get('name')?.value); */

    const egreso: Egreso = {
      fecha: this.form.value.fecha,
      categoria: this.form.value.categoria,
      detalle: this.form.value.detalle,
      valor: this.form.value.valor
    }
    this.loading = true;
      console.log(egreso._id);
      
    if (this.id !== null) {
      // Es editar 
      egreso._id = this.id;
      this._egresoService.updateEgreso(this.id, egreso).subscribe(() => {
        this.toastr.info(`El Egreso ${egreso.categoria} fue actualizado con exito`, 'Egreso actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })

    } else {
      // Es agregagar
      this._egresoService.saveEgresos(egreso).subscribe(() => {
        this.toastr.success(`El egreso ${egreso.categoria} fue registrado con exito`, 'Egreso registrado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    }




  }

}
