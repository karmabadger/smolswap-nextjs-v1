function collectionNameToPath(collectionName: string): string {
  return collectionName.toLowerCase().replace(" ", "-");
}

function collectionPathToName(collectionPath: string): string {
  return collectionPath
    .replace("-", " ")
    .replace(/\w\S*/g, function (txt: string): string {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export { collectionNameToPath, collectionPathToName };
