import { Component } from '@angular/core';

type Moedas = 'Real' | 'Dolar';

@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
})

export class CambioPage {

  constructor() { }

  public moedaEnt: number;
  public tipoMoedaEnt: Moedas;
  public moedaSaida: string = '';
  public tipoMoedaSaida: Moedas;

  private unidadesMoedas = {
    Real: 1,
    Dolar: 5.5,
  };

  public calcCambio() {
    const token = this.moedaEnt * this.unidadesMoedas[this.tipoMoedaEnt];
    const tr = token / this.unidadesMoedas[this.tipoMoedaSaida];
    this.moedaSaida = tr.toString();
  }

}
