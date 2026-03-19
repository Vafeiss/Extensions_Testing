import * as Diff from 'diff';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function diffStrings(str1, str2) {
    const differences = Diff.diffWords(str1, str2);

    const added = [];
    const removed = [];

    differences.forEach(part => {
        if (part.added) {
            added.push(...part.value.split(' ').filter(Boolean));
        }
        if (part.removed) {
            removed.push(...part.value.split(' ').filter(Boolean));
        }
    });

    return { added, removed };
}

