

function getTimestampS(differenceInS: number): number {
    return Math.floor((Date.now() / 1000)) + differenceInS
}

function getTimestampMs(differenceInMs: number): number {
    return Math.floor(Date.now()) + differenceInMs
}

export { getTimestampS, getTimestampMs }