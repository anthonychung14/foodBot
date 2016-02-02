var pg = require('pg');
var Promise = require('bluebird');
var connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/foodbot';

module.exports = {

	retrieveUserMeals : function (req, res){
		// Get User ID
		var uid = req.params.id;

		// Create Postgress Connection
		var client = new pg.Client(connectionString);
		client.connect();

		// Create Query for all recipes user has created or seenRecipe
		var userRecipesQuery = client.query("SELECT * FROM UserRecipes WHERE profileid = " + uid + "") ;

		// Instantiate User Recipes
		var userRecipes = [];

		// Push all db userRecipes to userRecipes Array
		userRecipesQuery.on("row", function (row) {
			userRecipes.push(row);
		});

		// After recieved all User Recipes
		userRecipesQuery.on("end", function () {

			// Instantiate Created and Eaten Array
			var created = [];
			var seenRecipe = {liked:[] , rejected:[]};

			// Sort All Recipes By seenRecipe & Created
			userRecipes.forEach(function (recipe){
				console.log("recipe:",recipe)
				if (recipe.created){
					created.push(recipe)
				}
				else {
					if (recipe.liked) {
						seenRecipe.liked.push(recipe)
					}
					seenRecipe.rejected.push(recipe)
				}
			})

			// Send userRecipes to Client
			var sendData = {seenRecipe: seenRecipe.liked}
			res.send(sendData);
		});
	},

	addUserMeal : function (req, res){
		console.log("adding users likes/dislikes",req.body)
		var rejected = req.body.rejected;
		var liked = req.body.liked;

		// In case reject passed as string: '[1,2]' instead of array
		if (typeof rejected === "string") {
			rejected = JSON.parse(rejected)
			liked = JSON.parse(liked)
		}

		// console.log(typeof rejected)
		// Get Client Data
		var uid = req.params.id;


		// Create Postgress Connection
		var client = new pg.Client(connectionString);
		client.connect();

		// Create Insert Meal Query
		if (rejected) {
			rejected.forEach(function (recipeID) {
			// console.log("trying...", recipe)
				// var recipeID = recipe.mealID;
				var addLikedQuery = client.query("INSERT INTO userRecipes (profileid, recipeid, created, liked) VALUES (" + uid + "," + recipeID + ", false, false)") ;

			});		
		}

		if (liked) {
			liked.forEach(function (recipeID) {
				// var recipeID = recipe.mealID;
				var addRejectedQuery = client.query("INSERT INTO userRecipes (profileid, recipeid, created, liked) VALUES (" + uid + "," + recipeID + ", false, true)") ;
			});
		}

		// var liked = req.body.liked;
		res.sendStatus(200);
		//TODO: MAKE RESTRAINT TO NOT ALLOW DUPLICATES

		// After Added Send Client 200 Status Code
		// res.sendStatus(409)

	}
};
