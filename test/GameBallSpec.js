describe("GameBall", function() {
  var ball;

  beforeEach(function() {
    ball = new GameBall();
  });

  it("should have bombTime of zero after initialization", function() {
    expect(ball.bombTimer).toEqual(0);
  });

  it("should have bombMode disabled after initialization", function() {
    expect(ball.isBomb()).toEqual(false);
  });
});