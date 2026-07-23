-- Admin full access to catalog tables
CREATE POLICY "Admin catalog full access" ON public.categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin catalog full access" ON public.brands FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin catalog full access" ON public.products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin catalog full access" ON public.product_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
