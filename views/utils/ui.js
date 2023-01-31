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

const colors = {
    white: 0xFFFFFFFF,
    black: 0xFF000000,
    grey: 0xFFE0E0E0,
    blue: 0xFF19ACEA,
    green: 0xFF389589,
    yellow: 0xFFEF902C,
    red: 0xFFE92236,
    transparentMask: 0x00FFFFFF,
}

/**
 * Calculate the luminance of a given color
 * @param {BigInt} color The color
 * @returns The luminance value between 0 (for black) and 1 (for white)
 */
function luminance(color) {
    if (color === undefined || color === null) throw new Error("The color is undefined");
    color = BigInt(color);
    const r = Number((color & BigInt(0xFF0000)) >> BigInt(16)) / 255,
        g = Number((color & BigInt(0xFF00)) >> BigInt(8)) / 255,
        b = Number(color & BigInt(0xFF)) / 255;
    return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
}

function betterContrast(color, ...comparedColors) {
    if (comparedColors.length == 1) {
        console.warn("It was easy to find the best contrast since there is only color to compare");
        return comparedColors[0];
    }
    const luminanceForRatio = luminance(color) + 0.05;
    if (comparedColors.length == 0) { // Specific black and white case
        let blackRatio = luminanceForRatio / 0.05;
        let whiteRatio = luminanceForRatio / 1.05;
        if (blackRatio < 1) blackRatio = 1 / blackRatio;
        if (whiteRatio < 1) whiteRatio = 1 / whiteRatio;
        return (blackRatio > whiteRatio) ? colors.black : colors.white;
    }

    const sortedColors = comparedColors.map(c => {
        let ratio = luminanceForRatio / (luminance(c) + 0.05);

        if (ratio < 1) ratio = 1 / ratio;
        return {
            color: c,
            ratio
        }
    })
        .sort((a, b) => b.ratio - a.ratio);
    return sortedColors[0].color;
}

const color = {
    ...colors,
    opacity: (c, a) => {
        let ret = Math.max(0, Math.min(color.white, Math.round(a * color.white)));
        let mask = ret & color.transparentMask;
        ret -= mask;
        ret += c & color.transparentMask;
        return ret;
    },
    fromHex: (colorHex) => {
        if (!colorHex || !/^#[a-fA-F0-9]{6}$/.test(colorHex)) return undefined;
        return parseInt(colorHex.substring(1), 16) | 0xFF000000;
    },
    toHex: (color) => {
        if (!Number.isInteger(color)) return undefined;
        let hex = (0x00FFFFFF & color).toString(16);
        while (hex.length < 6) hex = "0" + hex;
        return "#" + hex;
    },
    luminance,
    betterContrast,
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