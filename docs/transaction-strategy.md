# Transaction Strategy

To ensure data integrity, especially as we scale into ecommerce and inventory management, certain operations must be atomic. If any part of the operation fails, the entire transaction must roll back.

## When to use Transactions

### 1. Quote Creation

- **Operation**: A customer creates a Quote.
- **Steps**:
  1. Create the `quotes` record.
  2. Create multiple `quote_items` records referencing the quote.
- **Consistency**: If the quote is created but the items fail to insert, we end up with an orphaned empty quote. This must be wrapped in a transaction or executed as an atomic RPC function in Supabase.

### 2. Future Order Creation

- **Operation**: Converting an Approved Quote to an Order.
- **Steps**:
  1. Insert `orders` record.
  2. Insert `order_items`.
  3. Mark `quotes` as FULFILLED.
- **Consistency**: The quote must not be marked FULFILLED if the order fails to create.

### 3. Inventory Updates

- **Operation**: A user purchases an item.
- **Steps**:
  1. Decrease `inventory` stock count.
  2. Create `order` record.
- **Consistency**: Inventory must never be decremented without a matching successful order.

## Implementation Details

Since Supabase operates over a REST API (PostgREST), typical multi-statement transactions are not natively supported directly from the client SDK.

**Our Strategy:**

1. **RPC Functions**: For complex transactions (like Quote -> Order conversion), we will write PostgreSQL functions (`CREATE FUNCTION ... LANGUAGE plpgsql`) that execute the operations atomically within the database. The Server Actions will call `supabase.rpc('function_name')`.
2. **Server Action Safeguards**: For simpler relational inserts, we may use optimistic inserts with manual rollback/cleanup in the Server Action `catch` block if an RPC is not justified.
