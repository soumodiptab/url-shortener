export class UrlUtils{
    public static extract(url :string) : string{
        const shortUrl = url.split("/").pop();
        if(!shortUrl)throw new Error("Invalid url");
        return shortUrl;
    }
}