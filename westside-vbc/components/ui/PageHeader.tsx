import Image from "next/image"

interface PageHeaderProps {
  title: string
  imageSrc?: string
}

export default function PageHeader({ 
  title, 
  imageSrc = "/west.png" 
}: PageHeaderProps) {
  return (
    <section className="relative w-full h-[60vh] flex items-center justify-center pt-20 bg-primary overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`${title} Header Background`}
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-40 grayscale-20"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-primary/80 to-background z-10"></div>

      <div className="relative z-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black text-neutral uppercase drop-shadow-lg">
          {title}
        </h1>
      </div>
    </section>
  )
}