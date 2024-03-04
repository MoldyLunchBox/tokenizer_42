import Matter, { Events, Engine, World, Bodies } from "matter-js";

export class MatterJsModules {

    objects = { engine: null, render: null, runner: null, mouse: null, mouseConstraint: null };

    paddleSide = ""
    matterContainer = document.querySelector("#matter-Container")
    aspect = 9 / 16
    constructor(maxSpeed) {
        this.maxSpeed = maxSpeed
        this.oldDim = { w: this.matterContainer.clientWidth, h: this.matterContainer.clientHeight }
        this.RAR = this.matterContainer.clientWidth / 375   // i dont know whatt his is actually called so i named it relative aspect ration, its the relation between the origine dimmentions (375/ 375 * 19/6) and the initial dimmentions of the div
        this.obj = this.saveMeasurements({ width: this.matterContainer.clientWidth, height: this.matterContainer.clientHeight })
        this.colors = {
            leftP: "#86efac",
            rightP: "#a78bfa",
            wall: "#FFEBEB",
            ball: "#ede9fe",
            background: "#ADE4DB",
        }
        this.modules = {
            Engine: Matter.Engine,
            Render: Matter.Render,
            Runner: Matter.Runner,
            Bodies: Matter.Bodies,
            Body: Matter.Body,
            Composite: Matter.Composite,
            Mouse: Matter.Mouse,
            MouseConstraint: Matter.MouseConstraint,
        }
        this.bodies = {
            ball: this.modules.Bodies.circle(this.obj.divWidth / 2, this.obj.divHeight / 2, this.obj.ball.radius * this.RAR, {mass: 1  , label: "ball", collisionFilter: { group: -1, }, restitution: 1.15, friction: 0, frictionAir: 0, density: 10, render: { fillStyle: this.colors.ball } }),
            circleA: this.modules.Bodies.circle(this.obj.divWidth / 2, this.obj.divHeight / 2, 40 * this.RAR, { isStatic: true, collisionFilter: { group: -1, }, render: { fillStyle: this.colors.wall }, label: "circleA" }),
            circleB: this.modules.Bodies.circle(this.obj.divWidth / 2, this.obj.divHeight / 2, 35 * this.RAR, { isStatic: true, collisionFilter: { group: -1, }, label: "circleB" }),
            circleC: this.modules.Bodies.circle(this.obj.divWidth / 2, this.obj.divHeight / 2, 5 * this.RAR, { isStatic: true, collisionFilter: { group: -1, }, render: { fillStyle: this.colors.wall }, label: "circleC" }),
            centerLine: this.modules.Bodies.rectangle(this.obj.divWidth / 2, this.obj.divHeight / 2, 5 * this.RAR, this.obj.divWidth, { isStatic: true, collisionFilter: { group: -1, }, render: { fillStyle: this.colors.wall }, label: "centerLine" }),

            leftPaddle: this.modules.Bodies.rectangle(this.getPaddleDim().width, this.obj.leftPaddle.y, this.getPaddleDim().width, this.getPaddleDim().height, {
                label: "lPadel",
                isStatic: true, render: {
                    fillStyle: this.colors.leftP
                }
            }),
            rightPaddle: this.modules.Bodies.rectangle(this.obj.divWidth - this.getPaddleDim().width, this.obj.divHeight - this.getPaddleDim().height, this.getPaddleDim().width, this.getPaddleDim().height, {
                label: "rPadel",
                isStatic: true, render: {
                    fillStyle: this.colors.rightP
                }
            }),
            myPaddle: this.modules.Bodies.rectangle(0, 0, 0, 0, { isStatic: true }),
            othersPaddle: this.modules.Bodies.rectangle(0, 0, 0, 0, { isStatic: true }),
            ground: this.modules.Bodies.rectangle(this.obj.ground.x, this.obj.ground.y, this.obj.ground.width, this.obj.ground.height, {
                label: "ground",
                isStatic: true,
                render: {
                    fillStyle: this.colors.wall
                }
            }),
            roof: this.modules.Bodies.rectangle(this.obj.roof.x, this.obj.roof.y, this.obj.roof.width, this.obj.roof.height, {
                label: "roof",
                isStatic: true,
                render: {
                    fillStyle: this.colors.wall
                }
            }),
            wall: this.modules.Bodies.rectangle(this.obj.wallRight.x, this.obj.wallRight.y, this.obj.wallRight.width, this.obj.wallRight.height, {
                label: "wallRight",
                isStatic: true,
                render: {
                    fillStyle: this.colors.wall
                }
            }),
            wallLeft: this.modules.Bodies.rectangle(this.obj.wallLeft.x, this.obj.wallLeft.y, this.obj.wallLeft.width, this.obj.wallLeft.height, {
                label: "wallLeft",
                isStatic: true,
                render: {
                    fillStyle: this.colors.wall
                }
            }),

        }

        this.bodies.myPaddle =  this.bodies.leftPaddle
        this.bodies.othersPaddle = this.bodies.rightPaddle
    }


    getPaddleDim() {
        const widthRatio = this.matterContainer.clientWidth / 375;
        const heightRatio = this.matterContainer.clientHeight / 375 * (this.aspect)
        return { width: this.obj.leftPaddle.height * widthRatio, height: this.obj.leftPaddle.width * widthRatio }
    }

    saveMeasurements(div) {
        const obj = {
            divWidth: div.width,
            divHeight: div.height,
            ball: { x: div.height / 2, y: div.width / 2, radius: 10 },
            roof: { x: div.width / 2, y: div.height, width: div.width, height: 20 },
            ground: { x: div.width / 2, y: 0, width: div.width, height: 20 },

            wallBottom: { x: div.width / 2, y: div.height, width: div.width, height: 20 },
            wallTop: { x: div.width / 2, y: 0, width: div.width, height: 20 },
            wallLeft: { x: 0, y: div.height / 2, width: 20, height: div.height },
            wallRight: { x: div.width, y: div.height / 2, width: 20, height: div.height },
            leftPaddle: { x: div.width / 2, y: div.height / 2, width: 50, height: 10 },
            rightPaddle: { x: div.width / 2, y: div.height / 2, width: 50, height: 10 },
        }
        return obj
    }
    createModules() {
        if (this.matterContainer) {

            this.objects.engine = this.modules.Engine.create();
            this.objects.render = this.modules.Render.create({
                element: this.matterContainer,
                engine: this.objects.engine,
                options: {
                    background: "transparent",
                    wireframes: false,
                    showAngleIndicator: false,
                    width: this.matterContainer.clientWidth,
                    height: this.matterContainer.clientHeight,
                }
            })
            this.objects.runner = this.modules.Runner.create()
            this.objects.mouse = this.modules.Mouse.create(this.objects.render.canvas)
            this.objects.mouseConstraint = this.modules.MouseConstraint.create(this.objects.engine, {
                mouse: this.objects.mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                },
                collisionFilter: {
                    mask: ~this.modules.Body.nextGroup(true), // Set mask to ignore all bodies
                    group: this.modules.Body.nextGroup(true) // Create a new group
                }
            })
        }
    }


    createBodies() {

        this.modules.Composite.add(this.objects.engine.world, [this.bodies.circleA, this.bodies.circleB, this.bodies.circleC, this.bodies.centerLine, this.bodies.ball, this.bodies.leftPaddle, this.bodies.roof, this.bodies.ground, this.bodies.rightPaddle]);
    }
    events() {
     
        Events.on(this.objects.mouseConstraint, "mousemove", (e) => {
            this.modules.Body.setPosition(this.bodies.myPaddle, { x: this.bodies.myPaddle.position.x, y: e.mouse.position.y });
            const oldWidth = this.matterContainer.clientWidth;
            const oldHeight = this.matterContainer.clientHeight;
            const newWidth = 375
            const newHeight = 375 * (this.aspect)
            const { widthRatio, heightRatio } = this.getResizeRatio(oldWidth, oldHeight, newWidth, newHeight)

        })

        Events.on(this.objects.engine, 'collisionStart', (event) => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i];
                if (pair.bodyA === this.bodies.ball && pair.bodyB === this.bodies.roof) {
                    const reflectionAngle = Math.PI / 4;
                    const magnitude = Math.sqrt(this.bodies.ball.velocity.x ** 2 + this.bodies.ball.velocity.y ** 2);
                    if (this.bodies.ball.velocity.x < 0)
                        this.modules.Body.setVelocity(this.bodies.ball, { x: -Math.cos(reflectionAngle) * magnitude, y: -Math.cos(reflectionAngle) * magnitude });
                    else
                        this.modules.Body.setVelocity(this.bodies.ball, { x: Math.cos(reflectionAngle) * magnitude, y: Math.cos(reflectionAngle) * magnitude });
                }
                if (pair.bodyA === this.bodies.ball && pair.bodyB === this.bodies.ground) {
                    const reflectionAngle = Math.PI / 4;
                    const magnitude = Math.sqrt(this.bodies.ball.velocity.x ** 2 + this.bodies.ball.velocity.y ** 2);
                    if (this.bodies.ball.velocity.x < 0)
                        this.modules.Body.setVelocity(this.bodies.ball, { x: -Math.cos(reflectionAngle) * magnitude, y: -Math.cos(reflectionAngle) * magnitude });
                    else
                        this.modules.Body.setVelocity(this.bodies.ball, { x: Math.cos(reflectionAngle) * magnitude, y: Math.cos(reflectionAngle) * magnitude });
                }
            }
        })


    }

    run() {
        this.objects.engine.gravity = {
            x: 0,
            y: 0,
            scale: 0
        };
        this.modules.Composite.add(this.objects.engine.world, [this.objects.mouseConstraint]);
        this.modules.Render.run(this.objects.render);
        this.modules.Runner.run(this.objects.runner, this.objects.engine);

    }

    windowSizeEvent(height) {
        this.onWindowSizeChange()
    }

    onWindowSizeChange() {
        const newWidth = this.matterContainer.clientWidth; // Replace with your desired width
        const newHeight = this.matterContainer.clientHeight; // Replace with your desired height
        const oldWidth = this.oldDim.w
        const oldHeight = this.oldDim.h
        const widthRatio = newWidth / oldWidth;
        const heightRatio = newHeight / oldHeight;
        const modules = this.modules
        const dimenssions = this.obj
        const bodies = this.bodies
        this.modules.Composite.allBodies(this.objects.engine.world).forEach(function (body) {

            if (body.label !== "ball")
                Matter.Body.scale(body, widthRatio, heightRatio);
            else
                Matter.Body.scale(body, widthRatio, widthRatio);

            var newPosition = {
                x: body.position.x * widthRatio,
                y: body.position.y * heightRatio
            };
            Matter.Body.setPosition(body, newPosition);

        });
        this.modules.Engine.update(this.objects.engine)
        this.oldDim = { w: newWidth, h: newHeight }
        this.objects.render.canvas.width = newWidth
        this.objects.render.canvas.height = newHeight
    }



    getResizeRatio(oldWidth, oldHeight, newWidth, newHeight) {
        const widthRatio = newWidth / oldWidth;
        const heightRatio = newHeight / oldHeight;
        return { widthRatio, heightRatio }
    }

    ballTracker(players, setPlayers, setBallSpeed, setGoal) {
        setInterval(() => {
            // limit the speed of the ball so it doesnt leave the boundries 
            const speed = Math.sqrt(this.bodies.ball.velocity.x ** 2 + this.bodies.ball.velocity.y ** 2);
            setBallSpeed(speed)
            if (speed > this.maxSpeed) {
                // Calculate the scaling factor to adjust the velocity
                const scalingFactor = this.maxSpeed / speed;
                // Scale down the velocity to match the maximum speed limit
                this.bodies.ball.velocity.x *= scalingFactor;
                this.bodies.ball.velocity.y *= scalingFactor;
                this.modules.Body.setVelocity(this.bodies.ball, { x: this.bodies.ball.velocity.x * scalingFactor, y: this.bodies.ball.velocity.y * scalingFactor });
            }
            else if (speed < 20)
            this.modules.Body.setPosition(this.bodies.othersPaddle, { x: this.bodies.othersPaddle.position.x, y: this.bodies.ball.position.y });

            //handle winner
            
            if (this.bodies.ball.position.x < 0) {
                setPlayers(prev => ({
                    you: prev.you ,
                    comp: prev.comp+ 1
                }))
                setGoal(true)
            }
            else if (this.bodies.ball.position.x > this.matterContainer.clientWidth) {
               
                setPlayers(prev => ({
                    you: prev.you + 1,
                    comp: prev.comp 
                }))
                setGoal(true)
            }
        })
    }



}