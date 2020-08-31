import { CookieState_t } from "../types"

/**
 * CookieState is a place where we can share some state between our modules
 */
class CookieState {
    private State: CookieState_t = {
        imageSrc: "",
        saveFileName: "",
        thickness: DEFAULT_THICKNESS,
        depth: DEFAULT_DEPTH,
        tolerance: DEFAULT_TOLERANCE,
        cutterBevel: DEFAULT_BEVEL,
        handleRound: DEFAULT_ROUND_HANDLE,
        size: DEFAULT_SIZE
    };

    get(): CookieState_t {
        return this.State;
    }

    update(newState: CookieState_t): void {
        this.State = Object.assign(this.State, newState);

        console.info("currentState", this.State)
    }
}


export default new CookieState;