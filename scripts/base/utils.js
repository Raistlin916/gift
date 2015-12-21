export let rand = (from, to) => {
    return ~~(from + Math.random() * (to - from));
}

export const PRECISION = 0.01;