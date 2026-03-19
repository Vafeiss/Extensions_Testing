export function createFingerprint(result) {

    return "+" + result.added.join("\n") + "\n-" + result.removed.join("\n");
}