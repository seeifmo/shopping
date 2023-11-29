import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list-service.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

   subscription!: Subscription;
    editMode = false;
    editedItemIndex!: number;
    editedItem!: Ingredient;
  @ViewChild('f') slForm!: NgForm;

  constructor(private shoppingListService:ShoppingListService) { }
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (i:number) => {
        this.editedItemIndex = i;
        this.editedItem = this.shoppingListService.getIngredient(i);
        this.editMode = true;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }
  onAddedItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngredient(newIngredient);
  }
  onUpdatedItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected readonly onreset = onreset;
}
