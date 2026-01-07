1. Entity–Relationship Description 
Entity: Customers
Purpose:Stores customer-related information used to track who places orders.
Attributes:
customer_id – Unique identifier for each customer (Primary Key)
first_name – Customer’s first name
last_name – Customer’s last name
city – City where the customer resides
state – State where the customer resides
customer_segment – Segment of the customer (e.g., Regular, Premium)
Relationships: One customer can place many orders (1:M relationship with Orders table)

Entity: Products
Purpose:Stores product-related information available for sale.
Attributes:
product_id – Unique identifier for each product (Primary Key)
product_name – Name of the product
category – Category to which the product belongs
price – Price of the product
Relationships: One product can appear in many sales transactions (1:M relationship with Sales table)

Entity: Orders
Purpose: Stores order-level information for each customer purchase.
Attributes:
order_id – Unique identifier for each order (Primary Key)
customer_id – References the customer who placed the order (Foreign Key)
order_date – Date when the order was placed
total_amount – Total value of the order
Relationships:Each order is placed by one customer
Each order can contain multiple products through sales records

Entity: Sales
Purpose:Stores transactional details of products sold within each order.
Attributes:
sales_id – Unique identifier for each sales record (Primary Key)
order_id – References the related order (Foreign Key)
product_id – References the product sold (Foreign Key)
quantity – Number of units sold
total_amount – Total revenue generated from the sale
Relationships:Each sales record belongs to one order
Each sales record refers to one product.


2. Normalization Explanation (3NF)
The database design follows Third Normal Form (3NF) to ensure data integrity and reduce redundancy. In the first normal form (1NF), all tables contain atomic values, meaning there are no repeating groups or multi-valued attributes. Each column stores a single piece of information, and each record is uniquely identifiable using a primary key.
The design satisfies second normal form (2NF) by ensuring that all non-key attributes are fully dependent on the entire primary key. For example, in the Sales table, attributes such as quantity and total_amount depend only on the sales_id and not partially on product_id or order_id.
Third normal form (3NF) is achieved by removing transitive dependencies. Customer details such as name and city are stored only in the Customers table and not repeated in Orders or Sales. Similarly, product-related details are stored only in the Products table. This separation avoids update anomalies, insertion anomalies, and deletion anomalies.
If customer information changes, it needs to be updated in only one place. New products can be added without affecting existing sales records, and deleting a sales record does not remove product or customer information. Thus, the schema is efficient, consistent, and well-structured according to 3NF principles.


### Customers Table 

| customer_id  | first_name | last_name | city        |
| C1           | Rahul      | Sharma    | Bangalore   |    
| C2           | Priya      | Patel     | Mumbai      | 

### Products Table  

| product_id | product_name        | category     | price   |
| P001       | Samsung Galaxy s21  | Electronics  | 45999.0 |
| P002       | Nike Running Shoes  | Fashion      | 3499.0  |

### Orders Table 

| order_id | customer_id | order_date | total_amount |
| 1001     | 1           | 2024-01-15 | 45999.0      |
| 1002     | 2           | 2024-01-16 | 5998.0       |

### Sales Table 

| sales_id | order_id | product_id  | quantity  | total_amount  |
| 1        | 1001     | P001        | 1         | 45999.0       |
| 2        | 1002     | P002        | 2         | 3499.0        |