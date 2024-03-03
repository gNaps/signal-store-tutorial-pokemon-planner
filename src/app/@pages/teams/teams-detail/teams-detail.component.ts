import { Component, inject } from '@angular/core';
import { TeamStore } from '../../../@core/stores/team.store';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokedexStore } from '../../../@core/stores/pokedex.store';
import { PokedexGen } from '../../../@core/models/pokedex';
import { Pokemon } from '../../../@core/models/pokemon';

@Component({
  selector: 'app-teams-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams-detail.component.html',
  styleUrl: './teams-detail.component.scss'
})
export class TeamsDetailComponent {
  teamStore = inject(TeamStore);
  pokedexStore = inject(PokedexStore);
  route = inject(ActivatedRoute);
  isEdit = false;

  generations: PokedexGen[] = [
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eigth',
    'ninth'
  ];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.teamStore.loadTeam(id);
      this.isEdit = true;
    }
    this.pokedexStore.loadPokedex();
  }

  onChangeGen(g: PokedexGen) {
    this.pokedexStore.setActiveGen(g);
  }

  onAddPokemon(p: Pokemon) {
    console.log('ADD', p);
    this.teamStore.addPokemonToTeam(p);
  }

  onRemovePokemon(i: number) {
    console.log('REMOVE', i);
    this.teamStore.removePokemonToTeam(i);
  }
}
