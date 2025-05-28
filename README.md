
## 🌍 WanderLust

WanderLust is a full-featured web application inspired by Airbnb, built using the MERN stack (MongoDB, Express, Node.js) with EJS as the templating engine. It allows users to register, list vacation spots, upload images, leave reviews, and visualize locations with interactive maps.

### 🛠️ Tech Stack & Tools

* **Backend**: Node.js, Express.js, MongoDB, Mongoose
* **Authentication & Security**: Passport.js, Passport-Local, Passport-Local-Mongoose, express-session, connect-mongo, connect-flash
* **Frontend**: EJS, Bootstrap 5
* **File Uploads**: Multer, Cloudinary
* **Maps**: Mapbox
* **Validation**: Joi
* **Utilities**: method-override, dotenv

### ✨ Features

* **User Authentication**: Secure login and signup with session management.
* **Listings Management**: Create, read, update, and delete vacation spot listings with image uploads.
* **Reviews**: Users can leave reviews on listings.
* **Interactive Maps**: Visualize listing locations using Mapbox.
* **Responsive Design**: Mobile-friendly interface with Bootstrap 5.

### 🚀 Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gauravag18/Wanderlust.git
   cd Wanderlust
   ```



2. **Install dependencies**:

   ```bash
   npm install
   ```



3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET=your_cloudinary_api_secret
   ```



4. **Run the application**:

   ```bash
   npm start
   ```



The application will be accessible at `http://localhost:8080`.

### 📁 Project Structure

* **`controllers/`**: Route handler functions.
* **`models/`**: Mongoose schemas and models.
* **`routes/`**: Express route definitions.
* **`views/`**: EJS templates for rendering pages.
* **`public/`**: Static assets like CSS and images.
* **`utils/`**: Utility functions and custom error classes.
* **`app.js`**: Main application file.

### 📄 License

This project is licensed under the MIT License.

