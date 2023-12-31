export type Ingredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number,
}

export type IngredientConstructor = Ingredient & { constructor_id: number }

export type MoveInfo = {
    old_index: number,
    new_index: number,
}

export const dndTypes = {
    MENU_ITEM: "MENU_ITEM",
    CONSTRUCTOR_ITEM: "CONSTRUCTOR_ITEM",
}
