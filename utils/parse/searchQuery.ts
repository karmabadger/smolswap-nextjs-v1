
type SearchQueryDict = {
    [key: string]: string;
};

function parseSearchQuery(searchQuery: string): SearchQueryDict {
    const searchQueryDict: SearchQueryDict = {};
    const searchQueryArray = searchQuery.split("&");

    for (let i = 0; i < searchQueryArray.length; i++) {
        const searchQueryItem = searchQueryArray[i].split("=");
        searchQueryDict[searchQueryItem[0]] = searchQueryItem[1];
    }

    return searchQueryDict;
}

export {
    parseSearchQuery,
    type SearchQueryDict
};