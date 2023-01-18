const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/add", (req, res) => {
  // VERIFICAR SI EL USUARIO ESTA LOGGEADO
  if (req.user === undefined) {
    res.redirect("/signin");
  } else res.render("./links/add");
  ////////////////////////////////////////
});
router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = {
    title,
    url,
    description,
    user_id: req.user.id,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash("success", "Enlace agregado exitosamente");
  res.redirect("/links");
});

router.get("/", async (req, res) => {
  // VERIFICAR SI EL USUARIO ESTA LOGGEADO
  if (req.user === undefined) {
    res.redirect("/signin");
  } else {
    ////////////////////////////////////////
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [
      req.user.id,
    ]);
    res.render("links/list", { links });
  }
});

router.get("/delete/:id", async (req, res) => {
  // VERIFICAR SI EL USUARIO ESTA LOGGEADO
  if (req.user === undefined) {
    res.redirect("/signin");
  }
  ////////////////////////////////////////
  else {
    const { id } = req.params;
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);
    req.flash("success", "Enlace eliminado exitosamente");
    res.redirect("/links");
  }
});

router.get("/edit/:id", async (req, res) => {
  if (req.user === undefined) {
    res.redirect("/signin");
  }
  ////////////////////////////////////////
  else {
    const { id } = req.params;
    const link = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
    res.render("links/edit", { link: link[0] });
  }
});

router.post("/edit/:id", async (req, res) => {
  if (req.user === undefined) {
    res.redirect("/signin");
  }
  ////////////////////////////////////////
  else {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
      title,
      description,
      url,
    };
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
    req.flash("success", "Enlace actualizado");
    res.redirect("/links");
  }
});
module.exports = router;
