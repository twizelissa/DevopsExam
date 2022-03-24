import React, { useState } from "react";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

export default function LoadElectricty() {
    const [ token, setToken ] = useState(0)
    
    const [ error, setErorr ] = useState("")
    const [ isSuccess, setIsSucess ] = useState(false)
    
    const [ response, setResponse ] = useState(
        {}
    )
    
    const loadElectricty = async () => {
        try {
            let { data } = await axios.post("http://localhost:8001/api/tokens/load", { token })
            
            setErorr("")
            setIsSucess(true)
            setResponse(data.body)
            
        } catch (e) {
            setIsSucess(false)
            setErorr(e.response.data.message)
        }
    }
    
    
    return (
        <div id="_load_balance_page">
            <h1 className="text-3xl font-medium">Load Electricty</h1>
            {error !== "" && <div id="ErrorMessage" className="py-10 text-red-500 w-[400px]">{error}</div>}
            {isSuccess && <div className="py-10 text-lg text-green-500 w-[400px]"
                               id="SuccessMessage">Sucess: {response?.token?.days} days added now. You
                have {response?.meter?.days} days remaining :{token} ..</div>}
            <div>
                <Input type="text" placeholder="Token" data={{ st: token, sts: setToken }}/>
                
                <Button action="loadElectricty" title="Load" onClick={loadElectricty}/>
            </div>
        </div>
    )
}