const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState { //should be same
    constructor() {
        //holds current state of given key
        this.keyStates = new Map();
        
        //holds key code and callback functions that is notified
        this.keyMap = new Map();
    }
    
    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }
    
    handleEvent(event) {
        const {code} = event;
        
        if (!this.keyMap.has(code)) {
            //did not have key mapped
            return;
        }
        event.preventDefault();
        
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED; //if key up then 0
        
        if (this.keyStates.get(code) === keyState) {
            return;
        }
        
        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }
    
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}








