import { Injectable } from '@angular/core';
import { Storage, StorageConfigToken } from '@ionic/storage-angular';

interface Cartao{
  nome: String;
  saldo: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartaoService {

  public cartoes: Cartao[] = [];

  constructor(private storage: Storage) {
    this.loadStorageCartao();
  }

  public updateListCartoes(listCartoes: Cartao[]){
    this.cartoes = listCartoes;
    this.saveStorageCartao();
  }  

  private async loadStorageCartao(){
    const loadStorage : Cartao[] | null = await this.storage.get('cartoes');  
    if(this.cartoes){
      this.cartoes.push(...loadStorage);
    }
  }

  private saveStorageCartao(){
    this.storage.set('cartoes', this.cartoes);
  }

}
