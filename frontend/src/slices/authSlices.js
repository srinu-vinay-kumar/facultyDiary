import { createSlice } from "@reduxjs/toolkit";

const initialSlice ={
    userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
}