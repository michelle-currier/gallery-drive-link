export default function Contact() {
  return (
    <div className="min-h-screen custom-gradient-bg">
      <div className="container flex flex-col p-8 pb-20 gap-16 sm:p-20 mx-auto">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <h1 className="text-4xl font-parkinsans">Contact</h1>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg mb-6">
              Michelle Currier - Graphic Designer & Visual Artist
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Email:</h3>
                <a href="mailto:michelle@example.com" className="text-teal-600 hover:text-blue-500 transition-colors">
                  michelle@example.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Phone:</h3>
                <a href="tel:+1234567890" className="text-teal-600 hover:text-blue-500 transition-colors">
                  (123) 456-7890
                </a>
              </div>
              <div>
                <h3 className="font-semibold">Social Media:</h3>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">Instagram</a>
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">LinkedIn</a>
                  <a href="#" className="text-teal-600 hover:text-blue-500 transition-colors">Behance</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}