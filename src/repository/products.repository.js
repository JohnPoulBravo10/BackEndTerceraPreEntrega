
class ProductsRepository{
    constructor(dao){
        this.dao = dao
    }

    static getProducts = async ({ limit = 10, page = 1, sort, query }) =>{
        const products = await this.dao.getProducts(limit,page,sort,query);
        return products;
    }
    static createProduct = async (productData) =>{
        const products = await this.dao.createProduct(productData);
        return products;
    }
    static getProductsById = async (pid) =>{
        const products = await this.dao.getProductsById(pid);
        return products;
    }
    static updateProductById = async (pid, updatedProductData) =>{
        const products = await this.dao.updateProductById(pid,updatedProductData);
        return products;
    }
    static deleteProductById = async (pid) =>{
        const products = await this.dao.deleteProductById(pid);
        return products;
    }
    
};

export { ProductsRepository };