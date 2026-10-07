import { BreathRing } from "@/components/brand/BreathRing";

export default function Loading() {
  return (
    <div className="grid min-h-screen min-h-dvh place-items-center" role="status">
      <BreathRing label="Loading EyePause" mode="loop" />
    </div>
  );
}
