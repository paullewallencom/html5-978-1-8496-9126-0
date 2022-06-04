/*!
 * Box2D Car Game Example
 * http://makzan.net/html5-games/car-game/
 *
 * This is an example game for the book HTML5 Games Development: A Beginning Guide.
 *
 *
 * mak@makzan.net
 *
 *
 */

(function(){

	// Box2D alias
	var b2Vec2 = Box2D.Common.Math.b2Vec2
	, b2AABB = Box2D.Collision.b2AABB
	, b2BodyDef = Box2D.Dynamics.b2BodyDef
	, b2Body = Box2D.Dynamics.b2Body
	, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
	, b2Fixture = Box2D.Dynamics.b2Fixture
	, b2World = Box2D.Dynamics.b2World
	, b2MassData = Box2D.Collision.Shapes.b2MassData
	, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
	, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
	, b2DebugDraw = Box2D.Dynamics.b2DebugDraw
	, b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef
	, b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
	;

	// Our logic

	// The variables needed for the car game.
	var carGame = {
	}

	var canvas;
	var ctx;
	var canvasWidth;
	var canvasHeight;
	var pxPerMeter = 30; // 30 pixels = 1 meter
	var shouldDrawDebug = false;

	function initGame() {

		carGame.world = createWorld();

		console.log("The world is created. ",carGame.world);

		// create the ground
		createGround(250, 270, 250, 25, 0);

		// create a ramp
		createGround(500, 250, 65, 15, -10);
		createGround(600, 225, 80, 15, -20);
		createGround(1100, 250, 100, 15, 0);

		// create a destination ground
		carGame.gamewinWall = createGround(1200, 215, 15, 25, 0);

		// create a car
		carGame.car = createCarAt(50, 210);

		showDebugDraw();

		// get the reference of the context
		canvas = document.getElementById('game');
		ctx = canvas.getContext('2d');
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);

		// setup the gameloop
		setInterval(updateWorld, 1/60);

		$(document).keydown(function(e){
			switch(e.keyCode) {
				case 39: // right arrow key to apply force towards right
					var force = new b2Vec2(300, 0);
					carGame.car.ApplyForce(force, carGame.car.GetWorldCenter());
					return false;
					break;
				case 37: // left arrow key to apply force towards left
					var force = new b2Vec2(-300, 0);
					carGame.car.ApplyForce(force, carGame.car.GetWorldCenter());
					return false;
					break;
			}
		});
	};

	function showDebugDraw() {
		shouldDrawDebug = true;

		//setup debug draw
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById('game').getContext('2d'));
		debugDraw.SetDrawScale(pxPerMeter);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

		carGame.world.SetDebugDraw(debugDraw);

		carGame.world.DrawDebugData();
	}

	function updateWorld() {
		// Move the physics world 1 step forward.
		carGame.world.Step(1/60, 10, 10);

		// Display the build-in debug drawing.
		if (shouldDrawDebug) {
			carGame.world.DrawDebugData();
		}

		// Clear previous applied force.
		carGame.world.ClearForces();

		checkCollision();
	}

	function checkCollision() {
		// loop all contact list to check if the car hits the winning wall
		for (var cn = carGame.world.GetContactList(); cn != null; cn = cn.GetNext()) {
			var body1 = cn.GetFixtureA().GetBody();
			var body2 = cn.GetFixtureB().GetBody();
			if ((body1 === carGame.car && body2 === carGame.gamewinWall) ||
				(body2 === carGame.car && body1 === carGame.gamewinWall))
			{
				if (cn.IsTouching()) {
					console.log("Level Passed!");
				}
			}

		}
	}

	// Create and return the Box2D world.
	function createWorld() {
		// Define the gravity
		var gravity = new b2Vec2(0, 10);

		// set to allow sleeping object
		var allowSleep = true;

		// finally create the world with the size, graivty and sleep object parameter.
		var world = new b2World(gravity, allowSleep);

		return world;
	}

	// create a static ground body.
	function createGround(x, y, width, height, rotation) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.x = x /pxPerMeter;
		bodyDef.position.y = y /pxPerMeter;
		bodyDef.angle = rotation * Math.PI / 180;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(width/pxPerMeter, height/pxPerMeter);
		fixDef.restitution = 0.4;
		fixDef.friction = 3.5;

		// create the body from the definition.
		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}

	function createCarAt(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		// car body
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = 50/pxPerMeter;
		bodyDef.position.y = 210/pxPerMeter;

		fixDef.shape = new b2PolygonShape();
		fixDef.density = 1.0;
		fixDef.friction = 1.5;
		fixDef.restitution = 0.4;
		fixDef.shape.SetAsBox(40/pxPerMeter, 20/pxPerMeter);

		carBody = carGame.world.CreateBody(bodyDef);

		carBody.CreateFixture(fixDef);

		// creating the wheels
		var wheelBody1 = createWheel(x-25, y+20);
		var wheelBody2 = createWheel(x+25, y+20);

		// create a joint to connect left wheel with the car body
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(carBody, wheelBody1, new b2Vec2( (x-25)/pxPerMeter ,  (y+20)/pxPerMeter ));
		carGame.world.CreateJoint(jointDef);

		// create a joint to connect right wheel with the car body
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(carBody, wheelBody2, new b2Vec2( (x+25)/pxPerMeter ,  (y+20)/pxPerMeter ));
		carGame.world.CreateJoint(jointDef);

		return carBody;

	}

	function createWheel(x, y) {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = x/pxPerMeter;
		bodyDef.position.y = y/pxPerMeter;

		fixDef.shape = new b2CircleShape();
		fixDef.shape.SetRadius(10/pxPerMeter);

		fixDef.density = 1.0;
		fixDef.restitution = 0.1;
		fixDef.friction = 4.3;

		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}

	// temporary function
	function createBox() {
		var bodyDef = new b2BodyDef;
		var fixDef = new b2FixtureDef;

		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = 50/pxPerMeter;
		bodyDef.position.y = 210/pxPerMeter;

		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(20/pxPerMeter, 20/pxPerMeter);
		var body = carGame.world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);

		return body;
	}



	// After all the definition, we init the game.
	initGame();

})();
