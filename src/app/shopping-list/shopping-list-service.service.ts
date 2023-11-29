import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients:Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  ingredientsChanged= new Subject<Ingredient>() ;
  startedEditing = new Subject<number>();
  constructor() { }



  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(i:number) {
    return this.ingredients[i];
  }

  addIngredient(ingredient:Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(ingredient);
  }
  addIngredients(ingredients:Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(ingredients[0]);
  }
  onEditItem(i: number) {
    this.startedEditing.next(i);
  }
  updateIngredient(index:number, newIngredient:Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(newIngredient);
  }

  deleteIngredient(editedItemIndex: number) {
    this.ingredients.splice(editedItemIndex, 1);
    this.ingredientsChanged.next(this.ingredients[0]);
  }
}
