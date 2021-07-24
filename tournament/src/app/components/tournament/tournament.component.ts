import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {
  tree: any[][];
  hasWinner = false;
  winnerName;
  
  constructor(
    private activedRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
    const rules = {
      2: 2, 
      4: 3, 
      8: 4,
      16: 5,
      32: 6,
      64: 7, 
      128: 8
    }
    const timesString =  this.activedRoute.queryParams['value'].teams;
    
    if(!timesString){
      alert("You need to pass teams=teamOneName,teamTwoName,teamThreeName");
      this.route.navigateByUrl('/')
      return ;
    }
    
    const times = timesString.split(',');

    if(!rules[times.length]){
      this.route.navigateByUrl('/')
      alert("The quantity of teams need to be 2, 4, 8, 16, 32, 64, 128")
      return ;
    }

    const levels = rules[times.length];  
    const timeCopy = times.sort(() => .5 - Math.random());
    
    const tree = new Array(levels)
      .fill(null)
      .map((value, index) => {
        const nodeLevels = Math.pow(2, index);
        if(index == levels - 1){
          return new Array(nodeLevels)
            .fill(null)
            .map((node, index) => {
              return timeCopy[index];
            })
        }
        return new Array(nodeLevels)
          .fill(null);
      });
    this.tree = tree;
    console.log(tree);
  }
  chooseTheWinner({value}){
    const { indexRow, indexTeam, team } = value;
    if(indexRow == 0 && indexTeam == 0){
      this.hasWinner = true;
      this.winnerName = team;
      return ;
    }
    
    const tree = [...this.tree];
    tree[indexRow][indexTeam] = team;
    this.tree = null;
    setTimeout(() => {
      this.tree = tree;
    })
  }

}
