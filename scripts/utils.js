const utils = {
    rand: (from, to) => {
        return ~~(from + Math.random() * (to - from));
    }
}

//export default utils;

module.exports = utils;