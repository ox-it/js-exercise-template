import example_entities from '../store/reducers/example_entities';
import deepfreeze from 'deep-freeze';

describe('example_entities', () => {
    
    describe('add entity', () => {
        let stateBefore = {
            entities: [ {title: 'foo'} ]
        }
        
        deepfreeze(stateBefore);
        
        let action= {
            'type': 'ADD_ENTITY',
            newEntity: { title: 'new'}
        }
        
        let expectedStateAfter = {
            entities: [ {title: 'foo'}, {title: 'new'} ]
        }
        
        let stateAfter = example_entities(stateBefore, action);
        
        it('should add an entity', () => {
            expect(stateAfter).toEqual(expectedStateAfter);
        });
    });
    
    
})