import AboutSection from "@/components/homepage/About";
import Banner from "@/components/homepage/Banner";
import GiftCategory from "@/components/homepage/Categories ";
import Features from "@/components/homepage/Features";
import PopularGifts from "@/components/homepage/PopularGifts";
import ContactPage from "@/components/homepage/ContactPage";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner></Banner>
      <Features></Features>
      <GiftCategory></GiftCategory>
      <PopularGifts></PopularGifts>
      <AboutSection></AboutSection>
      <ContactPage></ContactPage>
    </div>
  );
}
