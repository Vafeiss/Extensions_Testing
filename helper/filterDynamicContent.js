export function filterDynamicContent(run1,run2,run3) {
    let added = []
    let removed = [];

    const added1 = run1.added;
    const added2 = run2.added;
    const added3 = run3.added;

    const removed1 = run1.removed;
    const removed2 = run2.removed;
    const removed3 = run3.removed;

    //Added
    for(let i = 0; i < added1.length; i++) {
        let str = added1[i];
        if(added2.includes(str) && added3.includes(str)) {
            added.push(str);
        }
    }

    //Removed
    for(let i = 0; i < removed1.length; i++) {
        let str = removed1[i];
        if(removed2.includes(str) && removed3.includes(str)) {
            removed.push(str);
        }
    }


    return {added, removed};
}