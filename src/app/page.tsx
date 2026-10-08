import { CommonQuestions } from "@/components/sections/CommonQuestions";
import { Splash } from "@/components/brand/Splash";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { DayTour } from "@/components/sections/DayTour";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { Facts } from "@/components/sections/Facts";
import { Hero } from "@/components/sections/Hero";
import { QuieterDetails } from "@/components/sections/QuieterDetails";
import { getDownloads } from "@/lib/releases";

export default async function Home() {
  const options = await getDownloads();
  return (
    <>
      <Splash />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="wrap">
        <Hero />
        <Facts />
        <DayTour />
        <QuieterDetails />
        <DownloadSection options={options} />
        <CommonQuestions />
        <SiteFooter />
      </main>
    </>
  );
}
