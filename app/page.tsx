import NewestProducts from "./components/NewestProducts";

export default function Home() {
  return (
    <section className='max-w-7xl w-full mx-auto px-4 md:px-8 my-5'>
      <div className="max-w-3xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best tailwind </h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg font-normal text-base text-muted-foreground mx-auto mt-5 w-[90%] ">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, excepturi eos illum minima sequi fugit voluptatibus quo a molestias quas del.</p>
      </div>
      <NewestProducts />
    </section>
  );
}
