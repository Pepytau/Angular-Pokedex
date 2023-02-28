import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.page.html',
  styleUrls: ['./list-pokemon.page.scss'],
})
export class ListPokemonPage implements OnInit {

  pokemonList : any[] = [];
  pokemonListFilter : any[] = [];
  myTeam: any[] = [];
  spinner: boolean = true;

readAPI(URL: string) {
  return this.http.get(URL);
}

  constructor(private http: HttpClient, private toastController: ToastController, private storage: Storage) {
    this.readAPI("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0").subscribe((data: any) => {
    this.pokemonList = data.results;
    this.pokemonList.forEach((pokemon, index) => {
      this.readAPI(pokemon.url).subscribe((data2: any) => {
        this.pokemonList[index] = data2;
        this.readAPI(this.pokemonList[index].species.url).subscribe((data3: any) => {
          data3.names.forEach((name : any) => {
            if (name.language.name == "fr"){
              this.pokemonList[index].name = name.name
            }
          });
          data3.flavor_text_entries.forEach((desc : any) => {
            if (desc.language.name == "fr"){
              this.pokemonList[index].desc = desc.flavor_text
            }
          });
        })
        this.pokemonList[index].types.forEach((type : any, index2: Number) => {
          this.readAPI(type.type.url).subscribe((data3: any) => {
            data3.names.forEach((name : any) => {
              if (name.language.name == "fr"){
                if (index2 == 0) {
                  this.pokemonList[index].type = name.name
                }
                else {
                  this.pokemonList[index].type += ", "+ name.name
                }
                this.pokemonListFilter = this.pokemonList;
              }
          })
        })
      })
        });
    })
    })
  }

  async ngOnInit() {

  }

  async ionViewDidEnter() {
    let team: any;
      this.spinner = true;
      team = await this.storage.get('myTeam').finally(() => { this.spinner = false; });
      if (team && team.length > 0) {
        this.myTeam = team;
      }
  }

  search(event: any) {
    if (event.detail.value != ""){
      this.pokemonListFilter = this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(event.detail.value.toLowerCase()))
    } else {
      this.pokemonListFilter = this.pokemonList;
    }
  }

  addPokemonToTeam(pokemon : any){
    if (this.myTeam.length < 6) {
      this.myTeam.push(pokemon)
      this.presentSuccessToast(pokemon.name)
      this.storage.set('myTeam',this.myTeam)
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

  async presentSuccessToast(name: string) {
    const toast = await this.toastController.create({
      message: name + ' a bien été ajouté à votre équipe !',
      duration: 3000,
      position: 'bottom',
      color: 'success'
    });

    await toast.present();
  }

}
