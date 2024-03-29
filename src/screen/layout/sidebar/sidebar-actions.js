import { supportModule } from "../../../assets/const/const-list";

export default function SidebarActions() {
    return <div className='support-action row'>
        {supportModule.map((e, i) => <div key={`support-module-${i}`} className='button-text-6'>{e.name}</div>)}
    </div>
}