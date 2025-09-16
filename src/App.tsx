import {useImageUpload} from "./hooks/useImageUpload";

export const App = () => {
    const { state, actions } = useImageUpload();
    const { selectedFile, previewUrl, uploadedUrl, uploading, progress, error } = state;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold mb-4">ImageKit — Upload Photo App</h1>

                <input type="file" accept="image/*" onChange={(e) => actions.onFileChange(e.target.files?.[0] || null)} />

                {previewUrl && (
                    <div className="mt-4">
                        {selectedFile && (
                            <p className="text-sm text-gray-600">Файл: {selectedFile.name}</p>
                        )}
                        <img
                            src={previewUrl}
                            alt="preview"
                            className="mt-2 max-h-64 rounded"
                        />
                    </div>
                )}

                <div className="mt-4 flex gap-2">
                    <button
                        onClick={actions.upload}
                        disabled={!selectedFile || uploading}
                        className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-60"
                    >
                        {uploading ? "Загрузка..." : "Выгрузить в ImageKit"}
                    </button>
                    {uploading && (
                        <div className="text-sm text-gray-600">{progress}%</div>
                    )}
                    {uploadedUrl && (
                        <a
                            href={uploadedUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded bg-indigo-600 text-white"
                        >
                            Открыть
                        </a>
                    )}
                </div>

                {error && <div className="mt-3 text-red-600">{error}</div>}
                {uploadedUrl && (
                    <div className="mt-2 text-sm text-gray-600">
                        Uploaded URL: <span className="break-all">{uploadedUrl}</span>
                    </div>
                )}
                {uploadedUrl && (
                    <div className="mt-4">
                        <img
                            src={uploadedUrl}
                            alt="uploaded"
                            className="mt-2 max-h-64 rounded"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};


