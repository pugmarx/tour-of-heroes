import { Component, OnInit } from '@angular/core';
import { Student } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  	this.getHeroes();
  }

/*
  getHeroes(): void{
  	this.heroes = this.heroService.getHeroes();
  }*/



  getHeroes(): void {

  	this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);

  }

  // hero: Hero = {

  // 	id: 1,
  // 	name: 'Windstorm'

  // }

  //heroes = HEROES;

 heroes: Student[];

  //hero='Windstorm';

  // selectedHero: Hero;

  // onSelect(hero: Hero): void {
  // 	this.selectedHero = hero;
  // }
	add(name: string): void {
	  name = name.trim();
	  if (!name) { return; }
	  this.heroService.addHero({ name } as Student)
	    .subscribe(hero => {
	      this.heroes.push(hero);
	    });
	}

	delete(hero: Student): void {
	  this.heroes = this.heroes.filter(h => h !== hero);
	  this.heroService.deleteHero(hero).subscribe();
	}

}
