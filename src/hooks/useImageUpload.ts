import { useCallback, useEffect, useState } from "react";
import { createImageKitClient, fetchAuthParams } from "../lib/imagekitClient";
import type { AuthParams } from "../types/imagekit";

export const useImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onFileChange = useCallback((file: File | null) => {
        setSelectedFile(file);
        setUploadedUrl(null);
        setError(null);

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (file) setPreviewUrl(URL.createObjectURL(file));
        else setPreviewUrl(null);
    }, [previewUrl]);

    useEffect(() => () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const upload = useCallback(async () => {
        if (!selectedFile) return;
        try {
            setUploading(true);
            setError(null);
            setProgress(0);

            const client = await createImageKitClient();
            const { token, signature, expire } = (await fetchAuthParams()) as AuthParams;

            const fileName = `student-upload-${Date.now()}-${selectedFile.name}`;
            const res: any = await (client as any).upload({
                file: selectedFile,
                fileName,
                useUniqueFileName: true,
                token,
                signature,
                expire,
                onProgress: (evt: any) => {
                    if (evt.total) setProgress(Math.round((evt.loaded / evt.total) * 100));
                },
            } as any);

            if (res?.url) setUploadedUrl(res.url);
            else setError("Не удалось получить URL после загрузки");
        } catch (e: any) {
            console.error(e);
            setError(e?.message || String(e));
        } finally {
            setUploading(false);
        }
    }, [selectedFile]);

    return {
        state: { selectedFile, previewUrl, uploadedUrl, progress, uploading, error },
        actions: { onFileChange, upload },
    } as const;
};


