import { userInfo } from "../CommonTypes/CommonType"


export function GetLocalData(getLocalItem: string): userInfo {
    const data: string | null = window.localStorage.getItem(getLocalItem);
    const localData: userInfo = JSON.parse(data!);
    return localData;
}

export function SetLocalData(setLocalItemName: string, setLocalItemValue: string): void {
    const data = JSON.stringify(setLocalItemValue);
    window.localStorage.setItem(setLocalItemName, data);
}

export function GetSessionData(getSessionItem: string): object {
    const data: string | null = window.sessionStorage.getItem(getSessionItem);
    const sessionData: object = JSON.parse(data!);
    return sessionData;
}

export function SetSessionData(setSessionItemName: string, setSessionItemValue: string | object): void {
    const data = JSON.stringify(setSessionItemValue);
    window.sessionStorage.setItem(setSessionItemName, data);
}