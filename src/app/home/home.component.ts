import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from '../models';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sort = '';
  public games: any;

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['game-search']){
        this.searchGame('metacrit', params['game-search']);
      } else {
        this.searchGame('metacrit');
      }
    })
  }


  searchGame(sort: string, search?: string) {
    this.httpService.getAllGames(sort, search).subscribe((gameList: APIResponse<Game>) => {
     this.games = gameList.results;
     console.log(this.games)
    });
  }

}
