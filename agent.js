class Agent {
    constructor(POSITION, ANGLE) {
        this.position = POSITION;
        this.color = color (0, 0, 0);
        this.angle = ANGLE;
        this.speed = 1;
    }

    update() {
        //logica dell'agent

        // applichiamo il movimento
        const movement = createVector (0, this.speed)
        movement.rotate (this.angle);
        this.position.add (movement);
    }

    display() {
        //disegna l'agent

        fill(this.color);

        push();

        translate(this.position);
        rotate(this.angle);
        triangle (0, 20, -10, -20, 10, -20);

        pop();


    }
}