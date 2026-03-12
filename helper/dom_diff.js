import * as Diff from 'diff';import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function diffStrings(str1, str2) {
    const differences = Diff.diffChars(str1, str2);

    const added = [];
    const removed = [];

    differences.forEach(part => {
        const trimmed = part.value.trim();
        if (part.added) added.push(trimmed);
        if (part.removed) removed.push(trimmed);
    });

    return { added, removed };
}

