'use client';

import { createContext, useContext, useState, useEffect} from 'react';
import { db, auth } from '@/app/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";

const AppContext = createContext<any>(undefined);

export function AppWrapper ({ children } : {
    children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [showPopUp, setShowPopUp] = useState(true);
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setqty] = useState(0); 
    const [IsCartOpen, setIsCartOpen] = useState(false);
    const [flag, setflag] = useState(0);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const docRef = doc(db, 'carts', user.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              setCartItems(docSnap.data().cartItems);
              setqty(cartItems.length);
              let totalPrice = 0;
              docSnap.data().cartItems.map((sale:any) => {
                totalPrice += sale.totalAmount;
              })
              settotalPrice(totalPrice);
            } else {
              setCartItems([]);
              setqty(cartItems.length);
              settotalPrice(0);
            }
          });
        } else {
          const localCart = localStorage.getItem('cartItems');
          if (localCart) {
            setCartItems(JSON.parse(localCart));
            setqty(cartItems.length);
            let totalPrice = 0;
            cartItems.map((sale:any) => {
              totalPrice += sale.totalAmount;
            })
            settotalPrice(totalPrice);
          }
        }
        setflag(1);
        setqty(cartItems.length);
      });
      // This will ensure the effect only runs once after the initial render
      return () => unsubscribe();
    }, []); // Empty dependency array
    

    useEffect(() => {
      if(flag > 1){
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            const docRef = doc(db, 'carts', user.uid);
            setDoc(docRef, { cartItems });
          } else {
            setUser(null);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
          }
        });
    
        setqty(cartItems.length);
        let totalPrice = 0;
        cartItems.map((sale:any) => {
          totalPrice += sale.totalAmount;
        })
        settotalPrice(totalPrice);
        return () => unsubscribe();
      }
      else {
        setqty(cartItems.length);
        setflag(2);
      }
    }, [cartItems]);

    useEffect(() => {
      if(flag > 1){
        if(user) {
          const docRef = doc(db, 'carts', user.uid);
          setDoc(docRef, { cartItems });
        }else {
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
      }
    }, [user]);
    

    const onAdd = (product: any, quantity: any) => {
        const existingProduct = cartItems.find((item) => item.id === product.id);
      
        if (existingProduct) {
          setCartItems(
            cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity, totalAmount: item.price * (item.quantity + quantity) } : item
            )
          );
        } else {
          const totalAmount = product.price * quantity;
          setCartItems([...cartItems, { ...product, quantity, totalAmount }]);
        }
        let totalPrice = 0;
        cartItems.map((sale:any) => {
          totalPrice += sale.totalAmount;
        })
        settotalPrice(totalPrice);
        setIsCartOpen(true);
      }

      const toggleCartItemQuantity = (product_id:any, value:any) => {
            const newCartItems = [...cartItems];
        
            const productIndex = newCartItems.findIndex((item) => item.product_id === product_id);
            if (productIndex === -1) return;
        
            if (value === 'inc') {
            newCartItems[productIndex] = { ...newCartItems[productIndex], quantity: newCartItems[productIndex].quantity + 1, totalAmount:  newCartItems[productIndex].price * (newCartItems[productIndex].quantity + 1)};
            
            } else if (value === 'dec' && newCartItems[productIndex].quantity > 1) {
            newCartItems[productIndex] = { ...newCartItems[productIndex], quantity: newCartItems[productIndex].quantity - 1, totalAmount:  newCartItems[productIndex].price * (newCartItems[productIndex].quantity - 1) };
            }
            setCartItems(newCartItems);
            let totalPrice = 0;
            newCartItems.map((sale:any) => {
              totalPrice += sale.totalAmount;
            })
            settotalPrice(totalPrice);
      }

      const onRemove = (product_id: any) => {
        const newCartItems = cartItems.filter((item:any) => item.product_id !== product_id);
        setCartItems(newCartItems);
        setqty(cartItems.length);
        let totalPrice = 0;
        newCartItems.map((sale:any) => {
          totalPrice += sale.totalAmount;
        })
        settotalPrice(totalPrice);
      }
      
      

    const incQty = () => {
        setqty((prevQty)  => prevQty + 1);
    }

    const decQty = () => {
        setqty((prevQty)  => {
            if(prevQty -1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <AppContext.Provider 
        value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove,
            IsCartOpen,
            setIsCartOpen,
            showPopUp,
            setShowPopUp
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}