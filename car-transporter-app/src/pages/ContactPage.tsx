// src/pages/ContactPage.tsx
import { Link } from "react-router-dom";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">კონტაქტი</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            დახმარებისთვის ან შეკითხვებისთვის დაგვიკავშირდით ნებისმიერ დროს. 
            ჩვენი გუნდი მზადაა დაგეხმაროთ ყოველ ნაბიჯზე.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ContactInfo />
          <ContactForm />
        </div>

        {/* FAQ Section */}
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ხშირად დასმული კითხვები
          </h2>
          <p className="text-gray-600 mb-6">
            ვერ ნახეთ თქვენი შეკითხვის პასუხი? იხილეთ FAQ სექცია
          </p>
          <Link 
            to="/faq"
            className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
          >
            FAQ-ის ნახვა
          </Link>
        </div>
      </div>
    </div>
  );
}