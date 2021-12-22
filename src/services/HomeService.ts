import { sendForm } from 'emailjs-com';

export function sendMessage(form: HTMLFormElement) {
    return sendForm('service_zs60ypg', 'template_bn6436q', form, 'user_TEtHjq2pcDL2U6tCQbGgy')
}
