

class CartRepository{
    constructor(dao){
        this.dao = dao;
    }

    static getCarts = async () =>{
        const carts = await this.dao.getCarts();
        return carts;
    }
    static getCartsById = async (id) =>{
        const result = await this.dao.getCartsById(id);
        return result;
    }
    static createCart = async (cart) =>{
        const carrt = await this.dao.createCart(cart);
        return carrt;
    }
    static addProductInCart = async (cid, pid, quantity = 1) =>{
        const carrt = await this.dao.addProductInCart(cid,pid,quantity);
        return carrt;
    }
    static deleteAllProducts = async (id) =>{
        const carrt = await this.dao.deleteAllProducts(id);
        return carrt;
    }
    static deleteProduct = async (cartId, productId) =>{
        const carrt = await this.dao.deleteProduct(cartId, productId)
        return carrt;
    }
    static  updateCart = async (cartId, newProducts) =>{
        const carrt = await this.dao.updateCart(cartId, newProducts)
        return carrt;
    }
    static  updateProductQuantity = async (cartId, productId, newQuantity) =>{
        const carrt = await this.dao.updateProductQuantity(cartId, productId, newQuantity)
        return carrt;
    }
    static  getCartPopulate = async (cartId) =>{
        const carrt = await this.dao.getCartPopulate(cartId)
        return carrt;
    }
    
};

export { CartRepository };