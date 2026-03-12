const uploadImage = async (imageFile) => {

    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("upload_preset", "TaskManager")

    try {

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dlw6yehpi/image/upload",
            {
                method: "POST",
                body: formData
            }
        )

        const data = await response.json()

        return data.secure_url

    } catch (error) {
        console.log("Error uploading image:", error)
        throw error
    }
}

export default uploadImage