import { Data } from "../interfaces/clientInterfaces";


export class CRUDServices {
    public static async getData(url: string, headers = {}): Promise<any> {
        const response: Response = await fetch(url, {headers});
        const data: Response = await response.json()
        return data
    }

    public static async postData(url: string, body: any, headers:any): Promise<any> {
        body = JSON.stringify(body)
        console.log(body)
        const response: Response = await fetch(url, {
            method: 'POST',
            body,
            headers,
        })
        const data: Data = await response.json()
        return data
    }
}