export {};

import { CreateComponentPublicInstance } from "vue";

import store from '@/store/index';// path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof store;
  }
}

export declare global {
  namespace QuoiBouffeEt {
    interface UserData {
      username: string;
      email: string;
      permissionLevel: number;
    }

    interface TypeData {
      name: string;
      slug: string;
      description: string;
    }

    interface IngredientData {
      name: string;
      slug: string;
      description: string;
      types: Array<TypeData>;
      image: string;
    }

    interface RecipeData {
      name: string;
      slug: string;
      description: string;
      ingredients: string;
      preparationTime: number;
      ingredients: Array<IngredientData>;
      types: Array<TypeData>;
    }
  }
}