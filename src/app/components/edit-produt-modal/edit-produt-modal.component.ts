import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProdotto } from 'src/app/models/IProdotto';
import { AdminService } from 'src/app/services/admin-page-service.service';

@Component({
  selector: 'app-edit-produt-modal',
  templateUrl: './edit-produt-modal.component.html',
  styleUrls: ['./edit-produt-modal.component.scss']
})
export class EditProdutModalComponent implements OnInit{

  openBoolean: Boolean = false;
  @Input() selectedProduct!: IProdotto;

  @Output() newItemEvent = new EventEmitter<any>();

  editForm!: FormGroup;

  mhamood: boolean = false;

  constructor(private fb: FormBuilder, private adminServ: AdminService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      nome: [''],
      marca: [''],
      prezzo: [''],
      quantita: [''],
      descrizione: ['']
    });
  }

  editMenu = [
    {label: 'Nome', type: 'text', controlName: 'nome'},
    {label: 'Marca', type: 'text', controlName: 'marca'},
    {label: 'Prezzo', type: 'number', controlName: 'prezzo'},
    {label: 'Disponibilita', type: 'number', controlName: 'quantita'},
    {label: 'Descrizione', type: 'text', controlName: 'descrizione'},
  ]

  closeOpenModal(item: IProdotto, mood: boolean) {
    this.mhamood = mood;
    this.openBoolean = !this.openBoolean;
    this.selectedProduct = item;
    if(!this.mhamood) {
      this.editForm.controls['nome'].setValue(this.selectedProduct.nome);
      this.editForm.controls['marca'].setValue(this.selectedProduct.marca);
      this.editForm.controls['prezzo'].setValue(this.selectedProduct.prezzo);
      this.editForm.controls['quantita'].setValue(this.selectedProduct.quantita);
      this.editForm.controls['descrizione'].setValue(this.selectedProduct.descrizione);
    } else {
      this.editForm.controls['nome'].reset();
      this.editForm.controls['marca'].reset();
      this.editForm.controls['prezzo'].reset();
      this.editForm.controls['quantita'].reset();
      this.editForm.controls['descrizione'].reset();
    }
  }

  deleteProduct() {
    this.adminServ.deleteProduct(this.selectedProduct.codice).subscribe(res => {
      console.log(res);
    })
    this.openBoolean = !this.openBoolean;
    this.newItemEvent.emit(false);
  }

  updateProduct() {

    let newProd!: IProdotto;
    if(this.mhamood) {
      let max = 0;
      this.adminServ.getAllProduct().subscribe(res => {
        
        res.map(item => {
          if (item.codice > max) max = item.codice;
        });

        newProd = new IProdotto(
          max + 1,
          this.editForm.get('nome')?.value,
          this.editForm.get('descrizione')?.value,
          this.editForm.get('prezzo')?.value,
          this.editForm.get('quantita')?.value,
          this.editForm.get('marca')?.value,
        );

        this.adminServ.createProduct(newProd).subscribe(res => {
          console.log(res);
        })
      })

    } else {

      newProd = new IProdotto(
        this.selectedProduct.codice,
        this.editForm.get('nome')?.value,
        this.editForm.get('descrizione')?.value,
        this.editForm.get('prezzo')?.value,
        this.editForm.get('quantita')?.value,
        this.editForm.get('marca')?.value,
      );

      this.adminServ.updateProduct(newProd).subscribe(res => {
        console.log(res);
      })

    }

    this.newItemEvent.emit(false);
    this.openBoolean = !this.openBoolean;
  }

  turnBack() {
    this.openBoolean = !this.openBoolean;
  }
}
