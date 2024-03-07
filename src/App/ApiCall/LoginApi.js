export async function LoginResponse(loginData){

    const payload = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    };

    const url = "/auth/login"
    const response = await fetch(url, payload);
    const jsonData = await response.json();

    return jsonData;
    
}