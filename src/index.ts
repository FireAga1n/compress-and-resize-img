function compressImage(imageData: string | Blob, maxWidth: number, maxHeight: number, quality: number | null): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            let width = img.width;
            let height = img.height;

            // 计算缩放后的图像宽度和高度，使其不超过 maxWidth 和 maxHeight
            if (maxWidth && !maxHeight) {
                height *= maxWidth / width;
                width = maxWidth;
            } else if (!maxWidth && maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            } else if (maxWidth && maxHeight) {
                width = maxWidth;
                height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;

            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);

                // 将图像绘制到 canvas 上后，可以使用 canvas.toDataURL 方法将其转换为其他格式的图片
                const compressedImageData = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedImageData);
            } else {
                reject(new Error('Failed to get 2D context'));
            }
        };
        img.onerror = (error) => {
            reject(error);
        };

        // 判断 imageData 的类型，如果是 Base64 字符串，则直接赋值给 img.src，否则将其作为 Blob 对象创建 URL 后赋值给 img.src
        if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
            img.src = imageData;
        } else {
            const blob = new Blob([imageData]);
            img.src = URL.createObjectURL(blob);
        }
    });
}

export default compressImage;