export function preloadImage(url) {
    const img = document.createElement("img");
    const promise = new Promise((resolve, reject) => {
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
    });

    img.src = url;

    return promise;
}