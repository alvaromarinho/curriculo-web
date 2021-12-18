export function titleCase(str: any) {
    return str ? str.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp: any) => grp.toUpperCase()) : str;
}

export function removeHTML(str: any) {
    return str.replace(/(<([^>]+)>)/gi, "")
}
