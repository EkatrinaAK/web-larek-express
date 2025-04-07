import mongoose from "mongoose";

interface IProduct {
  title: string;
  image: string;
  category: string;
  description: string;
  price: number;
}

interface IImage {
  fileName: string;
  originalName: string;
}

const imageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: [true, "Укажите путь к файлу"],
  },

  originalName: {
    type: String,
    required: [true, "Поле 'image' должно быть заполнено"],
  },
});

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: [2, "Минимальная длина поля 'title'- 2"],
    maxlength: [30, "Максимальная длина поля 'title' - 30"],
    required: [true, "Поле 'title' должно быть заполнено"],
    unique: true,
  },
  image: imageSchema,
  category: {
    type: String,
    required: [true, "Поле должно быть заполнено"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});
export default mongoose.model<IProduct>("product", productSchema);
