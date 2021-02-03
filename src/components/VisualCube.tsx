import React from "react"

export const UP_THEME = 'obwrgy'
export const DOWN_THEME = 'rgwoby'

interface VCProps {
    scramble?: string,
    solution?: string, //Algorithm to solve case
    format?: 'png' | 'gif' | 'jpg' | 'svg' | 'tiff' | 'ico',
    puzzle?: number //(1 to 10)
    size?: number
    view?: 'plan' | 'trans' // plan = top face for OLL or PLL, trans = transparent
    mask?: 'fl' | 'f2l' | 'll' | 'cll' | 'ell' | 'oll' | 'ocll' | 'oell' | 'coll' | 'ocell' | 'wv' | 'vh' | 'els' | 'cls' | 'cmll' | 'cross' | 'f2l_3' | 'f2l_2' | 'f2l_sm' | 'f2l_1' | 'f2b' | 'line' | '2x2x2' | '2x2x3'
    rotation?: string // ([xyz]-?[0-9][0-9]?[0-9]?)+
    colors?: string //U R F D L B order, [ndlswyrobgmp]*6
    background?: string,
    cubeColor?: string
}

interface VCData {
    key: string,
    propsKey: string,
    defaultValue: number | string
}

// Visual Cube wrapper
export default function VisualCube(props: VCProps){
    let visualCubePath = 'http://cube.rider.biz/visualcube.php?'
    const data: VCData[] = [
        {
            key: 'alg',
            propsKey: 'scramble',
            defaultValue: ''
        },
        {
            key: 'fmt',
            propsKey: 'format',
            defaultValue: 'svg'
        },
        {
            key: 'pzl',
            propsKey: 'puzzle',
            defaultValue: 3
        },
        {
            key: 'size',
            propsKey: 'size',
            defaultValue: 128
        },
        {
            key: 'view',
            propsKey: 'view',
            defaultValue: '' 
        },
        {
            key: 'stage',
            propsKey: 'mask',
            defaultValue: ''
        },
        {
            key: 'r',
            propsKey: 'rotation',
            defaultValue: 'y45x-34'
        },
        {
            key: 'case',
            propsKey: 'solution',
            defaultValue: ''
        },
        {
            key: 'sch',
            propsKey: 'colors',
            defaultValue: DOWN_THEME
        },
        {
            key: 'bg',
            propsKey: 'background',
            defaultValue: 'white'
        },
        {
            key: 'cc',
            propsKey: 'cubeColor',
            defaultValue: 'black'
        }
    ]
    visualCubePath += data.map(property => {
        const {key, defaultValue, propsKey} = property
        // @ts-ignore
        const value = props[propsKey] || defaultValue
        return key + '=' + value
    })
    .join('&')

    return <img src={visualCubePath} />
}