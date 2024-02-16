import avatarDemo1 from '../../../../assets/demo-avatar1.png';

export default function NewStudentList() {
    const list = [
        {
            name: 'Phan Minh Anh',
            avatar: avatarDemo1,
            followers: 19,
            following: 20,
            descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
        },
        {
            name: 'Phan Minh Anh',
            avatar: avatarDemo1,
            followers: 19,
            following: 20,
            descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
        },
        {
            name: 'Phan Minh Anh',
            avatar: avatarDemo1,
            followers: 19,
            following: 20,
            descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
        },
        {
            name: 'Phan Minh Anh',
            avatar: avatarDemo1,
            followers: 19,
            following: 20,
            descript: 'Data Guy working Banking & Finance I write (randomly & sporadically) about anything and everything that interests me or worth sharing/analysing.',
        },
    ]

    return <div className='block-view col'>
        <div className='block-title heading-6'>Học viên mới</div>
        <div className='row list-card-new-student' >
            {
                list.map((e, i) => <div key={`new-st-card-${i}`} className='card-new-student col6 col12-md col12-sm col' >
                    <div className='prefix-img' style={{ backgroundImage: `url(${e.avatar})` }}></div>
                    <div className='col content' style={{ rowGap: 8 }}>
                        <div className='col' style={{ rowGap: 4 }}>
                            <div className='heading-7'>{e.name}</div>
                            <div className='subtitle-4'>{e.followers} Người theo dõi · {e.following} Đang theo dõi</div>
                        </div>
                        <div className='body-3'>{e.descript}</div>
                    </div>
                    <button type='button' className='row card-btn button-text-3'>Theo dõi</button>
                </div>)
            }
        </div>
    </div>
}