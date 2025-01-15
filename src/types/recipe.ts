import { Ingredient } from './ingredient';

export interface Recipe {
    creatorId: string;
    ingredients: Ingredient[];
}