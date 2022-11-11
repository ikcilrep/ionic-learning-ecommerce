import Product from './store/models/product.model';
import User from './store/models/user.model';

const users: Array<User> = [
    { email: 'ikcilrep@outlook.com', password: 'Kotek123!' },
    { email: 'panszymon1@gmail.com', password: 'Kotek1234!' },
];


const products: Array<Product> = [
    {
        name: 'Rower', description: 'Pojeździsz sobie', price: 1200,
        imageUrl: 'https://www.carrefour.pl/images/product/350x350/rower-29-mtb-cayman-s3omeh.jpg',
        id: 0,
    },
    {
        name: 'Lizak', description: 'Zjesz sobie', price: 0.2,
        imageUrl: 'https://www.manufaktura-cukierkow.pl/assets/images/7/lizak-duzy-teczowy-manufaktura-cukierkow-56f1ad5d.png',
        id: 1,
    }
];

export { users, products, Product, User };
