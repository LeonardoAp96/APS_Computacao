import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { StorageService } from './../service/storage.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage{

  public nomePerfil: String;

  constructor(private NomeService: StorageService,
              private alertController: AlertController){

  }

  ionViewWillEnter(){
    this.NomeService.getStorageNomePerfil();
    this.nomePerfil = this.NomeService.nomePerfil;

    if(!this.nomePerfil)
      this.CreateAlert();
  }

  private async CreateAlert(){
    const alert = await this.alertController.create({
      header: 'Bem Vindo ',
      subHeader: 'Digite o seu nome:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Seu nome'
        }
      ],
      buttons: [{
        text: 'Ok',
        handler: (x) => {
          console.log( x, 'Confirm Ok');
          this.nomePerfil = x.nome;
          this.NomeService.updateNomePerfil(this.nomePerfil);
        }
      }]
    });
    alert.present();
  }

}
