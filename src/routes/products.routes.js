import {Router} from "express"
import { ProductsController } from "../controllers/products.controller.js";
import { ProductManagerDB } from "../dao/managers/ProductsManagerDB.js"

const router = Router()
const productManager = new ProductManagerDB();

router.get('/', ProductsController.getProducts)
router.get('/:pid', ProductsController.getProductsById)
router.post('/', ProductsController.createProduct)
router.put('/:pid', ProductsController.updateProductById);
router.delete('/:pid', ProductsController.deleteProductById);


/*router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta PUT de PRODUCTS con ID: ${pid}`
    })
})
router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`Ruta DELETE de PRODUCTS con ID: ${pid}`
    })
})*/




export {router as productRouter};