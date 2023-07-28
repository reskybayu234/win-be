import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema(
    {
      nama: {
        type: String,
        required: true,
      },
      harga: {
        type: Number,
      },
      stok: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Number,
      },
      updatedAt: {
        type: Number,
      },
    },
    {
      timestamps: {
        currentTime: () => Math.floor(Date.now() / 1000),
      },
    }
  );
  
//   Schema.plugin(mongoosePaginate);
  
  const Product = mongoose.model("Product", Schema);
  export default Product;