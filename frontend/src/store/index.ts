/* eslint-disable */
import { reactive, readonly } from "vue"
import { User } from "@/types/index"

export interface State {
    user: User | null
}

const state: State = reactive({
    user: null
})

const setUser = function (user: User | null) : void {
    state.user = user
}

export default {
    state: readonly(state),
    setUser
}
