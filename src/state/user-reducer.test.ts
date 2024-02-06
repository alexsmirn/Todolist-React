import {userReducer} from "./user-reducer";


test('userReducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('userReducer should increment only childrenCount', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
    expect(endState.age).toBe(20)
})

test('userReducer should change only name', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
    const newName = 'Alex'

    const endState = userReducer(startState, {type: 'CHANGE-USER-NAME', name: newName})

    expect(endState.name).toBe(newName)

    expect(endState.childrenCount).toBe(2)
    expect(endState.age).toBe(20)
})
