import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import { StorageService } from './../service/storage.service';

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

  public simulacoes : Simulacao[] = [
  {
    nome: "IPCA",
    percentual: 0.1
  },{
    nome: "Nubank",
    percentual: 0.5
  },{
    nome: "SELIC",
    percentual: 0.01
  },
];

  public newValor = 0.0;
  public newTempo = 0.0;

  constructor(private SimulacaoService: StorageService,
              private alertController: AlertController)
  {
  }

  ionViewWillEnter(){
    this.SimulacaoService.getStorageSimulacao();
    this.simulacoes = this.SimulacaoService.simulacoes;
  }

  public removeSimulacao(toRemove: Simulacao) {
    const index = this.simulacoes.indexOf(toRemove)
    this.simulacoes.splice(index, 1);
    this.SimulacaoService.updateSimulacao(this.simulacoes);
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
      cssClass: 'botao',
      header: 'Resultado da simulação é',
      message: this.calculateSimulacao(),
      buttons: ['Fechar',]
    });
    alert.present();
  }
}
