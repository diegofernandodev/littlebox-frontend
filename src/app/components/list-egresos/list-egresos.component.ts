import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';


@Component({
  selector: 'app-list-egresos',
  templateUrl: './list-egresos.component.html',
  styleUrls: ['./list-egresos.component.css']
})
export class ListEgresosComponent implements OnInit {
  listEgresos: Egreso[] = []
  loading: boolean = false;

  constructor(private _egresoService: EgresoService, private toastr: ToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListEgresos();
  }

  getListEgresos() {
    this.loading = true;

    this._egresoService.getListaEgresos().subscribe((data: Egreso[]) => {
      this.listEgresos = data;
      this.loading = false;
    })
  }

  deleteEgreso(id: any) {
      if (id) {
      this.loading = true;
      this._egresoService.deleteEgresos(id).subscribe(() => {
        this.getListEgresos();
        this.toastr.warning('El egreso fue eliminado con éxito', 'Egreso eliminado');
      });
      }else{
      console.log("no funciona");
      
    }
  }
  
  
}
