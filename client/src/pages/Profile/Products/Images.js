import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlide";
import { UploadProductImage } from "../../../apicalls/products";


function Images({ selectedProduct, setShowProductForm, getData }) {
  const [images = [], setImages] = useState(selectedProduct.images);
  const [file = null, setFile] = useState(null);
  const dispatch = useDispatch();
  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      //Upload Image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <Upload
  listType="picture"
  beforeUpload={() => false}
  onChange={(info) => {
    setFile(info.file);
  }}
>
  <div className="flex gap-5 mb-5">
    {images.map((image) => {
      return (
        <div className="flex gap-2 border border-solid border-gray-500 rounded p-2 items-end">
          <img className="h-20 w-20 object-cover" src={image} alt="" />
          <i className="ri-delete-bin-line" onClick={() => {}}></i>
        </div>
      );
    })}
  </div>
  <Button type="dashed">Upload Image</Button>
</Upload>
      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Images;