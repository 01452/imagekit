export type UploadResponse = {
    url: string;
    fileId: string;
};

export type AuthParams = {
    token: string;
    signature: string;
    expire: number;
};


