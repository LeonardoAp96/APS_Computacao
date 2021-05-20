import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface Cartao{
  nome: String;
  saldo: number;
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  public cartoes: Cartao[] = [];
  public nomePerfil: String;

  constructor(private storage: Storage) {
    this.loadStorage();
  }

  private async loadStorage(){
    const loadStorage : Cartao[] = await this.storage.get('cartoes');  
    if(loadStorage)
    {
      this.cartoes.push(...loadStorage);
    }

    const loadNome: String = await this.storage.get('nomePerfil');  
    if(loadNome)
      this.nomePerfil = loadNome;
  }
  
  public updateListCartoes(listCartoes: Cartao[]){
    this.cartoes = listCartoes;
    this.saveStorageCartao();
  }  

  private saveStorageCartao(){
    this.storage.set('cartoes', this.cartoes);
  }
  
  public updateNomePerfil(nomePerfil: String){
    this.nomePerfil = nomePerfil;
    this.saveStorageNome();
  }  

  private saveStorageNome(){
    this.storage.set('nomePerfil', this.nomePerfil);
  }

}
