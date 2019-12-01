import Keyboard from './KeyboardState.js';

export function setupKeyboard(mario) {  //should be same if we want same
    
    const input = new Keyboard();
    
    input.addMapping('KeyP', keyState => { //press P to jump
        if (keyState) {
            mario.jump.start();
            
        } else {
            mario.jump.cancel();
        }
    });
    
    input.addMapping('KeyO', keyState => { //press O to run faster
        mario.turbo(keyState);
    });
    
    input.addMapping('KeyD', keyState => {  //press D to go right
        mario.go.dir += keyState ? 1 : -1;
    });
    
    input.addMapping('KeyA', keyState => {   //press A to go left
        mario.go.dir += keyState ? -1 : 1;
    });
    
    return input;
}