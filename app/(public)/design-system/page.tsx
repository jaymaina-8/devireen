import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { EmptyState } from "@/components/ui/EmptyState";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryCard } from "@/components/products/CategoryCard";
import { SearchBar } from "@/components/navigation/SearchBar";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { Pagination } from "@/components/navigation/Pagination";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto p-8 space-y-12 pb-24">
      <h1 className="text-3xl font-bold mb-8 text-text-main">Design System Component Library</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Typography & Colors</h2>
        <div className="flex gap-4">
          <div className="w-24 h-24 bg-primary rounded-md flex items-center justify-center text-primary-50 font-medium">Primary</div>
          <div className="w-24 h-24 bg-surface border border-border-strong rounded-md flex items-center justify-center text-text-main font-medium">Surface</div>
          <div className="w-24 h-24 bg-success text-white rounded-md flex items-center justify-center font-medium">Success</div>
          <div className="w-24 h-24 bg-warning text-white rounded-md flex items-center justify-center font-medium">Warning</div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Buttons</h2>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Badges</h2>
        <div className="flex gap-4 items-center">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Standard Input</Label>
              <Input placeholder="Placeholder..." />
            </div>
            <div className="space-y-1">
              <Label>Error Input</Label>
              <Input error defaultValue="Invalid Data" />
            </div>
            <div className="space-y-1">
              <Label>Select</Label>
              <Select>
                <option>Option 1</option>
                <option>Option 2</option>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Textarea</Label>
              <Textarea placeholder="Type your message here..." />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Domain Components</h2>
        <div className="space-y-8">
          <SearchBar />
          
          <Breadcrumbs items={[{ label: "Products", href: "#" }, { label: "Office Supplies", href: "#" }, { label: "Paper" }]} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <CategoryCard name="Office Equipment" count={120} />
            <CategoryCard name="Stationery" count={45} />
          </div>

          <div className="w-64">
            <ProductCard 
              id="1" 
              name="Premium A4 Printing Paper - 500 Sheets" 
              sku="PAP-A4-500" 
              price={750} 
              stockStatus="IN_STOCK" 
            />
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-border-subtle pb-2 text-text-main">Feedback & Table</h2>
        <div className="space-y-8 max-w-4xl">
          <EmptyState icon={Search} title="No results found" description="Try adjusting your search filters to find what you're looking for." action={<Button variant="outline">Clear Filters</Button>} />
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>PEN-001</TableCell>
                <TableCell>Bic Ballpoint Pen</TableCell>
                <TableCell>KSh 20</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>PAP-002</TableCell>
                <TableCell>A4 Ream</TableCell>
                <TableCell>KSh 750</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <Pagination currentPage={1} totalPages={5} />
        </div>
      </section>
    </div>
  );
}
