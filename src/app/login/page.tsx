import { RippleShaders } from "@/components/ui/shadcn-io/ripple-shaders";
import { Navbar } from "@/components/ui/nav";

import '@styles/main.css';
import '@styles/nav.css';

import '@scripts/discord_redirect'

export default function Home() {
  return (
    <>
    <Navbar />
      <div className="shaders_body">
        <RippleShaders
          speed={-0.8}
          intensity={1}
          colorScheme={[0.1, 0.2, 0.2]}
          rippleCount={8}
          frequency={0.8}
          className="shaders"
        />
      </div>
    </>
  );
}

/*

<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    </main>
  </div>

*/