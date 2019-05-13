// import in friends
var friends = require("../data/friends");

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
module.exports = function(app) {
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    //store user info
    let user = req.body;

    // parseInt for the scores
    for (var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default match is the first, but the result will be the one with the minumum difference in scores
    let bestFriendIndex = 0;
    let minimumDifference = 40;

    // start a for loop to compare user and friend [i]
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }
      // if lower min, change the best friend index and set as new minimum for next iteration
      if (totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // after finding a match, add user to array
    friends.push(user);

    // send the best friend to the browser
    res.json(friends[bestFriendIndex]);
    
  });
};
