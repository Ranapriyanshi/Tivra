import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowWeHelp from "@/components/sections/HowWeHelp";
import Plans from "@/components/sections/Plans";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <HowWeHelp />
        <Plans />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
