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
  private _storage: Storage | null = null;
  public cartoes: Cartao[] = [];

  constructor(private storage: Storage) {
    this.init();
    this.loadStorageCartao();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public updateListCartoes(listCartoes: Cartao[]){
    this.cartoes = listCartoes;
    this.saveStorageCartao();
  }  

  private async loadStorageCartao(){
    const loadStorage : Cartao[] | null = await this.storage.get('cartoes');  
    if(loadStorage)
    {
      this.cartoes.push(...loadStorage);
    }
  }

  private saveStorageCartao(){
    this.storage.set('cartoes', this.cartoes);
  }

}
