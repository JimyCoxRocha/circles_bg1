export class LocalStorageBG {
    static GetData(key) {
        return localStorage.getItem(key)
    }
    static SetData(key, data) {
        localStorage.setItem(key, data)
    }
    static RemoveKeyStorage(key){
        localStorage.removeItem(key)
    }
}