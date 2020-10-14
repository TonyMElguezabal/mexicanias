app.get("/", (req, res) => {
    res.status(200).json({ message: "Hola al home" });
  });
  app.get("/about", (req, res) => {
    res.status(200).json({ message: "About mexicanias" });
  });
  app.get("/items", (req, res) => {
    res.status(200).json({ message: "items" });
  });
  app.get("/user", (req, res) => {
    res.status(200).json({ message: "USERS" });
  });