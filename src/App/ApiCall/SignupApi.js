export async function SignupResponse(userInfo){

    const payload = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(userInfo)
    }

    const url = "/signup"
    const response = await fetch(url, payload)
    const jsonData = await response.json();
    
    return jsonData
}

export async function OtpValidateReponse(mobileNumber, otp){

    const payload = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobileNumber : mobileNumber,
            otp : otp
        })
    };

    const url = "/otp-validate"
    const response = await fetch(url, payload);
    const jsonData = await response.json();
    
    return jsonData;
}