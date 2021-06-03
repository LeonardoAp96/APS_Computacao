import { StorageService } from './../service/storage.service';
import { Component } from '@angular/core';

interface Cartao{
  nome: String;
  saldo: number;
}
@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage{

  public valorSaldo = 0;
  public listCartoes : Cartao[] = [
    {
      nome : "Nubank",
      saldo: 70.00
    },
    {
      nome : "Debito",
      saldo: 70.00
    },
  ];
  public selectedCartao = -1;
  public iptValor = 0;

  constructor(private cartaoService: StorageService){}

  ionViewWillEnter(){
    this.cartaoService.getStorageSimulacao();
    this.listCartoes = this.cartaoService.cartoes;
  }

  public refreshList(){
    this.listCartoes[this.selectedCartao].saldo = this.valorSaldo;
    this.iptValor = 0;
    this.cartaoService.updateListCartoes(this.listCartoes);
  }

  public increment(){
    if(this.iptValor > 0)
      this.valorSaldo += this.iptValor;
    this.refreshList();
  }
  public decrement(){
    if(this.iptValor > 0)
      this.valorSaldo -= this.iptValor;
    this.refreshList();
  }

  public selectCartao(cartao){
    this.iptValor = 0;
    this.valorSaldo = cartao.saldo;
    this.selectedCartao = this.listCartoes.indexOf(cartao);
  }

  public removeCartao(toRemove : Cartao) {
    const index = this.listCartoes.indexOf(toRemove)
    this.listCartoes.splice(index, 1);
    this.refreshList();
  }
}
