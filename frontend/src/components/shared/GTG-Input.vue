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
                @focus="handleClearInput($event)"
                @keyup="handleClearInput($event)"
                @blur="setInputValue($event)" />
            <i :class="{ 
                'i-custom-font-check': success ?? '',
                'glyphicon-font-awesome-close' : message ?? '' }" />
        </div>
        <div v-if="message">
            <span class="message">{{ message }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref, SetupContext, watch } from "vue";
import { InputType, InputError } from "@/types/index";

interface Props {
    inputType: string,
    inputName: string;
    inputLabel?: string;
    autoComplete?: string;
    inputError?: InputError;
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
        },
        inputError: {
            type: Object as PropType<InputError>
        }
    },
    emit: ['value'],
    setup (props: Props, {emit}: SetupContext) {
        const inputValue: Ref<string> = ref("")
        const message: Ref<string|null> = ref(null)
        const success: Ref<boolean> = ref(false)

        watch(() => props.inputError, () => {
            if (props.inputError?.inputType?.includes(props.inputName)) {
                message.value = (props.inputError.messageError as string)
                success.value = false
            }
        })

        /**
         * Função responsável por limpar os status das variáveis message e success
         */
        function clearInputStatus () {
            message.value = null
            success.value = false
        }

        /**
         * Função que limpa o estado e a mensagem de erro do input caso alguma tecla 
         * seja pressionada ou o focus passe para esse input 
         * @param {Event} event - evento disparado pelo input
         */
        function handleClearInput (event: Event) : void {
            let key = (event as unknown as KeyboardEvent).key;

            if (!!key && (key === 'Backspace' || key === 'Delete' || key === 'Tab')) {
                clearInputStatus();
            }
        }

        /**
         * Função responsável por receber o valor da tag input e emití-la para
         * o componente pai no qual foi renderizado
         * @param {Event} event evento disparado pela tag input
         */
        function setInputValue (event: Event) : void {
            inputValue.value = (event.target as HTMLInputElement).value
            if (validateInputValue()) {
                emit("value", inputValue.value)
            } else {
                emit("value", undefined)
            }
        }

        /**
         * Função que verifica se o email recebido via parâmetro tem formato válido
         * @param {string} email email inserido no input
         * @returns boolean 
         */
        function isEmailValid (email: string) : boolean {
            if (email === "") {
                //message.value = "Campo não pode ficar vazio"
                //success.value = false
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

        /**
         * Função que verifica se a senha passada como parâmetro tem o formato válido
         * @param {string} password - senha inserida no input
         * @returns boolean
         */
        function isPasswordValid (password: string) : boolean {
            if (password === "") {
                //message.value = "Campo não pode ficar vazio"
                //success.value = false
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

        /**
         * Função que valida o valor do input de acordo com o tipo (email, password, text)
         * @returns boolean
         */
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
