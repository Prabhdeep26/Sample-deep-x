import { documentapi } from "../auth-config"

const DocAPi = {
    UplaodDocument : "/document-upload"
}


export const DocumentUpload = async (formData, config = {}) => {
    const response = await documentapi.post(DocAPi.UplaodDocument, formData, {
        ...config,
        headers: {
            "Content-Type": "multipart/form-data",
            ...config.headers, //
        },
    });
    return response.data;
};