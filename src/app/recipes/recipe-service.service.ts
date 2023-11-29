import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list-service.service";
import {Subject} from "rxjs";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RecipeService {

   recipeChanged = new Subject<Recipe[]>();
   constructor(private slService:ShoppingListService) { }

  private recipes:Recipe[] =[
    new Recipe('A Test Recipe',
      'this simply test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
    [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
    new Recipe('Rice',
      'this simply test',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
      [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
  ];
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number) {
    return this.recipes[index];
  }
  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }
  updateRecipe(index:number,newRecipe:Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number) {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  addToShoppingList(Ingredient: Ingredient[]) {
    this.slService.addIngredients(Ingredient);
  }
}
