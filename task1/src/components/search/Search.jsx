import { useEffect, useState } from "react";

function Search(){
    const  [searchterm,SetSearchTerm]=useState('');
    const [loading,setLoading]=useState(true);
    const [products,setProducts]=useState([]);
    const handleChange=(e)=>{
        SetSearchTerm(e.target.value)
    }

    const searchProduct=()=>{
        const filteredProducts =products.filter((product)=>{
            product.name.toLowerCase().includes(searchterm.toLowerCase());
        })
    }


    useEffect(()=>{
        const getData=async()=>{
            try{
                const products=await fetch(url);
                const data=await products.json();
                setProducts(data);
            }
            catch(error){
    console.log(error);
            }
            finally{
                setLoading(false);
            }
        }
        getData();
    },[]);


    return(
        <div> 
            <ul>
        {filteredProducts.length > 0 ?(
               
                filteredProducts.map((item,index)=>(
                    <li key={index}>{item}</li>
                ))

        ):
        (
<li>No products found</li>
        )}
        </ul>
        </div>
    )
}
export default Search;