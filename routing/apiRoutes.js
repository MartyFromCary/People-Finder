const friendList = require("../data/friends");

module.exports = app => {
  app.get("/api/friends", (req, res) => {
    res.json(friendList);
  });

  app.post("/api/friends", ({ body }, res) => {
    body.scores = body.scores.map(S => parseInt(S));
    if (friendList.length == 0) {
      res.json({
        name: "UNKNOWN",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpRlN16IYgpKdC-MfVUSDkXHz2H0wSs8z-Tp7-jckbMJxQlBN3"
      });
    }
    var bestIndex = -1;
    var bestScore = 100;
    friendList.forEach((friend, friendIndex) => {
      var localScore = friend.scores.reduce(
        (sum, score, scoreIndex) =>
          sum + Math.abs(score - body.scores[scoreIndex]),
        0
      );

      if (localScore < bestScore) {
        bestScore = localScore;
        bestIndex = friendIndex;
      }
    });

    friendList.push(body);
    const { name, photo } = friendList[bestIndex];
    res.send({ name, photo });
  });
};
