export const createImageKitClient = async () => {
    const { default: ImageKit } = await import("imagekit-javascript");
    const client = new ImageKit({
        publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
        authenticationEndpoint: "/api/imagekit/auth",
    } as any);
    return client as any;
};

export const fetchAuthParams = async () => {
    const res = await fetch("/api/imagekit/auth");
    if (!res.ok) throw new Error("Не удалось получить auth параметры");
    return res.json();
};


