export default class EntityCollider {
    constructor(entities) {
        this.entities = entities;
    }
    
    check(subject) { //subject is an entity
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }
            
            if (subject.bounds.overlaps(candidate.bounds)) { //check to see if they collide
                subject.collides(candidate);
                candidate.collides(subject); //sending signals to each other
            }
        })
        
    }
}