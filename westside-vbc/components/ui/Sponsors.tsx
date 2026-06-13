import Image from "next/image"

export default function Sponsors() {
  return (
    <section className="py-24 bg-white text-center border-t border-neutral/10 mt-auto">
      <h2 className="text-3xl font-black text-[#00274c] mb-12 uppercase tracking-tight">Official Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 mb-24 px-6">
        <Image src="/mdc.png" alt="MDC" width={200} height={100} className="object-contain h-20 w-auto" />
        <Image src="/ue.png" alt="Universal Ethnic" width={200} height={100} className="object-contain h-20 w-auto" />
      </div>

      <h2 className="text-3xl font-black text-[#00274c] mb-12 uppercase tracking-tight">Sponsors</h2>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 max-w-5xl mx-auto px-6 opacity-90">
        <Image src="/elken.png" alt="Elken Coffee" width={150} height={80} className="object-contain h-16 w-auto" />
        <Image src="/toko12.png" alt="Toko 12" width={150} height={80} className="object-contain h-16 w-auto" />
        <Image src="/cap.png" alt="Sinde" width={150} height={80} className="object-contain h-16 w-auto" />
        <Image src="/rose.png" alt="Rose Brand" width={150} height={80} className="object-contain h-16 w-auto" />
        <Image src="/shoo.png" alt="Shoovior" width={150} height={80} className="object-contain h-16 w-auto" />
        <Image src="/tugu.png" alt="Tugu" width={150} height={80} className="object-contain h-16 w-auto" />
      </div>
    </section>
  )
}