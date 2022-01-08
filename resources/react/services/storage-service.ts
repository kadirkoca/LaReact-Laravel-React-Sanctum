const pass = process.env.APP_KEY
const authStorageItemKey = "acontext"

export const authContext = () => {
    const dataset = ReadStorage()
    if (dataset) {
        return dataset
    }
    return {
        authenticated: false,
        csrf: null,
        user: null,
    }
}

export const ReadStorage = (key = null) => {
    try {
        const serializedContext = sessionStorage.getItem(authStorageItemKey)
        if (serializedContext === null) {
            return undefined
        }
        const JSONdecrypted = JSON.parse(serializedContext)
        if (key) {
            return JSONdecrypted[key]
        }
        return JSONdecrypted
    } catch (e) {
        return undefined
    }
}

export const WriteStorage = (context: any) => {
    try {
        const serializedContext = JSON.stringify(context)
        sessionStorage.setItem(authStorageItemKey, serializedContext)
    } catch (e) {
        //console.log(e)
        return e
    }
}

export const DestroyDestroy = () => {
    try {
        const serializedContext = sessionStorage.removeItem(authStorageItemKey)
    } catch (e) {
        return e
    }
}
