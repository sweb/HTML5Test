var MockObject = Rectangle.extend({
  init: function(x, y, w, h) {
    this._super(x, y);
    this.w = w;
    this.h = h;
  }
});

describe("AbstractBall", function() {
  var abstractBall;

  beforeEach(function() {
    abstractBall = new AbstractBall(100,100,0,-3);
  });

  it("should detect collision with object", function() {
    var object = new MockObject(70, 70, 50, 50);
    expect(abstractBall.detectObjectCollision(object)).toEqual(true);
  });

  it("should not move into object from bottom", function() {
    var object = new MockObject(100, 100, 50, 50);
    abstractBall = new AbstractBall(110, 155,0,-3);
    expect(abstractBall.detectObjectCollision(object)).toEqual(true);
    expect(abstractBall.y).toEqual(152 + abstractBall.radius);
  });

  it("should not move into object from top", function() {
    var object = new MockObject(100, 100, 50, 50);
    abstractBall = new AbstractBall(110, 95,0,3);
    expect(abstractBall.detectObjectCollision(object)).toEqual(true);
    expect(abstractBall.y).toEqual(98 - abstractBall.radius);
  });
});