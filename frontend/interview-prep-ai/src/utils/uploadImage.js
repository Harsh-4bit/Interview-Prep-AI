import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

async function uploadImage(){
    const formData = new FormData();
    FormData.append('image', imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'Content-type' : 'multipart/form-data'
            }
        })
        return response.data;
    }
    catch(error){
        console.error("Error uploading the image", error);
        throw error;
    }
}

export default uploadImage;