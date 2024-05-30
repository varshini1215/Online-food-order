var express=require("express");
var router=express.Router();
const jwt=require("jsonwebtoken")
const SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpdmF2YXJzaGluaTEyN0BnbWFpbC5jb20iLCJpYXQiOjE3MTE0NDczNDh9.EdQDAznI96Df1XBcjV1Gh1vbXt9nrRJSkAjshkMOsj0"
var restaurant=require("./controller/restaurant")
var location=require("./controller/location");
var meal=require("./controller/meal");
var filter=require("./controller/filter");
var userid=require("./controller/user");
var menuitem=require("./controller/menu");

router.get("/getAllRestaurant",restaurant.fetchrestaurant);
router.get("/getAllLocation",location.fetchlocation);
router.get("/getAllMealTypes",meal.fetchmeal);
router.get("/getAllRestaurantByLocation/:city",filter.cityFunc);
router.get("/getAllRestaurantByid/:_id",filter.idFunc);
router.get("/getRestaurantByLocationId/:location_id",filter.locidFunc);
router.get("/getRestaurantByMealTypeId/:mealtype_id",filter.mealTypeidFunc);
router.get("/getAllMenuItems/:name",menuitem.MenuApi);
router.post("/generateToken", (req, res) => {
    // Assuming req.body contains user information (e.g., username, user id, etc.)
    const userData = req.body;

    // Generate JWT token using the provided user data and the secret key
    const token = jwt.sign(userData, SECRET_KEY);

    // Send the generated token as a response
    res.json({ token });
});
router.post("/getUserId",userid.signup);
router.post("/getlogin",userid.login);
router.post("/filter",restaurant.filtering);
module.exports=router;