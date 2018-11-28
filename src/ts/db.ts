export default class DB {
    constructor(private name: string, private version: number = 1) {
    };

    public connect() {
        const request = indexedDB.open(this.name, this.version);
        return new Promise((resolve, reject) => {
            request.addEventListener('error', (e) => {
                resolve({
                    name: e.type,
                    data: (<any>e.target).result
                });
            });

            request.addEventListener('success', (e) => {
                resolve({
                    name: e.type,
                    data: (<any>e.target).result
                });
            });

            request.addEventListener('complete', (e) => {
                resolve({
                    name: e.type,
                    data: (<any>e.target).result
                });
            });

            request.addEventListener('upgradeneeded', (e) => {
                resolve({
                    name: e.type,
                    data: (<any>e.target).result
                });
            });
        });
    }
}