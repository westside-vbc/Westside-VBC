import PageHeader from "@/components/ui/PageHeader"
import Image from "next/image"
import { ClipboardList } from "lucide-react"

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Schedule" imageSrc="/schedule.jpg" />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">Jadwal & Pendaftaran</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Pilih sesi yang sesuai dengan targetmu. Mau fokus asah skill atau langsung seru-seruan di lapangan? Amankan slotmu sekarang!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          <div className="bg-neutral rounded-3xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">WEEKDAY FUN MATCH<br/>SMA MDC</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Kamis</li>
              <li><strong className="text-primary">Tipe:</strong> Fun Match</li>
              <li><strong className="text-primary">Waktu:</strong> 19.00 - 21.00 (7 - 9PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 20.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA MDC</li>
            </ul>
          </div>

          <div className="bg-neutral rounded-3xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">SUNDAY SESSIONS<br/>SMA CIPUTRA / MDC</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Minggu</li>
              <li><strong className="text-primary">Tipe:</strong> Private Coaching</li>
              <li><strong className="text-primary">Waktu:</strong> 12.00 - 14.00 (12 - 2PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 35.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA Ciputra / MDC</li>
            </ul>
          </div>

          <div className="bg-neutral rounded-3xl p-8 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="flex items-center gap-4 mb-6 border-b pb-6">
              <div className="bg-accent text-neutral rounded-full w-12 h-12 flex items-center justify-center font-bold text-xs">VBC</div>
              <h3 className="text-xl font-bold text-primary leading-tight">WEEKEND<br/>FUN MATCH</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong className="text-primary">Sesi:</strong> Minggu</li>
              <li><strong className="text-primary">Tipe:</strong> Open Play</li>
              <li><strong className="text-primary">Waktu:</strong> 14.00 - 18.00 (12 - 2PM)</li>
              <li><strong className="text-primary">HTM:</strong> Rp. 20.000 / Person</li>
              <li><strong className="text-primary">Lokasi:</strong> SMA Ciputra / MDC</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-12">Cara Mendaftar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-4 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md">
                <Image src="/insta.png" alt="Instagram" fill className="object-cover" />
              </div>
              <h4 className="font-bold text-primary mb-2">Follow & DM Instagram</h4>
              <p className="text-xs text-gray-500 max-w-50">@westside.vbc untuk meminta link Whatsapp</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16 mb-4 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md">
                <Image src="/wa.png" alt="WhatsApp" fill className="object-cover" />
              </div>
              <h4 className="font-bold text-primary mb-2">Join our Community</h4>
              <p className="text-xs text-gray-500 max-w-50">Join grup Whatsapp Westside untuk list nama dan info lainnya</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-2xl mb-4 text-white hover:scale-105 transition-transform duration-300 shadow-md">
                <ClipboardList className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-primary mb-2">List your name</h4>
              <p className="text-xs text-gray-500 max-w-50">List nama di group Whatsapp untuk ikut acara Westside</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}