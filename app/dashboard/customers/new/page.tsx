import { CustomerForm } from '@/components/dashboard/customers/CustomerForm';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Add New Customer | Devireen Enterprise OS',
};

export default function NewCustomerPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
          <Users className="h-6 w-6 text-purple-600" /> Create B2B Customer
          Account
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Register a new client company or retail customer in your enterprise
          CRM.
        </p>
      </div>

      <CustomerForm />
    </div>
  );
}
