import { CookieState_t, camera_pos_t } from "../types"
import {
    DEFAULT_THICKNESS,
    DEFAULT_DEPTH,
    DEFAULT_TOLERANCE,
    DEFAULT_BEVEL,
    DEFAULT_ROUND_HANDLE,
    DEFAULT_SIZE
} from "../constants";

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
        size: DEFAULT_SIZE,
        camera_pos: <camera_pos_t>{
            x: 0,
            y: 0,
            z: 0,
            rx: 0,
            ry: 0,
            rz: 0
        }
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