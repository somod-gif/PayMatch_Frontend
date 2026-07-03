import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { APP_NAME, APP_DESCRIPTION, COMPANY } from "@/constants";

export const metadata: Metadata = {
  title: `About ${APP_NAME} - ${COMPANY.legalName}`,
  description: `Learn more about ${APP_NAME} and how we're transforming payment reconciliation for Nigerian SMEs.`,
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen">
        {/* Hero */}
        <section className="pt-40 pb-20 md:pb-32 bg-gradient-to-b from-slate-50 to-white">
          <Container>
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
                About <span className="text-teal-700">{APP_NAME}</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We help Nigerian SMEs automatically track and reconcile customer bank transfer payments
                using Nomba Virtual Accounts.
              </p>
            </div>
          </Container>
        </section>

        {/* Story */}
        <section className="py-20 md:py-32 bg-white">
          <Container size="md">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Story</h2>
                <p className="text-slate-600 leading-relaxed">
                  {APP_NAME} was born out of a simple observation: Nigerian SMEs spend countless hours
                  manually matching bank transfers to invoices. Business owners check WhatsApp for payment
                  confirmations, maintain error-prone spreadsheets, and struggle with unknown payers.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Built during the DevCareer × Nomba Hackathon 2026, {APP_NAME} leverages Nomba Virtual
                  Accounts to assign unique payment accounts to each customer. When a customer pays, the
                  transaction is automatically matched to the correct invoice — eliminating manual
                  reconciliation entirely.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl p-8 border border-teal-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                  <p className="text-slate-600">
                    To eliminate payment reconciliation friction for every Nigerian business by
                    providing a seamless, automated matching layer powered by Nomba.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl p-8 border border-teal-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-slate-600">
                    A world where businesses never have to wonder who paid or chase payment
                    confirmations — perfect reconciliation for everyone.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
                <h3 className="text-2xl font-bold mb-4">Built with</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Next.js 15", "NestJS", "TypeScript", "PostgreSQL", "Tailwind CSS", "Framer Motion", "Nomba APIs", "Lucide React"].map(
                    (tech) => (
                      <div
                        key={tech}
                        className="px-4 py-3 bg-white/10 rounded-lg text-sm font-medium text-slate-200"
                      >
                        {tech}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="text-center py-8">
                <p className="text-slate-500 text-sm">
                  {COMPANY.legalName} &middot; {COMPANY.location} &middot; &copy; {COMPANY.year}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}