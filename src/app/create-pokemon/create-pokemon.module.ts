import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePokemonPageRoutingModule } from './create-pokemon-routing.module';

import { CreatePokemonPage } from './create-pokemon.page';
import { HeaderModule } from '../header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePokemonPageRoutingModule,
    HeaderModule
  ],
  declarations: [CreatePokemonPage]
})
export class CreatePokemonPageModule {}
