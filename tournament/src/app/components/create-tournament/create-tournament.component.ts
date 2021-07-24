import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.scss']
})
export class CreateTournamentComponent {
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  teams = [];
  allowTeamsQuantity = [2, 4, 8, 16, 32, 64, 128];
  isEnable = false;

  constructor(private router: Router) { }
  verifyQuantity() {
    this.isEnable = this.allowTeamsQuantity.indexOf(this.teams.length) != -1;
  }
  start(){
    this.router.navigate(["tournament"], { 
      queryParams: { teams: this.teams.join(',')}
    })
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add team to list
    if (value) {
      this.teams.push(value);
    }
    // Clear the input value
    console.log(event);
    event['input'].value = "";
    this.verifyQuantity();
  }

  remove(team): void {
    const index = this.teams.indexOf(team);
    if (index >= 0) {
      this.teams.splice(index, 1);
    }

    this.verifyQuantity();
  }

}
