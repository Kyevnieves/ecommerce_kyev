const express = require("express");
const router = express.Router();
const passport = require("passport");
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");

router.get("/signup", (req, res) => {
  if (req.user !== undefined) {
    res.status(204).redirect("/shop");
  } else res.render("auth/signup");
});

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/shop",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/login", (req, res) => {
  if (req.user !== undefined) {
    res.redirect("/shop");
  } else res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/shop",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

router.post("/checkout", async (req, res, next) => {
  const id = req.user.id;
  const {
    firstname,
    lastname,
    username,
    telefono,
    ciudad,
    indicaciones,
    codigopostal,
    estado,
    region,
  } = req.body;
  const nuevosDatos = {
    firstname,
    lastname,
    username,
    telefono,
    indicaciones,
    codigopostal,
    estado,
    region,
    ciudad,
  };
  if (req.user === undefined) {
    console.log("Debes identificarte");
  } else {
    await pool.query("UPDATE usuarios set ? WHERE id = ?", [nuevosDatos, id]);
  }
});
module.exports = router;
