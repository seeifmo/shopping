import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  Ingredients!: Ingredient[];
  private igChangeSub!: Subscription;
  constructor(private shoppingListService:ShoppingListService) { }
  ngOnInit(): void {
    this.Ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredient:Ingredient) => {
        this.Ingredients = this.shoppingListService.getIngredients();
      }
    );

  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

  onEditItem(i: number) {
     this.shoppingListService.startedEditing.next(i);
  }
}
