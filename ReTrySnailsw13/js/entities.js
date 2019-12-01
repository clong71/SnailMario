import {loadMario} from './marioEntity.js';
import {loadGoomba} from './goombaEntity.js';
import {loadKoopa} from './koopaEntity.js';


export function loadEntities() {
    const entityFactories = {}; //empty objet

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
    ])
    .then(() => entityFactories);
}