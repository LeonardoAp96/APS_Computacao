import {Component} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
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

];

  public newValor = 0.0;
  public newTempo = 0.0;

  constructor(private SimulacaoService: StorageService,
              private alertController: AlertController, private toasterController: ToastController)
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

      valorTemp = ((this.newValor * s.percentual)* this.newTempo);
      text += s.nome + " - " + valorTemp.toFixed(2) + "&emsp;<br>";


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

      header: 'Resultado da simulação',
      message: this.calculateSimulacao(),
      subHeader:'seu lucro foi de:',
      buttons: ['Fechar',]
    });
    alert.present();
  }
  public updateSimulacao(toUpdate: Simulacao, newNome: String, newPercentual: number) {
    const index = this.simulacoes.indexOf(toUpdate);
    this.simulacoes[index].nome = newNome;
    this.simulacoes[index].percentual = newPercentual;
    this.SimulacaoService.updateSimulacao(this.simulacoes);
  }

  async UpdateAlertSimulacao(toUpdate: Simulacao){
    const alert = await this.alertController.create({
      header: 'Atualização de Simulação',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Anterior: ' + toUpdate.nome,
        },
        {
          name: 'percentual',
          type: 'number',
          placeholder: 'Anterior: ' + toUpdate.percentual
        },
      ],
      buttons: [{
        text: 'Ok',
        handler: (newDados) => {
          if(newDados.nome.trim().length == 0){
            this.toastMessage("com falha, Nome incorreto");
            return;
          }
          if (newDados.percentual <= 0 || newDados.percentual == null) {
            this.toastMessage("com falha, Percentual incorreto");
            return;
          }

          this.updateSimulacao(toUpdate, newDados.nome, newDados.percentual);
          this.toastMessage("com sucesso, Parabéns");
        }
      }]
    });
    alert.present();
  }

  async toastMessage(mensagem: String) {
    const toast = await this.toasterController.create({
      color: 'dark',
      duration: 3500,
      position: 'top',
      message: "Atualização " + mensagem
      });

    await toast.present();
  }
}
