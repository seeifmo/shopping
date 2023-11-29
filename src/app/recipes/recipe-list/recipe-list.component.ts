import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy{
  recipes!:Recipe[];


  constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  onClickNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
  }
}
