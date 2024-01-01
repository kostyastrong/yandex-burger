import {Ingredient} from "./types";

// item in DnD that is being dragged.
// If we want to change the information we carry, we change the constructor and getter for the ingredient
export class DndItemMenu {
    constructor(private ingredient: Ingredient) {
    }

    getIngredient(): Ingredient {
        return this.ingredient;
    }
}
