import { Component, OnInit } from '@angular/core';
import { StorageService } from './../service/storage.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage{

  public nomePerfil: String;

  constructor(private NomeService: StorageService){
    this.nomePerfil = this.NomeService.nomePerfil;
  }
}
