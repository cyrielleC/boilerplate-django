

export interface Food {
    name: string;
    ingredients: Food[];
    isIngredient: boolean; 
}

export interface Categories {
    name: string;
    elements: Food[];
}