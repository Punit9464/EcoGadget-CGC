# EcoGadget

EcoGadget is a platform designed to promote responsible e-waste management by enabling users to buy, sell, and recycle electronic devices in an eco-friendly way.

## Features
- **List and Buy Electronics** – Users can post and purchase second-hand gadgets.
- **E-Waste Recycling** – Provides information on proper e-waste disposal and nearby recycling centers.
- **Eco-Friendly Disposal Guide** – Educates users on sustainable disposal methods to minimize environmental impact.
- **Device Condition Assessment** – Allows users to describe and assess the condition of devices before listing.
- **Secure Transactions** – Ensures safe buying and selling with user authentication.
- **Search and Filter Options** – Helps users find the right products quickly.
- **User-Friendly Interface** – Simple navigation for an easy experience.
- **Borrow & Repair Section** – Encourages users to borrow or repair gadgets instead of discarding them, promoting the 3Rs (Reduce, Reuse, Recycle).
- **Razorpay Payment Gateway** – Integrated for secure and seamless transactions.

## Vector Search & MongoDB Implementation
- **Vector Search** – Implemented for efficient and accurate product searches, allowing users to find similar gadgets based on attributes and descriptions.
- **Gemini API for Embeddings** – The Gemini API is used to generate vector embeddings for product names and descriptions, improving search accuracy.
- **Unique Search Pipeline** – A specialized pipeline is defined in the backend to handle vector search efficiently, enabling searches based on product name, description, and similarity.
- **MongoDB** – Used as the primary database for scalable and flexible data storage, ensuring smooth handling of product listings, user data, and transactions.
- **Embedding Storage** – The generated embeddings are stored in the products collection of MongoDB upon new product insertion.
- **Search Scope** – Currently, vector search is implemented in the "Buy Products" section.
- **Indexing & Optimization** – MongoDB indexes are used to enhance query performance, making searches and filters more efficient.


### Images
![Vector_Search1](https://i.ibb.co/67PjMj2X/SS1.jpg)
![Vector_Search2](https://i.ibb.co/1JrvYH0M/SS2.jpg)


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/EcoGadget.git
   ```
2. Navigate to the project folder:
   ```bash
   cd EcoGadget
   ```
3. Navigate to the frontend and backend folders separately and install dependencies:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Run the project in development mode:
   ```bash
   npm run dev
   ```

## Tech Stack
- Frontend: React, Tailwind CSS, Next js
- Backend: Node.js, Express
- Database: MongoDB

## Contributors
- [Mansi-Narang](https://github.com/Mansi-Narang)
- [Punit9464](https://github.com/Punit9464)
- [vanshshar](https://github.com/vanshshar)