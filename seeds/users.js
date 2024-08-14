const mongoose = require("mongoose");
const User = require("../database/models/user.model");
const connectDB = require("../database/connection");

connectDB();

const usersData = [
  { username: "john_doe", email: "john.doe@example.com" },
  { username: "jane_smith", email: "jane.smith@example.com" },
  { username: "alice_jones", email: "alice.jones@example.com" },
];

async function seedUsers() {
  try {
    await User.deleteMany({});

    const usersWithHashedPasswords = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await User.hashPassword("Azerty10");
        return new User({ ...user, password: hashedPassword }).save();
      })
    );

    console.log("Utilisateurs créés avec succès :", usersWithHashedPasswords);
  } catch (error) {
    console.error("Erreur lors de la création des utilisateurs :", error);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();
