export interface RespuestaApi<T>{
    success: true;
    data: T;
    timestamp: number;
}
export function wrapResponse<T>(data:T): RespuestaApi<T>{
    return{
        success: true, 
        data, 
        timestamp: Date.now(),
    };
}
