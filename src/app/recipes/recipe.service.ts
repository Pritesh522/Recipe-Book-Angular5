import { Injectable} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Pavbhaji',
      'A super-tasty Pavbhaji - just awesome!',
      'https://spiritofmumbai.com/wp-content/uploads/2018/01/4.jpg',
      [
        new Ingredient('Potatoes', 3),
        new Ingredient('Onions', 2)
      ]),
    new Recipe(
      'Big Fat Vadapav',
      'What else you need to say?',
      'https://image3.mouthshut.com/images/imagesp/925739317s.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Potatoes', 2)
      ])
  ];
  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
