import NewestProducts from "./components/NewestProducts";
import ProductRow from "./components/ProductRow";

export default function Home() {
  return (
    <section className='max-w-7xl w-full mx-auto px-4 md:px-8 my-7'>
      <div className="max-w-3xl uppercase mx-auto text-2xl mt-20 sm:text-4xl lg:text-5xl font-bold text-center">
        <h1>Find the best tailwind </h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg font-normal normal-case text-base text-muted-foreground mx-auto mt-5 w-[90%] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, excepturi eos illum minima sequi fugit voluptatibus quo a molestias quas del.</p>
      </div>

      <ProductRow category="newest" />
      <ProductRow category="templates" />
      <ProductRow category="icons" />
      <ProductRow category="uikits" />
    </section>
  );
}
