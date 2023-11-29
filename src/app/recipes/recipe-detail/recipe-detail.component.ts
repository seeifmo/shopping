import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe-service.service";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shopping-list/shopping-list-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
   recipe!: Recipe;
  constructor(private recipeService:RecipeService,
              private activeRouter:ActivatedRoute,private router:Router) {
  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe(
      (params)=>{
        this.recipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }
  onClickAddToShoppingList(Ingredient: Ingredient[]) {
    this.recipeService.addToShoppingList(Ingredient);
  }
  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo:this.activeRouter});
  }

  onDeleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id);
    this.router.navigate(['/recipes']);
  }
}
