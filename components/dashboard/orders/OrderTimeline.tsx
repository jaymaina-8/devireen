'use client';

import { CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react';
import { format } from 'date-fns';

interface OrderTimelineProps {
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export function OrderTimeline({ status, paymentStatus, createdAt }: OrderTimelineProps) {
  const steps = [
    {
      id: 'created',
      title: 'Order Created',
      description: 'Order placed by customer',
      date: new Date(createdAt),
      icon: <Package className="w-5 h-5 text-gray-500" />,
      completed: true,
      current: false,
    },
    {
      id: 'payment',
      title: 'Payment Confirmed',
      description: paymentStatus === 'PAID' ? 'Payment received' : 'Awaiting payment',
      date: paymentStatus === 'PAID' ? new Date(createdAt) : null, // Mock date
      icon: paymentStatus === 'PAID' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-orange-500" />,
      completed: paymentStatus === 'PAID',
      current: paymentStatus !== 'PAID' && status !== 'CANCELLED',
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Preparing order for shipment',
      date: status === 'PROCESSING' || status === 'SHIPPED' || status === 'DELIVERED' ? new Date(createdAt) : null,
      icon: <Package className={`w-5 h-5 ${status === 'PROCESSING' ? 'text-blue-500' : 'text-gray-500'}`} />,
      completed: status === 'SHIPPED' || status === 'DELIVERED',
      current: status === 'PROCESSING',
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Order is on the way',
      date: status === 'SHIPPED' || status === 'DELIVERED' ? new Date() : null,
      icon: <Truck className={`w-5 h-5 ${status === 'SHIPPED' ? 'text-blue-500' : 'text-gray-500'}`} />,
      completed: status === 'DELIVERED',
      current: status === 'SHIPPED',
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Order completed',
      date: status === 'DELIVERED' ? new Date() : null,
      icon: <CheckCircle2 className={`w-5 h-5 ${status === 'DELIVERED' ? 'text-green-500' : 'text-gray-500'}`} />,
      completed: status === 'DELIVERED',
      current: status === 'DELIVERED',
    }
  ];

  if (status === 'CANCELLED') {
    steps.push({
      id: 'cancelled',
      title: 'Cancelled',
      description: 'Order was cancelled',
      date: new Date(),
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      completed: true,
      current: true,
    });
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h2>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {steps.map((step, stepIdx) => (
            <li key={step.id}>
              <div className="relative pb-8">
                {stepIdx !== steps.length - 1 ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${step.completed ? 'bg-green-50' : step.current ? 'bg-blue-50' : 'bg-gray-50'}`}>
                      {step.icon}
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className={`text-sm font-medium ${step.completed || step.current ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{step.description}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {step.date ? format(step.date, 'MMM d, h:mm a') : '--'}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
