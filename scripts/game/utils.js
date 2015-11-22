export let rand = (from, to) => {
    return ~~(from + Math.random() * (to - from));
}
