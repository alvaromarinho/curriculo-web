export function titleCase(str: any) {
    return str ? str.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp: any) => grp.toUpperCase()) : str;
}
