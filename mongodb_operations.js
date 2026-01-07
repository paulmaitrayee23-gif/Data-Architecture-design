// MongoDB shell script (mongosh)


// Operation 1: Load Data
// (Data already loaded using Python notebook)
// This file contains MongoDB shell queries only.


// Operation 2: Basic Query
// Find all products in "Electronics" category
// with price less than 5000
// Return only name, price, stock


db.product_catalog.find(
  {
    category: "Electronics",
    price: { $lt: 5000 }
  },
  {
    _id: 0,
    name: 1,
    price: 1,
    stock: 1
  }
);


// Operation 3: Review Analysis
// Find products with average rating >= 4.0

db.product_catalog.aggregate([
  {
    $addFields: {
      avg_rating: { $avg: "$reviews.rating" }
    }
  },
  {
    $match: {
      avg_rating: { $gte: 4.0 }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      category: 1,
      avg_rating: { $round: ["$avg_rating", 2] }
    }
  }
]);


// Operation 4: Update Operation
// Add a new review to product "ELEC001"

db.product_catalog.updateOne(
  { product_id: "ELEC001" },
  {
    $push: {
      reviews: {
        user: "U999",
        rating: 4,
        comment: "Good value",
        date: new Date()
      }
    }
  }
);


// Operation 5: Complex Aggregation
// Calculate average price by category
// Return category, avg_price, product_count
// Sort by avg_price descending

db.product_catalog.aggregate([
  {
    $group: {
      _id: "$category",
      avg_price: { $avg: "$price" },
      product_count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$_id",
      avg_price: { $round: ["$avg_price", 2] },
      product_count: 1
    }
  },
  {
    $sort: { avg_price: -1 }
  }
]);