import HeroBanner from "../app/components/HeroBanner";
import ProductsGrid from "../app/components/ProductsGrid";
import HeroSliderSection from "../app/components/HeroSliderSection";
import Footer from "../app/components/Footer";
import { allProducts } from "../app/products";

export default function Home() {
  return (
    <main className="bg-white">

      {/* HERO */}
      <section>
        <HeroBanner />
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">
          Featured Products
        </h2>

        <ProductsGrid />
      </section>

      {/* SLIDER SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          <h2 className="text-2xl font-bold mb-8">
            Trending Now
          </h2>

          <HeroSliderSection products={allProducts} />

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}