import User from "@/models/User";
import connectMongo from "@/utils/connectMongo";
import Error from "next/error";
import {  NextResponse } from "next/server";

export interface UserInterface{
  _id:string,
name:string,
email:string,
phone:number,
role:string,
address:string,
}
export async function POST(request:Request) {
  connectMongo();
  const { name, email,role,phone, address,password } = await request.json();
  console.log("name", name, "email", email, "password", password,"address",address,"phone","phone",phone);

  try {
    const userExists=await User.findOne({$or:[{name,email}]})
    if (userExists){
      return NextResponse.json("User already exists")
    }
    const user:UserInterface = await User.create({
      name,
      email,
      phone,
      role,
      address,
      password
      
    });

    const isAdminEmail = email === 'admin@admin.com';

    if (isAdminEmail) {
      user.role = 'admin';
    }


    console.log("user added");
    return NextResponse.json(user);
  } catch (error:any) {
    console.log("post register error", error);
    if (error.code === 11000) {
      // Duplicate key error
      return NextResponse.json({ message: "Username or email already exists.",error });
    } else {
      console.log(error);
      return NextResponse.json({ message: error });

    }
  }
}
