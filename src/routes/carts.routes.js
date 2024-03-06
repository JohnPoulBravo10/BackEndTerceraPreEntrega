import {Router} from "express";
import { CartManagerDB } from "../dao/managers/CartManagerDB.js"
import { CartCotroller } from "../controllers/cart.controller.js";
const router = Router();

const cartManagerMongo = new CartManagerDB();

router.get('/', CartCotroller.getCarts)
router.get('/:cid', CartCotroller.getCartPopulate);

/*router.get('/:cid', async (req,res)=>{
    try {
        const cartId = req.params.cid;
    
        const cart = await cartManagerMongo.getCartPopulate(cartId);
    
        if (!cart) {
          return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
    
        res.json({ status: 'success', products: cart.products });
      } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      }
})*/
router.post('/', CartCotroller.createCart)
router.post('/:cid/product/:pid', CartCotroller.addProductInCart)
router.put('/:cid', CartCotroller.updateCart)
router.delete('/:cid', CartCotroller.deleteAllProducts)
router.delete('/:cid/products/:pid', CartCotroller.deleteProduct);
router.put('/:cid/products/:pid', CartCotroller.updateProductQuantity);
router.post("/:cid/purchase",CartCotroller.purchase);

export {router as cartRouter};