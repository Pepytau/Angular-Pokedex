import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemon : any;
  myTeam : any[] = []
  
  readAPI(URL: string) {
    return this.http.get(URL);
  }
  constructor(private http: HttpClient, private storage: Storage, private toastController : ToastController, private router: Router) { 
    this.readAPI("https://pokeapi.co/api/v2/pokemon/"+ Math.floor(Math.random() * (151 - 1) + 1)).subscribe((data: any) => {
      this.pokemon = data;

      this.pokemon.types.forEach((type : any, index: Number) => {
        this.readAPI(type.type.url).subscribe((data3: any) => {
          data3.names.forEach((name : any) => {
            if (name.language.name == "fr"){
              if (index == 0) {
                this.pokemon.type = name.name
              }
              else {
                this.pokemon.type += ", "+ name.name
              }

            }
        })
      })
    })
    this.readAPI(this.pokemon.species.url).subscribe((data2: any) => {
      data2.names.forEach((name : any) => {
        if (name.language.name == "fr"){
          this.pokemon.name = name.name
        }
      });
      data2.flavor_text_entries.forEach((desc : any) => {
        if (desc.language.name == "fr"){
          this.pokemon.desc = desc.flavor_text
        }
      });
    })
    });
  }

  async ionViewDidEnter() {
    let myTeam = await this.storage.get('myTeam')
    if (myTeam && myTeam.length > 0) {
      this.myTeam = myTeam;
    }
  }

  createNewPokemon() {
    if (this.myTeam.length < 6) {
      this.router.navigate(['/create-pokemon'])
    } else {
      this.presentDangerToast()
    }
  }

  async presentDangerToast() {
    const toast = await this.toastController.create({
      message: 'Votre équipe est pleine ! Veuillez retirer un autre Pokémon pour pouvoir ajouter celui-ci',
      duration: 5000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
}
