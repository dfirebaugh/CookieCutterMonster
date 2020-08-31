
export interface CookieState_t {
    imageSrc: string,
    saveFileName: string,
    thickness: number,
    depth: number,
    tolerance: number,
    cutterBevel: boolean,
    handleRound: boolean,
    size: number
}


export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}
