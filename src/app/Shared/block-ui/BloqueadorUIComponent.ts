import { Component } from '@angular/core';

@Component({
  selector: 'bloqueadorUI',
  styles: [`
    :host {
      text-align: center;
    }
  `],
  template: `
    <div class="block-ui-template">
    <div class="spinner-border text-danger" role="status"></div>
    <h3 class="text-white h5">Cargando...</h3>
    </div>
  `
})
export class BloqueadorUIComponent {
}
