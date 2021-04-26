import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';

interface Simulacao{
  nome: String;
  percentual: number;
}
@Component({
  selector: 'app-simulacao',
  templateUrl: './simulacao.page.html',
  styleUrls: ['./simulacao.page.scss'],
})

export class SimulacaoPage{

  public simulacoes : Simulacao[] = [];

  public newValor = 0.0;
  public newTempo = 0.0;
  public newInvestName = "";
  public newPercentYear = 0.0;

  constructor(
    private alertController: AlertController
  ) {  }

  public addNewSimulacao(){
    if (this.newInvestName.trim().length == 0) {
      return;
    }
    if (this.newPercentYear <= 0) {
      return;
    }

    this.simulacoes.push({
      nome: this.newInvestName.trim(),
      percentual: this.newPercentYear
    })

    this.newInvestName = '';
    this.newPercentYear = 0.0;
  }

  public removeSimulacao(toRemove: Simulacao) {
    const index = this.simulacoes.indexOf(toRemove)
    this.simulacoes.splice(index, 1);
  }

  public calculateSimulacao(){
    let text = '';
    let valorTemp = 0;

    for(let s of this.simulacoes){
      valorTemp = this.newValor * Math.pow((1+s.percentual), (this.newTempo/12));
      text += s.nome + " - " + valorTemp.toFixed(3) + "&emsp;";
    }
        
    return text;
  }

  public async Simulacao() {
    if (this.newValor <= 0 || this.newTempo <= 0) {
      return;
    }
    if(this.simulacoes.length <= 0)
      return;

    const alert = await this.alertController.create({
      header: 'Resultado da simulação é',
      message: this.calculateSimulacao(),
    });
    alert.present();
  }

}
