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

	function initGame() {

		carGame.world = createWorld();

		console.log("The world is created. ",carGame.world);

		// get the reference of the context
		canvas = document.getElementById('game');
		ctx = canvas.getContext('2d');
		canvasWidth = parseInt(canvas.width);
		canvasHeight = parseInt(canvas.height);
	};

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


	// After all the definition, we init the game.
	initGame();

})();
