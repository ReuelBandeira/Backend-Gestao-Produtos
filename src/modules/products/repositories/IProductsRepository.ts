import ICreateProductDTO from '../dtos/ICreateProductsDTO';
import Product from '../infra/typeorm/entities/Products';

export default interface IProductRepository {
  findById(id: number): Promise<Product | undefined>;
  findByNameSearch(
    name: string,
    description: string
  ): Promise<(Product | undefined)[] | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findAllProduct(): Promise<Product | Product[]>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(products: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}
