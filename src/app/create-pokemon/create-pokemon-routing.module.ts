import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePokemonPage } from './create-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePokemonPageRoutingModule {}
