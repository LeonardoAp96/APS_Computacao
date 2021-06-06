import { Storage } from '@ionic/storage-angular';
import { SimulacaoPage } from './../simulacao/simulacao.page';
import { Component } from '@angular/core';
import { StorageService } from './../service/storage.service';
import { ToastController } from '@ionic/angular';

interface Simulacao{
  nome: String;
  percentual: number;
}
interface Cartao{
  nome: String;
  saldo: number;
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{

  public nomePerfil: String;
  public newNomePerfil: String;

  public newInvestName = '';
  public newPercentYear;
  public simulacoes : Simulacao[] = [ ];

  public newCartaoName = '';
  public newValueCartao;
  public cartoes : Cartao[] = [];

  constructor(private StorageService: StorageService, private toasterController: ToastController){

  }

  ionViewWillEnter(){
    this.StorageService.getStorageNomePerfil();
    this.nomePerfil = this.StorageService.nomePerfil;
    this.StorageService.getStorageSimulacao();
    this.simulacoes = this.StorageService.simulacoes;
    this.StorageService.getStorageCartao();
    this.cartoes = this.StorageService.cartoes;
  }

  public cadastrar(){
    this.nomePerfil = this.newNomePerfil;
    this.newNomePerfil = "";
    this.StorageService.updateNomePerfil(this.nomePerfil);
  }

  public atualizar(){
    this.nomePerfil = null;
  }

  public addNewSimulacao(){
    if (this.newInvestName.trim().length == 0) {
      this.toastMessage("Simulacoes, Nome invalido");
      return;
    }
    if (this.newPercentYear <= 0 || this.newPercentYear == null) {
      this.toastMessage("Simulacoes, Percentual invalido");
      return;
    }

    this.simulacoes.push({
      nome: this.newInvestName.trim(),
      percentual: this.newPercentYear
    })
    console.log(this.simulacoes);
    this.StorageService.updateSimulacao(this.simulacoes);
    this.toastMessage("Simulacoes realizado");

    this.newInvestName = '';
    this.newPercentYear = 0.0;
  }

  public addNewCartao(){
    if (this.newCartaoName.trim().length == 0) {
      this.toastMessage("Cartoes, Nome invalido");
      return;
    }
    if (this.newValueCartao <= 0 || this.newValueCartao == null) {
      this.toastMessage("Cartoes, saldo invalido");
      return;
    }

    this.cartoes.push({
      nome: this.newCartaoName.trim(),
      saldo: this.newValueCartao
    })
    this.StorageService.updateListCartoes(this.cartoes);
    this.toastMessage("Cartoes realizado");
    
    this.newCartaoName = '';
    this.newValueCartao = 0.0;
  }


  async toastMessage(nomeDado: String) {
    const toast = await this.toasterController.create({
      color: 'dark',
      duration: 2000,
      message: 'Cadastro de ' + nomeDado
    });

    await toast.present();
  }
}
