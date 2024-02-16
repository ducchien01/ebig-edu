import { NavLink } from "react-router-dom"
import demoImg2 from '../../../../assets/demo-image2.png';
import demoImg3 from '../../../../assets/demo-image3.png';
import demoImg4 from '../../../../assets/demo-image4.png';
import { Text } from "../../../../component/export-component";

export default function InstructionList() {
    const list = [
        {
            name: 'Cách tạo khóa học Online',
            descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
            img: demoImg2
        },
        {
            name: 'Lớp học Online A-Z',
            descript: 'Tham gia các lớp học được giảng dạy trực tuyến từ các chuyên gia',
            img: demoImg3
        },
        {
            name: 'Mentor ra sao cho hiệu quả',
            descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
            img: demoImg4
        },
        {
            name: 'Cách tạo khóa học Online',
            descript: 'Tự học online với hệ thống bài giảng sẵn có từ các chuyên gia',
            img: demoImg2
        },
    ]

    return <div className='block-view col'>
        <div className='block-title row'>
            <div className='heading-6'>Hướng dẫn dành cho bạn</div>
            <NavLink to={'/edu-management/school/course/instructions'} className='button-text-3'>Xem tất cả</NavLink>
        </div>
        <div className='row list-card-view' style={{ flexWrap: 'wrap', columnGap: '4rem' }}>
            {list.map((e, i) => <div key={`card-img-${i}`} className='card-view-instruction col col6 col12-md col12-sm' style={{ '--gutter': '4rem' }}>
                <div className='top-img' style={{ backgroundImage: `url(${e.img})` }}></div>
                <div className='col text-content'>
                    <Text className='heading-5'>{e.name}</Text>
                    <Text className='subtitle-3' maxLine={3}>{e.descript}</Text>
                </div>
            </div>)}
        </div>
    </div>
}