import { Audiences } from "@/components/marketing/audiences";
import { BootLoader } from "@/components/marketing/boot-loader";
import { Faq } from "@/components/marketing/faq";
import { Features } from "@/components/marketing/features";
import { GetStarted } from "@/components/marketing/get-started";
import { Hero } from "@/components/marketing/hero";
import { LogoMarquee } from "@/components/marketing/marquee";
import { Pillars } from "@/components/marketing/pillars";
import { Pricing } from "@/components/marketing/pricing";
import { Problem } from "@/components/marketing/problem";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Testimonials } from "@/components/marketing/testimonials";
import { Web3Horizon } from "@/components/marketing/web3-horizon";
import { Welcome } from "@/components/marketing/welcome";

export default function HomePage() {
  return (
    <BootLoader>
      <SiteHeader />
      <main>
        <Hero />
        <LogoMarquee />
        <Problem />
        <Welcome />
        <Pillars />
        <Features />
        <Web3Horizon />
        <Audiences />
        <Testimonials />
        <Pricing />
        <Faq />
        <GetStarted />
      </main>
      <SiteFooter />
    </BootLoader>
  );
}
