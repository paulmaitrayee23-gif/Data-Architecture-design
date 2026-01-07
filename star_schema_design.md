Section 1: Schema Overview

FACT TABLE: fact_sales
Grain: One row per product per order line item
Business Process: Sales transactions

Measures (Numeric Facts):
- quantity_sold: Number of units sold
- unit_price: Price per unit at time of sale
- discount_amount: Discount applied
- total_amount: Final amount (quantity × unit_price - discount)

Foreign Keys:
- date_key → dim_date
- product_key → dim_product
- customer_key → dim_customer

DIMENSION TABLE: dim_date
Purpose: Date dimension for time-based analysis
Type: Conformed dimension
Attributes:
- date_key (PK): Surrogate key (integer, format: YYYYMMDD)
- full_date: Actual date
- day_of_week: Monday, Tuesday, etc.
- month: 1-12
- month_name: January, February, etc.
- quarter: Q1, Q2, Q3, Q4
- year: 2023, 2024, etc.
- is_weekend: Boolean


DIMENSION TABLE: dim_product
Purpose:
Stores descriptive information about products for product-level analysis.
Type:Conformed dimension

Attributes:
- product_key (PK): Surrogate key
- product_id: Source system product identifier
- product_name: Name of the product
- category: Product category (e.g., Electronics, Clothing)
- brand: Product brand
- price: Listed price of the product
- stock: Available stock quantity

DIMENSION TABLE: dim_customer

Purpose:Stores customer-related information to analyze sales by customer demographics.
Type:Conformed dimension

Attributes:
- customer_key (PK): Surrogate key
- customer_id: Source system customer identifier
- first_name: Customer first name
- last_name: Customer last name
- email: Customer email address
- phone: Customer contact number
- city: Customer city
- state: Customer state
- country: Customer country


Section 2: Design Decisions
1. Granularity Choice:
The fact table is designed at transaction line-item level to capture each product sold per order. This allows detailed analysis such as product-level sales, customer buying patterns, and time-based trends.

2. Use of Surrogate Keys:
Surrogate keys are used instead of natural keys to ensure consistency, improve join performance, and handle changes in source system identifiers without impacting historical data.

3. Support for Drill-Down and Roll-Up:
The star schema design supports drill-down (day → month → year) and roll-up operations through the date dimension, enabling efficient analytical queries.


Section 3: Sample Data Flow

Source Transaction:
Order:#101
Customer: John Doe
Product: Laptop
Quantity: 2
Unit Price: 5000
Order Date: 15-01-2024

During ETL processing, the transaction data is transformed and dimension
keys are looked up. The order date maps to date_key = 20240115 from dim_date,
the product “Laptop” maps to product_key = 5 from dim_product, and the
customer “John Doe” maps to customer_key = 12 from dim_customer.

Becomes in Data Warehouse (fact_sales):

fact_sales:
{
  date_key: 20240115,
  product_key: 5,
  customer_key: 12,
  quantity_sold: 2,
  unit_price: 5000,
  total_amount: 10000
}