const express = require("express")
const methodOverride = require("method-override");
const app = express()
const PORT = 3000
const fruits = require("./models/fruits")

//Middleware - app.use
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(express.static("public"));


// console.log("fruits", fruits)

//   const makeFruits = (fruits) => {
//       let after = ""
//       for (let i = 0; i < fruits.length; i++){
//           after += fruits[i].name
//       }
//       return after
//   }

//Index
app.get("/fruits", (req, res) => {
    res.render("index.ejs", { allFruits: fruits, })
})

//New
app.get("/fruits/new", (req, res) => {
    res.render("new.ejs");
  });

//* Show
app.get("/fruits/:num", (req, res) => {
    const num = req.params.num;
    const fruit = fruits[num];
    res.render("show.ejs", { fruit });
  });

//* Create
app.post("/fruits", (req, res) => {
    console.log(req.body);
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect("/fruits");
  });

  //Delete
  app.delete("/fruits/:id", (req, res) => {
    fruits.splice(req.params.id, 1)
    res.redirect("/fruits")
  })

//Edit
app.get("/fruits/:id/edit", (req, res) => {
  const id = req.params.id
  const fruit = fruits[id]
  res.render(
    "edit.ejs", { id, fruit }
  )
})

//Update
app.put("/fruits/:index", (req, res) => {
  if (req.body.readyToEat === "on") {
    // if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true;
  } else {
    // if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false;
  }
fruits[req.params.index] = req.body
  res.redirect("/fruits")
})

app.listen(PORT, () => {
    console.log("listening on port", PORT)
})