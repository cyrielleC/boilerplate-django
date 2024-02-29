import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuStoreModel } from '@menu/store/menu.reducer';

export const selectMenuState = createFeatureSelector<MenuStoreModel>('menu');

export const selectRestaurant = createSelector(
    selectMenuState,
    (state: MenuStoreModel) => state.restaurant
);
export const selectRestaurantCategories = createSelector(
    selectMenuState,
    (state: MenuStoreModel) => state.restaurant?.foodcategories
);
export const selectOrder = createSelector(
    selectMenuState,
    (state: MenuStoreModel) => state.order
);