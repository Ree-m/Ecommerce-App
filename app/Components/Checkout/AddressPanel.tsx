"use client"
import { UserInterface } from '@/app/api/auth/register/route';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutDataContext } from '@/app/context/CheckoutDataContext';
import Link from 'next/link';
export default function AddressPanel({ userData, totalPrice }: { userData: UserInterface, totalPrice: number }) {
    const router = useRouter()
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(userData.name)
    const [address, setAddress] = useState<string>(userData.address)
    const [phone, setPhone] = useState<number>(userData.phone)
    const { message, setMessage } = useContext(CheckoutDataContext)
    const { deliveryTime, setDeliveryTime } = useContext(CheckoutDataContext)
    const [editedData, setEditedData] = useState({
        name: userData.name,
        address: userData.address,
        phone: userData.phone,
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        console.log("status values address panel", userData._id, editedData.name, editedData.address, editedData.phone)
        const response = await fetch(`http://localhost:3000/api/auth/user/${userData._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                address: address,
                phone: phone
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        const responseData = await response.json()
        console.log(responseData, "responseData")

        router.refresh()
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedData({
            name: userData.name,
            address: userData.address,
            phone: userData.phone,
        });
        setIsEditing(false);
    };
    console.log("message in address panel", message)
    return (
        <div>

            <div>
                {isEditing ? (
                    <>
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            name="name"
                            value={name}
                            onInput={(e: React.ChangeEvent<HTMLElement>) => setName(e.target.innerHTML)}
                        >
                            {editedData.name}
                        </div>
                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            name="address"
                            value={address}
                            onInput={(e: React.ChangeEvent<HTMLElement>) => setAddress(e.target.innerHTML)}
                        >
                            {editedData.address}
                        </div>

                        <div
                            contentEditable
                            suppressContentEditableWarning={true}
                            name="phone"
                            value={phone}
                            onInput={(e: React.ChangeEvent<HTMLElement>) => setPhone(+e.target.innerHTML)}
                        >
                            {editedData.phone}
                        </div>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </>
                ) : (
                    <>
                        <div>{editedData.name}</div>
                        <div>{editedData.address}</div>
                        <div>{editedData.phone}</div>
                        <button onClick={handleEditClick}>Change</button>
                    </>
                )}
            </div>
            <div>
                <h3>Delivery time</h3>
                <form action="">
                    <input type="radio" id="8am-3pm" name="time" value="8am-3pm" checked={deliveryTime == "8am-3pm"} onChange={(e)=>setDeliveryTime(e.target.value)}/>
                    <label htmlFor="time">8am-3pm</label>

                    <input type="radio" id="3pm-6pm" name="time" value="3pm-6pm" checked={deliveryTime == "3pm-6pm"} onChange={(e)=>setDeliveryTime(e.target.value)}/>
                    <label htmlFor="time">3pm-6pm</label>

                </form>
            </div>

            <div>
                <p>Leave us a message</p>
                <form>
                    <input type="text" value={message}
                        onChange={(e) => setMessage(e.target.value)} />
                </form>

            </div>
            <p>{totalPrice}</p>
            <Link href={`/checkout/order-summary/${userData._id}`}>Continue</Link>
        </div>
    );
}
