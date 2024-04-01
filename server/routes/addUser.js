const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Role = require("../models/role")
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token || '';
    console.log("Token:",token);
    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if (decoded.roleId !== 1) {
            return res.status(403).json({ message: "Access denied. Not an admin." });
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

const validateUserWithoutPin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        branch: Joi.string().optional().label("Branch"),
        contact: Joi.string().optional().label("Contact"),
        roleId: Joi.number().optional().label("Role"),
    });
    return schema.validate(data);
};


const validateUpdatedUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().optional().label("Username"),
        branch: Joi.string().optional().label("Branch"),
        contact: Joi.string().optional().label("Contact"),

    });
    return schema.validate(data);
};





// search and sort options
// /users?role=admin
// users?branch=DNCC
// /users?sort=asc
// /users?role=admin&branch=DNCC&sort=desc
router.get("/", async (req, res) => {
    try {
        // Define filter and sort options based on query parameters
        let filter = {};
        let sort = {};

        // Filter users by role
        if (req.query.role) {
            filter.role = req.query.role;
        }

        // Filter users by branch
        if (req.query.branch) {
            filter.branch = req.query.branch;
        }

        // Sort users by userId in ascending order
        if (req.query.sort === 'asc') {
            sort.userId = 1;
        }

        // Sort users by userId in descending order
        if (req.query.sort === 'desc') {
            sort.userId = -1;
        }

        // Fetch users based on filter and sort options
        const users = await User.find(filter).sort(sort);

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


//GET method to get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//GET all available roles
router.get("/roles", async (req, res) => {
    try {
        // Fetch all roles from the Role collection
        const roles = await Role.find(); // Use .find() with no arguments to get all documents
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// GET a specific user's details by userId
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST method for creating a new user
router.post("/", async (req, res) => {
    try {
        const { error } = validateUserWithoutPin(req.body); // Use the new validation function here
        if (error) return res.status(400).json({ message: error.details[0].message });


        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: "User already exists." });

        // Validate the role
        const roleExists = await Role.findOne({ roleId: req.body.roleId || 4 });
        if (!roleExists) return res.status(400).json({ message: "Role not found." });

        const highestUserIdUser = await User.findOne({}, {}, { sort: { 'userId': -1 } });
        let userId = highestUserIdUser && highestUserIdUser.userId > 0 ? parseInt(highestUserIdUser.userId) + 1 : 1;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({
            userId: userId,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            roleId: req.body.roleId || 4,
            branch: req.body.branch,
            pin: 111,
            contact: req.body.contact
        });

        await user.save();
        res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;

//PUT method to update a specific user with userId
router.put("/:userId", async (req, res) => {
    try {
        const { error } = validateUpdatedUser(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update user properties other than email and password
        user.username = req.body.username || user.username;
        user.contact = req.body.contact || user.contact; 
        user.branch = req.body.branch || user.branch;

        await user.save();
        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// DELETE method for deleting a user
router.delete("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.deleteOne({ userId: req.params.userId });
        res.status(204).json({sucess: true, message: "user deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



//GET method for role update for a specific user
router.put('/:userId/roles', verifyAdmin, async (req, res) => {
    try {
        const { roleId } = req.body;
        // Optionally, validate the new role exists
        const roleExists = await Role.findOne({ roleId });
        if (!roleExists) {
            return res.status(404).json({ message: "Role not found." });
        }

        const user = await User.findOneAndUpdate(
            { userId: req.params.userId }, // Assuming userId is stored directly in the User model
            { $set: { roleId: roleId } },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ success: true, message: "User role updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});





module.exports = router;
