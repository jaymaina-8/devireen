export const metadata = {
  title: 'Testimonials | Devireen Enterprise',
};

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500">Manage customer reviews and feedback.</p>
        </div>
      </div>
      <div className="bg-white p-12 rounded-xl border border-gray-200 text-center shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Testimonials Module</h3>
        <p className="text-gray-500">This module is scheduled for a future update. You will be able to collect and manage customer reviews here.</p>
      </div>
    </div>
  );
}
