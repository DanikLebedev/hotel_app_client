import { Data } from "../interfaces/clientInterfaces";


export class CRUDServices {
    public static async getData(url: string): Promise<any> {
        const response: Response = await fetch(url);
        const data: Response = await response.json()
        return data
    }

    public static async postData(url: string, body: any, headers:any): Promise<any> {
        body = JSON.stringify(body)
        const response: Response = await fetch(url, {
            method: 'POST',
            body,
            headers,
        })
        const data: Data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Something wrong happen...')
        }
        return data
    }
}