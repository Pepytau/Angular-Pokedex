import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {

  myTeam: any[] = []
  spinner: boolean = true;

  constructor(private storage: Storage) { 
  }

  ngOnInit() {
   
  }

  async ionViewDidEnter() {
    this.spinner = true;
    await this.storage.get('myTeam').then((myTeam:any) => {
      if (myTeam && myTeam.length > 0) {
        this.myTeam = myTeam;
      }
    }).finally(() => {this.spinner = false});
  }

  removePokemonFromTeam(pokemon: any){
    const index = this.myTeam.indexOf(pokemon)
    if (index > -1) {
      this.myTeam.splice(index, 1)
    }
    this.storage.set('myTeam',this.myTeam);
  }
}
