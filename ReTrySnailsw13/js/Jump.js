import {Sides, Trait} from './Entity.js';

export default class Jump extends Trait {  //should be same if we want it to move that way
    constructor() {
        super('jump');
        
        this.ready = 0;
        this.speedBoost = 0.3;
        this.duration = 0.3;
        this.velocity = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1; //time before you land where button press will count
        
    }
    
    get falling() {  //get allows you to right .falling instead of calling the function in entities
        return this.ready < 0;
    }
    
    start() {
        this.requestTime = this.gracePeriod;
    }
    cancel() {
        this.engageTime = 0; // stops the below if so that the gravity will start pulling down
        this.requestTime = 0;
    }
    
    obstruct(entity, side) {
        if (side === Sides.BOTTOM) {
            this.ready = 1;
        } else if (side === Sides.TOP) {
            this.cancel();
        }
    }
    
    update(entity, deltaTime) {  //when start runs, engagetime is set to duration which is 0.5 so the if will run until 0
        
        if(this.requestTime > 0) {
            if (this.ready > 0) {
                this.engageTime = this.duration;  //so that you can only jump once
                this.requestTime = 0;
                
            }
            this.requestTime -= deltaTime;
        }
        
        if (this.engageTime > 0) {
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;  //this is so velocity is -200 on y for max 0.5 seconds
        }
        
        this.ready--; //so ready is false but once there is a collision it will be tru
    }
}






