import { useState, useEffect } from 'react';
import { OfferCarousel } from "../../components/ui/offer-carousel";
import { getAllProducts } from '../../services/productService';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllProducts({ limit: 10 }); 
      
      
      const transformedProducts = data.products.map(product => ({
        id: product._id,
        imageSrc: product.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000',
        imageAlt: product.name,
        tag: product.category || 'Food',
        title: product.name,
        description: product.description.substring(0, 50) + '...',
        brandLogoSrc: product.image || 'https://via.placeholder.com/40',
        brandName: `Rs ${product.price}`,
        promoCode: product.inStock ? 'Available' : 'Out of Stock',
        href: `/product/${product._id}`,
      }));
      
      setProducts(transformedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Deals of the Day</h2>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Deals of the Day</h2>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={fetchProducts}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Deals of the Day</h2>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">No products available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Deals of the Day</h2>
        <OfferCarousel offers={products} />
      </div>
    </div>
  );
}
