import { forwardRef } from "react"
import './account.css';
import eBigLogo from '../../../assets/eBig-logo.svg'
import ggICon from '../../../assets/Google-Icon.svg'
import fbIcon from '../../../assets/Faceebook-Icon.svg'
import { Text, ToastMessage } from "../../../component/export-component";
import { AccountController } from "./controller";
import { useGoogleLogin } from "@react-oauth/google";

const PopupLogin = forwardRef(function PopupLogin(data, ref) {

    const loginWithGoogle = useGoogleLogin({
        scope: 'profile email',
        onSuccess: tokenResponse => AccountController.login(tokenResponse.access_token),
        onError: (er) => {
            ToastMessage.errors(er.error_description)
        },
    })

    return <div className="col popup-login-google-fb">
        <img src={eBigLogo} style={{ width: '10.2rem' }} />
        <Text className="highlight-6">Đăng nhập để khám phá nhiều kiến thức hơn</Text>
        <div className="col" style={{ gap: '2rem', marginTop: '1.6rem' }}>
            <button type="button" className="row login-btn" onClick={() => loginWithGoogle()}>
                <img src={ggICon} />
                <Text className="button-text-1">Đăng nhập bằng Google</Text>
            </button>
            <div className="row or-spacing">
                <div></div>
                <Text className="subtitle-4">Hoặc</Text>
                <div></div>
            </div>
            <button type="button" className="row login-btn" >
                <img src={fbIcon} />
                <Text className="button-text-1">Đăng nhập bằng Facebook</Text>
            </button>
        </div>
    </div>
})

export default PopupLogin