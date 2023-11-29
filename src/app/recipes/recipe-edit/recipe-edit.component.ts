import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../recipe-service.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id!:number;
  editMode = false;
  rceipeForm!: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm()
      }
    );
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = [];
    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if(recipe['ingredients']) {
        for(let ingredient of recipe.ingredients) {
            console.log(ingredient);
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)]),
          }
          ))
        }
      }
    }

    this.rceipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': new FormArray(recipeIngredients)
    });

  }

  onSubmit() {
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.rceipeForm.value);
    } else {
      this.recipeService.addRecipe(this.rceipeForm.value);
    }

  }

  get controls() { // a getter!
    return (<FormArray>this.rceipeForm.get('ingredients')).controls;
  }

    log(){
        console.log(this.controls)
    }

  onAddedIngredient() {
    (<FormArray>this.rceipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/) ])
      })
    )
  }


  onCancel() {
    this.router.navigate(['../'],{relativeTo:this.route});
  }

  onDeleteIngredient(onDeleteIngredient: number) {
    (<FormArray>this.rceipeForm.get('ingredients')).
    removeAt(onDeleteIngredient);

  }
}
