import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Cartao{
  nome: String;
  saldo: number;
}

interface Simulacao{
  nome: String;
  percentual: number;
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public cartoes: Cartao[] = [];
  public simulacoes : Simulacao[] = [];
  public nomePerfil: String;

  constructor(private storage: Storage) {
    this.getStorageCartao();
    this.getStorageNomePerfil();
    this.getStorageSimulacao();
  }

  public async getStorageCartao(){
    this.cartoes = [];
    const loadStorage : Cartao[] = await this.storage.get('cartoes');  
    if(loadStorage)
      this.cartoes.push(...loadStorage);
  }
  
  public updateListCartoes(listCartoes: Cartao[]){
    this.cartoes = listCartoes;
    this.saveStorageCartao();
  }  

  private saveStorageCartao(){
    this.storage.set('cartoes', this.cartoes);
  }
  
  //dados do nome perfil
  public async getStorageNomePerfil(){
    const loadNome: String = await this.storage.get('nomePerfil');  
    if(loadNome)
      this.nomePerfil = loadNome;
  }

  public updateNomePerfil(nomePerfil: String){
    this.nomePerfil = nomePerfil;
    this.saveStorageNome();
  }  

  private saveStorageNome(){
    this.storage.set('nomePerfil', this.nomePerfil);
  }

  //dados da Simulação
  public async getStorageSimulacao(){
    this.simulacoes = [];
    const loadSimulacao: Simulacao[] = await this.storage.get('simulacoes');  
    if(loadSimulacao)
      this.simulacoes.push(...loadSimulacao);
  }
  
  public updateSimulacao(simulacoes: Simulacao[]){
    this.simulacoes = simulacoes;
    this.saveStorageSimulacao();
  }  

  private saveStorageSimulacao(){
    this.storage.set('simulacoes', this.simulacoes);
  }
}
