import { ticketsModel } from "../dao/models/tickets.models.js";
import { cartService, productsService} from "../repository/index.js"

class CartCotroller{
    static getCarts = async (req,res)=>{

        const carts = await cartService.getCarts();
    
        res.send({
            status:"succes",
            carritos: carts
        })
    }
    static getCartsById = async (id) =>{
        const result = await cartService.getCartsById(id);
        return result;
    }
    static createCart = async (req,res)=>{ 
        const carrito = {
          produts: []
        };
          const cart = await cartService.createCart(carrito)
          res.send({
              status:"succes",
              msg: cart
          })
      }
    static addProductInCart = async (req,res)=>{ 
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity
        
        const cart = await cartService.addProductInCart(cid,pid,quantity)
    
        res.send({
            status:"succes",
            msg: cart
        })
    }
    static deleteAllProducts = async (req,res)=>{
        const cid = req.params.cid;
        await cartService.deleteAllProducts(cid);
        res.send({
            status:"succes",
            msg:`Ruta DELETE de CART con ID: ${cid}`
        })
    }
    static deleteProduct = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const productId = req.params.pid;
        
            const result = await cartService.deleteProduct(cartId, productId);
            res.json(result);
          } catch (error) {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
          }
      }
    static  updateCart = async (req,res)=>{
        try {
            const cartId = req.params.cid;
            const newProducts = req.body.products; 
        
            const result = await cartService.updateCart(cartId, newProducts);
            res.json(result);
          } catch (error) {
            res.status(500).json({ status: 'error', message: 'Internal server error' });
          }
    }
    static  updateProductQuantity = async (req, res) => {
        try {
          const cartId = req.params.cid;
          const productId = req.params.pid;
          const newQuantity = req.body.quantity; 
      
          const result = await cartService.updateProductQuantity(cartId, productId, newQuantity);
          res.json(result);
        } catch (error) {
          res.status(500).json({ status: 'error', message: 'Internal server error' });
        }
      }
    static  getCartPopulate = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const cart = await cartService.getCartPopulate(cartId);
    
            if (!cart) {
                return res.status(404).send('Carrito no encontrado');
            }
    
            res.json(cart)
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
    static purchase = async (req,res) => {
      try {
  
          const cartId = req.params.cid;
          const cart = await cartService.getCartsById(cartId);
          if(cart){
              if(!cart.products.length){
                  return res.send("es necesario que agrege productos antes de realizar la compra")
              }
              const ticketProducts = [];
              const rejectedProducts = [];
              for(let i=0; i<cart.products.length;i++){
                  const cartProduct = cart.products[i];
                  const productDB = await productsService.getCartsById(cartProduct.id);
                  //comparar la cantidad de ese producto en el carrito con el stock del producto
                  if(cartProduct.quantity<=productDB.stock){
                      ticketProducts.push(cartProduct);
                  } else {
                      rejectedProducts.push(cartProduct);
                  }
              }
              const newTicket = {
                  code:uuidv4(),
                  purchase_datetime: new Date().toLocaleString(),
                  amount:500,
                  purchaser:req.user.email
              }
              const ticketCreated = await ticketsModel.create(newTicket);
              res.send(ticketCreated)
          } else {
              res.send("el carrito no existe")
          }
      } catch (error) {
          res.send(error.message)
      }
  }
  

    
};

export { CartCotroller };