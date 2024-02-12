'use client';

import { createContext, useContext, useState, useEffect} from 'react';
import { db, auth } from '@/app/firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';

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
    const [ SuccessUid, setSuccessUid] = useState<any>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          const localCart = localStorage.getItem('cartItems');
          let localCartItems:any = null;
          if (localCart) {
            localCartItems = JSON.parse(localCart);
          }
          const docRef = doc(db, 'carts', user.uid);
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              const userCartItems = docSnap.data().cartItems;
              if(localCartItems.length > 0) {
                if(userCartItems.length > 0){
                  const docRef = doc(db, 'carts', user.uid);
                  const cartItems = [...userCartItems, ...localCartItems];
                  setCartItems(cartItems); 
                  setDoc(docRef, {cartItems});              
               }
                else {
                  const docRef = doc(db, 'carts', user.uid);
                  const cartItems = [...localCartItems];
                  setCartItems(localCartItems);
                  setDoc(docRef, {cartItems});
                 }
                localStorage.setItem('cartItems', JSON.stringify([]));
              }
              else {
                if(docSnap.data().cartItems){
                  setCartItems(docSnap.data().cartItems);
                }
                else {
                  setCartItems([]);
                }
              }
              setqty(cartItems.length);
            } else {
              setCartItems([]);
              setqty(cartItems.length);
            }
          });
        } else {
          const localCart = localStorage.getItem('cartItems');
          if (localCart) {
            setCartItems(JSON.parse(localCart));
            setqty(cartItems.length);
          }
        }
        setflag(1);
        setqty(cartItems.length);
      });
      return () => unsubscribe();
    }, []);
    

    useEffect(() => {
      if(flag > 1){
        const user = auth.currentUser;
        if (user) {
          setUser(user);
          const docRef = doc(db, 'carts', user.uid);
          setDoc(docRef, { cartItems });
        } else {
          setUser(null);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    
        setqty(cartItems.length);
      }
      else {
        setqty(cartItems.length);
        setflag(2);
      }
    }, [cartItems]);

    // useEffect(() => {
    //   if(flag > 1){
    //     if(user) {
    //       console.log('inside if ');
    //       const docRef = doc(db, 'carts', user.uid);
    //       setDoc(docRef, { cartItems });
    //     }else {
    //       console.log('inside if ');
    //       localStorage.setItem('cartItems', JSON.stringify(cartItems));
    //     }
    //   }
    // }, [user]);
    

    const onAdd = (product: any, currentProductId: any, quantity: any, color: any, selectedSize: any) => {
        const existingProduct = cartItems.find((item) => (item.currentProductId === currentProductId));
      
        if (existingProduct && existingProduct.color === color) {
          setCartItems(
            cartItems.map((item) =>
              item.currentProductId === currentProductId ? { ...item, quantity: item.quantity + quantity, color: color, selectedSize: selectedSize, totalAmount: item.price * (item.quantity + quantity) } : item
            )
          );
        } else {
          const totalAmount = product.price * quantity;
          setCartItems([...cartItems, { ...product, currentProductId, quantity, color, selectedSize, totalAmount }]);
        }
        toast.success(`${product.name} added to the cart.`);
        setIsCartOpen(true);
      }

      const toggleCartItemQuantity = (product_id:any, value:any) => {
            const newCartItems = [...cartItems];
        
            const productIndex = newCartItems.findIndex((item) => item.currentProductId === product_id);
            if (productIndex === -1){
              return;
            }
        
            if (value === 'inc') {
            newCartItems[productIndex] = { ...newCartItems[productIndex], quantity: newCartItems[productIndex].quantity + 1, totalAmount:  newCartItems[productIndex].price * (newCartItems[productIndex].quantity + 1)};
            
            } else if (value === 'dec' && newCartItems[productIndex].quantity > 1) {
            newCartItems[productIndex] = { ...newCartItems[productIndex], quantity: newCartItems[productIndex].quantity - 1, totalAmount:  newCartItems[productIndex].price * (newCartItems[productIndex].quantity - 1) };
            }
            setCartItems(newCartItems);
      }

      const onRemove = (currentProductId: any) => {
        const newCartItems = cartItems.filter((item:any) => !(item.currentProductId === currentProductId));
        setCartItems(newCartItems);
        setqty(cartItems.length);
      }
      const onRemoveAll = () => {
        const user = auth.currentUser;
        if (user) {
          setCartItems([]);
          setqty(cartItems.length);
          setUser(user);
          const docRef = doc(db, 'carts', user.uid);
          setDoc(docRef, { cartItems });
        } else {
          setCartItems([]);
          setqty(cartItems.length);
          setUser(null);
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
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
            setShowPopUp,
            onRemoveAll,
            settotalPrice,
            SuccessUid,
            setSuccessUid
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}