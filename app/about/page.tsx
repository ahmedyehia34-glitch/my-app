export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">

        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          About US
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
          A modern e-commerce experience inspired by DND design systems.
        </p>

      </section>

      {/* CONTENT */}
      <section className="max-w-3xl mx-auto px-6 space-y-6 text-gray-700 leading-relaxed">

        <p>
          DND was created by two sisters, each with her own personality and style, yet both sharing the same vision for a brand built on creativity, detail, and modern embroidery. Their different perspectives come together to shape DND’s unique identity.
        </p>

        <p>
          DND is an Egyptian fashion brand known for its modern take on embroidery. We create designs that stand out through clean silhouettes, thoughtful details, and signature embroidered work that adds depth, texture, and personality.


        </p>

        <p>
          Our collections focus on quality fabrics, precise stitching, and contemporary styling, offering fashion that feels fresh, confident, and easy to wear. Every design is made to complement your lifestyle while bringing something visually unique.


        </p>

        <p>
          We believe in fashion that speaks through its details. That is why embroidery is at the heart of what we do, elevating simple forms into something refined, expressive, and effortlessly stylish.
        </p>

      </section>

      {/* FOOTER CTA */}
      <section className="text-center mt-20 pb-20">

        <h2 className="text-2xl font-semibold">
          Start exploring products
        </h2>

        <a
          href="/products"
          className="inline-block mt-5 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Shop Now
        </a>

      </section>

    </div>
  );
}