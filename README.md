# FlexiMart Data Architecture Project

**Student Name:** Maitrayee Paul
**Student ID:** bitsom_ba_25071163
**Email:** paulmaitrayee23@gmail.com
**Date:** 07/01/2026

## Project Overview
This project demonstrates an end-to-end data architecture for an e-commerce platform named FlexiMart.It covers transactional data ingestion, NoSQL analysis, and dimensional data warehouse modeling to support analytical and business reporting use cases.


## Repository Structure
├── part1-database-etl/
│   ├── etl_pipeline.py
│   ├── schema_documentation.md
│   ├── business_queries.sql
│   └── data_quality_report.txt
├── part2-nosql/
│   ├── nosql_analysis.md
│   ├── mongodb_operations.js
│   └── products_catalog.json
├── part3-datawarehouse/
│   ├── star_schema_design.md
│   ├── warehouse_schema.sql
│   ├── warehouse_data.sql
│   └── analytics_queries.sql
└── README.md

## Technologies Used

- Python 3.x,
- pandas,
- mysql-connector-python
- MySQL 8.0 
- MongoDB 6.0


### Database Setup

```bash
# Create databases
mysql -u root -p -e "CREATE DATABASE fleximart;"
mysql -u root -p -e "CREATE DATABASE fleximart_dw;"

# Run Part 1 - ETL Pipeline
python part1-database-etl/etl_pipeline.py

# Run Part 1 - Business Queries
mysql -u root -p fleximart < part1-database-etl/business_queries.sql

# Run Part 3 - Data Warehouse
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_schema.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/warehouse_data.sql
mysql -u root -p fleximart_dw < part3-datawarehouse/analytics_queries.sql


### MongoDB Setup

mongosh < part2-nosql/mongodb_operations.js
```

##  Key Learnings
This project helped me understand how raw transactional data is transformed into analytical-ready data using ETL pipelines. I learned the importance of star schema design, surrogate keys, and granularity in data warehouses. I also gained hands-on experience with MongoDB aggregation pipelines and business-oriented analytical queries.

## Challenges Faced

1. Designing the correct grain for the fact table was challenging initially, but understanding transaction-level granularity helped solve it.
2. Writing MongoDB aggregation pipelines required careful handling of nested arrays, which was resolved by step-by-step testing in MongoDB Compass.

