import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { registerValidation, loginValidation } from "./validations.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";
import adminRouter from "./router/admin-router.js";

const app = express();
app.use(express.json({ extended: true }));
app.use(cors());

mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0.jclxyr0.mongodb.net/register-redux?retryWrites=true&w=majority"
    )
    .then(() => console.log("Db ok"))
    .catch((err) => console.log("Db error: ", err))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "avatarUrl") {
            cb(null, "uploads/avatar/");
        } else if (file.fieldname === "image") {
            cb(null, "uploads/posts/");
        } else {
            cb(new Error("Invalid file type"))
        }
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name =
            file.originalname.replace(ext, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, name + ext);
    }
});

const fileFilter = function (req, file, cb) {
    if (file.fieldname === "avatarUrl") {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only avatar with JPEG,JPG or PNG format are allowed."));
    } else if (file.fieldname === "image") {
      const filetypes = /jpeg|jpg|png/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error("Only avatar with JPEG,JPG or PNG format are allowed."));
    } else {
      cb(new Error("Invalid file type"));
    }
  };

const upload = multer({ storage, fileFilter });
app.use("/uploads", express.static("uploads"));


//? user route
app.post(
    "/api/v1/users/register",
    upload.single("avatarUrl"),
    registerValidation,
    handleValidationErrors,
    UserController.register
);

app.post(
    "/api/v1/users/login",
    loginValidation,
    handleValidationErrors,
    UserController.login
);

app.get("/api/v1/users/me", checkAuth, UserController.getMe);


//? admin panel route
app.use("/admin", adminRouter);

//? post panel
app.post("/api/v1/post/add", upload.single("image"), PostController.createPost);
app.get("/api/v1/post", PostController.getPost);
app.get("/api/v1/post/all", PostController.getAllPost);
app.delete("/api/v1/post/delete/:id", PostController.deletePost);

app.patch("/api/v1/post/update/:id", upload.single("image"), PostController.updatePost);
app.get("/api/v1/post/:id", PostController.getPostById);

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`listening on post ${PORT}`);
});