import Link from "next/link";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              Bienvenido a TutorAI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Tu tutor personalizado de inglés con interfaces no convencionales. 
              Mejora tus habilidades de conversación con IA avanzada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/chat/practice"
                className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Comenzar a Practicar
              </Link>
              <Link
                href="/dashboard"
                className="border border-brand-primary text-brand-primary px-6 py-3 rounded-lg font-medium hover:bg-brand-primary hover:text-white transition-colors duration-200"
              >
                Ver Progreso
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
