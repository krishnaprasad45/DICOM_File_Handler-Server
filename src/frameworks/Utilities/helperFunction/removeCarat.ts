export default function removeCarat(name:string) {
    // Replace "^" with a space
    const cleanName = name.replace(/\^/g, ' ');
    return cleanName;
}