export interface Image {
  id: string;
  url: string;
}

export interface Superhero {
  id: string;
  nickname: string;
  real_name?: string;
  origin_description?: string;
  superpowers?: string[];
  catch_phrase?: string;
  images: Image[];
}

export interface SuperheroBase {
  id: string;
  nickname: string;
  images: Image[];
}
