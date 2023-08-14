import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { message } from "antd";
import { SetLoader } from "../../redux/loaderSlide";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
function Home() {
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    weight: []
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [filters]);
  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && <i className="ri-equalizer-line text-xl cursor-pointer"
          onClick={()=>setShowFilters(!showFilters)}></i>}
          <input type="text"
          placeholder="Search Items here..." 
          className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer h-14 w-full"/>
        </div>
      <div
        className={`
      grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
      >
        {products?.map((product) => {
          return (
            <div
              className="border border-gray-300 rounded border-solid flex flex-col gap-1 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
              key={product._id}
            >
              <img
                src={product.images[0]}
                className="w-full h-40 p-1 rounded-md object-cover"
                alt=""
              />
              <div className="px-2 flex flex-col">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm text-gray-500">{product.weight} Kg</p>
                <Divider />
                <p className="text-sm">
                  <span className="text-xl font-semibold text-green-700 ">
                    ₹{product.price}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default Home;
