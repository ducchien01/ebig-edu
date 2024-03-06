import { Slide, toast } from 'react-toastify';

export class ToastMessage {
    static success(message: string) {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            transition: Slide,
            autoClose: 800,
            theme: "colored",
        });
    }
    static errors(message: string) {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true,
            transition: Slide,
            autoClose: 800,
        });
    }
}