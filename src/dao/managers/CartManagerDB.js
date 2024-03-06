import cartsModel from "../models/cart.models.js";
import productsModel from "../models/products.models.js";


class CartManagerDB{

    getCarts = async () => {
        const carts = await cartsModel.find()
        return carts;
    }
    getCartsById = async (cid) => {
        const cart = await cartsModel.find({
            _id:cid
        })
        return cart;
    }
    createCart = async (carrito) =>{
        const cart = await cartsModel.create(carrito)
        return cart
    }
    addProductInCart = async (cid, pid, quantity = 1) => {
        const cart = await cartsModel.findOne({_id:cid});
        if (!cart){
            return {
                status: "error",
                msg: `El carrito con el id ${cid} no existe`
            } 
        };
        const product = await productsModel.findOne({_id:pid});
        if (!product){
            return {
                status: "error",
                msg: `El producto con el id ${pid} no existe`
            } 
        };
        let productsInCart = cart.products;
        
        const indexProduct = productsInCart.findIndex((product)=> product.id == pid );

        if(indexProduct == -1){
            const newProduct = {
                product: pid,
                quantity: quantity
            }
            cart.products.push(newProduct);
        }else{
            cart.products[indexProduct].quantity += quantity;
        }
           
        await cart.save();
        
        return cart;
    
    }
    async deleteAllProducts(cartId) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.products = [];
          await cart.save();
    
          return { status: 'success', message: 'Todos los productos eliminados del carrito correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }

    async deleteProduct(cartId, productId) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.products = cart.products.filter(item => item.product.toString() !== productId);

          await cart.save();
    
          return { status: 'success', message: 'Producto eliminado del carrito correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }
      async updateCart(cartId, newProducts) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          cart.products = newProducts;
          await cart.save();
    
          return { status: 'success', message: 'Carrito actualizado correctamente' };
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }

      async updateProductQuantity(cartId, productId, newQuantity) {
        try {
          const cart = await cartsModel.findById(cartId);
          if (!cart) {
            return { status: 'error', message: 'Carrito no encontrado' };
          }
    
          
          const productIndex = cart.products.findIndex(product => product.product.equals(productId));
    
          if (productIndex !== -1) {
            cart.products[productIndex].quantity = newQuantity;
            await cart.save();
    
            return { status: 'success', message: 'Cantidad del producto actualizada correctamente' };
          } else {
            return { status: 'error', message: 'Producto no encontrado en el carrito' };
          }
        } catch (error) {
          return { status: 'error', message: 'Internal server error' };
        }
      }
      async getCartPopulate(cartId) {
        try {
          return await cartsModel.findById(cartId).populate('products');
        } catch (error) {
          throw new Error('Internal server error');
        }
      }
    

}

export {CartManagerDB}