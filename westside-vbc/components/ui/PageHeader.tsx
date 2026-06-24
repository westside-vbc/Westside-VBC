import Image from "next/image"

interface PageHeaderProps {
  title: string
  imageSrc: string
  imageClassName?: string
}

export default function PageHeader({ title, imageSrc, imageClassName = "object-center" }: PageHeaderProps) {
  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center bg-black overflow-hidden pt-20">
      <Image alt={title} className={`object-cover opacity-50 ${imageClassName}`} fill priority src={imageSrc} />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  )
}