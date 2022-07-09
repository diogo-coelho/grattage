<template>
    <div>
        <label v-if="inputLabel">{{ inputLabel }}: </label>
        <div class="input-form">
            <input
                tabindex="0"
                :class="{
                    'danger': message,
                    'success': success
                }" 
                :type="inputType" 
                :name="inputName" 
                :value="inputValue"
                :autocomplete="autoComplete"
                @click="clearInputStatus()"
                @focus="handleClearInput($event, $event.target)"
                @keyup="handleClearInput($event, $event.target)"
                @blur="setInputValue($event)" />
            <i :class="{ 
                'i-custom-font-check': success ?? '',
                'glyphicon-font-awesome-close' : message ?? '' }"></i>
        </div>
        <div v-if="message">
            <span class="message">{{ message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, SetupContext } from "vue";

type InputType = 
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'date';

interface Props {
    inputType: string,
    inputName: string;
    inputLabel?: string;
    autoComplete?: string;
}

export default defineComponent({
    props: {
        inputType: {
            type: String as PropType<InputType>,
            required: true
        },
        inputName: {
            type: String,
            default: ""
        },
        inputLabel: {
            type: String
        },
        autoComplete: {
            type: String
        }
    },
    emit: ['value'],
    setup (props: Props, {emit}: SetupContext) {
        const inputValue: Ref<string> = ref("");
        const message: Ref<string|null> = ref(null)
        const success: Ref<boolean> = ref(false)

        function clearInputStatus () {
            message.value = null
            success.value = false
        }

        function handleClearInput (event: Event, target: EventTarget | null) : void {
            let element = (target as unknown as HTMLInputElement).value;
            let key = (event as unknown as KeyboardEvent).key;

            if (element === "" && !!key && (key === 'Backspace' || key === 'Delete' || key === 'Tab')) {
                message.value = null
                success.value = false
            }
        }

        function setInputValue (event: Event) : void {
            inputValue.value = (event.target as HTMLInputElement).value
            if (validateInputValue()) {
                emit("value", inputValue.value)
            } else {
                emit("value", "")
            }
        }

        function isEmailValid (email: string) : boolean {
            if (email === "") {
                message.value = "Campo não pode ficar vazio"
                success.value = false
                return false
            }

            //eslint-disable-next-line
            const re = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
            if (re.test(email)) {
                message.value = null
                success.value = true
                return true
            }

            message.value = "E-mail em formato inválido"
            success.value = false
            return false
        }

        function isPasswordValid (password: string) : boolean {
            if (password === "") {
                message.value = "Campo não pode ficar vazio"
                success.value = false
                return false
            }

            //eslint-disable-next-line
            const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\)\({}#%])[A-Za-z\d@$!%*?&\)\({}#%]{8,10}/
            if (re.test(password)) {
                message.value = null
                success.value = true
                return true
            }

            message.value = "A senha precisa ter entre 8 e 10 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
            success.value = false
            return false
        }

        function validateInputValue () : boolean {
            switch (props.inputType) {
                case 'email': 
                    return isEmailValid(inputValue.value)
                case 'password':
                    return isPasswordValid(inputValue.value)
                default:
                    return true                
            }
        }

        return {
            inputValue,
            message,
            success,
            setInputValue,
            validateInputValue,
            handleClearInput,
            clearInputStatus
        }
    }
})
</script>

<style>

</style>