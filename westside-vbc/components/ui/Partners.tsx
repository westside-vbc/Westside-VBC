import Image from "next/image";

export default function Partners() {
  return (
    <section className="py-20 bg-neutral border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-black text-primary uppercase mb-10 tracking-tight">
          Official Partners
        </h3>
        <div className="flex flex-wrap justify-center gap-12 items-center mb-16 opacity-80 hover:opacity-100 transition-opacity">
          {/* Replace with actual partner logos */}
          <div className="h-16 w-32 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/partner-mdc.png" alt="MDC" fill className="object-contain" />
          </div>
          <div className="h-16 w-32 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/partner-ue.png" alt="Universal Ethnic" fill className="object-contain" />
          </div>
        </div>

        <h3 className="text-2xl font-black text-primary uppercase mb-10 tracking-tight">
          Sponsors
        </h3>
        <div className="flex flex-wrap justify-center gap-10 items-center opacity-80 hover:opacity-100 transition-opacity">
          {/* Replace with actual sponsor logos */}
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-elken.png" alt="Elken Coffee" fill className="object-contain" />
          </div>
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-toko12.png" alt="Toko 12" fill className="object-contain" />
          </div>
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-sinde.png" alt="Sinde" fill className="object-contain" />
          </div>
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-rosebrand.png" alt="Rose Brand" fill className="object-contain" />
          </div>
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-shoovior.png" alt="Shoovior" fill className="object-contain" />
          </div>
          <div className="h-14 w-28 relative grayscale hover:grayscale-0 transition-all">
            <Image src="/images/sponsor-tugu.png" alt="Tugu" fill className="object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}