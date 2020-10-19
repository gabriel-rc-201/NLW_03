import Image from '../models/Image';

export default {
  render(image: Image){
    return {
      id: image.id,
      url: `http://192.168.1.11:3333/uploads/${image.path}`// se tiver usando o navegador (app web) trocar por localhost, se ater tb para esse id caso ele mude
    };
  },

  renderMany(images:Image[]){
    return images.map(image => this.render(image));
  }
};