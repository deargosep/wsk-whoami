import { persistAtom } from './core'
import { atom, useRecoilState, useRecoilValue } from 'recoil'


export const theme_state = atom({
    default: 'purple',
    key: 'theme',
    effects_UNSTABLE: [persistAtom]
})

export const themes_state = atom({
    default: [{
        name: 'purple',
        style: {
            color: 'black',
            backgroundColor: '#C2CFF2',
            accentColor: '#3949AB'
        }
    },
    {
        name: 'green',
        style: {
            color: 'black',
            backgroundColor: 'white',
            accentColor: '#F2FADD'
        }
    }
    ],
    key: 'themes',
})