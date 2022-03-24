import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

export default function BuyElectricity() {
    const [meter_number, setMeterNumber] = useState(0)
    const [amount, setAmount] = useState(0)
    const [error, setErorr] = useState("")
    const [isSuccess, setIsSucess] = useState(false)
    const [token, setToken] = useState()

    const buyElectricty = async () => {
        try {
            let { data } = await axios.post("http://localhost:8001/api/tokens/buy", { meter_number, amount })

            setErorr("")
            setIsSucess(true)
            setToken(data.body.token)
            console.log(data)
        } catch (e) {
            setIsSucess(false)
            setErorr(e.response.data.message)
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-medium" id="_buy_electricity_page">BUY ELECTRICITY</h1>
            {error !== "" && <div className="py-10 text-red-500 w-[400px]" id="ErrorMessage">{error}</div>}
            {isSuccess &&
                <div className="py-10 text-lg text-green-500 w-[400px]" id="SuccessMessage">Sucessfully Token generated :{token} ..</div>}
            <div>
                <Input type="number" placeholder="Meter_number" data={{ st: meter_number, sts: setMeterNumber }} />
                <Input type="number" placeholder="Amount" data={{ st: amount, sts: setAmount }} />

                <Button action="buyElectricity" title="Buy" onClick={buyElectricty} />
            </div>
        </div>
    )
}