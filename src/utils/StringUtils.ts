export function titleCase(str: string) {
    return str ? str.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase()) : str;
}
