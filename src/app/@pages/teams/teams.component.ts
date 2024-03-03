import { Component, inject } from '@angular/core';
import { TeamStore } from '../../@core/stores/team.store';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../@core/services/teams/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {
  store = inject(TeamStore);
  router = inject(Router);

  ngOnInit() {
    this.store.loadTeams();
  }

  onCreate() {
    this.router.navigate(['new']);
  }

  onUpdate(id: string) {
    this.router.navigate([id]);
  }
}
