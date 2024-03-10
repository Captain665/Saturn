export async function LoginResponse(loginData){

    const payload = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    };

    const url = "https://673a-2409-40d0-102f-3aa2-60f0-eab1-ea54-83f0.ngrok-free.app/api/v2/auth/login"
    const response = await fetch(url, payload);
    const jsonData = await response.json();

    return jsonData;
    
}