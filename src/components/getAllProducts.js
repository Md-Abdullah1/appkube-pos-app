

import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { fetchProducts } from "../fetchProducts";

import { useState, useEffect } from "react";
// import { generateClient } from 'aws-amplify/api';
import { generateClient } from "aws-amplify/api";

import { Amplify } from "aws-amplify";

import { useSelector, useDispatch } from "react-redux";
import { AddProduct, removeItem } from "../redux/slice/Product";

const GetAllProducts = () => {
  const dispatch = useDispatch();

  const client = generateClient();
  const route = useRoute();
  console.log(route.params.category);
  console.log(route.params.catProducts);
  const Pdata = route.params.catProducts;

  console.log(Pdata);

  const [cartItems, setCartItems] = useState([]);

  const navigation = useNavigation();

  const reduxData = useSelector((state) => state.Product);
  // console.log(reduxData)
  console.log(reduxData.Data);

  let mappredux = reduxData.Data.map((e)=>e.id)
  console.log({...mappredux})
 
  
  const HandleIncrement = (veg) => {
    // const items = [];
    // items.push(veg);
    const data =  dispatch(AddProduct(veg));
console.log(data.payload)
    // const updatedReduxData = useSelector((state) => state.Product);
    // console.log("Updated Redux Data:", updatedReduxData.Data);

    // const MyreduxData = useSelector((state)=>state.Product.Data)
    // if(reduxData){
    // const mapProducts = reduxData.Data.map((e)=>e.quantity)
    // console.log('got the data',reduxData.Data)
    // console.log(mapProducts) 
    // }
    // console.log(data);
    // console.log(items);
 
  //   useEffect(() => {
  //   // Log the quantity for the specific product
  //   const productQuantity = reduxData.Data.find((item) => item.id === veg.id)?.quantity;
  //   console.log(`Quantity for ${veg.name}:`, productQuantity);

  //   // You can perform other actions here based on the updated state
  // }, [reduxData]);

    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === veg.id
    );

    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update quantity
      updatedCartItems[existingItemIndex].quantity += 1;
    } else {
      // Item doesn't exist in the cart, add it with quantity 1
      const newItem = { ...veg, quantity: 1 };
      updatedCartItems.push(newItem);
    }

    setCartItems(updatedCartItems);
  };

  const handleDecrement = (veg) => {
    dispatch(removeItem(veg.id));
    console.log(veg.id);

    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(
      (item) => item.id === veg.id
    );

    if (existingItemIndex !== -1) {
      // Item exists in the cart, update quantity
      if (updatedCartItems[existingItemIndex].quantity > 1) {
        updatedCartItems[existingItemIndex].quantity -= 1;
      } else {
        // Remove item from the cart if quantity is 1
        updatedCartItems.splice(existingItemIndex, 1);
      }

      setCartItems(updatedCartItems);
    }
  };

  
  const calculateItemPrice = (item) => {
    return item.price && item.quantity ? item.price * item.quantity : 0;
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemPrice(item),
      0
    );
  };

  // const getTotalPrice = (productId) => {
  //   console.log(productId);
  //   // return (quantity * PriceperItem).toFixed(2);
  // };

  const handleProduct = (prod) => {
    console.log("navigate to product");
    navigation.navigate("ProductPage", { value: prod });
    console.log("navigate to product 2");
  };

  const handleCart = () => {
    console.log("navigate to cart");
    navigation.navigate("Checkout");
    console.log("navigate to Checkout ");
  };

  
  return (
    // <div>
    // <div className="flex flex-col">


    
    <ScrollView>
      <TouchableOpacity onPress={handleCart} style={{ width:'100%', justifyContent:'space-between',}} >
        <View style={{ display:'flex', flexDirection:'row', justifyContent:'space-between',alignContent:'center', paddingVertical:10, paddingHorizontal:20}}>

      <Text style={{ fontWeight: "700" }}>
        Grand Total: ${calculateTotalPrice()}
        
      </Text>
      <Text style={{backgroundColor:'lightgray ', padding:'20px'}}  >Checkout</Text>
      </View>

      {/* <Button style={{backgroundColor:'white', color:'black'}} >Checkout</Button> */}
      </TouchableOpacity>
      


      {Pdata.map((veg) => {
        return (
          <TouchableOpacity
            onPress={() => {
              handleProduct(veg);
            }}
            key={veg.id}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "black",
                margin: 2,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: `${veg.image}`,
                  }}
                  style={{ width: 70, height: 70, borderRadius: 10 }}
                />
                <View style={{ marginLeft: 20 }}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ fontSize: 16, fontWeight: "bold", width: 120 }}
                  >
                    {veg.name}!
                  </Text>
                  <Text>
                    {/* Quantity: {veg.quantity || 1}, Total: $ */}
                    {/* {calculateItemPrice(veg) } */}
                  </Text>
                  <Text style={{ fontSize: 12 }}>Price: ${veg.price}</Text>
                </View>
              </View>
              <View style={{ alignItems: "center", gap: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Qty: {veg.unit}</Text>

                  <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: "lightgray",
                        borderRadius: 5,
                      }}
                      onPress={() => {
                        HandleIncrement(veg);
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: "lightgray",
                        borderRadius: 5,
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        handleDecrement(veg);
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={{ fontWeight: "700" }}>
                  {/* Total: ${calculateItemPrice(veg)} */}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default GetAllProducts;
