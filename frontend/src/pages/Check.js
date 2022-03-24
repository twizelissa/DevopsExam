import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

export default function Check() {
    const [ meter_number, setMeterNumber ] = useState(0)
    
    const [ error, setErorr ] = useState("")
    const [ isSuccess, setIsSucess ] = useState(false)
    
    const [ days, setDays ] = useState(0)
    
    const checkElectricty = async () => {
        try {
            let { data } = await axios.get(`http://localhost:8001/api/meters/by-number/${meter_number}`)
            
            setErorr("")
            setIsSucess(true)
            setDays(data.days)
        } catch (e) {
            setIsSucess(false)
            setErorr(e.response.data.message)
        }
    }
    
    return (
        <div id="_check_balance_page">
            <h1 className="text-3xl font-medium">Check Electricty</h1>
            {error !== "" &&
                <div title="Error" className="py-10 text-red-500 w-[400px]" id="ErrorMessage">{error}</div>}
            {isSuccess &&
                <div id="SuccessMessage" className="py-10 text-lg text-green-500 w-[400px]">Success you have electirity
                    for {days} days</div>}
            <div>
                <Input type="string" placeholder="Meter_number" title="meter_number_input"
                       data={{ st: meter_number, sts: setMeterNumber }}/>
                
                <Button action="checkElectricity" title="Click to Check" onClick={checkElectricty}/>
            </div>
        </div>
    )
}