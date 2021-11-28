import bcrypt from "bcryptjs";
const users = [
    {
        username: "Admin",
        email: "landonmckell@test.com",
        password: bcrypt.hashSync("123Password", 10),
        bio: "I am a man of simple means that means to rule the world one day.",
        image: "no image",
        isAdmin: true,
    },
];
export default users;
