import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <PageHeader title="Join Westside" imageSrc="/images/hero-contact.jpg" />

      <section className="py-24 bg-primary text-neutral text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-block bg-neutral text-primary font-black text-4xl uppercase px-6 py-2 mb-8 tracking-tight">
            Contact Us!
          </div>
          <p className="text-xl text-neutral/90 leading-relaxed font-light">
            Have questions about our training schedules, membership registration, or partnership opportunities? Our team is ready to assist you.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:contact@westsidevbc.com" className="bg-accent text-neutral font-bold px-10 py-4 rounded-full hover:brightness-110 transition-all text-lg shadow-lg">
              Email Us
            </a>
            <a href="https://instagram.com/westside.vbc" target="_blank" rel="noreferrer" className="bg-transparent text-neutral border-2 border-neutral/40 px-10 py-4 rounded-full hover:bg-neutral hover:text-primary transition-all text-lg font-bold">
              DM on Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}