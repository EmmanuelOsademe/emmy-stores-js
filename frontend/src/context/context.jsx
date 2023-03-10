import {createContext, useState, useEffect} from "react";
import {productsData} from "../dummyData";

const Context = createContext();

function ContextProvider({children}){
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [shippingFee, setShippingFee] = useState(null);
    const [tax, setTax] = useState(1000);
    const [count, setCount] = useState(1);
    const [baseUrl, setBaseUrl] = useState("http://localhost:4000/api/v1")
    const [user, setUser] = useState(null);

    const addToCart = product => {
        const newCartItems = cartItems.filter(item => item.item.id !== product.item.id);
        newCartItems.push(product);
        setCartItems(newCartItems)
    }

    const removeFromCart = id => {
        setCartItems(prevItems => prevItems.filter(item => item.item.id !== id));
    }

    const updateCart = item => {
        const newCartItems = cartItems.map(product => product.item.id === item.item.id ? item : product);
        setCartItems(newCartItems);
    }

    const saveUser = (newUser) => {
        setUser(newUser)
    }

    const emptyCart = () => setCartItems([]);

    const incrementCount = () => setCount(prevCount => prevCount + 1);
    const decrementCount = () => setCount(prevCount => prevCount - 1);
    

    useEffect(() => {
        fetch(`${baseUrl}/product`)
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])

    return (
        <Context.Provider value={{
            products,
            cartItems,
            addToCart,
            updateCart,
            removeFromCart,
            emptyCart,
            count,
            incrementCount,
            decrementCount,
            tax,
            shippingFee, 
            setShippingFee,
            baseUrl,
            user,
            saveUser
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}