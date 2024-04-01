require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connection = require("./db");
const userRoutes = require("./routes/signup");
const authRoutes = require("./routes/login");
//const passwordResetRoutes = require("./routes/passwordReset");
const changePasswordRoutes = require('./routes/changePassword');
const addUser = require("./routes/addUser");
const rbacRoutes = require("./routes/rbac");
const vehicleRoutes = require("./routes/dataEntry");
const stsRoutes = require('./routes/sts');
const landfillRoutes = require('./routes/landfill');
const distanceMap = require('./routes/OptimiziedRoute');
const statRoutes = require('./routes/Statistics');
const optimizedRoutes = require('./routes/GenerateBill');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));
app.use(cookieParser());

// Database connection
connection();

// Routes
app.use("/signup", userRoutes);
app.use("/auth", authRoutes);
app.use('/auth/change-password', changePasswordRoutes);
//app.use("/auth", passwordResetRoutes); 
app.use("/users", addUser);
app.use("/rbac", rbacRoutes);
app.use("/vehicles", vehicleRoutes);
app.use('/api/sts', stsRoutes);
app.use('/api/landfill', landfillRoutes);
//app.use('/api/distance', distanceRoutes);
app.use('/api/view-map',distanceMap);
app.use('/api/optimized-route',optimizedRoutes);
app.use('/api/bills', statRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
