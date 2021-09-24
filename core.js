import AsyncStorage from '@react-native-async-storage/async-storage'
import {atom} from 'recoil'
import { recoilPersist } from 'recoil-persist'
export const {persistAtom} = recoilPersist({
    key:'recoil-persist',
    storage:AsyncStorage
})

export const name_state = atom({
    default:'Расул',
    key:'name',
    effects_UNSTABLE: [persistAtom]
})
export const firstTime_state = atom({
    default:true,
    key:'firstTime',
    effects_UNSTABLE: [persistAtom]
})