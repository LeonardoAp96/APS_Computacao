import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

type Moedas = 'BRL' | 'USD' | 'EUR';
interface CambioResult{
  conversion_rates : {
    USD : null,
    BRL : null,
    EUR : null,
    JPY : null
  }
};
@Component({
  selector: 'app-cambio',
  templateUrl: './cambio.page.html',
  styleUrls: ['./cambio.page.scss'],
})

export class CambioPage {

  //https://v6.exchangerate-api.com/v6/c81746093340efadbff43b54/latest/USD

  public moedaEnt: number;
  public tipoMoedaEnt: Moedas;
  public moedaSaida: number;
  public moedaMinima: number;
  public tipoMoedaSaida: Moedas;
  public horarioUpdate: String;
  private unidadesMoedas = {};

  constructor(private http: HttpClient) {
    this.horarioUpdate = this.getDateHour();
    this.tipoMoedaEnt = "BRL";
    this.tipoMoedaSaida = "USD";
  }

  ionViewWillEnter(){
    this.atualizaMoeda();
  }

  public calcCambio() {
    if(this.moedaEnt == null || this.moedaEnt <=0)
      return;

    const token = this.moedaEnt * this.unidadesMoedas[this.tipoMoedaEnt];
    const result = token / this.unidadesMoedas[this.tipoMoedaSaida];
    this.moedaSaida = result;
    this.valorMinimo();
  }

  public valorMinimo(){
    const moeda = (1 * this.unidadesMoedas[this.tipoMoedaEnt]) / this.unidadesMoedas[this.tipoMoedaSaida];
    this.moedaMinima = moeda;
  }


  //API key c81746093340efadbff43b54
  private async atualizaMoeda(){
    const url = 'https://v6.exchangerate-api.com/v6/c81746093340efadbff43b54/latest/USD';
    const result = await this.http.get<CambioResult>(url).toPromise();
    //console.log(result.conversion_rates.BRL);
    this.unidadesMoedas = result.conversion_rates;
    console.log(this.unidadesMoedas);
  }

  private getDateHour(){
    const DateHour = new Date();
    return DateHour.getHours() + ":" + DateHour.getMinutes()
            + " , " + DateHour.getDate() + "/" + (DateHour.getMonth()+1)  + "/" + DateHour.getFullYear();
    ;
  }

}
