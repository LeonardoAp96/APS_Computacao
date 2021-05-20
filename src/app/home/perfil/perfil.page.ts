import { Component, OnInit } from '@angular/core';
import { StorageService } from './../service/storage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{

  public nomePerfil: String;
  public newNomePerfil: String;

  constructor(private NomeService: StorageService){
    this.nomePerfil = this.NomeService.nomePerfil;
    if(this.nomePerfil == null)
      this.nomePerfil = "-1";
  }

  public cadastrar(){
    this.nomePerfil = this.newNomePerfil;
    this.newNomePerfil = "";
    this.NomeService.updateNomePerfil(this.nomePerfil);
  }

  public atualizar(){
    this.nomePerfil = null;
  }
}
