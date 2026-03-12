export const usePhoto = function () {
  const config = useRuntimeConfig();

  async function compressImage(file: File, maxSizeKB = 100): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas not supported");

          // Resize (optional: scale down if too big)
          let width = img.width;
          let height = img.height;
          const MAX_WIDTH = 1920; // adjust to your needs
          if (width > MAX_WIDTH) {
            height = (height * MAX_WIDTH) / width;
            width = MAX_WIDTH;
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Compress
          let quality = 0.9; // start high
          let dataUrl = canvas.toDataURL("image/jpeg", quality);

          while (dataUrl.length / 1024 > maxSizeKB && quality > 0.1) {
            quality -= 0.05;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          // Convert back to File
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            })
            .catch(reject);
        };

        img.onerror = reject;
      };

      reader.onerror = reject;
    });
  }

  const getImageUrl = function (path: string) {
    const { BUCKET_URL } = config.public;
    return BUCKET_URL + path;
  };

  return { getImageUrl, compressImage };
};
