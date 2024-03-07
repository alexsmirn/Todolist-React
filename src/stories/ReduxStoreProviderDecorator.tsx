import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistReducer} from "../state/todolist-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {todolistId: 'todolistId1', title: 'Todolist N1', filter: 'all'},
        {todolistId: 'todolistId2', title: 'Todolist N2', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'Task N1', isDone: false},
            {id: v1(), title: 'Task N2', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Task N1', isDone: true},
            {id: v1(), title: 'Task N2', isDone: false}
        ],
    }
}

// @ts-ignore
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}