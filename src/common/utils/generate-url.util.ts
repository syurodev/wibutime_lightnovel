export class GenerateUrl {
    resource_id: string;
    image_name: string;

    constructor(resourceId: string, imageName: string) {
        this.resource_id = resourceId;
        this.image_name = imageName;
    }

    getNovelUrl() {
        return `ln/${this.resource_id}/${this.image_name}`;
    }
}
