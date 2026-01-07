insert into fleximart_dw.dim_product (product_id, product_name, category, unit_price) 
select product_id, product_name, category, price  price from fleximart.products;


insert into fleximart_dw.dim_customer (customer_id, customer_name, city)
select customer_id, CONCAT(first_name,'',last_name) as customer_name, city from fleximart.customers;



insert into fleximart_dw.dim_date(
date_key,
full_date,
day_of_week,
day_of_month,
month,
month_name,
quarter,
year,
is_weekend
)
with recursive dates as(
select DATE('2024-01-01') as dte
union all
select date_add(dte, INTERVAL 1 day) from dates where dte < '2025-01-01'
)
select date_format(dte, '%Y%m%d') as date_key,
dte as full_date,
dayname(dte) as day_of_week,
day(dte) as day_of_month,
month(dte) as month,
monthname(dte) as month_name,
CONCAT('Q', quarter(dte)) as quarter,
year(dte) as year,
case
	when dayofweek(dte) in (1,7) then 1
    else 0
end
from dates;


insert into fleximart_dw.fact_sales(
date_key,
product_key,
customer_key,
quantity_sold,
unit_price,
discount_amount,
total_amount
)
select
	d.date_key,
    p.product_key,
    c.customer_key,
    o.quantity,
    o.unit_price,
    0 as discount_amount,
    o.total_amount
from fleximart.orders o
JOIN dim_date d
on d.full_date = o.order_date
join dim_product p
on p.product_id = o.product_id
join dim_customer c
on c.customer_id = o.customer_id;