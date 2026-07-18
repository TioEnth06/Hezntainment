import { Audiences } from "@/components/marketing/audiences";
import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { GetStarted } from "@/components/marketing/get-started";
import { Hero } from "@/components/marketing/hero";
import { Mission } from "@/components/marketing/mission";
import { Pillars } from "@/components/marketing/pillars";
import { Pricing } from "@/components/marketing/pricing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Testimonials } from "@/components/marketing/testimonials";
import { Welcome } from "@/components/marketing/welcome";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Mission />
        <Welcome />
        <Pillars />
        <Features />
        <Audiences />
        <Testimonials />
        <Pricing />
        <Faq />
        <GetStarted />
      </main>
      <SiteFooter />
    </>
  );
}
