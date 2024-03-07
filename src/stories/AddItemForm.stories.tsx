import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import { action } from '@storybook/addon-actions';

export default {
    title: 'AddItemForm Stories',
    component: AddItemForm,
}

const callback = action(`Button 'Add' was pressed inside the form`)

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}