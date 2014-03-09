describe("PlayerBat", function() {
  var bat;

  beforeEach(function() {
    bat = new PlayerBat(100, 100);
  });

  it("should be able to move left", function() {
    bat.motionToLeft(true);
    expect(bat.isMovingLeft).toEqual(true);
  });

  it("should not be able to move left when left border is reached", function() {
    bat = new PlayerBat(0, 100);
    bat.motionToLeft(true);
    expect(bat.isMovingLeft).toEqual(false);
  });

  it("should be able to move right", function() {
    bat.motionToRight(true);
    expect(bat.isMovingRight).toEqual(true);
  });

  it("should not be able to move right when right border is reached", function() {
    bat = new PlayerBat(GAME_WIDTH, 100);
    bat.motionToRight(true);
    expect(bat.isMovingRight).toEqual(false);
  });

});