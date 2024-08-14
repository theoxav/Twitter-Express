const mongoose = require("mongoose");
const User = require("../database/models/user.model");
const Database = require("../database/connection");

Database.getInstance();

const usersData = [
  { username: "john_doe", email: "johndoe@example.com" },
  { username: "jane_smith", email: "janesmith@example.com" },
  { username: "alice_jones", email: "alicejones@example.com" },
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
