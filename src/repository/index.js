import { ProductsRepository } from "./products.repository.js";
import { CartRepository } from "./cart.repository.js";
import { CartManagerDB } from "../dao/managers/CartManagerDB.js";
import { ProductManagerDB } from "../dao/managers/ProductsManagerDB.js";

const ProductsManager = new ProductManagerDB();

const cartDB = new CartManagerDB();

export const cartService = new CartRepository(cartDB);

export const productsService = new ProductsRepository(ProductsManager);


