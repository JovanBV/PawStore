
export const getURLImage = async (URL) => {
    const response = await fetch(`${URL}`)
    const img = await response;
    return img;
}

