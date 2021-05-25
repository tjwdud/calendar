import {React} from 'react'
import { useStudentsData } from 'js/stores/studentsData';

const StudentsControl = () => {

    return (
        <div>
            <p>학샹추가 페이지</p>
            <button>추가</button>
            <button>삭제</button>
            <button>수정</button>
        </div>
        
    )
};

export default StudentsControl
