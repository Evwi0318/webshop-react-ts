import { useState } from "react";
import { TextInput, Button, Stack } from "@mantine/core";

export function CheckoutForm({onSubmit}: { onSubmit: (data: any) => void}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = () => {
        if (name.length < 2)
            return;
        if (!email.includes("@"))
            return;
        if (phone.length < 2 || phone.length > 15)
            return;
        if (street.length < 3)
            return;
        if (zipCode.length !== 5) 
            return;
        if (city.length < 2)
            return;


        const data = {name, email, phone, street, zipCode, city};
        onSubmit(data);
    };
    return(
        <Stack>
            <TextInput label="Namn" value={name} onChange={(e) => setName(e.currentTarget.value)} autoComplete="name"/>
            <TextInput label="Email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} autoComplete="email"/>
            <TextInput label="Telefon" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} autoComplete="tel"/>
            <TextInput label="Adress" value={street} onChange={(e) => setStreet(e.currentTarget.value)} autoComplete="street-address"/>
            <TextInput label="Postnummer" value={zipCode} onChange={(e) => setZipCode(e.currentTarget.value)} autoComplete="postal-code"/>
            <TextInput label="Stad" value={city} onChange={(e) => setCity(e.currentTarget.value)} autoComplete="address-level2"/>
            <Button onClick={handleSubmit}>Slutför köp</Button>
        </Stack>
    );
};