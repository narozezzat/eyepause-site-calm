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
  const version = options[0]?.version;

  return (
    <>
      <Splash />
      <div className="wrap">
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          <Hero />
          <DownloadSection options={options} />
          <DayTour />
          <QuieterDetails />
          <Facts />
        </main>
        <SiteFooter version={version} />
      </div>
    </>
  );
}
