import { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { sendMessage } from "../../services/HomeService";
import { toast } from "react-toastify";
import Button from "../Button";
import styled from "styled-components";

export default function Contact() {

    const [loading, setLoading] = useState(false);

    function handleSubmit(e: any) {
        e.preventDefault()
        setLoading(true)
        sendMessage(e.currentTarget)
            .then(() => toast.success('Message sent successfully'))
            .catch(() => toast.error('Error sending message'))
            .finally(() => setLoading(false))
    }

    return (
        <Section>
            <h2 className="title-page mb-4 ">Lets work together!</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control p-3 mb-3" id="email" name="email" placeholder="Email" required />
                <textarea className="form-control p-3 mb-4" id="message" name="message" placeholder="Message" rows={8} required></textarea>
                <Button color="primary" text="Send" type="submit" loading={loading} className="btn-lg px-5 mx-auto">
                    <RiMailSendLine className="me-2" />
                </Button>
            </form>
        </Section>
    )
}

const Section = styled.section`
    padding-left: 4rem;
    padding-right: 4rem;
    margin-top: 8rem;
    margin-bottom: 4rem;

    @media (max-width: 768px) {
        padding-left: .5rem;
        padding-right: .5rem;
        margin-top: 4rem;
    }
`