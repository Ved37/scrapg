import React from "react";


const categories=[
    {
        name:"Metal",
        value:"metal"
    },
    {
        name:"Alloys",
        value:"alloys"
    },
    {
        name:"Appliance",
        value:"appliance"
    },
    {
        name:"Cans",
        value:"cans"
    },
    {
        name:"Paper",
        value:"paper"
    },
];
const weight=[
    {
        name: "0-50 Kg",
        value: "0-50"
    },
    {
        name: "51-100 Kg",
        value: "51-100"
    },
    {
        name: "101-200 Kg",
        value: "101-200"
    },
    {
        name: "200+ Kg",
        value: "201-1000"
    },
];
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return <div className="flex flex-col w-72">
    <div className="flex justify-between text-xl">
        <h1 className="text-orange-900">Filters</h1>
        <i className="ri-close-line text-xl"
        onClick={()=>setShowFilters(!showFilters)}></i>
    </div>
    <div className="flx flex-col gap-1 mt-5">
        <h1 className="text-gray-600">Categories</h1>
        <div className="flex flex-col">
            {categories.map((category)=>{
                return (
                    <div className="flex items-center gap-2 max-width">
                        <input type="checkbox" name="category" checked={filters.category.includes(category.value)}
                        onChange={(e)=>{
                            if(e.target.checked){
                                setFilters({
                                    ...filters,
                                    category: [...filters.category,category.value],
                                })
                            }
                            else{
                                setFilters({
                                    ...filters,
                                    category: filters.category.filter((item)=>item !== category.value),
                                })
                            }
                        }}/>
                        <label htmlFor="category">{category.name}</label>
                    </div>
                );
            })}
        </div>

        <h1 className="text-gray-600">Weight</h1>
        <div className="flex flex-col">
            {weight.map((weight)=>{
                return (
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="weight"
                        className="max-width" checked={filters.weight.includes(weight.value)}
                        onChange={(e)=>{
                            if(e.target.checked){
                                setFilters({
                                    ...filters,
                                    weight: [...filters.weight,weight.value],
                                })
                            }
                            else{
                                setFilters({
                                    ...filters,
                                    weight: filters.weight.filter((item)=>item !== weight.value),
                                })
                            }
                        }}/>
                        <label htmlFor="weight">{weight.name}</label>
                    </div>
                );
            })}
        </div>
    </div>
  </div>;
}

export default Filters;
