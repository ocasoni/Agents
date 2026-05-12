class Agent {
    constructor(POSITION, ANGLE, IMAGE) {
        this.position = POSITION; // Vector
        this.color = color(0,0,0);
        this.angle = ANGLE;
        this.smoothAngle = ANGLE;
        this.speed = 3;
        this.debug = false;
        this.awarenessRadius = 200;
        this.neighbours = [];
        this.separationStrength = 0.2;
        this.alignmentStrength = 0.2;
        this.cohesionStrength = 0.01;
    }

    update() {
        // Logica dell'agent

        // Teniamo l'agent dentro il canvas
        this.checkCanvasBounds();

        // Neighbors
        this.findNeighbours();

        // Separazione
        this.applySeparation();

        // Allineamento
        this.applyAlignement();

        // Coesione
        this.applyCohesion();

        // Applichiamo il movimento
        const movement = createVector(0, this.speed)
        this.smoothAngle = lerp(this.smoothAngle, this.angle, 0.1);
        movement.rotate(this.smoothAngle);
        this.position.add(movement)
    }

    display() {
        // Disegnamo l'agent sul canvas

        fill(this.color);

        push();

        translate(this.position);
        rotate(this.smoothAngle);
        triangle(0, 20, -10, -20, 10, -20);

        if (this.debug) {
            stroke(255);
            noFill();
            circle(0, 0, this.awarenessRadius * 2);
            noStroke();
        }

        pop();
    }

    checkCanvasBounds() {
        if (this.position.x < -SIM_MARGINS) {
            this.position.x = width + SIM_MARGINS;
        } else if (this.position.x > width + SIM_MARGINS) {
            this.position.x = -SIM_MARGINS;
        }

        if (this.position.y < -SIM_MARGINS) {
            this.position.y = height + SIM_MARGINS;
        } else if (this.position.y > height + SIM_MARGINS) {
            this.position.y = -SIM_MARGINS;
        }
    }

    findNeighbours() {
        this.neighbours = [];

        agents.forEach(agent => {
            if (agent != this) {
                const dist = this.position.dist(agent.position);
                if (dist < this.awarenessRadius) {
                    this.neighbours.push(agent);
                }
            }
        });
    }

    applySeparation() {
        if (this.neighbours.length === 0) return;
        
        // Trova l'agente più vicino
        let closestAgent = this.neighbours[0];
        let closestDistance = this.position.dist(closestAgent.position);
        
        for (let i = 1; i < this.neighbours.length; i++) {
            const dist = this.position.dist(this.neighbours[i].position);
            if (dist < closestDistance) {
                closestDistance = dist;
                closestAgent = this.neighbours[i];
            }
        }
        
        // Calcola la direzione per allontanarsi
        const away = p5.Vector.sub(this.position, closestAgent.position);
        const desiredAngle = degrees(away.heading());
        
        // Calcola la differenza di angolo
        let angleDiff = desiredAngle - this.angle;
        
        // Normalizza la differenza tra -180 e 180 (rotazione più breve)
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;
        
        // Applica la forza di separazione
        this.angle += angleDiff * this.separationStrength;
    }

    applyAlignement() {
        if (this.neighbours.length === 0) return;
        
        // Calcola l'angolo medio dei vicini
        let sumAngle = 0;
        for (let i = 0; i < this.neighbours.length; i++) {
            sumAngle += this.neighbours[i].angle;
        }
        const averageAngle = sumAngle / this.neighbours.length;
        
        // Calcola la differenza di angolo
        let angleDiff = averageAngle - this.angle;
        
        // Normalizza la differenza tra -180 e 180 (rotazione più breve)
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;
        
        // Applica la forza di allineamento
        this.angle += angleDiff * this.alignmentStrength;
    }

    applyCohesion() {
        if (this.neighbours.length === 0) return;
        
        // Calcola la posizione media dei vicini
        let sumX = 0;
        let sumY = 0;
        for (let i = 0; i < this.neighbours.length; i++) {
            sumX += this.neighbours[i].position.x;
            sumY += this.neighbours[i].position.y;
        }
        const averageX = sumX / this.neighbours.length;
        const averageY = sumY / this.neighbours.length;
        
        // Calcola il vettore verso la posizione media
        const toward = createVector(averageX - this.position.x, averageY - this.position.y);
        const desiredAngle = degrees(toward.heading());
        
        // Calcola la differenza di angolo
        let angleDiff = desiredAngle - this.angle;
        
        // Normalizza la differenza tra -180 e 180 (rotazione più breve)
        while (angleDiff > 180) angleDiff -= 360;
        while (angleDiff < -180) angleDiff += 360;
        
        // Applica la forza di coesione
        this.angle += angleDiff * this.cohesionStrength;
    }
}