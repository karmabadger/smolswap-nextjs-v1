
const DECIMALS = 18;

// string -> string
function strETHToWei(amountStr: string, decimals = DECIMALS) {
    const strLength = amountStr.length;
    const dotIndex = amountStr.indexOf('.');

    if (dotIndex === -1) {
        if (Number(amountStr) === 0) {
            return '0';
        }
        return amountStr + '0'.repeat(decimals);
    }

    const beforeDot = amountStr.substring(0, dotIndex);
    const afterDot = amountStr.substring(dotIndex + 1, strLength);

    if (Number(beforeDot) === 0) {
        return '0';
    } else if (afterDot.length < decimals) {
        return beforeDot + afterDot + '0'.repeat(decimals - afterDot.length);
    } else if (afterDot.length > decimals) {
        return beforeDot + afterDot.substring(0, decimals);
    } else {
        const result = beforeDot + afterDot.padEnd(decimals, '0');
        return result;
    }
}

// string -> string
function strWeiToETH(amountStr: string, precision = 2, decimals = DECIMALS) {
    const decimalsLength = amountStr.length - decimals;

    const beforeDot = amountStr.substring(0, decimalsLength);
    const afterDot = amountStr.substring(decimalsLength, (decimalsLength + precision));

    if (Number(beforeDot) == 0 && Number(afterDot) == 0) {
        console.log('beforeDot', beforeDot);
        console.log('afterDot', afterDot);
        return '0';
    } else if (Number(beforeDot) == 0) {
        return '0.' + afterDot;
    } else if (Number(afterDot) == 0) {
        return beforeDot;
    }
    let result = beforeDot + '.' + afterDot;

    return result;
}

export { DECIMALS, strETHToWei, strWeiToETH };