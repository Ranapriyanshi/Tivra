import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowWeHelp from "@/components/sections/HowWeHelp";
import Plans from "@/components/sections/Plans";
import Team from "@/components/sections/Team";
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
        <Team />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
