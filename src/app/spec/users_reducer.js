import users from '../store/reducers/users';
import deepfreeze from 'deep-freeze';

describe('users', () => {
    describe('add user', () => {
        let stateBefore = [{ name: "Bob", password: "pass", email: "bob@example.com"}]
        
        deepfreeze(stateBefore);
        
        let action= {
            type: 'ADD_NEW_USER',
            user: { name: "John", password: "pass", email: "john@example.com"}
        }
        
        let expectedStateAfter = [ { name: "Bob", password: "pass", email: "bob@example.com"}, { name: "John", password: "pass", email: "john@example.com"} ]
        
        let stateAfter = users(stateBefore, action);
        
        it('should add a user', () => {
            expect(stateAfter).toEqual(expectedStateAfter);
        });
    });
    
    describe('delete user', () => {
        let stateBefore = [{ name: "Bob", password: "pass", email: "bob@example.com"}]
        
        deepfreeze(stateBefore);
        
        let action= {
            type: 'DELETE_USER',
            userEmailToDelete: 'bob@example.com',
        }
        
        let expectedStateAfter = []
        
        let stateAfter = users(stateBefore, action);
        
        it('should delete a user', () => {
            expect(stateAfter).toEqual(expectedStateAfter);
        });
    });

    describe('update user', () => {
        let stateBefore = [{ name: "Bob", password: "pass", email: "bob@example.com"}]
        
        deepfreeze(stateBefore);
        
        let action= {
            type: 'UPDATE_USER',
            user: { name: "Bob", password: "pass", email: "bob@example.com", isAdmin: true},
        }
        
        let expectedStateAfter = [{ name: "Bob", password: "pass", email: "bob@example.com", isAdmin: true}]
        
        let stateAfter = users(stateBefore, action);
        
        it('should update a user', () => {
            expect(stateAfter).toEqual(expectedStateAfter);
        });
    });

})