import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.page.html',
  styleUrls: ['./create-pokemon.page.scss'],
})
export class CreatePokemonPage implements OnInit {

  image: string = "";
  pokemonForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    desc: ['', Validators.required],
    sprites: {front_default: ''}
  })

  constructor(private fb: FormBuilder, private storage: Storage,private router: Router) { }

  ngOnInit() {
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 20,
      resultType: CameraResultType.Uri
    });
    (image.webPath)
    if (image.webPath) {
      this.image = image.webPath;
    }
  }

  async onSubmit() {
    let team: any;
    team = await this.storage.get('myTeam') || [];
    if (team && team.length > 0) {
      team = team;
    }
    let myPokemon: any = this.pokemonForm.value
    myPokemon.sprites.front_default = this.image;
    (myPokemon)
    team.push(myPokemon)
    this.storage.set('myTeam', team)
    this.router.navigate(['/team'])
  }
}
