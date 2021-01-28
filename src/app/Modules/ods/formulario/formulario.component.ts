import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {


  step = 0;

  formularioSeleccionado: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

  setStep(index: number) {
    this.step = index;
    this.formularioSeleccionado = index;
  }

  nextStep() {
    this.step++;
    this.formularioSeleccionado = this.step;
  }

  prevStep() {
    this.step--;
    this.formularioSeleccionado = this.step;
  }

}
