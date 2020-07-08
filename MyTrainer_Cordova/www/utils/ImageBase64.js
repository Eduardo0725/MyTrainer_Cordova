class ImageBase64 {
    image;

    async convert(input) {
        let reader = new FileReader();

        reader.readAsDataURL(input.files[0]);

        reader.onload = function () {
            let dataURL = reader.result;

            this.image = dataURL;

            return dataURL;
        };
    }

    getImg() {
        return this.image;
    }
}