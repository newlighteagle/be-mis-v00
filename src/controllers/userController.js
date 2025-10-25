import prisma from "../prismaClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
};

// REGISTER
export const registerUser = async (req, res) => {
    const { name, email, password, role, group } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role, // default "unregistered"
                group,
            },
        });

        const token = generateToken(newUser);

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, group: newUser.group },
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// LOGIN
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        // JWT payload includes name and role
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// TEST route
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, group: true } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};