import React, { useState } from 'react';

export default function Table() {
    const documents = [
        { id: 1, name: 'HD_Nhapkho_2023.pdf', date: '12/12/2023', content: 'Nội dung demo nhân viên sẽ điền ở đây' },
        { id: 1, name: 'HD_Nhapkho_2023.pdf', date: '12/12/2023', content: 'Nội dung demo nhân viên sẽ điền ở đây' },
        // ... thêm các đối tượng khác tương ứng với mỗi hàng
    ];
    return (
        <div className='view-container'>
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th style={{ minWidth: 80, }} className='center fixed-first-column' >STT</th>
                        <th style={{ minWidth: 150, }} className=''>Tài liệu</th>
                        <th style={{ minWidth: 150, }} className=''>Ngày tải</th>
                        <th style={{ minWidth: 238, }} className=''>Nội dung</th>
                        <th style={{ minWidth: 200, }} className=''>Nội dung</th>
                        <th style={{ minWidth: 150, }} className='center' >Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc, index) => (
                        <tr key={doc.id}>
                            <td className='center fixed-first-column'>{index + 1}</td>
                            <td style={{ minWidth: 150, }} className=''>{doc.name}</td>
                            <td style={{ minWidth: 150, }} className=''>{doc.date}</td>
                            <td className=''>
                                <div className="clamp-two-lines">
                                    {doc.content + doc.content + doc.content + doc.content + doc.content + doc.content + doc.content + doc.content}
                                </div>
                            </td>
                            <td className=''>
                                <div className="clamp-two-lines">
                                    {doc.content + doc.content + doc.content + doc.content + doc.content + doc.content + doc.content + doc.content}
                                </div>
                            </td>
                            <td className='center'>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}
