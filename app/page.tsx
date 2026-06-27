import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowWeHelp from "@/components/sections/HowWeHelp";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import BookCall from "@/components/sections/BookCall";
import Connect from "@/components/sections/Connect";
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
        <Team />
        <Testimonials />
        <BookCall />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
