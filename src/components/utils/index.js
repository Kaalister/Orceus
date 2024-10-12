import { URL_API } from "../../constants";

export function getUrlFromImage(image) {
    if (!image) return null
    
    return `${URL_API}/images/${image.filename}`
}