function all(value) {
    return {
        top: value,
        bottom: value,
        left: value,
        right: value
    }
}

function paddingSymmetric(horizontal, vertical) {
    return {
        top: vertical,
        bottom: vertical,
        left: horizontal,
        right: horizontal
    }
}

function radiusPoint(value) {
    return {
        x: value,
        y: value
    }
}

function borderRadiusAll(value) {
    return {
        topLeft: radiusPoint(value),
        topRight: radiusPoint(value),
        bottomRight: radiusPoint(value),
        bottomLeft: radiusPoint(value)
    }
}

function constraintsAll(value) {
    return {
        maxHeight: value,
        maxWidth: value,
        minHeight: value,
        minWidth: value
    }
}

const color = {
    white: 0xFFFFFFFF,
    black: 0xFF000000,
    grey: 0xFFE0E0E0,
    blue: 0xFF19ACEA,
    red: 0xFFE92236,
    transparentMask: 0x00FFFFFF,
    opacity: (c, a) => {
        let ret = Math.max(0, Math.min(color.white, Math.round(a * color.white)));
        let mask = ret & color.transparentMask;
        ret -= mask;
        ret += c & color.transparentMask;
        return ret;
    },
    fromHex: (colorHex) => {
        if (!/^#[a-fA-F0-9]{6}$/.test(colorHex)) return undefined;
        return parseInt(colorHex.substring(1), 16) | 0xFF000000;
    },
    toHex: (color) => {
        if (!Number.isInteger(color)) return undefined;
        let hex = (0x00FFFFFF & color).toString(16);
        while (hex.length < 6) hex = "0" + hex;
        return hex;
    }
};

module.exports = {
    padding: {
        all,
        symmetric: paddingSymmetric
    },
    border: {
        all
    },
    borderRadius: {
        all: borderRadiusAll
    },
    constraints: {
        all: constraintsAll
    },
    color
};