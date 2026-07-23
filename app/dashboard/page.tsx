import { createClient } from '@/lib/supabase/server';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Package, Users, FileText, Settings, Tags, DollarSign, Activity, AlertCircle, Plus, ShoppingCart, Star, Database, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format, startOfDay } from 'date-fns';

export const metadata = {
  title: 'Dashboard Overview | Devireen Enterprise',
};

async function getDashboardData() {
  const supabase = await createClient();
  const today = startOfDay(new Date()).toISOString();

  // Fetch counts
  const [
    { count: productsCount },
    { count: categoriesCount },
    { count: customersCount },
    { count: testimonialsCount },
    { count: todayQuotesCount },
    { count: pendingQuotesCount },
    // Mock orders count since we don't have orders table yet, or if we do
    // actually, let's just query quotes as we did before, and we will build an orders table.
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }).is('deleted_at', null),
    supabase.from('categories').select('*', { count: 'exact', head: true }).is('deleted_at', null),
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
  ]);

  // Fetch recent activity
  const { data: recentActivity } = await supabase
    .from('activity_logs')
    .select('*, profiles:user_id(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(10);

  const { data: productsMissingImages } = await supabase
    .from('products')
    .select('id, name')
    .is('images', null)
    .limit(5);

  const { data: productsMissingPrices } = await supabase
    .from('products')
    .select('id, name')
    .is('price', null)
    .limit(5);

  const { data: productsMissingDescriptions } = await supabase
    .from('products')
    .select('id, name')
    .is('description', null)
    .limit(5);

  // System Status
  const systemStatus = {
    database: true,
    auth: true,
    storage: true,
  };

  return {
    stats: {
      products: productsCount || 0,
      categories: categoriesCount || 0,
      customers: customersCount || 0,
      testimonials: testimonialsCount || 0,
      todayQuotes: todayQuotesCount || 0,
      pendingQuotes: pendingQuotesCount || 0,
      orders: 0, // Placeholder until orders feature is built
    },
    recentActivity: recentActivity || [],
    productsMissingImages: productsMissingImages || [],
    productsMissingPrices: productsMissingPrices || [],
    productsMissingDescriptions: productsMissingDescriptions || [],
    systemStatus,
  };
}

export default async function DashboardOverview() {
  const data = await getDashboardData();

  const getActivityIcon = (type: string, action: string) => {
    if (action === 'deleted' || action === 'blocked') return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (type === 'product') return <Package className="w-4 h-4 text-indigo-500" />;
    if (type === 'quote') return <FileText className="w-4 h-4 text-blue-500" />;
    if (type === 'order') return <ShoppingCart className="w-4 h-4 text-green-500" />;
    if (type === 'customer') return <Users className="w-4 h-4 text-purple-500" />;
    return <Activity className="w-4 h-4 text-gray-500" />;
  };

  const getActivityMessage = (log: any) => {
    const user = log.profiles?.full_name || 'System';
    switch (log.action) {
      case 'created': return `${user} created a new ${log.entity_type}`;
      case 'updated': return `${user} updated a ${log.entity_type}`;
      case 'deleted': return `${user} deleted a ${log.entity_type}`;
      case 'blocked': return `${user} blocked a ${log.entity_type}`;
      case 'approved': return `${user} approved a ${log.entity_type}`;
      case 'rejected': return `${user} rejected a ${log.entity_type}`;
      case 'fulfilled': return `${user} fulfilled a ${log.entity_type}`;
      default: return `${user} performed ${log.action} on ${log.entity_type}`;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Operations Center</h1>
        <p className="text-gray-500 mt-1">Monitor activity, pending items, and manage your business.</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Today's Quotes" value={data.stats.todayQuotes.toString()} icon={<FileText className="w-5 h-5 text-blue-600" />} />
        <DashboardCard title="Pending Quotes" value={data.stats.pendingQuotes.toString()} icon={<AlertCircle className="w-5 h-5 text-orange-600" />} />
        <DashboardCard title="Orders" value={data.stats.orders.toString()} icon={<ShoppingCart className="w-5 h-5 text-green-600" />} />
        <DashboardCard title="Total Products" value={data.stats.products.toString()} icon={<Package className="w-5 h-5 text-indigo-600" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (2/3) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Actions */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center"><Plus className="w-5 h-5 mr-2 text-gray-400" /> Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard/products/new"><Button className="rounded-full px-6"><Plus className="w-4 h-4 mr-2" /> Add Product</Button></Link>
              <Link href="/dashboard/quotes/new"><Button variant="secondary" className="rounded-full px-6 bg-gray-100 text-gray-900 hover:bg-gray-200"><FileText className="w-4 h-4 mr-2" /> New Quote</Button></Link>
              <Link href="/dashboard/customers/new"><Button variant="secondary" className="rounded-full px-6 bg-gray-100 text-gray-900 hover:bg-gray-200"><Users className="w-4 h-4 mr-2" /> Add Customer</Button></Link>
              <Link href="/dashboard/settings"><Button variant="secondary" className="rounded-full px-6 bg-gray-100 text-gray-900 hover:bg-gray-200"><Settings className="w-4 h-4 mr-2" /> Edit Settings</Button></Link>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center"><Activity className="w-5 h-5 mr-2 text-gray-400" /> Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {data.recentActivity.map((log: any) => (
                <div key={log.id} className="p-5 px-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getActivityIcon(log.entity_type, log.action)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{getActivityMessage(log)}</div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <span className="capitalize">{log.entity_type}</span>
                      <span className="mx-2">•</span>
                      {format(new Date(log.created_at), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </div>
              ))}
              {data.recentActivity.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No recent activity found. Once actions are taken, they will appear here.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8">
          
          {/* Action Required Alerts */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">Action Required</h2>
            </div>
            <div className="divide-y divide-gray-100">
              
              {data.productsMissingImages.length > 0 && (
                <div className="p-5 bg-orange-50/50">
                  <div className="flex items-center text-orange-800 mb-3">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <h3 className="text-sm font-semibold">Missing Images</h3>
                  </div>
                  <div className="space-y-2">
                    {data.productsMissingImages.map((product: any) => (
                      <Link key={product.id} href={`/dashboard/products/${product.id}`} className="flex justify-between items-center text-sm hover:text-blue-600 transition-colors">
                        <span className="text-gray-700 truncate mr-2">{product.name}</span>
                        <span className="text-blue-600 flex-shrink-0 text-xs font-medium">Fix &rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {data.productsMissingPrices.length > 0 && (
                <div className="p-5 bg-orange-50/50">
                  <div className="flex items-center text-orange-800 mb-3">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <h3 className="text-sm font-semibold">Missing Prices</h3>
                  </div>
                  <div className="space-y-2">
                    {data.productsMissingPrices.map((product: any) => (
                      <Link key={product.id} href={`/dashboard/products/${product.id}`} className="flex justify-between items-center text-sm hover:text-blue-600 transition-colors">
                        <span className="text-gray-700 truncate mr-2">{product.name}</span>
                        <span className="text-blue-600 flex-shrink-0 text-xs font-medium">Fix &rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {data.productsMissingDescriptions.length > 0 && (
                <div className="p-5 bg-orange-50/50">
                  <div className="flex items-center text-orange-800 mb-3">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <h3 className="text-sm font-semibold">Missing Descriptions</h3>
                  </div>
                  <div className="space-y-2">
                    {data.productsMissingDescriptions.map((product: any) => (
                      <Link key={product.id} href={`/dashboard/products/${product.id}`} className="flex justify-between items-center text-sm hover:text-blue-600 transition-colors">
                        <span className="text-gray-700 truncate mr-2">{product.name}</span>
                        <span className="text-blue-600 flex-shrink-0 text-xs font-medium">Fix &rarr;</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {data.productsMissingImages.length === 0 && data.productsMissingPrices.length === 0 && data.productsMissingDescriptions.length === 0 && (
                <div className="p-6 text-center text-gray-500 flex flex-col items-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                  <p className="text-sm">All products are fully configured!</p>
                </div>
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5 flex items-center"><Database className="w-5 h-5 mr-2 text-gray-400" /> System Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Database</span>
                <span className="flex items-center text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Online</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Authentication</span>
                <span className="flex items-center text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Storage Buckets</span>
                <span className="flex items-center text-green-700 font-semibold bg-green-50 px-2.5 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div> Online</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
