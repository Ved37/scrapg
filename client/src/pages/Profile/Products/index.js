import { Button,message,Table } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loaderSlide";
import moment from "moment";

function Products() {
  const [selectedProduct,setSelectedProduct]=useState(null);
  const [products,setProducts]=useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch=useDispatch();
  
  const getData=async()=>{
    try {
      dispatch(SetLoader(true));
      const response=await GetProducts();
      dispatch(SetLoader(false));
      if(response.success){
        setProducts(response.products)
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const deleteProduct=async(id)=>{
    try {
     dispatch(SetLoader(true));
     const response=await DeleteProduct(id);
     dispatch(SetLoader(false));
     if(response.success){
       message.success(response.message);
       getData();
     }
     else{
       message.error(response.error);
     }
    } catch (error) {
     dispatch(SetLoader(false))
     message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Weight",
      dataIndex: "weight",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text,record)=>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text,record)=>{
        return(<div className="flex gap-5">
          <i className="ri-delete-bin-line" onClick={()=>{
            deleteProduct(record._id)}
          }></i>
          <i className="ri-pencil-line" onClick={()=>{
            setSelectedProduct(record);
            setShowProductForm(true);
          }}>
          </i>
        </div>)
      }
    },
  ];

  

  useEffect(()=>{
    getData();
  },[]);
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button type="default" onClick={() => {
          setSelectedProduct(null)
          setShowProductForm(true)}
          }>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products}/>
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </>
  );
}

export default Products;